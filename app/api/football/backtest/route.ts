
import { NextResponse } from "next/server";

const API_BASE = "https://v3.football.api-sports.io";
const LEAGUE_ID = 39; // English Premier League
const SEASON = 2024;
const MAX_HISTORY = 10;
const MIN_HISTORY = 3;

async function footballRequest(endpoint: string) {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    throw new Error("API_FOOTBALL_KEY is missing.");
  }

  const response = await fetch(`${API_BASE}/${endpoint}`, {
    headers: { "x-apisports-key": apiKey },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || (data.errors && Object.keys(data.errors).length)) {
    throw new Error(JSON.stringify(data.errors || response.status));
  }

  return data;
}

function completed(match: any) {
  return (
    ["FT", "AET", "PEN"].includes(match.fixture?.status?.short) &&
    typeof match.goals?.home === "number" &&
    typeof match.goals?.away === "number"
  );
}

function poisson(lambda: number, goals: number) {
  let factorial = 1;

  for (let i = 2; i <= goals; i++) factorial *= i;

  return Math.exp(-lambda) * Math.pow(lambda, goals) / factorial;
}

function teamHistory(
  fixtures: any[],
  teamId: number,
  beforeDate: string,
  venue: "home" | "away" | "all"
) {
  return fixtures
    .filter((match) => {
      if (!completed(match)) return false;

      // Only use matches played before the test match's calendar date.
      if (match.fixture.date.slice(0, 10) >= beforeDate) return false;

      const isHome = match.teams.home.id === teamId;
      const isAway = match.teams.away.id === teamId;

      if (!isHome && !isAway) return false;
      if (venue === "home" && !isHome) return false;
      if (venue === "away" && !isAway) return false;

      return true;
    })
    .sort(
      (a, b) =>
        b.fixture.timestamp - a.fixture.timestamp
    )
    .slice(0, MAX_HISTORY);
}

function averages(matches: any[], teamId: number) {
  if (!matches.length) return null;

  let scored = 0;
  let conceded = 0;

  for (const match of matches) {
    const isHome = match.teams.home.id === teamId;

    scored += isHome ? match.goals.home : match.goals.away;
    conceded += isHome ? match.goals.away : match.goals.home;
  }

  return {
    matches: matches.length,
    scored: scored / matches.length,
    conceded: conceded / matches.length,
  };
}

function estimate(
  homeMatches: any[],
  awayMatches: any[],
  homeId: number,
  awayId: number,
  date: string
) {
  const homeOverall = averages(
    teamHistory(homeMatches, homeId, date, "all"),
    homeId
  );

  const awayOverall = averages(
    teamHistory(awayMatches, awayId, date, "all"),
    awayId
  );

  if (
    !homeOverall ||
    !awayOverall ||
    homeOverall.matches < MIN_HISTORY ||
    awayOverall.matches < MIN_HISTORY
  ) {
    return null;
  }

  const homeVenue = averages(
    teamHistory(homeMatches, homeId, date, "home"),
    homeId
  );

  const awayVenue = averages(
    teamHistory(awayMatches, awayId, date, "away"),
    awayId
  );

  const homeAttack = homeVenue?.scored ?? homeOverall.scored;
  const homeDefence = homeVenue?.conceded ?? homeOverall.conceded;

  const awayAttack = awayVenue?.scored ?? awayOverall.scored;
  const awayDefence = awayVenue?.conceded ?? awayOverall.conceded;

  const expectedHome = Math.max(
    0.1,
    (homeAttack + awayDefence) / 2
  );

  const expectedAway = Math.max(
    0.1,
    (awayAttack + homeDefence) / 2
  );

  let over15 = 0;
  let over25 = 0;
  let btts = 0;
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;

  for (let h = 0; h <= 10; h++) {
    for (let a = 0; a <= 10; a++) {
      const p =
        poisson(expectedHome, h) *
        poisson(expectedAway, a);

      if (h + a >= 2) over15 += p;
      if (h + a >= 3) over25 += p;
      if (h > 0 && a > 0) btts += p;

      if (h > a) homeWin += p;
      else if (h === a) draw += p;
      else awayWin += p;
    }
  }

  return {
    over15: Math.round(over15 * 100),
    over25: Math.round(over25 * 100),
    btts: Math.round(btts * 100),
    homeWin: Math.round(homeWin * 100),
    draw: Math.round(draw * 100),
    awayWin: Math.round(awayWin * 100),

    expectedHome: Number(expectedHome.toFixed(2)),
    expectedAway: Number(expectedAway.toFixed(2)),
    expectedTotal: Number((expectedHome + expectedAway).toFixed(2)),

    homeHistoryMatches: homeOverall.matches,
    awayHistoryMatches: awayOverall.matches,

    homeVenueMatches: homeVenue?.matches ?? 0,
    awayVenueMatches: awayVenue?.matches ?? 0,

    homeAttack: Number(homeAttack.toFixed(2)),
    awayAttack: Number(awayAttack.toFixed(2)),
    homeDefence: Number(homeDefence.toFixed(2)),
    awayDefence: Number(awayDefence.toFixed(2)),
  };
}

