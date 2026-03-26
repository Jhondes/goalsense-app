export function generatePredictions(filters: any) {
  const picksCount = filters.count || 1;

  const teams = [
    "Arsenal",
    "Chelsea",
    "Barcelona",
    "Madrid",
    "Inter",
    "Milan",
    "PSG",
    "Dortmund",
  ];

  const picks: any[] = [];
  const usedMatches = new Set(); // ✅ track used fixtures

  while (picks.length < picksCount) {
    const home =
      teams[Math.floor(Math.random() * teams.length)];
    const away =
      teams[Math.floor(Math.random() * teams.length)];

    // ❌ prevent same team vs itself
    if (home === away) continue;

    // ✅ prevent duplicates (and reverse duplicates)
    const key = [home, away].sort().join("-");

    if (usedMatches.has(key)) continue;

    usedMatches.add(key);

    picks.push({
      id: crypto.randomUUID(), // ✅ VERY IMPORTANT
      home,
      away,
      prediction: filters.type || "Over 2.5",
      odds: (1.5 + Math.random()).toFixed(2),
    });
  }

  // calculate accumulator odds
  const totalOdds = picks
    .reduce((acc, match) => acc * parseFloat(match.odds), 1)
    .toFixed(2);

  return {
    picks,
    totalOdds,
  };
}