"use client";

import { supabase } from "@/lib/supabaseClient";
import React, { useState, useEffect } from "react";



type Match = {
  id: string;
  home: string;
  away: string;
  league: string;
  market: string;
  odds: string;
  date: string;
};

type PremiumSlip = {
  id: string;
  slip_date: string;
  title: string;
  booking_code: string | null;
  matches: {
    home: string;
    away: string;
    market: string;
    odds: number;
  }[];
  total_odds: number;
  is_active: boolean;
  created_at?: string;
};

export default function AdminPage() {
  const [form, setForm] = useState({
    home: "",
    away: "",
    league: "",
    market: "",
    odds: "",
    date: "",
  });

  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableLeagues, setAvailableLeagues] = useState<string[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});


const [userEmail, setUserEmail] = useState("");
const [userData, setUserData] = useState<any>(null);
const [userLoading, setUserLoading] = useState(false);


const [todayMatches, setTodayMatches] = useState(0);
const [premiumUsers, setPremiumUsers] = useState(0);

const [generatedSlips, setGeneratedSlips] = useState(0);

// ================= PREMIUM SLIP =================

const [premiumSlipTitle, setPremiumSlipTitle] = useState("");
const [premiumSlipDate, setPremiumSlipDate] = useState("");
const [premiumBookingCode, setPremiumBookingCode] = useState("");

const [editingPremiumSlipId, setEditingPremiumSlipId] = useState<string | null>(null);

const [premiumMatches, setPremiumMatches] = useState<
  {
    home: string;
    away: string;
    market: string;
    odds: string;
  }[]
>([
  {
    home: "",
    away: "",
    market: "",
    odds: "",
  },
]);

const [premiumSlipLoading, setPremiumSlipLoading] = useState(false);

const [premiumSlips, setPremiumSlips] = useState<PremiumSlip[]>([]);
const [premiumSlipsLoading, setPremiumSlipsLoading] = useState(false);



