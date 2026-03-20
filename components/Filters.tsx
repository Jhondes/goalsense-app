import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";




export default function Filters({ filters, setFilters }: any) {
  const [open, setOpen] = useState(false);
const [showModal, setShowModal] = useState(false);
const [selectedDates, setSelectedDates] = useState<string[]>([]);
const [availableLeagues, setAvailableLeagues] = useState<string[]>([]);
const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


// 👇👇👇 ADD THE NEW ONE RIGHT HERE 👇👇👇

/* REMOVE THIS COMMENT ONCE BACKEND IS READY
useEffect(() => {
  if (!filters.dates || filters.dates.length === 0) {
    setAvailableLeagues([]);
    setSelectedLeagues([]);
    return;
  }

  async function fetchLeagues() {
  try {
    const res = await fetch("/api/leagues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dates: filters.dates }),
    });

    // ✅ Prevent JSON crash
    if (!res.ok) {
      const text = await res.text();
      console.error("Server returned:", text);
      return;
    }

    const data = await res.json();

    setAvailableLeagues(data.leagues || []);

    setSelectedLeagues(prev =>
      prev.filter(l => (data.leagues || []).includes(l))
    );

  } catch (err) {
    console.error("Failed to fetch leagues", err);
  }
}

  fetchLeagues();
}, [filters.dates]);
REMOVE THIS COMMENT ONCE BACKEND IS READY */ 

useEffect(() => {
  if (filters.leagues) {
    setSelectedLeagues(filters.leagues);
  }
}, [filters.leagues]);


useEffect(() => {
  if (filters.dates) {
    const mapped = filters.dates.map((iso: string) => {
      const found = nextFiveDays.find(
        d => d.toISOString().split("T")[0] === iso
      );
      return found?.toDateString();
    }).filter(Boolean);

    setSelectedDates(mapped as string[]);
  }
}, [filters.dates]);


  const markets = [
  { name: "Over 1.5", premium: false },
  { name: "1X2", premium: false },
  { name: "Over 2.5", premium: true },
  { name: "Team 0.5", premium: true },
  { name: "Team 1.5", premium: true },
  { name: "Team 2.5", premium: true },
  { name: "BTTS", premium: true },
  
];

// 👇 ADD IT RIGHT HERE
const nextFiveDays = Array.from({ length: 5 }, (_, i) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0); // 👈 prevents timezone shift
  date.setDate(date.getDate() + i);
  return date;
});

  const handleSelect = (market: any) => {
    if (market.premium && !filters.unlocked) {
      setShowModal(true);
      return;
    }

    setFilters({ ...filters, type: market.name });
    setOpen(false);
  };

  const unlockPremium = () => {
    setFilters({ ...filters, unlocked: true });
    setShowModal(false);
  };

  return (
  <div className="space-y-4 relative"> 

    {/* DATE SELECTOR — PASTE IT HERE */}
    <div>
      <h3 className="text-sm font-semibold text-gray-300 mb-2">
        Select Date
      </h3>



      <div className="grid grid-cols-5 gap-2">
        {nextFiveDays.map((date) => {
          const formatted = date.toDateString();
          const isoDate = date.toISOString().split("T")[0];
          const isActive = selectedDates.includes(formatted);

 return (
            <button
              key={formatted}
              onClick={() => {
                let updatedDates;

                if (isActive) {
                  updatedDates = selectedDates.filter(d => d !== formatted);
                } else {
                  updatedDates = [...selectedDates, formatted];
                }

                setSelectedDates(updatedDates);

                const isoDates = updatedDates.map(d => {
                  const found = nextFiveDays.find(
                    nd => nd.toDateString() === d
                  );
                  return found?.toISOString().split("T")[0];
                });

                setFilters({
                  ...filters,
                  dates: isoDates,
                });
              }}
              className={`
                w-full py-2 rounded text-[11px] sm:text-xs font-semibold transition
                ${
                  isActive
                    ? "bg-green-500 text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }
              `}
            >
              {date.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </button>
          );
        })}
      </div>
    </div>

    {/* ================= LEAGUE SELECTOR ================= */}

    {selectedDates.length > 0 && (
  <div>
    <h3 className="text-sm font-semibold text-gray-300 mb-2">
      Select Leagues
    </h3>

    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
      {availableLeagues.length > 0 ? (
        availableLeagues.map((league) => {
          const active = selectedLeagues.includes(league);

          return (
            <button
              key={league}
              onClick={() => {
                let updated;

                if (active) {
                  updated = selectedLeagues.filter(l => l !== league);
                } else {
                  updated = [...selectedLeagues, league];
                }

                setSelectedLeagues(updated);

                setFilters({
                  ...filters,
                  leagues: updated,
                });
              }}
              className={`
                px-3 py-1 rounded-full text-xs font-semibold transition
                ${
                  active
                    ? "bg-green-500 text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }
              `}
            >
              {league}
            </button>
          );
        })
      ) : (
        <p className="text-xs text-gray-500">
          {selectedDates.length === 1
            ? "No leagues available for selected date"
            : "No leagues available for selected dates"}
        </p>
      )}
    </div>
  </div>
)}

    {/* Unlock Button */}


      {/* Unlock Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-300">
          Events
        </h3>

        <button
  disabled={filters.unlocked}
  onClick={() => {
    if (!filters.unlocked) {
      window.location.href = "/pricing";
    }
  }}
  className="
px-3 py-1 rounded-full text-xs font-semibold
bg-gradient-to-r from-pink-500 to-orange-500
hover:scale-110 transition
shadow-lg hover:shadow-pink-500/50
animate-pulse
"
>
  {filters.unlocked ? "Premium Active" : "Unlock Premium"}
</button>
      </div>

      {/* Custom Dropdown */}
      {/* Custom Dropdown */}
<div ref={dropdownRef} className="relative">

        <div
  onClick={() => setOpen(!open)}
  className="w-full border border-gray-700 bg-gray-800 px-4 py-3 rounded cursor-pointer flex justify-between items-center hover:border-gray-500 transition"
>
  <span className="text-sm">
    {filters.type || "Choose Market"}
  </span>

  <ChevronDown
    size={18}
    className={`
      text-gray-400 transition-transform duration-200
      ${open ? "rotate-180" : ""}
    `}
  />
</div>


        {open && (
          <div className={`absolute w-full mt-2 bg-gray-900 border border-gray-700 rounded shadow-lg z-50 transition-all duration-150 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {markets.map((market) => (
              <div
                key={market.name}
                onClick={() => handleSelect(market)}
                className={`
                  flex justify-between items-center
                  px-4 py-2 cursor-pointer
                  hover:bg-gray-800 transition
                `}
              >
                <span
                  className={
                    market.premium
                      ? "text-yellow-400"
                      : "text-white"
                  }
                >
                  {market.name}
                </span>

                <span className="text-xs">
                  {market.premium ? (
                    filters.unlocked ? (
                      <span className="text-yellow-400">PREMIUM</span>
                    ) : (
                      <span className="text-gray-400 animate-pulse">
                        🔒
                      </span>
                    )
                  ) : (
                    <span className="text-green-400">FREE</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Premium Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-200">
          <div className="bg-gray-900 p-6 rounded-lg w-80 text-center space-y-4 border border-gray-700">
            <h2 className="text-lg font-semibold">
              Premium Market
            </h2>
            <p className="text-sm text-gray-400">
              Unlock premium markets to access this market.
            </p>

            <button
  onClick={() => {
    setShowModal(false);
    window.location.href = "/pricing";
  }}
  className="w-full py-2 rounded bg-yellow-500 hover:bg-yellow-400 font-semibold transition"
>
  Unlock Now
</button>

            <button
              onClick={() => setShowModal(false)}
              className="text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
