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

return ( <div className="space-y-8">
{/* Generator Panel */} <div id="generator"
     className="relative z-10 mt-10 bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
     transition space-y-4"
   > <Filters filters={filters} setFilters={setFilters} />


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
        className="
          w-full cursor-pointer
          accent-green-500
          hover:accent-green-400
          transition
        "
      />
    </div>

    {/* Generate Button */}
    <button
      onClick={() => generate(lockedPicks)}
      className="
        w-full p-3 rounded-lg font-semibold
        bg-green-600 hover:bg-green-500
        transition hover:shadow-[0_0_25px_#22c55e]
        active:scale-95
      "
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
        onClick={() => generate(lockedPicks)}
        className="
          w-full p-2 rounded-lg
          border border-green-500
          text-green-400
          hover:bg-green-500 hover:text-white
          transition
        "
      >
        🔄 Regenerate Slip
      </button>
    )}
  </div>

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
</div>


);
}
