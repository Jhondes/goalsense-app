export function generatePredictions(filters: any) {
  const picks = filters.count || 1; // <-- use slider value

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

  const results = [];

  for (let i = 0; i < picks; i++) {
    results.push({
      home: teams[Math.floor(Math.random() * teams.length)],
      away: teams[Math.floor(Math.random() * teams.length)],
      prediction: filters.type || "Over 2.5",
      odds: (1.5 + Math.random()).toFixed(2),
    });
  }

  return results;
}
