"use client";

import { useGenerator } from "@/hooks/useGenerator";
import Filters from "./Filters";
import ResultsTable from "./ResultsTable";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import FloatingSlip from "./FloatingSlip";
import {
  ArrowPathIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";




export default function GeneratorForm() {

const {
  filters,
  setFilters,
  results,
  totalOdds,
  generate,
  loading,
  availableLeagues, // ✅ ADD THIS
} = useGenerator();

const [lockedPicks, setLockedPicks] = useState<any[]>([]);
const FREE_LOCK_LIMIT = 2;
const {
  profile,
  hasPremium,
  loading: userLoading,
  refreshProfile,
} = useUser();

const isPremium = hasPremium;

const getRiskLevel = (count: number) => {
  if (count <= 3) return { label: "Safe", color: "text-green-400" };
  if (count <= 7) return { label: "Balanced", color: "text-yellow-400" };
  if (count <= 10) return { label: "Risky", color: "text-orange-400" };
  return { label: "Crazy", color: "text-red-500" };
};

const risk = getRiskLevel(filters.count);


/* NEW STATES */
const [showAdvanced, setShowAdvanced] = useState(false);
const [showPremiumModal, setShowPremiumModal] = useState(false);
const resultsRef = useRef<HTMLDivElement | null>(null);
const [justGenerated, setJustGenerated] = useState(false);
const [premiumReason, setPremiumReason] = useState<"locks" | "advanced" | null>(null);


useEffect(() => {
  if (results.length > 0) {
    setJustGenerated(true);

    const timer = setTimeout(() => {
      setJustGenerated(false);
    }, 1000);

    return () => clearTimeout(timer);
  }
}, [results]);

useEffect(() => {
  if (results.length > 0) {
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [results]);

/* LOCK PICK FUNCTION */
const toggleLock = (match: any) => {

  const exists = lockedPicks.find(
    (p) => p.home === match.home && p.away === match.away
  );

  // UNLOCK
  if (exists) {
    setLockedPicks(
      lockedPicks.filter(
        (p) => p.home !== match.home || p.away !== match.away
      )
    );
    return;
  }

  // 🔒 FREE LIMIT CHECK (ADD THIS)
  if (!isPremium && lockedPicks.length >= FREE_LOCK_LIMIT) {
  if (userLoading) return;

  setPremiumReason("locks");
  setShowPremiumModal(true);
  return;
}

  // EXISTING LIMIT (slider safety)
  if (lockedPicks.length >= filters.count) {
    return;
  }

  // LOCK PICK
  setLockedPicks([...lockedPicks, match]);
};

const usingAdvancedOptions =
  filters.luckySlip ||
  filters.mixedMarkets ||
  filters.targetOdds !== null;


const [collapsed, setCollapsed] = useState(false);
const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  const handleScroll = () => {
    setCollapsed(true);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setCollapsed(false);
    }, 150);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
  };
}, []);