function metric() {
  return { tested: 0, correct: 0 };
}

function record(
  result: { tested: number; correct: number },
  predicted: boolean,
  actual: boolean
) {
  result.tested++;

  if (predicted === actual) result.correct++;
}

function percentage(result: { tested: number; correct: number }) {
  return result.tested
    ? Math.round((result.correct / result.tested) * 100)
    : null;
}

// Group selected predictions for error analysis.
function summarizeGroups(
  rows: any[],
  getGroup: (row: any) => string
) {
  const groups: Record<
    string,
    { tested: number; correct: number; failed: number }
  > = {};

  for (const row of rows) {
    const group = getGroup(row);

    if (!groups[group]) {
      groups[group] = {
        tested: 0,
        correct: 0,
        failed: 0,
      };
    }

    groups[group].tested++;

    if (row.correct) {
      groups[group].correct++;
    } else {
      groups[group].failed++;
    }
  }

  return Object.entries(groups).map(([group, result]) => ({
    group,
    ...result,
    accuracy: result.tested
      ? Math.round((result.correct / result.tested) * 100)
      : null,
  }));
}

export async function GET() {
  try {
    // Fetch fixtures for the selected league and season.
    const data = await footballRequest(
      `fixtures?league=${LEAGUE_ID}&season=${SEASON}`
    );

    let fixtures: any[] = data.response || [];

    fixtures = fixtures
      .filter(completed)
      .sort(
        (a, b) =>
          a.fixture.timestamp - b.fixture.timestamp
      );

    if (!fixtures.length) {
      return NextResponse.json({
        success: false,
        message:
          "No completed fixtures were returned for this competition and season.",
      });
    }

    const thresholds = {
      over15: 70,
      over25: 60,
      btts: 60,
    };

    const independentMarkets = {
      over15: metric(),
      over25: metric(),
      btts: metric(),
    };

    const outcomeStats = metric();

    const selectedOutcomes: Record<
      string,
      { tested: number; correct: number }
    > = {
      "Home Win": metric(),
      Draw: metric(),
      "Away Win": metric(),
    };

    const calibration: Record<
      string,
      Record<
        string,
        {
          tested: number;
          correct: number;
          probabilityTotal: number;
        }
      >
    > = {
      "Over 1.5 Goals": {},
      "Over 2.5 Goals": {},
      "Both Teams to Score": {},
    };

    const ranges = [
      "0-49",
      "50-59",
      "60-69",
      "70-79",
      "80-89",
      "90-100",
    ];

    for (const market of Object.keys(calibration)) {
      for (const range of ranges) {
        calibration[market][range] = {
          tested: 0,
          correct: 0,
          probabilityTotal: 0,
        };
      }
    }

    let testedMatches = 0;
    let skippedMatches = 0;

    // Stores every selected Over 1.5 prediction.
    const over15Selections: any[] = [];

    for (const match of fixtures) {
      const date = match.fixture.date.slice(0, 10);
      const homeId = match.teams.home.id;
      const awayId = match.teams.away.id;

      const predictions = estimate(
        fixtures,
        fixtures,
        homeId,
        awayId,
        date
      );

      if (!predictions) {
        skippedMatches++;
        continue;
      }

      testedMatches++;

      const homeGoals = match.goals.home;
      const awayGoals = match.goals.away;
      const totalGoals = homeGoals + awayGoals;

      const actual = {
        over15: totalGoals >= 2,
        over25: totalGoals >= 3,
        btts: homeGoals > 0 && awayGoals > 0,
      };

      // Collect Over 1.5 selections for diagnostic analysis.
      if (predictions.over15 >= thresholds.over15) {
        over15Selections.push({
          date,

          homeTeam: match.teams.home.name,
          awayTeam: match.teams.away.name,

          score: `${homeGoals}-${awayGoals}`,
          totalGoals,

          probability: predictions.over15,

          expectedHome: predictions.expectedHome,
          expectedAway: predictions.expectedAway,
          expectedTotal: predictions.expectedTotal,

          homeHistoryMatches: predictions.homeHistoryMatches,
          awayHistoryMatches: predictions.awayHistoryMatches,

          homeVenueMatches: predictions.homeVenueMatches,
          awayVenueMatches: predictions.awayVenueMatches,

          homeAttack: predictions.homeAttack,
          awayAttack: predictions.awayAttack,

          homeDefence: predictions.homeDefence,
          awayDefence: predictions.awayDefence,

          correct: actual.over15,
        });
      }

      // Test each goal market independently.
      const marketTests = [
        {
          key: "over15",
          name: "Over 1.5 Goals",
          probability: predictions.over15,
          threshold: thresholds.over15,
          won: actual.over15,
        },
        {
          key: "over25",
          name: "Over 2.5 Goals",
          probability: predictions.over25,
          threshold: thresholds.over25,
          won: actual.over25,
        },
        {
          key: "btts",
          name: "Both Teams to Score",
          probability: predictions.btts,
          threshold: thresholds.btts,
          won: actual.btts,
        },
      ] as const;

      for (const market of marketTests) {
        if (market.probability >= market.threshold) {
          record(
            independentMarkets[market.key],
            true,
            market.won
          );
        }

        // Calibration includes every prediction, selected or not.
        const probability = market.probability;

        const range =
          probability >= 90 ? "90-100" :
          probability >= 80 ? "80-89" :
          probability >= 70 ? "70-79" :
          probability >= 60 ? "60-69" :
          probability >= 50 ? "50-59" :
          "0-49";

        const bucket = calibration[market.name][range];

        bucket.tested++;
        bucket.probabilityTotal += probability;

        if (market.won) bucket.correct++;
      }

      // Evaluate the most likely match outcome.
      const outcomes = [
        {
          name: "Home Win",
          probability: predictions.homeWin,
          won: homeGoals > awayGoals,
        },
        {
          name: "Draw",
          probability: predictions.draw,
          won: homeGoals === awayGoals,
        },
        {
          name: "Away Win",
          probability: predictions.awayWin,
          won: awayGoals > homeGoals,
        },
      ];

      const bestOutcome = [...outcomes].sort(
        (a, b) => b.probability - a.probability
      )[0];

      record(outcomeStats, true, bestOutcome.won);

      record(
        selectedOutcomes[bestOutcome.name],
        true,
        bestOutcome.won
      );
    }

    const formatMetric = (result: {
      tested: number;
      correct: number;
    }) => ({
      tested: result.tested,
      correct: result.correct,
      percentage: percentage(result),
      coverage: testedMatches
        ? Math.round((result.tested / testedMatches) * 100)
        : 0,
    });

    const formatCalibration = (market: string) =>
      ranges.map((range) => {
        const bucket = calibration[market][range];

        return {
          range,
          tested: bucket.tested,
          actualHitRate: bucket.tested
            ? Math.round(
                (bucket.correct / bucket.tested) * 100
              )
            : null,
          averagePredictedProbability: bucket.tested
            ? Math.round(
                bucket.probabilityTotal / bucket.tested
              )
            : null,
        };
      });

    // Build Over 1.5 diagnostic report.
    const over15Correct = over15Selections.filter(
      (item) => item.correct
    ).length;

    const over15Failed = over15Selections.filter(
      (item) => !item.correct
    );

    const over15ErrorAnalysis = {
      summary: {
        selected: over15Selections.length,
        correct: over15Correct,
        failed: over15Failed.length,
        accuracy: over15Selections.length
          ? Math.round(
              (over15Correct / over15Selections.length) * 100
            )
          : null,
      },

      byProbability: summarizeGroups(
        over15Selections,
        (item) => {
          if (item.probability >= 90) return "90-100%";
          if (item.probability >= 85) return "85-89%";
          if (item.probability >= 80) return "80-84%";
          if (item.probability >= 75) return "75-79%";
          return "70-74%";
        }
      ),

      byExpectedGoals: summarizeGroups(
        over15Selections,
        (item) => {
          if (item.expectedTotal >= 3.5) return "3.50+";
          if (item.expectedTotal >= 3) return "3.00-3.49";
          if (item.expectedTotal >= 2.5) return "2.50-2.99";
          return "Below 2.50";
        }
      ),

      byHistoricalSample: summarizeGroups(
        over15Selections,
        (item) => {
          const weakestHistory = Math.min(
            item.homeHistoryMatches,
            item.awayHistoryMatches
          );

          if (weakestHistory >= 8) return "8-10 matches";
          if (weakestHistory >= 5) return "5-7 matches";
          return "3-4 matches";
        }
      ),

      byVenueSample: summarizeGroups(
        over15Selections,
        (item) => {
          if (
            item.homeVenueMatches >= 3 &&
            item.awayVenueMatches >= 3
          ) {
            return "Both teams have 3+ venue matches";
          }

          return "One or both teams have fewer than 3 venue matches";
        }
      ),

      // All failed selections are included for inspection.
      failedPredictions: over15Failed,
    };

    return NextResponse.json({
      success: true,
      competition: "English Premier League",
      leagueId: LEAGUE_ID,
      season: SEASON,

      methodology:
        "Chronological backtest using only completed matches before each test match. Matches on the same calendar date are excluded from prediction history.",

      totalCompletedFixtures: fixtures.length,
      testedMatches,
      skippedMatches,

      thresholds,

      independentMarketAccuracy: {
        over15: formatMetric(independentMarkets.over15),
        over25: formatMetric(independentMarkets.over25),
        btts: formatMetric(independentMarkets.btts),
      },

      mostLikelyOutcome: {
        ...formatMetric(outcomeStats),
      },

      selectedOutcomeBreakdown: {
        homeWin: formatMetric(selectedOutcomes["Home Win"]),
        draw: formatMetric(selectedOutcomes.Draw),
        awayWin: formatMetric(selectedOutcomes["Away Win"]),
      },

      probabilityCalibration: {
        over15: formatCalibration("Over 1.5 Goals"),
        over25: formatCalibration("Over 2.5 Goals"),
        btts: formatCalibration("Both Teams to Score"),
      },

      // New Over 1.5 error analysis.
      over15ErrorAnalysis,

      note:
        "Each goal market is tested independently when its predicted probability meets its configured threshold. Hit rate is calculated only from selected matches. Coverage shows the percentage of eligible matches selected. Historical performance does not guarantee future results.",
    });

  } catch (error) {
    console.error("GoalSense backtest error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to run historical backtest.",
      },
      { status: 500 }
    );
  }
}