const [stats, setStats] = useState({
  totalPremiumUsers: 0,
  firstTimeSubscribers: 0,
  renewalSubscriptions: 0,
  totalSubscriptions: 0,
  totalRevenue: 0,
});



  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
  fetchMatches();
  loadDashboardStats();
  fetchPremiumSlips();
}, []);


  useEffect(() => {
  async function loadStats() {
    const res = await fetch("/api/admin/stats");
    const data = await res.json();

    setStats(data);
  }

  loadStats();
}, []);


  async function loadDashboardStats() {
  const now = new Date();
const today =
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // Today's matches
  const { count: matchesCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("match_date", today);

  // Premium users
  const { count: premiumCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("is_premium", true);

    const { count: slipsCount } = await supabase
    .from("slips")
    .select("*", { count: "exact", head: true });

  setTodayMatches(matchesCount ?? 0);
  setPremiumUsers(premiumCount ?? 0);
  setGeneratedSlips(slipsCount ?? 0);
}

  // ✅ FIXED: Properly closed function
  async function fetchMatches() {
  const { data, error } = await supabase
    .from("matches")
    .select(`
      id,
      home_team,
      away_team,
      league,
      market,
      odds,
      match_date
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("FETCH MATCHES ERROR");
    console.error("Message:", error.message);
    console.error("Details:", error.details);
    console.error("Hint:", error.hint);
    console.error("Code:", error.code);

    alert(`Fetch error: ${error.message}`);
    return;
  }

  console.log("MATCHES FROM DATABASE:", data);

  setMatches(
    (data || []).map((m: any) => ({
      id: m.id,
      home: m.home_team,
      away: m.away_team,
      league: m.league,
      market: m.market,
      odds: m.odds,
      date: m.match_date
        ? String(m.match_date).split("T")[0]
        : "",
    }))
  );
}

  // ✅ MOVED OUTSIDE (FIX)
  async function testDB() {
    const { data, error } = await supabase.from("matches").select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert("Connection failed ❌");
    } else {
      alert("Connected to DB ✅");
    }
  }

  // ✅ MOVED OUTSIDE (FIX)
  async function handleAddMatch() {
    const { error } = await supabase.from("matches").insert([
      {
        home_team: form.home,
        away_team: form.away,
        league: form.league,
        market: form.market,
        odds: Number(form.odds),
        match_date: form.date,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Match added ✅");
      fetchMatches(); // refresh list
      loadDashboardStats();
    }
  }

  async function handleDelete(id: string) {
  const confirmDelete = confirm("Delete this match?");
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("matches")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    alert("Failed to delete ❌");
    return;
  }

  // ✅ instantly update UI (better UX than refetch)
  setMatches((prev) => prev.filter((m) => m.id !== id));
  loadDashboardStats();

  alert("Deleted ✅");
}


async function handleUpdate(id: string) {
  const { data, error } = await supabase
    .from("matches")
    .update({
      home_team: editForm.home,
      away_team: editForm.away,
      league: editForm.league,
      market: editForm.market,
      odds: Number(editForm.odds),
      match_date: editForm.date,
    })
    .eq("id", id)
    .select();

  // 👇 ADD IT RIGHT HERE
  console.log("Updated rows:", data);

  if (error || !data || data.length === 0) {
    console.error("Update error:", error);
    alert("Update failed ❌");
    return;
  }

  await fetchMatches();
  await loadDashboardStats();

  setEditingId(null);
  setEditForm({});
  alert("Updated ✅");
}

useEffect(() => {
  const stored = localStorage.getItem("admin-auth");

  if (!stored) return;

  try {
    const session = JSON.parse(stored);

    if (
      session.authenticated &&
      session.expires > Date.now()
    ) {
      setAuthorized(true);
    } else {
      localStorage.removeItem("admin-auth");
    }
  } catch {
    localStorage.removeItem("admin-auth");
  }
}, []);


useEffect(() => {
  const stored = localStorage.getItem("admin-auth");

  if (!stored) return;

  try {
    const session = JSON.parse(stored);

    const remaining = session.expires - Date.now();

    if (remaining > 0) {
      const timer = setTimeout(() => {
        localStorage.removeItem("admin-auth");
        setAuthorized(false);
        alert("Your admin session has expired. Please log in again.");
      }, remaining);

      return () => clearTimeout(timer);
    }
  } catch {}
}, []);

  useEffect(() => {
    console.log("ALL MATCHES:", matches);
    console.log("SELECTED DATE:", selectedDate);

    if (!selectedDate) {
      setAvailableLeagues([]);
      setFilteredMatches(matches);
      return;
    }

    const matchesByDate = matches.filter(
      (m) => m.date?.trim() === selectedDate?.trim()
    );

    const leagues = Array.from(
      new Set(matchesByDate.map((m) => m.league))
    );

    setAvailableLeagues(leagues);

    const matchesByLeague = selectedLeague
      ? matchesByDate.filter((m) => m.league === selectedLeague)
      : matchesByDate;

    setFilteredMatches(matchesByLeague);
  }, [selectedDate, selectedLeague, matches]);

  // ====== Styles (UNCHANGED) ======
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#121212",
    color: "white",
    border: "1px solid #444",
    borderRadius: "5px",
  };

  const selectStyle: React.CSSProperties = {
    marginLeft: "10px",
    padding: "5px",
    backgroundColor: "#1e1e1e",
    color: "white",
    border: "1px solid #444",
    borderRadius: "5px",
  };



  // 🔍 Find user
async function findUser() {
  setUserLoading(true);

  const cleanEmail = userEmail.toLowerCase().trim();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .ilike("email", cleanEmail)
    .maybeSingle();

  console.log("USER:", data);
  console.log("ERROR:", error);

  if (error || !data) {
    alert("User not found ❌");
    setUserData(null);
  } else {
    setUserData(data);
  }

  setUserLoading(false);
}

// 💎 Grant premium
async function grantPremium() {
  if (!userData) return;

  try {
    const res = await fetch("/api/admin/grant-premium", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userData.id,
      }),
    });

    const result = await res.json();

    console.log("STATUS:", res.status);
    console.log("RESULT:", result);

    if (!res.ok) {
  console.log("BACKEND ERROR:", result);
  alert(result.error || "Upgrade failed ❌");
  return;
}

    alert("User upgraded 🚀");

    setUserData({
      ...userData,
      is_premium: true,
    });
    loadDashboardStats();
  } catch (err) {
    console.error(err);
    alert("Something went wrong ❌");
  }
}

// ================= PREMIUM SLIP FUNCTIONS =================
async function fetchPremiumSlips() {
  setPremiumSlipsLoading(true);

  try {
    const response = await fetch(
      "/api/admin/publish-premium-slip"
    );

    const result = await response.json();

    console.log("Premium slips:", result);

    if (!response.ok) {
      console.error("Premium slips fetch failed:", result);
      return;
    }

    setPremiumSlips(result.data || []);
  } catch (error) {
    console.error("Fetch premium slips error:", error);
  } finally {
    setPremiumSlipsLoading(false);
  }
}

function addPremiumMatch() {
  setPremiumMatches((prev) => [
    ...prev,
    {
      home: "",
      away: "",
      market: "",
      odds: "",
    },
  ]);
}

function removePremiumMatch(index: number) {
  setPremiumMatches((prev) =>
    prev.filter((_, i) => i !== index)
  );
}

function updatePremiumMatch(
  index: number,
  field: "home" | "away" | "market" | "odds",
  value: string
) {
  setPremiumMatches((prev) =>
    prev.map((match, i) =>
      i === index
        ? {
            ...match,
            [field]: value,
          }
        : match
    )
  );
}

function calculatePremiumTotalOdds() {
  return premiumMatches.reduce((total, match) => {
    const odds = Number(match.odds);

    if (!odds || odds <= 0) {
      return total;
    }

    return total * odds;
  }, 1);
}

function editPremiumSlip(slip: PremiumSlip) {
  setEditingPremiumSlipId(slip.id);

  setPremiumSlipDate(slip.slip_date);
  setPremiumSlipTitle(slip.title);
  setPremiumBookingCode(slip.booking_code || "");

  setPremiumMatches(
    slip.matches.map((match) => ({
      home: match.home,
      away: match.away,
      market: match.market,
      odds: String(match.odds),
    }))
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function deletePremiumSlip(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this Premium Slip?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      "/api/admin/publish-premium-slip",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Could not delete Premium Slip ❌");
      return;
    }

    alert("Premium Slip deleted successfully ✅");

    // If we were editing this slip, cancel edit mode
    if (editingPremiumSlipId === id) {
      setEditingPremiumSlipId(null);
      setPremiumSlipDate("");
      setPremiumSlipTitle("");
      setPremiumBookingCode("");

      setPremiumMatches([
        {
          home: "",
          away: "",
          market: "",
          odds: "",
        },
      ]);
    }

    await fetchPremiumSlips();
  } catch (error) {
    console.error("Delete premium slip error:", error);
    alert("Something went wrong ❌");
  }
}


async function publishPremiumSlip() {
  if (!premiumSlipDate) {
    alert("Please select a date ❌");
    return;
  }

  if (!premiumSlipTitle.trim()) {
    alert("Please enter a slip title ❌");
    return;
  }

  const validMatches = premiumMatches.filter(
    (match) =>
      match.home.trim() &&
      match.away.trim() &&
      match.market.trim() &&
      Number(match.odds) > 0
  );

  if (validMatches.length === 0) {
    alert("Please add at least one valid match ❌");
    return;
  }

  setPremiumSlipLoading(true);

  try {
    const totalOdds = validMatches.reduce(
      (total, match) => total * Number(match.odds),
      1
    );

    const response = await fetch("/api/admin/publish-premium-slip", {
  method: editingPremiumSlipId ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  ...(editingPremiumSlipId
    ? { id: editingPremiumSlipId }
    : {}),
  slip_date: premiumSlipDate,
        title: premiumSlipTitle.trim(),
        booking_code: premiumBookingCode.trim() || null,
        matches: validMatches.map((match) => ({
          home: match.home.trim(),
          away: match.away.trim(),
          market: match.market.trim(),
          odds: Number(match.odds),
        })),
        total_odds: Number(totalOdds.toFixed(2)),
      }),
    });

    const result = await response.json();

    console.log("Premium slip publish status:", response.status);
    console.log("Premium slip publish result:", result);

    if (!response.ok) {
      alert(result.error || "Could not publish Premium Slip ❌");
      return;
    }

   alert(
  editingPremiumSlipId
    ? "Premium Slip updated successfully ✅"
    : "Premium Slip published successfully ✅"
);

// Reset form
setEditingPremiumSlipId(null);
setPremiumSlipDate("");
setPremiumSlipTitle("");
setPremiumBookingCode("");

setPremiumMatches([
  {
    home: "",
    away: "",
    market: "",
    odds: "",
  },
]);

await fetchPremiumSlips();
  } catch (error) {
    console.error("Premium slip error:", error);
    alert("Something went wrong ❌");
  } finally {
    setPremiumSlipLoading(false);
  }
}

const handleLogin = () => {
  if (password === "Idk@126") {
    localStorage.setItem(
  "admin-auth",
  JSON.stringify({
    authenticated: true,
    expires: Date.now() + 60 * 60 * 1000, // 1 hour
  })
); // 👈 save
    setAuthorized(true);
  } else {
    alert("Wrong password ❌");
  }
};

if (!authorized) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Admin Access</h2>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "12px",
          width: "250px",
          backgroundColor: "#1e1e1e",
          color: "white",
          border: "1px solid #444",
          borderRadius: "6px",
          outline: "none",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          marginTop: "12px",
          padding: "10px 20px",
          backgroundColor: "#0fbcf9",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Enter
      </button>
    </div>
  );
}

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Admin Form */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#1e1e1e",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin Dashboard
        </h1>

        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginBottom: "25px",
  }}
>
  <div
    style={{
      background: "#2a2a2a",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <p style={{ color: "#aaa" }}>Premium Users</p>
    <h2 style={{ color: "#4caf50", fontSize: "30px" }}>
      {stats.totalPremiumUsers}
    </h2>
  </div>

  <div
    style={{
      background: "#2a2a2a",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <p style={{ color: "#aaa" }}>First-Time</p>
    <h2 style={{ color: "#2196f3", fontSize: "30px" }}>
      {stats.firstTimeSubscribers}
    </h2>
  </div>

  <div
    style={{
      background: "#2a2a2a",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <p style={{ color: "#aaa" }}>Renewals</p>
    <h2 style={{ color: "#ffc107", fontSize: "30px" }}>
      {stats.renewalSubscriptions}
    </h2>
  </div>

  <div
    style={{
      background: "#2a2a2a",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <p style={{ color: "#aaa" }}>Subscriptions</p>
    <h2 style={{ color: "#9c27b0", fontSize: "30px" }}>
      {stats.totalSubscriptions}
    </h2>
  </div>

  <div
    style={{
      background: "#2a2a2a",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <p style={{ color: "#aaa" }}>Revenue</p>
    <h2 style={{ color: "#00c853", fontSize: "30px" }}>
      ₦{stats.totalRevenue.toLocaleString()}
    </h2>
  </div>
</div>

        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      background: "#2a2a2a",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <p style={{ color: "#aaa", marginBottom: "8px" }}>
      Today's Matches
    </p>

    <h2 style={{ fontSize: "32px", color: "#0fbcf9" }}>
      {todayMatches}
    </h2>
  </div>



   {/* Generated Slips */}
  <div
    style={{
      background: "#2a2a2a",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <p style={{ color: "#aaa", marginBottom: "8px" }}>
      Saved Slips
    </p>

    <h2 style={{ fontSize: "32px", color: "#f59e0b" }}>
      {generatedSlips}
    </h2>
  </div>
</div>


         <button
        onClick={() => {
          localStorage.removeItem("admin-auth");
          setAuthorized(false);
        }}
        className="mb-6 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>

        {["home", "away", "league", "market", "odds", "date"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "date" ? "date" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(form as any)[field]}
            onChange={handleChange}
            style={inputStyle}
          />
        ))}

        <button
          onClick={handleAddMatch}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "12px",
            backgroundColor: "#0fbcf9",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Match
        </button>

        {/* ✅ ADDED HERE (SAFE PLACE) */}
        <button
          onClick={testDB}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#444",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Test DB
        </button>
      </div>

{/* ================= PREMIUM SLIP ================= */}

<div
  style={{
    width: "100%",
    maxWidth: "500px",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
  }}
>
  <h2
    style={{
      marginBottom: "5px",
      fontSize: "22px",
      fontWeight: "bold",
      color: "#facc15",
    }}
  >
    Premium Slip
  </h2>

  <p
    style={{
      color: "#999",
      fontSize: "13px",
      marginBottom: "20px",
    }}
  >
    Publish today's exclusive Premium accumulator.
  </p>

  {/* DATE */}

  <label
    style={{
      display: "block",
      marginBottom: "5px",
      color: "#ccc",
      fontSize: "14px",
    }}
  >
    Slip Date
  </label>

  <input
    type="date"
    value={premiumSlipDate}
    onChange={(e) => setPremiumSlipDate(e.target.value)}
    style={inputStyle}
  />

  {/* TITLE */}

  <label
    style={{
      display: "block",
      marginTop: "12px",
      marginBottom: "5px",
      color: "#ccc",
      fontSize: "14px",
    }}
  >
    Slip Title
  </label>

  <input
    type="text"
    placeholder="e.g. Today's Premium Accumulator"
    value={premiumSlipTitle}
    onChange={(e) => setPremiumSlipTitle(e.target.value)}
    style={inputStyle}
  />

  {/* BOOKING CODE */}

  <label
    style={{
      display: "block",
      marginTop: "12px",
      marginBottom: "5px",
      color: "#ccc",
      fontSize: "14px",
    }}
  >
    Booking Code
  </label>

  <input
    type="text"
    placeholder="Optional"
    value={premiumBookingCode}
    onChange={(e) =>
      setPremiumBookingCode(e.target.value)
    }
    style={inputStyle}
  />

  {/* MATCHES */}

  <div style={{ marginTop: "20px" }}>

    <h3
      style={{
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "white",
      }}
    >
      Matches
    </h3>

    {premiumMatches.map((match, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "#1e1e1e",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "12px",
          border: "1px solid #444",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              color: "#facc15",
              fontWeight: "bold",
            }}
          >
            Match {index + 1}
          </span>

          {premiumMatches.length > 1 && (
            <button
              type="button"
              onClick={() =>
                removePremiumMatch(index)
              }
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 8px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Remove
            </button>
          )}
        </div>

        {/* HOME */}

        <input
          type="text"
          placeholder="Home Team"
          value={match.home}
          onChange={(e) =>
            updatePremiumMatch(
              index,
              "home",
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* AWAY */}

        <input
          type="text"
          placeholder="Away Team"
          value={match.away}
          onChange={(e) =>
            updatePremiumMatch(
              index,
              "away",
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* MARKET */}

        <input
          type="text"
          placeholder="Market e.g. Over 1.5"
          value={match.market}
          onChange={(e) =>
            updatePremiumMatch(
              index,
              "market",
              e.target.value
            )
          }
          style={inputStyle}
        />

        {/* ODDS */}

        <input
          type="number"
          step="0.01"
          placeholder="Odds"
          value={match.odds}
          onChange={(e) =>
            updatePremiumMatch(
              index,
              "odds",
              e.target.value
            )
          }
          style={inputStyle}
        />

      </div>
    ))}

    {/* ADD MATCH */}

    <button
      type="button"
      onClick={addPremiumMatch}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#444",
        color: "white",
        border: "1px solid #666",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      + Add Another Match
    </button>

  </div>

  {/* TOTAL ODDS PREVIEW */}

  <div
    style={{
      marginTop: "15px",
      padding: "15px",
      backgroundColor: "#151515",
      borderRadius: "8px",
      border: "1px solid #444",
      textAlign: "center",
    }}
  >
    <p
      style={{
        color: "#999",
        fontSize: "13px",
        marginBottom: "5px",
      }}
    >
      Total Odds
    </p>

    <p
      style={{
        fontSize: "28px",
        fontWeight: "bold",
        color: "#4caf50",
      }}
    >
      {calculatePremiumTotalOdds().toFixed(2)}
    </p>
  </div>

  {/* PUBLISH */}

  {editingPremiumSlipId && (
  <button
    type="button"
    onClick={() => {
      setEditingPremiumSlipId(null);
      setPremiumSlipDate("");
      setPremiumSlipTitle("");
      setPremiumBookingCode("");

      setPremiumMatches([
        {
          home: "",
          away: "",
          market: "",
          odds: "",
        },
      ]);
    }}
    style={{
      width: "100%",
      marginTop: "10px",
      padding: "10px",
      backgroundColor: "#555",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Cancel Edit
  </button>
)}

  <button
    type="button"
    onClick={publishPremiumSlip}
    disabled={premiumSlipLoading}
    style={{
      width: "100%",
      marginTop: "15px",
      padding: "13px",
      backgroundColor: premiumSlipLoading
        ? "#555"
        : "#facc15",
      color: "black",
      border: "none",
      borderRadius: "6px",
      cursor: premiumSlipLoading
        ? "not-allowed"
        : "pointer",
      fontWeight: "bold",
      fontSize: "15px",
    }}
  >
    {premiumSlipLoading
  ? editingPremiumSlipId
    ? "Updating..."
    : "Publishing..."
  : editingPremiumSlipId
  ? "Update Premium Slip"
  : "Publish Premium Slip"}
  </button>

</div>

{/* ================= EXISTING PREMIUM SLIPS ================= */}

<div
  style={{
    width: "100%",
    maxWidth: "500px",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
  }}
>
  <h2
    style={{
      marginBottom: "15px",
      fontSize: "20px",
      fontWeight: "bold",
      color: "#facc15",
    }}
  >
    Existing Premium Slips
  </h2>

  {premiumSlipsLoading ? (
    <p style={{ color: "#999" }}>
      Loading Premium Slips...
    </p>
  ) : premiumSlips.length === 0 ? (
    <p style={{ color: "#999" }}>
      No Premium Slips found.
    </p>
  ) : (
    premiumSlips.map((slip) => (
      <div
        key={slip.id}
        style={{
          backgroundColor: "#1e1e1e",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "12px",
          border: slip.is_active
            ? "1px solid #facc15"
            : "1px solid #444",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <strong
            style={{
              color: "#facc15",
              fontSize: "16px",
            }}
          >
            {slip.title}
          </strong>

          <span
            style={{
              fontSize: "12px",
              color: slip.is_active
                ? "#4caf50"
                : "#777",
            }}
          >
            {slip.is_active ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>

        <p
          style={{
            color: "#aaa",
            fontSize: "13px",
            marginBottom: "5px",
          }}
        >
          Date: {slip.slip_date}
        </p>

        <p
          style={{
            color: "#4caf50",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Total Odds: {Number(slip.total_odds).toFixed(2)}
        </p>

        {slip.booking_code && (
          <p
            style={{
              color: "#aaa",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            Booking Code: {slip.booking_code}
          </p>
        )}

        <p
          style={{
            color: "#aaa",
            fontSize: "13px",
            marginBottom: "12px",
          }}
        >
          {slip.matches.length} match
          {slip.matches.length !== 1 ? "es" : ""}
        </p>

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            type="button"
            onClick={() => editPremiumSlip(slip)}
            style={{
              flex: 1,
              padding: "9px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => deletePremiumSlip(slip.id)}
            style={{
              flex: 1,
              padding: "9px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ))
  )}
</div>

      {/* USER UPGRADE SECTION */}
<div
  style={{
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
  }}
>
  <h2 style={{ marginBottom: "10px" }}>User Upgrade</h2>

  <input
    type="email"
    placeholder="Enter user email"
    value={userEmail}
    onChange={(e) => setUserEmail(e.target.value)}
    style={inputStyle}
  />

  <button
    onClick={findUser}
    style={{
      width: "100%",
      marginTop: "10px",
      padding: "10px",
      backgroundColor: "#0fbcf9",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    {userLoading ? "Searching..." : "Find User"}
  </button>

  {userData && (
    <div style={{ marginTop: "15px" }}>
      <p><strong>Email:</strong> {userData.email}</p>
      <p>
        <strong>Status:</strong>{" "}
        {userData.is_premium ? "Premium ✅" : "Free ❌"}
      </p>

      {!userData.is_premium && (
        <button
          onClick={grantPremium}
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Grant Premium
        </button>
      )}
    </div>
  )}
</div>



      {/* Filters */}
      <div style={{ width: "100%", maxWidth: "500px", marginTop: "20px" }}>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={inputStyle}
        />

        {availableLeagues.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <label>Select League:</label>
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              style={selectStyle}
            >
              <option value="">All</option>
              {availableLeagues.map((league) => (
                <option
                  key={league}
                  value={league}
                  style={{ backgroundColor: "#1e1e1e", color: "white" }}
                >
                  {league}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Matches Table */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          marginTop: "30px",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #555" }}>
              {["Home", "Away", "League", "Market", "Odds", "Date", "Actions"].map((h) => (
                <th key={h} style={{ padding: "10px", textAlign: "left" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
  {filteredMatches.map((m, index) => (
    <tr key={m.id || index} style={{ borderBottom: "1px solid #444" }}>
      
      {/* HOME */}
      <td style={{ padding: "8px" }}>
        {editingId === m.id ? (
          <input
            value={editForm.home}
            onChange={(e) =>
              setEditForm({ ...editForm, home: e.target.value })
            }
            style={inputStyle}
          />
        ) : (
          m.home
        )}
      </td>

      {/* AWAY */}
      <td style={{ padding: "8px" }}>
        {editingId === m.id ? (
          <input
            value={editForm.away}
            onChange={(e) =>
              setEditForm({ ...editForm, away: e.target.value })
            }
            style={inputStyle}
          />
        ) : (
          m.away
        )}
      </td>

      {/* LEAGUE */}
      <td style={{ padding: "8px" }}>
        {editingId === m.id ? (
          <input
            value={editForm.league}
            onChange={(e) =>
              setEditForm({ ...editForm, league: e.target.value })
            }
            style={inputStyle}
          />
        ) : (
          m.league
        )}
      </td>

      {/* MARKET */}
      <td style={{ padding: "8px" }}>
        {editingId === m.id ? (
          <input
            value={editForm.market}
            onChange={(e) =>
              setEditForm({ ...editForm, market: e.target.value })
            }
            style={inputStyle}
          />
        ) : (
          m.market
        )}
      </td>

      {/* ODDS */}
      <td style={{ padding: "8px" }}>
        {editingId === m.id ? (
          <input
            type="number"
            value={editForm.odds}
            onChange={(e) =>
              setEditForm({ ...editForm, odds: e.target.value })
            }
            style={inputStyle}
          />
        ) : (
          m.odds
        )}
      </td>

      {/* DATE */}
      <td style={{ padding: "8px" }}>
        {editingId === m.id ? (
          <input
            type="date"
            value={editForm.date}
            onChange={(e) =>
              setEditForm({ ...editForm, date: e.target.value })
            }
            style={inputStyle}
          />
        ) : (
          m.date
        )}
      </td>

      {/* ACTIONS */}
      <td style={{ padding: "8px" }}>
        {editingId === m.id ? (
          <>
            <button
              onClick={() => handleUpdate(m.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginRight: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>

            <button
              onClick={() => setEditingId(null)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#777",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditingId(m.id);
                setEditForm(m);
              }}
              style={{
                padding: "5px 10px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginRight: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(m.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>
        </table>

        {filteredMatches.length === 0 && selectedDate && (
          <p style={{ marginTop: "10px" }}>
            No matches found for this date/league.
          </p>
        )}
      </div>
    </div>
  );
}