return (
<div className="space-y-8">

{/* Generator Panel */}
<div
id="generator"
className="relative z-10 mt-10 bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition space-y-4"
>

<Filters
  filters={filters}
  setFilters={setFilters}
  availableLeagues={availableLeagues}
  isPremium={isPremium}
/>

{/* Picks slider */}
<div className="space-y-2">

<div className="flex justify-between items-center text-sm">
  <span>Picks</span>

  <div className="flex items-center gap-2">
    <span className="font-semibold text-green-400">
      {filters.count}
    </span>

    <span className={`
  text-[10px] px-2 py-[2px] rounded
  ${risk.color} bg-white/5 border border-white/10
`}>
  {risk.label}
</span>
  </div>
</div>

<input
type="range"
min={1}
max={isPremium ? 20 : 10}
value={filters.count}
onChange={(e) => {

  const newCount = Number(e.target.value);

  setFilters({ ...filters, count: newCount });

  if (lockedPicks.length > newCount) {
    setLockedPicks(lockedPicks.slice(0, newCount));
  }

}}
className="w-full cursor-pointer accent-green-500 hover:accent-green-400 transition"
/>

{filters.count > 7 && (
    <p className="text-xs text-orange-400 mt-1">
      ⚠️ Higher picks reduce winning probability
    </p>
  )}

</div>



{/* Generate Button */}
<button
  disabled={loading}
  onClick={() => {
    if (!isPremium && usingAdvancedOptions) {
      setPremiumReason("advanced");
      setShowPremiumModal(true);
      return;
    }

    generate(lockedPicks);
  }}
  className="
    group
    relative
    w-full
    overflow-hidden
    rounded-xl
    bg-gradient-to-r
    from-green-500
    via-emerald-500
    to-green-600
    px-5
    py-4
    font-semibold
    text-white
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:shadow-[0_0_25px_rgba(34,197,94,0.45)]
    active:scale-[0.98]
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {/* Shine Effect */}
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

  <span className="relative flex items-center justify-center gap-3">
    {loading ? (
      <>
        <ArrowPathIcon className="w-5 h-5 animate-spin" />
        <span>Generating Smart Slip...</span>
      </>
    ) : (
      <>
        <SparklesIcon
  className="
    w-5 h-5
    text-yellow-300
    group-hover:text-white
    group-hover:rotate-12
    transition-all
    duration-300
  "
/>
        <span>Generate Predictions</span>
      </>
    )}
  </span>
</button>



{/* ADVANCED OPTIONS TOGGLE */}

<button
onClick={() => setShowAdvanced(!showAdvanced)}
className="text-sm text-gray-400 hover:text-green-400 transition"
>
{showAdvanced ? (
  <span>
    Hide Advanced Options <span className="text-yellow-400">👑</span> ▲
  </span>
) : (
  <span>
    ✨ Advanced Options <span className="text-yellow-400">👑</span> ▼
  </span>
)}
</button>

{/* ADVANCED OPTIONS PANEL */}

{showAdvanced && (

<div className="space-y-5 border-t border-gray-700 pt-4">

{/* Lucky Slip */}

<div className="rounded-lg border border-yellow-500/40 p-3 bg-yellow-500/5">

<p className="text-sm text-yellow-400 font-semibold">
🎰 Lucky Slip <span className="text-yellow-400">🔒</span>
</p>

<p className="text-xs text-gray-400 mb-2">
Generate a completely random accumulator
</p>

<button
onClick={() => {

  const newValue = !filters.luckySlip;

setFilters({
  ...filters,
  luckySlip: newValue,
  mixedMarkets: newValue ? false : filters.mixedMarkets,
  targetOdds: newValue ? null : filters.targetOdds,
});

}}
className={`
w-full p-2 rounded-md border transition
${filters.luckySlip
  ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
  : "border-gray-600 text-gray-400 hover:border-yellow-400 hover:text-yellow-400"
}
`}
>
{filters.luckySlip ? "Enabled" : "Enable Lucky Slip"}

</button>

</div>

{/* Mixed Markets */}

<div className="rounded-lg border border-purple-500/40 p-3 bg-purple-500/5">

<p className="text-sm text-purple-400 font-semibold">
🎲 Mixed Markets <span className="text-yellow-400">🔒</span>
</p>

<p className="text-xs text-gray-400 mb-2">
Allow generator to combine multiple betting markets
</p>

<button
  disabled={filters.luckySlip}
  onClick={() =>
    setFilters({
      ...filters,
      mixedMarkets: !filters.mixedMarkets,
    })
  }
  className={`
    w-full p-2 rounded-md border transition
    ${
      filters.luckySlip
        ? "border-gray-700 text-gray-600 cursor-not-allowed"
        : filters.mixedMarkets
        ? "border-purple-500 text-purple-400 bg-purple-500/10"
        : "border-gray-600 text-gray-400 hover:border-purple-400 hover:text-purple-400"
    }
  `}
>
  {filters.luckySlip
    ? "Disabled (Lucky Slip active)"
    : filters.mixedMarkets
    ? "Enabled"
    : "Enable Mixed Markets"}
</button>

</div>

{/* Target Odds */}

<div className="rounded-lg border border-green-500/40 p-3 bg-green-500/5">

<p className="text-sm text-green-400 font-semibold">
🎯 Target Odds <span className="text-yellow-400">🔒</span>
</p>

<p className="text-xs text-gray-400 mb-2">
Generate a slip targeting a specific total odds
</p>

{/* STATUS TEXT (ADD HERE) */}

<p
  className={`text-xs mb-2 ${
    filters.targetOdds ? "text-green-400" : "text-gray-500"
  }`}
>
  {filters.targetOdds
    ? `Targeting ${filters.targetOdds} odds`
    : "No target odds selected"}
</p>

<div className="flex gap-2">

{[5, 10, 20].map((odd) => (
  <button
    key={odd}
    disabled={filters.luckySlip}
    onClick={() => {
      const newValue =
        filters.targetOdds === odd ? null : odd;

      setFilters({
        ...filters,
        targetOdds: newValue,
      });
    }}
    className={`
      px-3 py-1 rounded-md border transition cursor-pointer
      ${
        filters.luckySlip
          ? "border-gray-700 text-gray-600 cursor-not-allowed"
          : filters.targetOdds === odd
          ? "border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.5)] scale-105"
          : "border-gray-600 text-gray-400 hover:border-gray-500 hover:text-white"
      }
    `}
  >
    {odd}
  </button>
))}

</div>

</div>

</div>

)}

</div>

{/* TIP */}


{results.length === 0 && !loading && (
  <div className="mx-auto max-w-2xl rounded-3xl border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-950 px-6 py-10 sm:px-10 text-center shadow-xl">

    {/* Icon */}
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
      <SparklesIcon className="h-8 w-8 text-green-400" />
    </div>

    {/* Badge */}
    <div className="mt-6 inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-green-400">
        Ready to Win
      </span>
    </div>

    {/* Heading */}
    <h3 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
      Create Your Smart Slip
    </h3>

    {/* Description */}
    <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-8 text-gray-400">
      Choose your filters, select the number of picks, and let{" "}
      <span className="font-semibold text-green-400">
        GoalSense
      </span>{" "}
      instantly generate intelligent football predictions powered by today's
      fixtures.
    </p>

  </div>
)}

{/* Results */}

<div ref={resultsRef} className="scroll-mt-24"></div>






{results.length > 0 && (
  <div className="flex flex-col items-center mt-2">
    
    <button
  disabled={loading}
  onClick={() => {
    if (!isPremium && usingAdvancedOptions) {
      setPremiumReason("advanced");
      setShowPremiumModal(true);
      return;
    }

    generate(lockedPicks);
  }}
  className="
    group
    w-full max-w-md
    flex items-center justify-center gap-3
    rounded-xl
    border border-green-500/40
    bg-gradient-to-r from-green-500/10 via-green-500/5 to-emerald-500/10
    px-5 py-3
    text-green-400
    font-semibold
    transition-all duration-300
    hover:border-green-400
    hover:bg-green-500
    hover:text-white
    hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]
    active:scale-[0.98]
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {loading ? (
    <>
      <ArrowPathIcon className="w-5 h-5 animate-spin" />
      <span>Regenerating...</span>
    </>
  ) : (
    <>
      <ArrowPathIcon className="w-5 h-5 group-hover:rotate-180 transition duration-500" />
      <span>Regenerate Slip</span>
    </>
  )}
</button>

    {/* 👇 FORCE THIS BELOW */}
    {lockedPicks.length > 0 && (
  <p className="mt-2 text-center text-xs text-gray-400">
  🔒 <span className="text-green-400 font-medium">
    {lockedPicks.length}
  </span>{" "}
  locked pick{lockedPicks.length !== 1 && "s"} will remain after regeneration.
</p>
)}

  </div>
)}

