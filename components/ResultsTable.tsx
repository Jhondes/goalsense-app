import MatchCard from "./MatchCard";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ResultsTable({
  results,
  totalOdds,
  loading,
  lockedPicks,
  toggleLock
}: any) {

  if (loading) {
    return (
      <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!results.length) return null;

  return (
    <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">

      {results.map((r: any, i: number) => (
  <MatchCard
    key={i}
    match={r}
    locked={lockedPicks.some(
      (p: any) => p.home === r.home && p.away === r.away
    )}
    toggleLock={toggleLock}
  />
))}

      {/* Premium Accumulator Card */}
      <div
        className="
        sm:col-span-2 lg:col-span-3
        rounded-2xl
        bg-gradient-to-r from-green-600/20 to-emerald-500/20
        border border-green-500/40
        p-6
        text-center
        backdrop-blur-md
        shadow-[0_0_35px_rgba(34,197,94,0.35)]
      "
      >
        <p className="text-gray-400 text-sm tracking-wide">
          ACCUMULATOR SUMMARY
        </p>

        <p className="text-xl font-semibold text-white mt-2">
          {results.length} Picks Generated
        </p>

        <p className="text-4xl font-bold text-green-400 mt-2">
          {totalOdds}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Total Odds
        </p>
      </div>

    </div>
  );
}