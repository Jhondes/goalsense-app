
import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://v3.football.api-sports.io";
const COMPLETED_STATUSES = ["FT", "AET", "PEN"];
const HISTORICAL_SEASON = 2024;
const MATCH_LIMIT = 10;


async function footballRequest(
  endpoint: string,
  revalidateSeconds = 3600
) {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    throw new Error("API_FOOTBALL_KEY is missing.");
  }

  const response = await fetch(`${API_BASE}/${endpoint}`, {
    headers: {
      "x-apisports-key": apiKey,
    },
    next: {
      revalidate: revalidateSeconds,
    },
  });

  const data = await response.json();

  if (
    !response.ok ||
    (data.errors && Object.keys(data.errors).length > 0)
  ) {
    throw new Error(
      JSON.stringify(
        data.errors || `API request failed: ${response.status}`
      )
    );
  }

  return data.response || [];
}



function normalizeTeam(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/(footballclub|fc|afc|cf|sc|kv)$/g, "");
}

function sameTeam(apiName: string, enteredName: string) {
  const api = normalizeTeam(apiName);
  const entered = normalizeTeam(enteredName);

  if (!api || !entered) return false;

  const aliases: Record<string, string[]> = {
    olympiacos: ["olympiakospiraeus", "olympiacos"],
    acmilan: ["milan"],
  };

  if (api === entered) return true;

  return (
    (aliases[entered] || []).includes(api) ||
    (aliases[api] || []).includes(entered)
  );
}


function isCompleted(match: any) {
  return (
    COMPLETED_STATUSES.includes(match.fixture?.status?.short) &&
    typeof match.goals?.home === "number" &&
    typeof match.goals?.away === "number"
  );
}


function sortRecent(fixtures: any[]) {
  return fixtures
    .filter(isCompleted)
    .sort(
      (a, b) =>
        (b.fixture?.timestamp || 0) -
        (a.fixture?.timestamp || 0)
    );
}

function summarizeMatches(fixtures: any[], teamId: number) {
  const recent = sortRecent(fixtures).slice(0, MATCH_LIMIT);

  if (!recent.length) {
    return {
      matches: 0,
      goalsScored: null,
      goalsConceded: null,
      over15: null,
      over25: null,
      btts: null,
      wins: 0,
      draws: 0,
      losses: 0,
      recentResults: [],
    };
  }

  let scored = 0;
  let conceded = 0;
  let wins = 0;
  let draws = 0;
  let losses = 0;

  recent.forEach((match) => {
    const isHome = match.teams.home.id === teamId;

    const teamGoals = isHome
      ? match.goals.home
      : match.goals.away;

    const opponentGoals = isHome
      ? match.goals.away
      : match.goals.home;

    scored += teamGoals;
    conceded += opponentGoals;

    if (teamGoals > opponentGoals) wins++;
    else if (teamGoals === opponentGoals) draws++;
    else losses++;
  });

  const total = recent.length;

  return {
    matches: total,
    goalsScored: Number((scored / total).toFixed(2)),
    goalsConceded: Number((conceded / total).toFixed(2)),
    over15: Math.round(
      (recent.filter(
        (match) => match.goals.home + match.goals.away >= 2
      ).length / total) * 100
    ),
    over25: Math.round(
      (recent.filter(
        (match) => match.goals.home + match.goals.away >= 3
      ).length / total) * 100
    ),
    btts: Math.round(
      (recent.filter(
        (match) =>
          match.goals.home > 0 && match.goals.away > 0
      ).length / total) * 100
    ),
    wins,
    draws,
    losses,
    recentResults: recent.map((match) => ({
      date: match.fixture.date,
      home: match.teams.home.name,
      away: match.teams.away.name,
      score: `${match.goals.home}-${match.goals.away}`,
    })),
  };
}

