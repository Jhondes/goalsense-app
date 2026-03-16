"use client";

import { useGenerator } from "@/hooks/useGenerator";
import Filters from "./Filters";
import ResultsTable from "./ResultsTable";
import { FireIcon } from "@heroicons/react/24/solid";
import FloatingSlip from "./FloatingSlip";
import { useState } from "react";

export default function GeneratorForm() {

const { filters, setFilters, results, totalOdds, generate, loading } =
useGenerator();

const [lockedPicks, setLockedPicks] = useState<any[]>([]);

/* NEW STATES */
const [showAdvanced, setShowAdvanced] = useState(false);
const [targetOdds, setTargetOdds] = useState<number | null>(null);
const [mixedMarkets, setMixedMarkets] = useState(false);
const [luckySlip, setLuckySlip] = useState(false);
const [showPremiumModal, setShowPremiumModal] = useState(false);

/* LOCK PICK FUNCTION */
const toggleLock = (match: any) => {

  const exists = lockedPicks.find(
    (p) => p.home === match.home && p.away === match.away
  );

  if (exists) {
    setLockedPicks(
      lockedPicks.filter(
        (p) => p.home !== match.home || p.away !== match.away
      )
    );
  } else {
    setLockedPicks([...lockedPicks, match]);
  }
};

const usingAdvancedOptions =
  luckySlip || mixedMarkets || targetOdds !== null;

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
onChange={(e) =>
setFilters({ ...filters, count: Number(e.target.value) })
}
className="w-full cursor-pointer accent-green-500 hover:accent-green-400 transition"
/>

</div>

{/* Generate Button */}
<button
onClick={() => {

  if (usingAdvancedOptions) {
    setShowPremiumModal(true);
    return;
  }

  generate(lockedPicks);

}}
className="w-full p-3 rounded-lg font-semibold bg-green-600 hover:bg-green-500 transition hover:shadow-[0_0_25px_#22c55e] active:scale-95"
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

{/* Regenerate Button */}
{results.length > 0 && (
<button
onClick={() => {

  if (usingAdvancedOptions) {
    setShowPremiumModal(true);
    return;
  }

  generate(lockedPicks);

}}
className="
  w-full p-2 rounded-lg
  border border-green-500
  text-green-400
  hover:bg-green-500 hover:text-white
  transition
"
>
🔄 Regenerate (keeps locked picks)
</button>
)}

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
🎰 Lucky Slip
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
🎲 Mixed Markets
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
🎯 Target Odds
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
${luckySlip
  ? "border-gray-700 text-gray-600 cursor-not-allowed"
  : targetOdds === odd
  ? "border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
  : "border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400"
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

{results.length > 0 && (
<div className="text-sm text-yellow-400 bg-gray-800 border border-yellow-500 rounded-lg p-2 text-center">
💡 Tip: Lock a pick 🔒 before regenerating to keep it in your slip.
</div>
)}

{/* Results */}

<ResultsTable
results={results}
totalOdds={totalOdds}
loading={loading}
lockedPicks={lockedPicks}
toggleLock={toggleLock}
/>

<FloatingSlip
results={results}
totalOdds={totalOdds}
/>

{showPremiumModal && (

<div
className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
onClick={() => setShowPremiumModal(false)}
>

<div
className="bg-gray-900 border border-yellow-500 rounded-xl p-6 w-[90%] max-w-md text-center animate-[fadeIn_.25s_ease]"
onClick={(e) => e.stopPropagation()}
>

<h2 className="text-xl font-semibold text-yellow-400 mb-2">
⭐ Premium Feature
</h2>

<p className="text-gray-300 text-sm mb-4">
Advanced generator options like <b>Lucky Slip</b>, <b>Mixed Markets</b>, and 
<b>Target Odds</b> are available only for premium members.
</p>

<p className="text-gray-400 text-xs mb-5">
Upgrade your membership to unlock smarter and more powerful bet generation.
</p>

<div className="flex gap-3 justify-center">

<button
onClick={() => setShowPremiumModal(false)}
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
Upgrade
</button>

</div>

</div>

</div>

)}

</div>
);
}