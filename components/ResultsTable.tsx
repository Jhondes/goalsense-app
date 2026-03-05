import MatchCard from "./MatchCard";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ResultsTable({ results, loading }: any) {

  // ✅ PASTE HERE — loading check FIRST
  if (loading) {
    return (
      <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  // normal empty state
  if (!results.length) return null;

  // normal results render
  return (
    <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((r: any, i: number) => (
        <MatchCard key={i} match={r} />
      ))}
    </div>
  );
}