<ResultsTable
results={results}
totalOdds={totalOdds}
loading={loading}
lockedPicks={lockedPicks}
toggleLock={toggleLock}
justGenerated={justGenerated}
/>



{showPremiumModal && (

<div
className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
onClick={() => setShowPremiumModal(false)}
>

<div
  className={`
    bg-gray-900 border border-yellow-500 rounded-xl p-6 w-[90%] max-w-md text-center
    animate-[fadeIn_.25s_ease]
    ${premiumReason === "locks" ? "animate-shake" : ""}
  `}
  onClick={(e) => e.stopPropagation()}
>

<h2 className="text-xl font-semibold text-yellow-400 mb-2">
  {premiumReason === "locks"
    ? "🔒 Lock Limit Reached"
    : "⭐ Premium Feature"}
</h2>

<p className="text-gray-300 text-sm mb-4">
  {premiumReason === "locks" ? (
    <>
      Free users can lock up to <b>2 picks</b>. Upgrade to Premium to unlock unlimited pick locks.
    </>
  ) : (
    <>
      Advanced generator options like <b>Lucky Slip</b>, <b>Mixed Markets</b>, and <b>Target Odds</b> are available only for premium members.
    </>
  )}
</p>

{/* ✅ ADD HERE */}
{premiumReason === "locks" && (
  <p className="text-xs text-yellow-400 mb-5">
    🚀 Remove limits instantly with Premium
  </p>
)}



<div className="flex gap-3 justify-center">

<button
onClick={() => {
  setShowPremiumModal(false);
  setPremiumReason(null);
}}
className="px-4 py-2 rounded-md border border-gray-600 text-gray-400 hover:text-white"
>
Close
</button>

<button
  onClick={() => {
    window.location.href = "/pricing";
  }}
  className="px-4 py-2 rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
>
  {premiumReason === "locks" ? "Unlock Unlimited Locks" : "Upgrade to Premium"}
</button>

</div>

</div>

</div>

)}



<FloatingSlip
  results={results}
  totalOdds={totalOdds}
/>

</div>
);
}