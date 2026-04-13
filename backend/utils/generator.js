const crypto = require("crypto");
const matches = require("../data/matches.json");

function generatePredictions(filters) {
  const picksCount = filters.count || 1;

  // ✅ FILTER BY DATE
  let filteredMatches = matches;

  if (filters.dates && filters.dates.length > 0) {
    filteredMatches = matches.filter((match) =>
      filters.dates.includes(match.date)
    );
  }

  // ⚠️ if no matches found for selected dates
  if (filteredMatches.length === 0) {
    return { picks: [], totalOdds: "0.00" };
  }

  const picks = [];
  const usedMatches = new Set();

  const safeCount = Math.min(picksCount, filteredMatches.length);

  while (picks.length < safeCount) {
    const match =
      filteredMatches[Math.floor(Math.random() * filteredMatches.length)];

    const key = `${match.home}-${match.away}`;

    if (usedMatches.has(key)) continue;

    usedMatches.add(key);

    picks.push({
      id: crypto.randomUUID(),
      home: match.home,
      away: match.away,
      prediction: match.market,
      odds: match.odds,
      date: match.date, // ✅ include date in response
    });
  }

  const totalOdds = picks
    .reduce((acc, match) => acc * parseFloat(match.odds), 1)
    .toFixed(2);

  return { picks, totalOdds };
}

module.exports = generatePredictions;