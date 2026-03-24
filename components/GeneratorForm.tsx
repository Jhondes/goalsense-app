"use client";

import { useGenerator } from "@/hooks/useGenerator";
import Filters from "./Filters";
import ResultsTable from "./ResultsTable";
import { FireIcon } from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";


export default function GeneratorForm() {

const { filters, setFilters, results, totalOdds, generate, loading } =
useGenerator();

const [lockedPicks, setLockedPicks] = useState<any[]>([]);
const FREE_LOCK_LIMIT = 2;
const isPremium = false; // TODO: replace with backend user subscription

/* NEW STATES */
const [showAdvanced, setShowAdvanced] = useState(false);
const [targetOdds, setTargetOdds] = useState<number | null>(null);
const [mixedMarkets, setMixedMarkets] = useState(false);
const [luckySlip, setLuckySlip] = useState(false);
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
  luckySlip || mixedMarkets || targetOdds !== null;


const [collapsed, setCollapsed] = useState(false);
let scrollTimeout: any = null;

useEffect(() => {
  const handleScroll = () => {
    // Collapse immediately on scroll
    setCollapsed(true);

    // Clear previous timeout
    if (scrollTimeout) clearTimeout(scrollTimeout);

    // Expand after user stops scrolling
    scrollTimeout = setTimeout(() => {
      setCollapsed(false);
    }, 150); // adjust delay if needed
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

return (
<div className="space-y-8">

{/* Generator Panel */}
<div
id="generator"
className="relative z-10 mt-10 bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition space-y-4"
>

<Filters filters={filters} setFilters={setFilters} />

{/* Picks slider */}
<div className="space-y-2">

<div className="flex justify-between text-sm">
<span>Picks</span>

<span className="font-semibold text-green-400">
{filters.count}
</span>
</div>

<input
type="range"
min={1}
max={20}
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

</div>

{/* Generate Button */}
<button
disabled={loading}
onClick={() => {

  if (usingAdvancedOptions) {
  setPremiumReason("advanced");
  setShowPremiumModal(true);
  return;
}

  generate(lockedPicks);



}}
className="w-full p-3 rounded-lg font-semibold bg-green-600 hover:bg-green-500 transition hover:shadow-[0_0_25px_#22c55e] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
>

{loading ? (
<>
<span className="inline-block mr-2 animate-spin-fast">⚽</span>
Generating...
</>
) : (
<>
<FireIcon className="w-5 h-5 inline-block mr-2" />
Generate Predictions
</>
)}

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

  const newValue = !luckySlip;

  setLuckySlip(newValue);

  if (newValue) {
    setMixedMarkets(false);
    setTargetOdds(null);
  }

}}
className={`
w-full p-2 rounded-md border transition
${luckySlip
  ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
  : "border-gray-600 text-gray-400 hover:border-yellow-400 hover:text-yellow-400"
}
`}
>
{luckySlip ? "Enabled" : "Enable Lucky Slip"}

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
disabled={luckySlip}
onClick={() => setMixedMarkets(!mixedMarkets)}
className={`
w-full p-2 rounded-md border transition
${luckySlip
  ? "border-gray-700 text-gray-600 cursor-not-allowed"
  : mixedMarkets
  ? "border-purple-500 text-purple-400 bg-purple-500/10"
  : "border-gray-600 text-gray-400 hover:border-purple-400 hover:text-purple-400"
}
`}
>
{luckySlip
  ? "Disabled (Lucky Slip active)"
  : mixedMarkets
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

<p className={`text-xs mb-2 ${targetOdds ? "text-green-400" : "text-gray-500"}`}>
{targetOdds ? `Targeting ${targetOdds} odds` : "No target odds selected"}
</p>

<div className="flex gap-2">

{[5,10,20].map((odd)=>(
<button
key={odd}
disabled={luckySlip}
onClick={() => {
  const newValue = targetOdds === odd ? null : odd;
  setTargetOdds(newValue);
}}
className={`
px-3 py-1 rounded-md border transition cursor-pointer
${
  luckySlip
    ? "border-gray-700 text-gray-600 cursor-not-allowed"
    : targetOdds === odd
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
<div className="text-center text-gray-400 text-sm py-6 border border-gray-700 rounded-lg bg-gray-900">
No predictions yet. Click <span className="text-green-400">Generate</span> to create a slip.
</div>
)}

{/* Results */}

<div ref={resultsRef} className="scroll-mt-24"></div>

{results.length > 0 && (
  <>
    

    
  </>
)}




{results.length > 0 && (
  <div className="flex justify-center mt-2"> {/* reduced gap with mt-2 */}
    <button
      disabled={loading}
      onClick={() => {
        if (usingAdvancedOptions) {
          setPremiumReason("advanced");
          setShowPremiumModal(true);
          return;
        }
        generate(lockedPicks);
      }}
      className="
        w-full max-w-md   /* same width as slip */
        p-2 rounded-lg
        border border-green-500
        text-green-400
        hover:bg-green-500 hover:text-white
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <>
          <span className="inline-block mr-2 animate-spin-fast">⚽</span>
          Regenerating Slip...
        </>
      ) : (
        "🔄 Regenerate Slip (Keeps locked picks)"
      )}
    </button>
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

{results.length > 0 && (
  <button
    onClick={() => {
      document
        .getElementById("generator")
        ?.scrollIntoView({ behavior: "smooth" });
    }}
    className={`
      fixed bottom-6 right-6 z-50
      bg-green-600 hover:bg-green-500
      text-white
      rounded-full
      shadow-[0_0_20px_rgba(34,197,94,0.6)]
      transition-all duration-300
      flex items-center
      ${collapsed ? "p-3" : "px-4 py-2 gap-2"}
    `}
  >
    <AdjustmentsHorizontalIcon className="w-5 h-5" />

    {!collapsed && (
      <span className="text-xs sm:text-sm font-medium">
        Edit Filters
      </span>
    )}
  </button>
)}
</div>
);
}