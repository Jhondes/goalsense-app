"use client";

import { useEffect, useState } from "react";

type RecentResult = {
  date: string;
  home: string;
  away: string;
  score: string;
};

type VenueStats = {
  matches: number;
  goalsScored: number | null;
  goalsConceded: number | null;
};

type TeamAnalysis = {
  matches: number;
  over15: number | null;
  over25: number | null;
  btts: number | null;
  goalsScored: number | null;
  goalsConceded: number | null;
  wins: number;
  draws: number;
  losses: number;
  recentResults: RecentResult[];
  venueStats: {
    home: VenueStats;
    away: VenueStats;
  };
};

type PredictionMarket = {
  name: string;
  probability: number;
  support: string;
};

type MatchOutcome = {
  name: string;
  probability: number;
};

type Predictions = {
  available: boolean;
  message?: string;
  model?: string;
  expectedGoals?: {
    home: number;
    away: number;
    total: number;
  };
  venueData?: {
    homeTeamHomeMatches: number;
    awayTeamAwayMatches: number;
    usedOverallFallback: boolean;
  };
  markets?: PredictionMarket[];
  bestSupportedMarket?: PredictionMarket;
  matchOutcome?: {
    predictions: MatchOutcome[];
    likelyOutcome: MatchOutcome & { support: string };
  };
  predictedScore?: string;
  dataQuality?: string;
  caution?: string;
};

type AnalysisResponse = {
  success: boolean;
  message?: string;
  fixture?: {
    id: number;
    date: string;
    league: string;
    country: string;
    home: string;
    away: string;
  };
  analysis?: {
    home: TeamAnalysis;
    away: TeamAnalysis;
  };
  predictions?: Predictions;
  note?: string;
};

function localDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();

  return new Date(now.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 10);
}

function StatCard({
  label,
  value,
  matches,
}: {
  label: string;
  value: number | null;
  matches: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111b18] p-4">
      <p className="text-xs text-gray-400">{label}</p>

      <p className="mt-2 text-3xl font-bold text-emerald-400">
        {value === null ? "—" : `${value}%`}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {value === null
          ? "No data"
          : `${Math.round((value / 100) * matches)}/${matches} matches`}
      </p>
    </div>
  );
}

