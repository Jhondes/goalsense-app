"use client";


import { useGenerator } from "@/hooks/useGenerator";
import Filters from "./Filters";
import ResultsTable from "./ResultsTable";
import { FireIcon } from "@heroicons/react/24/solid";

export default function GeneratorForm() {
  const { filters, setFilters, results, totalOdds, generate, loading } = useGenerator();


  return (
    <div className="space-y-8">

      {/* Generator Panel */}
      <div className="relative z-10 mt-10 bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
  transition space-y-4">

        <h2 className="text-lg font-semibold">
          
        </h2>

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
    className="
      w-full cursor-pointer
      accent-green-500
      hover:accent-green-400
      transition
    "
  />
</div>

        <button
  onClick={generate}
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
    "Generate Predictions"
  )}
</button>



      </div>

      {/* Results */}
      <ResultsTable
  results={results}
  totalOdds={totalOdds}
  loading={loading}
/>

    </div>
  );
}
