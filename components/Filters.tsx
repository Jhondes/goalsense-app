"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Filters({ filters, setFilters, availableLeagues }: any) {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [shake, setShake] = useState(false);

  const isPremium = filters.unlocked; // ✅ CONNECTED TO YOUR SYSTEM

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* CLOSE DROPDOWN */
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* NEXT DAYS */
  const nextFiveDays = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + i);
    return date;
  });

  /* SYNC LEAGUES */
  useEffect(() => {
    if (filters.leagues) {
      setSelectedLeagues(filters.leagues);
    }
  }, [filters.leagues]);

  useEffect(() => {
  if (availableLeagues?.length > 0 && selectedLeagues.length === 0) {
    const allLeagues = availableLeagues.map((l: any) => l.name);

    setSelectedLeagues(allLeagues);

    setFilters({
      ...filters,
      leagues: allLeagues,
    });
  }
}, [availableLeagues]);

  /* SYNC DATES */
  useEffect(() => {
    if (filters.dates) {
      const mapped = filters.dates
        .map((iso: string) => {
          const found = nextFiveDays.find(
            (d) => d.toISOString().split("T")[0] === iso
          );
          return found?.toDateString();
        })
        .filter(Boolean);

      setSelectedDates(mapped as string[]);
    }
  }, [filters.dates]);

  /* MARKETS */
  const markets = [
    { name: "Over 1.5", premium: false },
    { name: "Over 2.5", premium: true },
    { name: "Team 0.5", premium: true },
    { name: "Team 1.5", premium: true },
    { name: "Team 2.5", premium: true },
    { name: "BTTS", premium: true },
  ];

  /* HANDLE SELECT */
  const handleSelect = (market: any) => {
    if (market.premium && !isPremium) {
      setShowModal(true);

      // shake effect
      setShake(true);
      setTimeout(() => setShake(false), 300);

      return;
    }

    setFilters({ ...filters, type: market.name });
    setOpen(false);
  };

  return (
    <div className="space-y-4 relative">

      {/* DATE */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">
          Select Date
        </h3>

        <div className="grid grid-cols-5 gap-2">
          {nextFiveDays.map((date) => {
            const formatted = date.toDateString();
            const isActive = selectedDates.includes(formatted);

            return (
              <button
                key={formatted}
                onClick={() => {
                  let updatedDates;

                  if (isActive) {
                    updatedDates = selectedDates.filter((d) => d !== formatted);
                  } else {
                    updatedDates = [...selectedDates, formatted];
                  }

                  setSelectedDates(updatedDates);

                  const isoDates = updatedDates.map((d) => {
                    const found = nextFiveDays.find(
                      (nd) => nd.toDateString() === d
                    );
                    return found?.toISOString().split("T")[0];
                  });

                  setFilters({
                    ...filters,
                    dates: isoDates,
                    leagues: [],
                  });

                  setSelectedLeagues([]);
                }}
                className={`w-full py-2 rounded text-[11px] sm:text-xs font-semibold transition ${
                  isActive
                    ? "bg-green-500 text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
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

      {/* LEAGUES */}
      {selectedDates.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-1">
  Available Leagues
</h3>

<p className="text-xs text-gray-500 mb-3">
  Deselect leagues you don’t want the generator to pick from
</p>

          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {availableLeagues?.length > 0 ? (
             availableLeagues.map((league: any) => {
                const checked = selectedLeagues.includes(league.name);

                return (
                  <label
                    key={league.name}
                    className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        let updated;

                        if (checked) {
                          updated = selectedLeagues.filter(
                            (l) => l !== league.name
                          );
                        } else {
                          updated = [...selectedLeagues, league.name];
                        }

                        setSelectedLeagues(updated);

                        setFilters({
                          ...filters,
                          leagues: updated,
                        });
                      }}
                      className="accent-green-500 cursor-pointer"
                    />

                    <span className="text-xs font-semibold text-gray-300">
                      {league.name} ({league.count})
                    </span>
                  </label>
                );
              })
            ) : (
              <p className="text-xs text-gray-500">
                No leagues available for selected date
              </p>
            )}
          </div>
        </div>
      )}

      {/* EVENTS */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-300">Events</h3>

        <button
          disabled={isPremium}
          onClick={() => {
            if (!isPremium) window.location.href = "/pricing";
          }}
          className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-110 transition shadow-lg animate-pulse"
        >
          {isPremium ? "Premium Active" : "Unlock Premium"}
        </button>
      </div>

      {/* MARKET */}
      <div ref={dropdownRef} className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="w-full border border-gray-700 bg-gray-800 px-4 py-3 rounded cursor-pointer flex justify-between items-center"
        >
          <span className="text-sm flex items-center gap-2">
            {filters.type || "Choose Market"}
            {filters.type && <span className="text-green-400 text-xs">✔</span>}
          </span>
          <ChevronDown size={18} />
        </div>

        {open && (
          <div
            className={`
              absolute w-full mt-2 bg-gray-900 border border-gray-700 rounded shadow-lg z-50
              ${shake ? "animate-shake" : ""}
            `}
          >
            {markets.map((market) => (
              <div
                key={market.name}
                onClick={() => handleSelect(market)}
                className={`
                  flex justify-between items-center px-4 py-2 rounded-md transition-all duration-200
                  ${market.premium && !isPremium
                    ? "opacity-60 blur-[0.3px] hover:blur-0 hover:opacity-80"
                    : "hover:bg-gray-800"
                  }
                  ${market.premium && !isPremium ? "cursor-not-allowed" : "cursor-pointer"}
                  hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]
                  active:scale-[0.98]
                `}
              >
                <span className="flex items-center gap-2">
                  {market.name}

                  {market.premium && (
                    <span className="text-[10px] px-2 py-[2px] rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">
                      👑 PRO
                    </span>
                  )}
                </span>

                {market.premium && !isPremium && (
                  <span className="text-yellow-400 text-xs">🔒</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-gray-900 border border-yellow-500 rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-[0_0_30px_rgba(234,179,8,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-2">👑</div>

            <h2 className="text-lg font-bold text-yellow-400 mb-2">
              Premium Required
            </h2>

            <p className="text-sm text-gray-300 mb-4">
              Unlock advanced markets like <b>Over 2.5</b>, <b>BTTS</b> and more.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-600 rounded text-gray-400"
              >
                Maybe Later
              </button>

              <button
                onClick={() => (window.location.href = "/pricing")}
                className="px-4 py-2 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-400"
              >
                Upgrade 👑
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}