function SupportBadge({ support }: { support: string }) {
  const styles: Record<string, string> = {
    Strong: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    Moderate: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    Low: "border-gray-500/20 bg-gray-500/10 text-gray-400",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[support] || styles.Low
      }`}
    >
      {support}
    </span>
  );
}

function ProbabilityBar({
  label,
  probability,
}: {
  label: string;
  probability: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm text-gray-300">{label}</span>

        <span className="text-sm font-bold text-white">
          {probability}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-700"
          style={{
            width: `${Math.max(0, Math.min(100, probability))}%`,
          }}
        />
      </div>
    </div>
  );
}

function PredictionPanel({
  predictions,
  home,
  away,
}: {
  predictions?: Predictions;
  home: string;
  away: string;
}) {
  if (!predictions || !predictions.available) {
    return (
      <div className="rounded-2xl border border-amber-500/20 bg-[#0c1512] p-5">
        <h2 className="font-bold text-white">GoalSense Predictions</h2>

        <p className="mt-2 text-sm text-gray-400">
          {predictions?.message ||
            "Predictions are not available for this fixture because there is insufficient historical data."}
        </p>
      </div>
    );
  }

  const expected = predictions.expectedGoals;
  const markets = predictions.markets || [];
  const outcomes = predictions.matchOutcome?.predictions || [];
  const bestMarket = predictions.bestSupportedMarket;
  const venueData = predictions.venueData;

  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0c1512]">
      <div className="border-b border-white/10 bg-gradient-to-r from-emerald-500/10 to-transparent p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              GOALSENSE INTELLIGENCE
            </p>

            <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
              Match Predictions
            </h2>
          </div>

          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
            Historical model
          </span>
        </div>

        {bestMarket && (
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-[#07100d] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Best-supported market
              </p>

              <SupportBadge support={bestMarket.support} />
            </div>

            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
              <h3 className="text-xl font-black text-white sm:text-2xl">
                {bestMarket.name}
              </h3>

              <span className="text-3xl font-black text-emerald-400">
                {bestMarket.probability}%
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${Math.max(
                    0,
                    Math.min(100, bestMarket.probability)
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <div>
          <h3 className="mb-4 font-bold text-white">
            Goal market estimates
          </h3>

          <div className="grid gap-3 sm:grid-cols-3">
            {markets.map((market) => (
              <div
                key={market.name}
                className="rounded-xl border border-white/10 bg-[#111b18] p-4"
              >
                <p className="text-xs text-gray-400">{market.name}</p>

                <p className="mt-2 text-3xl font-black text-emerald-400">
                  {market.probability}%
                </p>

                <div className="mt-3">
                  <SupportBadge support={market.support} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#111b18] p-4">
            <h3 className="font-bold text-white">Expected goals</h3>

            {expected ? (
              <>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-500">{home}</p>

                    <p className="mt-1 text-2xl font-black text-emerald-400">
                      {expected.home}
                    </p>
                  </div>

                  <span className="text-gray-600">VS</span>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">{away}</p>

                    <p className="mt-1 text-2xl font-black text-emerald-400">
                      {expected.away}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Expected total goals
                    </span>

                    <span className="font-bold text-white">
                      {expected.total}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-gray-500">
                Expected goals unavailable.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111b18] p-4">
            <h3 className="font-bold text-white">Most likely score</h3>

            <div className="mt-4 flex min-h-[100px] items-center justify-center rounded-xl bg-[#07100d]">
              <span className="text-4xl font-black tracking-wider text-emerald-400">
                {predictions.predictedScore || "—"}
              </span>
            </div>

            <p className="mt-3 text-center text-xs text-gray-500">
              Most likely individual scoreline in this model
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">
            Match outcome estimates
          </h3>

          <div className="space-y-4 rounded-xl border border-white/10 bg-[#111b18] p-4">
            {outcomes.map((outcome) => (
              <ProbabilityBar
                key={outcome.name}
                label={outcome.name}
                probability={outcome.probability}
              />
            ))}
          </div>

          {predictions.matchOutcome?.likelyOutcome && (
            <p className="mt-3 text-sm text-gray-400">
              Most likely outcome:{" "}
              <span className="font-bold text-white">
                {predictions.matchOutcome.likelyOutcome.name}
              </span>
              {" · "}
              {predictions.matchOutcome.likelyOutcome.probability}%
            </p>
          )}
        </div>

        {venueData && (
          <div className="rounded-xl border border-white/10 bg-[#111b18] p-4">
            <h3 className="font-bold text-white">
              Data used for this prediction
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-[#07100d] p-3">
                <p className="text-xs text-gray-400">
                  {home} home matches
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-400">
                  {venueData.homeTeamHomeMatches}
                </p>
              </div>

              <div className="rounded-lg bg-[#07100d] p-3">
                <p className="text-xs text-gray-400">
                  {away} away matches
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-400">
                  {venueData.awayTeamAwayMatches}
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-gray-500">
              {venueData.usedOverallFallback
                ? "Overall historical statistics were used where venue-specific records were unavailable."
                : "Venue-specific historical statistics were available for both teams."}
            </p>
          </div>
        )}

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm font-semibold text-amber-300">
            Important prediction notice
          </p>

          <p className="mt-2 text-xs leading-6 text-gray-400">
            {predictions.caution ||
              "These estimates are based on historical match data. They are not guaranteed outcomes or live-form predictions."}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            {predictions.dataQuality}
          </p>
        </div>
      </div>
    </section>
  );
}

function VenuePerformance({
  label,
  data,
}: {
  label: string;
  data: VenueStats;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#07100d] p-3">
      <p className="text-xs font-semibold text-gray-400">{label}</p>

      {data.matches > 0 ? (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] text-gray-500">Goals scored</p>
            <p className="mt-1 text-lg font-bold text-emerald-400">
              {data.goalsScored}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-gray-500">Goals conceded</p>
            <p className="mt-1 text-lg font-bold text-white">
              {data.goalsConceded}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-xs text-gray-500">
          No venue-specific matches available.
        </p>
      )}

      <p className="mt-2 text-[11px] text-gray-500">
        {data.matches} matches
      </p>
    </div>
  );
}

function TeamResults({
  team,
  data,
  venue,
}: {
  team: string;
  data: TeamAnalysis;
  venue: "home" | "away";
}) {
  const [expanded, setExpanded] = useState(false);

  const venueStats =
    venue === "home" ? data.venueStats?.home : data.venueStats?.away;

  const venueLabel =
    venue === "home" ? "Home performance" : "Away performance";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1512]">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-bold text-white">{team}</h3>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            {data.matches} matches
          </span>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Overall historical performance
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <StatCard
            label="Over 1.5"
            value={data.over15}
            matches={data.matches}
          />

          <StatCard
            label="Over 2.5"
            value={data.over25}
            matches={data.matches}
          />

          <StatCard
            label="BTTS"
            value={data.btts}
            matches={data.matches}
          />
        </div>

        <div className="mt-5">
          <h4 className="mb-3 text-sm font-bold text-white">
            {venueLabel}
          </h4>

          {venueStats ? (
            <VenuePerformance
              label={venueLabel}
              data={venueStats}
            />
          ) : (
            <p className="text-xs text-gray-500">
              Venue statistics unavailable.
            </p>
          )}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-[#07100d] p-3 text-center">
          <div>
            <p className="text-lg font-bold text-emerald-400">
              {data.wins}
            </p>
            <p className="text-[11px] text-gray-500">Wins</p>
          </div>

          <div>
            <p className="text-lg font-bold text-white">{data.draws}</p>
            <p className="text-[11px] text-gray-500">Draws</p>
          </div>

          <div>
            <p className="text-lg font-bold text-red-400">
              {data.losses}
            </p>
            <p className="text-[11px] text-gray-500">Losses</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm text-emerald-400 transition hover:bg-white/5"
      >
        <span>
          {expanded ? "Hide match history" : "View last 10 matches"}
        </span>

        <span>{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <div className="border-t border-white/10">
          {data.recentResults.map((match, index) => (
            <div
              key={`${match.date}-${index}`}
              className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4 last:border-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-white">
                  {match.home}
                </p>

                <p className="truncate text-sm text-gray-400">
                  {match.away}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {new Date(match.date).toLocaleDateString()}
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-white/5 px-3 py-2 font-bold text-white">
                {match.score}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type TrackedPrediction = {
  fixtureId: number;
  date: string;
  home: string;
  away: string;
  over15: number;
  over25: number;
  btts: number;
  expectedTotal: number;
  finalHome: number | null;
  finalAway: number | null;
  savedAt: string;
};

const TRACKER_KEY = "goalsense-match-analyser-tracker-v1";

function PerformanceTracker({
  fixture,
  predictions,
}: {
  fixture: NonNullable<AnalysisResponse["fixture"]>;
  predictions?: Predictions;
}) {
  const [records, setRecords] = useState<TrackedPrediction[]>([]);
  const [scores, setScores] = useState<
    Record<number, { home: string; away: string }>
  >({});
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TRACKER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setRecords(parsed);
      }
    } catch {
      setRecords([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(TRACKER_KEY, JSON.stringify(records));
    } catch {
      setMessage("Unable to save tracker data in this browser.");
    }
  }, [records, ready]);

  const existing = records.some(
    (record) => record.fixtureId === fixture.id
  );

  const kickoffPassed =
    new Date(fixture.date).getTime() <= Date.now();

  const markets = predictions?.markets || [];

  const over15 = markets.find(
    (market) => market.name === "Over 1.5 Goals"
  );

  const over25 = markets.find(
    (market) => market.name === "Over 2.5 Goals"
  );

  const btts = markets.find(
    (market) => market.name === "Both Teams to Score"
  );

  function savePrediction() {
    if (!predictions?.available || !over15 || !over25 || !btts) {
      setMessage(
        "Prediction data is incomplete. This fixture cannot be saved."
      );
      return;
    }

    if (kickoffPassed) {
      setMessage(
        "This match has already started. Only upcoming matches can be tracked."
      );
      return;
    }

    if (existing) {
      setMessage("This fixture is already in your tracker.");
      return;
    }

    const record: TrackedPrediction = {
      fixtureId: fixture.id,
      date: fixture.date,
      home: fixture.home,
      away: fixture.away,
      over15: over15.probability,
      over25: over25.probability,
      btts: btts.probability,
      expectedTotal: predictions.expectedGoals?.total ?? 0,
      finalHome: null,
      finalAway: null,
      savedAt: new Date().toISOString(),
    };

    setRecords((current) => [record, ...current]);
    setMessage("Prediction saved successfully.");
  }

  function updateScore(
    fixtureId: number,
    side: "home" | "away",
    value: string
  ) {
    setScores((current) => ({
      ...current,
      [fixtureId]: {
        home: current[fixtureId]?.home ?? "",
        away: current[fixtureId]?.away ?? "",
        [side]: value,
      },
    }));
  }

  function settleMatch(record: TrackedPrediction) {
    const score = scores[record.fixtureId];

    if (!score || score.home === "" || score.away === "") {
      setMessage("Enter both final scores first.");
      return;
    }

    const homeScore = Number(score.home);
    const awayScore = Number(score.away);

    if (
      !Number.isInteger(homeScore) ||
      !Number.isInteger(awayScore) ||
      homeScore < 0 ||
      awayScore < 0
    ) {
      setMessage("Please enter valid final scores.");
      return;
    }

    setRecords((current) =>
      current.map((item) =>
        item.fixtureId === record.fixtureId
          ? {
              ...item,
              finalHome: homeScore,
              finalAway: awayScore,
            }
          : item
      )
    );

    setMessage("Final score saved and performance updated.");
  }

  function marketStats(
    probabilityKey: "over15" | "over25" | "btts",
    threshold: number,
    isWon: (home: number, away: number) => boolean
  ) {
    const settled = records.filter(
      (record) =>
        record.finalHome !== null &&
        record.finalAway !== null &&
        record[probabilityKey] >= threshold
    );

    const won = settled.filter((record) =>
      isWon(record.finalHome!, record.finalAway!)
    ).length;

    return {
      selected: settled.length,
      won,
      lost: settled.length - won,
      accuracy: settled.length
        ? Math.round((won / settled.length) * 100)
        : null,
    };
  }

  const stats = [
    {
      name: "Over 1.5",
      ...marketStats(
        "over15",
        70,
        (home, away) => home + away >= 2
      ),
    },
    {
      name: "Over 2.5",
      ...marketStats(
        "over25",
        60,
        (home, away) => home + away >= 3
      ),
    },
    {
      name: "BTTS",
      ...marketStats(
        "btts",
        60,
        (home, away) => home > 0 && away > 0
      ),
    },
  ];

  const settledCount = records.filter(
    (record) =>
      record.finalHome !== null && record.finalAway !== null
  ).length;

  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-[#0c1512] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            GOALSENSE TRACKER
          </p>

          <h2 className="mt-2 text-xl font-black text-white">
            Prediction Performance
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Save predictions before kickoff and record the final scores.
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300">
          {records.length} tracked · {settledCount} completed
        </span>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-[#07100d] p-4">
        <p className="text-sm font-bold text-white">
          {fixture.home} vs {fixture.away}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {new Date(fixture.date).toLocaleString()}
        </p>

        {existing ? (
          <p className="mt-4 text-sm text-emerald-400">
            This fixture is already saved in your tracker.
          </p>
        ) : (
          <button
            type="button"
            onClick={savePrediction}
            disabled={!ready || !predictions?.available || kickoffPassed}
            className="mt-4 w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {kickoffPassed
              ? "MATCH ALREADY STARTED"
              : "SAVE PREDICTION"}
          </button>
        )}

        {message && (
          <p className="mt-3 text-xs text-emerald-400">{message}</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-bold text-white">
          Verified performance
        </h3>

        <p className="mb-4 text-xs leading-5 text-gray-500">
          Only settled predictions meeting the original thresholds are counted:
          Over 1.5 at 70%, Over 2.5 at 60%, and BTTS at 60%.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-white/10 bg-[#111b18] p-4"
            >
              <p className="text-sm text-gray-400">{item.name}</p>

              <p className="mt-2 text-2xl font-black text-emerald-400">
                {item.accuracy === null
                  ? "—"
                  : `${item.accuracy}%`}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {item.won} won · {item.lost} lost
              </p>

              <p className="mt-1 text-xs text-gray-600">
                {item.selected} qualifying settled picks
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-bold text-white">
          Saved predictions
        </h3>

        {records.length === 0 ? (
          <p className="rounded-xl bg-[#07100d] p-4 text-sm text-gray-500">
            No predictions saved yet. Analyse an upcoming fixture and save it before kickoff.
          </p>
        ) : (
          <div className="space-y-3">
            {records.map((record) => {
              const settled =
                record.finalHome !== null &&
                record.finalAway !== null;

              return (
                <div
                  key={record.fixtureId}
                  className="rounded-xl border border-white/10 bg-[#07100d] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {record.home} vs {record.away}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(record.date).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        settled
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-300"
                      }`}
                    >
                      {settled ? "Settled" : "Pending"}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Over 1.5</p>
                      <p className="mt-1 font-bold text-white">
                        {record.over15}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Over 2.5</p>
                      <p className="mt-1 font-bold text-white">
                        {record.over25}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">BTTS</p>
                      <p className="mt-1 font-bold text-white">
                        {record.btts}%
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    Expected total goals: {record.expectedTotal}
                  </p>

                                    {settled ? (
                    <p className="mt-3 text-sm font-bold text-emerald-400">
                      Final score: {record.finalHome} - {record.finalAway}
                    </p>
                  ) : (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold text-gray-400">
                        ENTER FINAL SCORE
                      </p>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          placeholder="Home"
                          value={scores[record.fixtureId]?.home ?? ""}
                          onChange={(event) =>
                            updateScore(
                              record.fixtureId,
                              "home",
                              event.target.value
                            )
                          }
                          className="w-full rounded-lg border border-white/10 bg-[#111b18] px-3 py-3 text-sm text-white outline-none focus:border-emerald-500"
                        />

                        <span className="text-gray-500">-</span>

                        <input
                          type="number"
                          min="0"
                          placeholder="Away"
                          value={scores[record.fixtureId]?.away ?? ""}
                          onChange={(event) =>
                            updateScore(
                              record.fixtureId,
                              "away",
                              event.target.value
                            )
                          }
                          className="w-full rounded-lg border border-white/10 bg-[#111b18] px-3 py-3 text-sm text-white outline-none focus:border-emerald-500"
                        />

                        <button
                          type="button"
                          onClick={() => settleMatch(record)}
                          className="shrink-0 rounded-lg bg-emerald-500 px-4 py-3 text-xs font-bold text-black hover:bg-emerald-400"
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="mt-5 text-xs leading-5 text-gray-600">
        Records are stored in this browser on this device. Clearing browser data may erase them.
        Accuracy is calculated only from saved predictions and manually entered final scores.
      </p>
    </section>
  );
}

