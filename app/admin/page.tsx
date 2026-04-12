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

export default function AdminPage() {
  const [form, setForm] = useState({
    home: "",
    away: "",
    league: "",
    market: "",
    odds: "",
    date: "",
  });

  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableLeagues, setAvailableLeagues] = useState<string[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    fetchMatches();
  }, []);

  // ✅ FIXED: Properly closed function
  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setMatches(
        (data || []).map((m: any) => ({
          id: m.id,
          home: m.home_team,
          away: m.away_team,
          league: m.league,
          market: m.market,
          odds: m.odds,
          date: m.match_date ? String(m.match_date).split("T")[0] : "",
        }))
      );
    }
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

  alert("Deleted ✅");
}


async function handleUpdate(id: string) {
  const { error } = await supabase
    .from("matches")
    .update({
      home_team: editForm.home,
      away_team: editForm.away,
      league: editForm.league,
      market: editForm.market,
      odds: Number(editForm.odds),
      match_date: editForm.date,
    })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    alert("Update failed ❌");
    return;
  }

  // update UI instantly
  setMatches((prev) =>
    prev.map((m) =>
      m.id === id ? { ...m, ...editForm } : m
    )
  );

  setEditingId(null);
  setEditForm({});
  alert("Updated ✅");
}


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