function calculateTeamStats(fixtures: any[], teamId: number) {
  const completed = sortRecent(fixtures);

  const overall = summarizeMatches(completed, teamId);

  const homeFixtures = completed.filter(
    (match) => match.teams.home.id === teamId
  );

  const awayFixtures = completed.filter(
    (match) => match.teams.away.id === teamId
  );

  const homePerformance = summarizeMatches(
    homeFixtures,
    teamId
  );

  const awayPerformance = summarizeMatches(
    awayFixtures,
    teamId
  );

  return {
    ...overall,
    venueStats: {
      home: {
        matches: homePerformance.matches,
        goalsScored: homePerformance.goalsScored,
        goalsConceded: homePerformance.goalsConceded,
      },
      away: {
        matches: awayPerformance.matches,
        goalsScored: awayPerformance.goalsScored,
        goalsConceded: awayPerformance.goalsConceded,
      },
    },
  };
}

function poisson(lambda: number, goals: number) {
  let factorial = 1;

  for (let i = 2; i <= goals; i++) {
    factorial *= i;
  }

  return (
    (Math.exp(-lambda) * Math.pow(lambda, goals)) /
    factorial
  );
}

function supportLabel(probability: number) {
  if (probability >= 70) return "Strong";
  if (probability >= 55) return "Moderate";
  return "Low";
}

