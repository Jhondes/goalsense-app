export function generatePredictions(filters: any, matches: any[]) {
  const picksCount = filters.count || 1;

  // ✅ SAFETY CHECK (prevents crash)
  if (!Array.isArray(matches)) {
    return {
      picks: [],
      totalOdds: "0.00",
    };
  }

  let filtered = [...matches];

  // ✅ Filter by market (type)
 if (filters.type) {
  filtered = filtered.filter((m) => {
    if (!m.market) return false;

    // ✅ SPECIAL HANDLING FOR 1X2
    if (filters.type === "1X2") {
      return m.market.toLowerCase() === "1x2";
    }

    return m.market.toLowerCase() === filters.type.toLowerCase();
  });
}

  // ❗ If nothing matches filters
  if (filtered.length === 0) {
    return {
      picks: [],
      totalOdds: "0.00",
    };
  }

  // ✅ Shuffle matches
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());

  // ✅ Pick required number
  const picks = shuffled.slice(0, picksCount).map((match) => ({
    id: match.id || crypto.randomUUID(),
    home: match.home,
    away: match.away,
    market: match.market,
    odds: match.odds,
  }));

  // ✅ Calculate total odds
  const totalOdds = picks
    .reduce((acc, match) => acc * Number(match.odds), 1)
    .toFixed(2);

  return {
    picks,
    totalOdds,
  };
}