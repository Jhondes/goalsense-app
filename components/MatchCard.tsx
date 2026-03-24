"use client";

export default function MatchCard({ match, locked, toggleLock }: any) {
  return (
    <div className="relative border-b border-gray-700 pb-2 flex justify-between items-center">

      {/* LEFT SIDE */}
      <div>
        <p className="font-semibold text-sm">
          {match.home} vs {match.away}
        </p>

        {/* Prediction + Locked Indicator */}
        <p className="text-xs text-gray-400 flex items-center gap-2">
          {match.prediction}

          {/* LOCKED INDICATOR */}
         {locked && (
         <span className="absolute left-1/2 transform -translate-x-1/2 text-yellow-400/70 text-xs font-bold">
         LOCKED
         </span>
    )}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-semibold ${locked ? "text-yellow-400" : "text-green-400"}`}
        >
          {match.odds}
        </span>

        {/* Lock button */}
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