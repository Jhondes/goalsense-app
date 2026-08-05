"use client";

import { useState, useEffect } from "react";
import { saveSlip } from "@/lib/saveSlip";

export default function FloatingSlip({ results, totalOdds }: any) {
  const [saved, setSaved] = useState(false);

  // Reset whenever a new slip is generated
  useEffect(() => {
    setSaved(false);
  }, [results]);

  if (!results.length) return null;

  const slipText = results
    .map(
      (r: any) =>
        `${r.home} vs ${r.away} — ${r.market} (${r.odds})`
    )
    .join("\n");

  const text = `GoalSense Bet Slip

${slipText}

Total Odds: ${totalOdds}

Generated with GoalSense.live`;

  const copySlip = async () => {
    if (!saved) {
      await saveSlip(results, totalOdds);
      setSaved(true);
    }

    await navigator.clipboard.writeText(text);

    alert("Slip copied!");
  };

  const shareSlip = async () => {
    if (!saved) {
      await saveSlip(results, totalOdds);
      setSaved(true);
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: "GoalSense Bet Slip",
          text,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("Sharing not supported. Slip copied instead.");
    }
  };

return (
  <div
    className="
      mt-3
      w-full
      flex
      items-center
      justify-center
    "
  >
    {/* Filters */}
    <button
  onClick={() =>
    document
      .getElementById("generator")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  className="
  group relative
  flex items-center justify-center gap-2
  rounded-xl
  border border-green-500/40
  bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10
  px-6 py-2.5
  text-sm font-bold text-green-400
  shadow-[0_0_12px_rgba(34,197,94,0.12)]
  backdrop-blur-sm
  transition-all duration-300
  hover:border-green-400
  hover:bg-green-500/15
  hover:text-green-300
  hover:shadow-[0_0_22px_rgba(34,197,94,0.3)]
  active:scale-95
  outline-none
  ring-0
  focus:outline-none
  focus:ring-0
  focus-visible:outline-none
  focus-visible:ring-0
"
>
  {/* Subtle animated glow */}
  <span
    className="
      pointer-events-none absolute inset-0
      rounded-xl
      bg-gradient-to-r
      from-transparent
      via-green-400/10
      to-transparent
      opacity-0
      transition-opacity duration-300
      group-hover:opacity-100
    "
  />

  {/* Filter icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="
      relative z-10
      h-4.5 w-4.5
      transition-transform duration-300
      group-hover:rotate-90
    "
  >
    <path d="M4 6h16" />
    <path d="M7 12h10" />
    <path d="M10 18h4" />
  </svg>

  <span className="relative z-10">
    Filters
  </span>

  {/* Small premium chevron */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="
      relative z-10
      h-4 w-4
      opacity-60
      transition-all duration-300
      group-hover:translate-x-1
      group-hover:opacity-100
    "
  >
    <path
      fillRule="evenodd"
      d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.06-1.06l4.24 4.24a.75.75 0 0 1 0 1.06l-4.24 4.24a.75.75 0 0 1-1.06-.02Z"
      clipRule="evenodd"
    />
  </svg>
</button>
  </div>
);      
}