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

  for (let i = 0; i < picksCount; i++) {
    picks.push({
      home: teams[Math.floor(Math.random() * teams.length)],
      away: teams[Math.floor(Math.random() * teams.length)],
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