export default function MatchAnalyserPage() {
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [date, setDate] = useState(localDate());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  async function analyseMatch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!home.trim() || !away.trim() || !date) {
      setError("Please enter both teams and select a match date.");
      return;
    }

    if (home.trim().toLowerCase() === away.trim().toLowerCase()) {
      setError("Please enter two different teams.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const params = new URLSearchParams({
        home: home.trim(),
        away: away.trim(),
        date,
      });

      const response = await fetch(
        `/api/football/analyze?${params.toString()}`,
        { cache: "no-store" }
      );

      const data: AnalysisResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to analyse this match."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050907] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold tracking-wider text-emerald-400">
            GOALSENSE INTELLIGENCE
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            MATCH <span className="text-emerald-400">ANALYSER</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            Analyse football fixtures using historical match records.
            Explore statistical trends and possible match outcomes.
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-[#0c1512] p-5 shadow-2xl sm:p-7">
          <div className="mb-6">
            <h2 className="text-lg font-bold">Select your fixture</h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the team names as they appear in your fixture.
            </p>
          </div>

          <form onSubmit={analyseMatch} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-400">
                  HOME TEAM
                </label>

                <input
                  value={home}
                  onChange={(e) => setHome(e.target.value)}
                  placeholder="e.g. Arsenal"
                  className="w-full rounded-xl border border-white/10 bg-[#07100d] px-4 py-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-400">
                  AWAY TEAM
                </label>

                <input
                  value={away}
                  onChange={(e) => setAway(e.target.value)}
                  placeholder="e.g. Chelsea"
                  className="w-full rounded-xl border border-white/10 bg-[#07100d] px-4 py-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">
                MATCH DATE
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#07100d] px-4 py-4 text-sm text-white outline-none focus:border-emerald-500"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-4 font-bold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "ANALYSING MATCH..." : "ANALYSE MATCH"}
            </button>
          </form>
        </section>

        {result?.fixture && result.analysis && (
          <section className="mt-8 space-y-6">
            <div className="rounded-2xl border border-emerald-500/20 bg-[#0c1512] p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Fixture found
              </p>

              <h2 className="mt-3 text-xl font-black sm:text-2xl">
                {result.fixture.home}
                <span className="mx-3 text-emerald-500">VS</span>
                {result.fixture.away}
              </h2>

              <p className="mt-3 text-xs text-gray-400">
                {result.fixture.league} ·{" "}
                {new Date(result.fixture.date).toLocaleDateString()}
              </p>
            </div>

            <PredictionPanel
              predictions={result.predictions}
              home={result.fixture.home}
              away={result.fixture.away}
            />

            <PerformanceTracker
              fixture={result.fixture}
              predictions={result.predictions}
            />

            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold">
                  Historical statistics
                </h2>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  Historical data · Up to 10 matches per team
                </span>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <TeamResults
                  team={result.fixture.home}
                  data={result.analysis.home}
                  venue="home"
                />

                <TeamResults
                  team={result.fixture.away}
                  data={result.analysis.away}
                  venue="away"
                />
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-semibold text-amber-300">
                Historical data notice
              </p>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                {result.note ||
                  "These statistics use each team's most recent completed matches available in the historical dataset. They are not necessarily current form and do not guarantee future outcomes."}
              </p>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                Venue records are shown separately where available.
                Historical samples can come from different dates and
                seasons, so they should be treated as statistical
                reference rather than live team form.
              </p>
            </div>

            <p className="text-center text-xs text-gray-600">
              GoalSense Match Analyser · Historical match data
            </p>
          </section>
        )}
      </div>
    </main>
  );
}