import MatchCard from "./MatchCard";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ResultsTable({
  results,
  totalOdds,
  loading,
  lockedPicks,
  toggleLock,
  justGenerated
}: any) {

  if (loading) {
    return (
      <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3 animate-[fadeIn_.3s_ease]">
        {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} />)}
      </div>
    );
  }

  if (!results.length) return null;

  // Generate a unique key string for the whole slip
  const slipKey = results.map(r => r.home + r.away).join("-");

  return (
    <div className="flex justify-center mt-6">
      <div key={slipKey} className="bg-gray-900 border border-green-500 rounded-xl p-4 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-3">
          <p className="text-green-400 font-bold text-lg">⚽ GoalSense Slip</p>
          <p className="text-sm text-gray-400">{results.length} Picks</p>
        </div>

        {/* Picks */}
        <div className="space-y-2">
          {results.map((match: any) => (
            <MatchCard
              key={`${match.home}-${match.away}-${match.prediction}`} // ensure unique key per match
              match={match}
              locked={lockedPicks.some((m: any) =>
                m.home === match.home && m.away === match.away
              )}
              toggleLock={toggleLock}
            />
          ))}
        </div>

        {/* Total Odds */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">Total Odds</p>
          <p className="text-xl font-bold text-green-400">{totalOdds}</p>
        </div>

      </div>
    </div>
  );
}