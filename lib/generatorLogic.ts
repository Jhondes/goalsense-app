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



 // ✅ Filter by market (Normal Mode only)
if (!filters.luckySlip && !filters.mixedMarkets && filters.type) {
  filtered = filtered.filter((m) => {
    if (!m.market) return false;

    return (
      m.market.toLowerCase() ===
      filters.type.toLowerCase()
    );
  });
}

  // ❗ If nothing matches filters
  if (filtered.length === 0) {
    return {
      picks: [],
      totalOdds: "0.00",
    };
  }

  // Fisher-Yates shuffle
function shuffle(array: any[]) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}


let selected: any[] = [];

if (filters.targetOdds) {
  let remaining = [...filtered];
let runningTotal = 1;

const maxPicks = Math.min(picksCount, filtered.length);

// Find the lowest available odd
const lowestOdd = Math.min(...remaining.map(m => Number(m.odds)));

// Minimum achievable total with this many picks
const minimumPossible = Math.pow(lowestOdd, maxPicks);

if (minimumPossible > Number(filters.targetOdds)) {
  return {
    picks: [],
    totalOdds: "0.00",
  };
}



for (let i = 0; i < maxPicks; i++) {
  if (remaining.length === 0) break;

  const picksLeft = maxPicks - i;

  // Ideal odds needed for each remaining pick
  const idealOdd = Math.pow(
    Number(filters.targetOdds) / runningTotal,
    1 / picksLeft
  );

  // Sort by closeness to the ideal odds
  remaining.sort(
    (a, b) =>
      Math.abs(Number(a.odds) - idealOdd) -
      Math.abs(Number(b.odds) - idealOdd)
  );

  // Randomly choose from the 5 closest
  const top = remaining.slice(0, Math.min(5, remaining.length));

  const chosen =
    top[Math.floor(Math.random() * top.length)];

  if (!chosen) break;

  selected.push(chosen);

  runningTotal *= Number(chosen.odds);

  // Remove every market for the selected fixture
remaining = remaining.filter((m) => {
  const fixtureKey = [m.home, m.away].sort().join("|");
  const chosenKey = [chosen.home, chosen.away].sort().join("|");

  return fixtureKey !== chosenKey;
});
}
} else {
 const shuffled = shuffle(filtered);

const usedFixtures = new Set<string>();
selected = [];

for (const match of shuffled) {
  const fixtureKey = [match.home, match.away]
  .sort()
  .join("|");

  if (usedFixtures.has(fixtureKey)) {
    continue;
  }

  usedFixtures.add(fixtureKey);
  selected.push(match);

  if (selected.length >= picksCount) {
    break;
  }
}
}

const picks = selected.map((match) => ({
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