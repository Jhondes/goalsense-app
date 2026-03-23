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
        {[...Array(6)].map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!results.length) return null;

  return (
    <>
      {/* New Slip Indicator */}
      {justGenerated && (
        <div className="text-green-400 text-sm font-semibold mb-2 animate-[fadeIn_.3s_ease]">
          ⚡ New Slip Generated
        </div>
      )}

      {/* Results Grid */}
      <div className="flex justify-center mt-6">
        <div className="bg-gray-900 border border-green-500 rounded-xl p-4 w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-3">
            <p className="text-green-400 font-bold text-lg">
              ⚽ GoalSense Slip
            </p>
            <p className="text-sm text-gray-400">
              {results.length} Picks
            </p>
          </div>

          {/* Picks */}
          <div className="space-y-2">
            {results.map((match: any, index: number) => (
              <MatchCard
                key={index} // ✅ Use index as key to avoid duplicates
                match={match}
                locked={lockedPicks.some(
                  (m: any) => m.home === match.home && m.away === match.away
                )}
                toggleLock={toggleLock}
              />
            ))}
          </div>

          {/* LOCKED PICKS */}
          {lockedPicks?.length > 0 && (
            <>
              <div className="mt-4 mb-2 text-yellow-400 text-xs font-bold">
                🔒 Locked Picks
              </div>

              {lockedPicks.map((r: any, index: number) => (
                <div key={index} className="border-b border-yellow-600 pb-2">
                  <p className="text-sm">
                    {r.home} vs {r.away}
                  </p>

                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{r.prediction}</span>
                    <span className="text-yellow-400 font-semibold">
                      {r.odds}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Total Odds */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">Total Odds</p>
            <p className="text-xl font-bold text-green-400">
              {totalOdds}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}