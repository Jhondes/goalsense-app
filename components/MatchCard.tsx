"use client";

export default function MatchCard({ match, locked, toggleLock }: any) {
  return (
    <div
      className={`
        relative
        border-b border-gray-700 pb-2 flex justify-between items-center
        bg-gray-900  /* solid background to prevent ghosting */
        transition-all duration-300
      `}
    >
      {/* LEFT SIDE */}
      <div>
        <p className="font-semibold text-sm">{match.home} vs {match.away}</p>
        <p className="text-xs text-gray-400">
          {locked && <span className="text-yellow-400 font-bold">LOCKED</span>} {match.prediction}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${locked ? "text-yellow-400" : "text-green-400"}`}>
          {match.odds}
        </span>

        <button
          onClick={() => toggleLock(match)}
          className="text-sm hover:scale-110 transition"
        >
          {locked ? "🔒" : "🔓"}
        </button>
      </div>
    </div>
  );
}