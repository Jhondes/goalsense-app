"use client";

import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { ChartNoAxesCombined } from "lucide-react";

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
          {match.market}

          {/* LOCKED INDICATOR */}
          {locked && (
            <span className="absolute left-1/2 transform -translate-x-1/2 text-yellow-400/70 text-xs font-bold">
              LOCKED
            </span>
          )}
        </p>

        {/* MODEL ANALYSIS */}
        {match.modelPercentage !== undefined &&
          match.modelPercentage !== null && (
            <div className="mt-1 flex items-center gap-1.5 text-[10px] sm:text-xs">
  <ChartNoAxesCombined
    size={12}
    strokeWidth={2}
    className="text-emerald-400"
  />

  <span className="text-gray-500">
    Model Analysis
  </span>

  <span className="font-semibold text-emerald-400">
    {match.modelPercentage}%
  </span>
</div>
          )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-semibold ${
            locked ? "text-yellow-400" : "text-green-400"
          }`}
        >
          {match.odds}
        </span>

        {/* Lock button */}
        <button
          onClick={() => toggleLock(match)}
          className={`
            p-1 rounded-full transition transform hover:scale-110 active:scale-95
            focus:outline-none focus:ring-0
            ${locked ? "text-yellow-400" : "text-gray-400 hover:text-green-400"}
          `}
          title={locked ? "Unlock pick" : "Lock pick"}
        >
          {locked ? (
            <LockClosedIcon className="w-5 h-5" />
          ) : (
            <LockOpenIcon className="w-5 h-5 rotate-[-20deg]" />
          )}
        </button>
      </div>
    </div>
  );
}