"use client";

export default function MatchCard({ match, locked, toggleLock }: any) {
  return (
    <div
      className={`
        relative
        bg-gray-900 border
        rounded-xl p-4
        transition-all duration-300
        animate-[fadeIn_0.4s_ease]
        cursor-pointer
        ${locked 
          ? "border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.9)] bg-green-900/20"
          : "border-gray-700 hover:border-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] hover:bg-gray-800"}
      `}
    >
      {/* Lock Button */}
      <button
        onClick={() => toggleLock(match)}
        className="absolute top-2 right-2 text-lg hover:scale-110 transition"
        title={locked ? "Unlock this pick" : "Lock this pick before regenerating"}
      >
        {locked ? "🔒" : "🔓"}
      </button>

      <div className="flex justify-between mb-2 items-center">
        <span className="font-semibold">
          {match.home} vs {match.away}
        </span>

        <span className="bg-green-600 px-3 py-1 text-sm rounded-full shadow-md">
          {match.odds}
        </span>
      </div>

      <div className="text-gray-400">
        Prediction: {match.prediction}
      </div>

      {/* Locked Label */}
      {locked && (
        <div className="absolute bottom-2 left-2 text-xs text-green-400 font-semibold">
          Locked 🔒 — Will remain after regeneration
        </div>
      )}
    </div>
  );
}