function calculatePredictions(home: any, away: any) {
  if (!home.matches || !away.matches) {
    return {
      available: false,
      message:
        "Not enough completed historical matches to calculate predictions.",
    };
  }

  const homeVenue = home.venueStats.home;
  const awayVenue = away.venueStats.away;

  // Use venue-specific statistics when available.
  // Otherwise fall back to each team's overall historical averages.
  const homeAttack =
    homeVenue.matches > 0 && homeVenue.goalsScored !== null
      ? homeVenue.goalsScored
      : home.goalsScored;

  const awayDefence =
    awayVenue.matches > 0 && awayVenue.goalsConceded !== null
      ? awayVenue.goalsConceded
      : away.goalsConceded;

  const awayAttack =
    awayVenue.matches > 0 && awayVenue.goalsScored !== null
      ? awayVenue.goalsScored
      : away.goalsScored;

  const homeDefence =
    homeVenue.matches > 0 && homeVenue.goalsConceded !== null
      ? homeVenue.goalsConceded
      : home.goalsConceded;

  const expectedHomeGoals = Math.max(
    0.1,
    (homeAttack + awayDefence) / 2
  );

  const expectedAwayGoals = Math.max(
    0.1,
    (awayAttack + homeDefence) / 2
  );

  let over15 = 0;
  let over25 = 0;
  let btts = 0;
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;

  let bestScore = "0-0";
  let bestScoreProbability = -1;

  for (let h = 0; h <= 10; h++) {
    for (let a = 0; a <= 10; a++) {
      const probability =
        poisson(expectedHomeGoals, h) *
        poisson(expectedAwayGoals, a);

      if (h + a >= 2) over15 += probability;
      if (h + a >= 3) over25 += probability;
      if (h > 0 && a > 0) btts += probability;

      if (h > a) homeWin += probability;
      else if (h === a) draw += probability;
      else awayWin += probability;

      if (probability > bestScoreProbability) {
        bestScoreProbability = probability;
        bestScore = `${h}-${a}`;
      }
    }
  }

  const markets = [
    {
      name: "Over 1.5 Goals",
      probability: Math.round(over15 * 100),
    },
    {
      name: "Over 2.5 Goals",
      probability: Math.round(over25 * 100),
    },
    {
      name: "Both Teams to Score",
      probability: Math.round(btts * 100),
    },
  ];

  const bestMarket = [...markets].sort(
    (a, b) => b.probability - a.probability
  )[0];

  const outcomes = [
    { name: "Home Win", probability: Math.round(homeWin * 100) },
    { name: "Draw", probability: Math.round(draw * 100) },
    { name: "Away Win", probability: Math.round(awayWin * 100) },
  ];

  const likelyOutcome = [...outcomes].sort(
    (a, b) => b.probability - a.probability
  )[0];

  const minimumVenueSample = Math.min(
    homeVenue.matches,
    awayVenue.matches
  );

  let dataQuality = "Limited venue-specific sample";

  if (minimumVenueSample >= 5) {
    dataQuality = "Useful venue-specific historical sample";
  }

  if (
    home.matches < MATCH_LIMIT ||
    away.matches < MATCH_LIMIT
  ) {
    dataQuality += " · Fewer than 10 overall matches available for at least one team";
  }

  return {
    available: true,
    model: "Historical goals-based estimate",
    expectedGoals: {
      home: Number(expectedHomeGoals.toFixed(2)),
      away: Number(expectedAwayGoals.toFixed(2)),
      total: Number(
        (expectedHomeGoals + expectedAwayGoals).toFixed(2)
      ),
    },
    venueData: {
      homeTeamHomeMatches: homeVenue.matches,
      awayTeamAwayMatches: awayVenue.matches,
      usedOverallFallback:
        homeVenue.matches === 0 || awayVenue.matches === 0,
    },
    markets: markets.map((market) => ({
      ...market,
      support: supportLabel(market.probability),
    })),
    bestSupportedMarket: {
      ...bestMarket,
      support: supportLabel(bestMarket.probability),
    },
    matchOutcome: {
      predictions: outcomes,
      likelyOutcome: {
        ...likelyOutcome,
        support: supportLabel(likelyOutcome.probability),
      },
    },
    predictedScore: bestScore,
    dataQuality,
    caution:
      "Estimates are based on historical results and venue records where available. They are not current-form predictions or guaranteed outcomes.",
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const home = searchParams.get("home")?.trim();
    const away = searchParams.get("away")?.trim();
    const date = searchParams.get("date")?.trim();

    if (!home || !away || !date) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Home team, away team and match date are required.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        {
          success: false,
          message: "Date must use YYYY-MM-DD format.",
        },
        { status: 400 }
      );
    }

    // Request 1: Find the selected fixture.
    const fixtures = await footballRequest(
      `fixtures?date=${encodeURIComponent(date)}&timezone=Africa%2FLagos`
    );

    const fixture = fixtures.find(
      (match: any) =>
        sameTeam(match.teams?.home?.name || "", home) &&
        sameTeam(match.teams?.away?.name || "", away)
    );

    if (!fixture) {
      return NextResponse.json({
        success: false,
        totalFixturesReturned: fixtures.length,
        message:
          "Fixture not found. Check the team names and selected date.",
      });
    }

    const homeId = fixture.teams.home.id;
    const awayId = fixture.teams.away.id;

    // Requests 2 and 3: Retrieve each team's historical fixtures.
    const [homeMatches, awayMatches] = await Promise.all([
  footballRequest(
    `fixtures?team=${homeId}&season=${HISTORICAL_SEASON}`,
    2592000
  ),
  footballRequest(
    `fixtures?team=${awayId}&season=${HISTORICAL_SEASON}`,
    2592000
  ),
]);

    const homeStats = calculateTeamStats(homeMatches, homeId);
    const awayStats = calculateTeamStats(awayMatches, awayId);

    const predictions = calculatePredictions(
      homeStats,
      awayStats
    );

    return NextResponse.json({
      success: true,
      fixture: {
        id: fixture.fixture.id,
        date: fixture.fixture.date,
        league: fixture.league.name,
        country: fixture.league.country,
        home: fixture.teams.home.name,
        away: fixture.teams.away.name,
      },
      analysis: {
        home: homeStats,
        away: awayStats,
      },
      predictions,
      note: `Statistics use up to ${MATCH_LIMIT} of each team's most recent completed matches available in the ${HISTORICAL_SEASON} historical dataset. They are not current-form statistics.`,
    });
  } catch (error) {
    console.error("GoalSense match analysis error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to analyse this fixture.",
      },
      { status: 500 }
    );
  }
}