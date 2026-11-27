"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type PerformanceRecord = {
  slip_date: string;
  status: "pending" | "won" | "lost";
  total_odds: number | null;
  updated_at?: string;
};

type MatchPerformanceRecord = {
  id: string;
  home: string;
  away: string;
  league: string | null;
  market: string;
  odds: number | null;
  match_date: string;
  home_score: number;
  away_score: number;
  status: "won" | "lost";
};

type Period = "7" | "28" | "all";

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatOdds(odds: number | null) {
  return odds != null && Number.isFinite(Number(odds))
    ? Number(odds).toFixed(2)
    : "—";
}

export default function PerformanceInsightsPage() {
  // PREMIUM SLIP PERFORMANCE STATE
  const [records, setRecords] = useState<PerformanceRecord[]>([]);
  const [period, setPeriod] = useState<Period>("28");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // MATCH PERFORMANCE STATE
  const [matchRecords, setMatchRecords] = useState<MatchPerformanceRecord[]>([]);
  const [matchPeriod, setMatchPeriod] = useState<Period>("28");
  const [matchLoading, setMatchLoading] = useState(true);
  const [matchError, setMatchError] = useState("");
  const [showAllMatches, setShowAllMatches] = useState(false);

  // LOAD PREMIUM SLIP PERFORMANCE
  useEffect(() => {
    async function loadPerformance() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/admin/premium-performance",
          { cache: "no-store" }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Unable to load performance."
          );
        }

        setRecords(
          (result.data || []).sort(
            (a: PerformanceRecord, b: PerformanceRecord) =>
              b.slip_date.localeCompare(a.slip_date)
          )
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPerformance();
  }, []);

  // LOAD MATCH PERFORMANCE INDEPENDENTLY
  useEffect(() => {
    async function loadMatchPerformance() {
      try {
        setMatchLoading(true);
        setMatchError("");

        const response = await fetch(
          "/api/match-performance",
          { cache: "no-store" }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Unable to load match performance."
          );
        }

        setMatchRecords(
          (result.data || []).sort(
            (a: MatchPerformanceRecord, b: MatchPerformanceRecord) =>
              b.match_date.localeCompare(a.match_date)
          )
        );
      } catch (err) {
        setMatchError(
          err instanceof Error
            ? err.message
            : "Unable to load match performance."
        );
      } finally {
        setMatchLoading(false);
      }
    }

    loadMatchPerformance();
  }, []);

  // PREMIUM SLIP DATE FILTER
  const filteredRecords = useMemo(() => {
    if (period === "all") return records;

    const today = new Date();
    const cutoff = new Date(today);
    cutoff.setDate(today.getDate() - (Number(period) - 1));

    const formatKey = (date: Date) =>
      `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}`;

    const startDate = formatKey(cutoff);
    const endDate = formatKey(today);

    return records.filter(
      (item) =>
        item.slip_date >= startDate &&
        item.slip_date <= endDate
    );
  }, [records, period]);

  // PREMIUM SLIP STATISTICS
  const stats = useMemo(() => {
    const won = filteredRecords.filter(
      (item) => item.status === "won"
    ).length;

    const lost = filteredRecords.filter(
      (item) => item.status === "lost"
    ).length;

    const pending = filteredRecords.filter(
      (item) => item.status === "pending"
    ).length;

    const decided = won + lost;

    return {
      total: filteredRecords.length,
      won,
      lost,
      pending,
      decided,
      winRate:
        decided > 0
          ? (won / decided) * 100
          : 0,
    };
  }, [filteredRecords]);

  // MATCH PERFORMANCE DATE FILTER
  const filteredMatchRecords = useMemo(() => {
    if (matchPeriod === "all") return matchRecords;

    const today = new Date();
    const cutoff = new Date(today);
    cutoff.setDate(today.getDate() - (Number(matchPeriod) - 1));

    const formatKey = (date: Date) =>
      `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}`;

    const startDate = formatKey(cutoff);
    const endDate = formatKey(today);

    return matchRecords.filter(
      (item) =>
        item.match_date >= startDate &&
        item.match_date <= endDate
    );
  }, [matchRecords, matchPeriod]);

  // SHOW LATEST 10 MATCHES BY DEFAULT
  const visibleMatchRecords = showAllMatches
    ? filteredMatchRecords
    : filteredMatchRecords.slice(0, 10);

  // MATCH PERFORMANCE STATISTICS
  const matchStats = useMemo(() => {
    const won = filteredMatchRecords.filter(
      (item) => item.status === "won"
    ).length;

    const lost = filteredMatchRecords.filter(
      (item) => item.status === "lost"
    ).length;

    const total = won + lost;

    return {
      total,
      won,
      lost,
      winRate:
        total > 0
          ? (won / total) * 100
          : 0,
    };
  }, [filteredMatchRecords]);

  const periods: { label: string; value: Period }[] = [
    { label: "7 Days", value: "7" },
    { label: "28 Days", value: "28" },
    { label: "All Time", value: "all" },
  ];

  const matchPeriods: { label: string; value: Period }[] = [
    { label: "7 Days", value: "7" },
    { label: "28 Days", value: "28" },
    { label: "All Time", value: "all" },
  ];

  return (
    <main className="min-h-screen bg-[#050806] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">

        <Link
          href="/insights"
          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Insights
        </Link>

        {/* HEADER */}
        <section className="relative mt-7 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b120e] p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/[0.09] blur-3xl" />

          <div className="relative">
            <p className="text-[10px] font-bold tracking-[0.24em] text-emerald-400">
              GOALSENSE · PERFORMANCE CENTRE
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Performance Centre
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
              Track the performance of our published Premium
              Slips and completed match-market predictions
              with transparent historical results.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live database records
            </div>
          </div>
        </section>

        {/* ================================== */}
        {/* PREMIUM SLIP PERFORMANCE           */}
        {/* ================================== */}

        {/* PREMIUM SLIP PERIOD FILTER */}
        <section className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
              PREMIUM SLIP RESULTS
            </p>
            <h2 className="mt-1 text-xl font-extrabold">
              Performance overview
            </h2>
          </div>

          <div className="flex gap-2">
            {periods.map((item) => (
              <button
                key={item.value}
                onClick={() => setPeriod(item.value)}
                className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                  period === item.value
                    ? "bg-emerald-500 text-black"
                    : "border border-white/10 bg-[#101712] text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* PREMIUM SLIP LOADING */}
        {loading && (
          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0b110e] p-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
            <p className="mt-4 text-sm text-gray-400">
              Loading performance records...
            </p>
          </div>
        )}

        {/* PREMIUM SLIP ERROR */}
        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-black"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* PREMIUM SLIP STATISTICS */}
            <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

              <StatCard
                label="Total Slips"
                value={stats.total}
                color="white"
              />

              <StatCard
                label="Won"
                value={stats.won}
                color="green"
              />

              <StatCard
                label="Lost"
                value={stats.lost}
                color="red"
              />

              <StatCard
                label="Pending"
                value={stats.pending}
                color="yellow"
              />

            </section>

            {/* PREMIUM SLIP WIN RATE */}
            <section className="mt-5 rounded-2xl border border-emerald-500/20 bg-[#0b140f] p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400">
                    OVERALL WIN RATE
                  </p>

                  <p className="mt-2 text-5xl font-black tracking-tight text-emerald-400">
                    {stats.winRate.toFixed(1)}%
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    {stats.won} wins from {stats.decided} settled slips
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    Settled slips
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.decided}
                  </p>
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{
                    width: `${stats.winRate}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-[10px] text-gray-500">
                Pending slips are excluded from the win-rate calculation.
              </p>
            </section>

            {/* PREMIUM SLIP HISTORY */}
            <section className="mt-10">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
                    TRANSPARENT RECORDS
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">
                    Premium Slip History
                  </h2>
                </div>

                <span className="text-xs text-gray-500">
                  {filteredRecords.length} records
                </span>
              </div>

              {filteredRecords.length === 0 ? (
                <div className="rounded-2xl border border-white/[0.08] bg-[#0b110e] p-10 text-center">
                  <p className="font-semibold">
                    No performance records found.
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Records will appear here when Premium Slips
                    are published and tracked.
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b110e]">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-left text-sm">
                      <thead className="border-b border-white/[0.08] bg-white/[0.025] text-xs text-gray-500">
                        <tr>
                          <th className="px-5 py-4">Date</th>
                          <th className="px-5 py-4">Type</th>
                          <th className="px-5 py-4">Total Odds</th>
                          <th className="px-5 py-4">Result</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredRecords.map((item) => (
                          <tr
                            key={item.slip_date}
                            className="border-b border-white/[0.05] last:border-0"
                          >
                            <td className="px-5 py-4 font-semibold">
                              {formatDate(item.slip_date)}
                            </td>

                            <td className="px-5 py-4 text-gray-400">
                              Premium Slip
                            </td>

                            <td className="px-5 py-4 font-bold text-emerald-400">
                              {formatOdds(item.total_odds)}
                            </td>

                            <td className="px-5 py-4">
                              <StatusBadge status={item.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* PREMIUM SLIP TRANSPARENCY NOTES */}
            <section className="mt-10 rounded-2xl border border-white/[0.08] bg-[#0b110e] p-6">
              <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
                TRANSPARENCY
              </p>

              <h2 className="mt-2 text-lg font-extrabold">
                How we calculate performance
              </h2>

              <ul className="mt-4 space-y-3 text-xs leading-6 text-gray-400">
                <li>
                  • Every published Premium Slip is tracked independently.
                </li>
                <li>
                  • Won and lost results are recorded through the admin dashboard.
                </li>
                <li>
                  • Pending slips are not counted as settled results.
                </li>
                <li>
                  • Win rate is calculated using won slips divided by all settled slips.
                </li>
                <li>
                  • Original recorded odds are displayed for historical transparency.
                </li>
                <li>
                  • Historical performance does not guarantee future results.
                </li>
              </ul>

              <p className="mt-5 border-t border-white/[0.07] pt-4 text-[10px] text-gray-600">
                Source: GoalSense Premium Slip Performance Database.
              </p>
            </section>
          </>
        )}

        {/* ================================== */}
        {/* MATCH PERFORMANCE                  */}
        {/* ================================== */}

        <section className="mt-16 border-t border-white/[0.08] pt-10">

          {/* MATCH PERFORMANCE HEADER */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
                GOALSENSE MATCH TRACKER
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Match Performance
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-6 text-gray-400">
                Track completed match-market predictions against
                their actual final scores.
              </p>
            </div>

            {/* INDEPENDENT MATCH FILTER */}
            <div className="flex gap-2">
              {matchPeriods.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setMatchPeriod(item.value);
                    setShowAllMatches(false);
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                    matchPeriod === item.value
                      ? "bg-emerald-500 text-black"
                      : "border border-white/10 bg-[#101712] text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* MATCH LOADING */}
          {matchLoading && (
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#0b110e] p-8 text-center">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />

              <p className="mt-3 text-xs text-gray-400">
                Loading match results...
              </p>
            </div>
          )}

          {/* MATCH ERROR */}
          {!matchLoading && matchError && (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
              <p className="text-sm text-red-400">
                {matchError}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-3 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-black"
              >
                Try Again
              </button>
            </div>
          )}

          {/* MATCH RESULTS */}
          {!matchLoading && !matchError && (
            <>
              {/* MATCH STATISTICS */}
              <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

                <StatCard
                  label="Total Matches"
                  value={matchStats.total}
                  color="white"
                />

                <StatCard
                  label="Won"
                  value={matchStats.won}
                  color="green"
                />

                <StatCard
                  label="Lost"
                  value={matchStats.lost}
                  color="red"
                />

                <StatCard
                  label="Win Rate"
                  value={`${matchStats.winRate.toFixed(1)}%`}
                  color="green"
                />

              </section>

              {/* MATCH WIN RATE */}
              <section className="mt-5 rounded-2xl border border-emerald-500/20 bg-[#0b140f] p-6 sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">
                      MATCH WIN RATE
                    </p>

                    <p className="mt-2 text-5xl font-black tracking-tight text-emerald-400">
                      {matchStats.winRate.toFixed(1)}%
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      {matchStats.won} wins from {matchStats.total} completed tracked predictions
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      Completed predictions
                    </p>

                    <p className="text-2xl font-bold">
                      {matchStats.total}
                    </p>
                  </div>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all"
                    style={{
                      width: `${matchStats.winRate}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-[10px] text-gray-500">
                  Win rate is calculated from completed tracked match predictions.
                </p>
              </section>

              {/* MATCH HISTORY */}
              <section className="mt-10">
                <div className="mb-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
                      COMPLETED FIXTURES
                    </p>

                    <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">
                      Match Results History
                    </h2>
                  </div>

                  <span className="text-xs text-gray-500">
                    {filteredMatchRecords.length} matches
                  </span>
                </div>

                {filteredMatchRecords.length === 0 ? (
                  <div className="rounded-2xl border border-white/[0.08] bg-[#0b110e] p-10 text-center">
                    <p className="font-semibold">
                      No completed matches found.
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Match results will appear here when final scores
                      are saved in the Admin dashboard.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b110e]">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[650px] text-left text-sm">
                        <thead className="border-b border-white/[0.08] bg-white/[0.025] text-xs text-gray-500">
                          <tr>
                            <th className="px-5 py-4">Date</th>
                            <th className="px-5 py-4">Match</th>
                            <th className="px-5 py-4">Market</th>
                            <th className="px-5 py-4">Score</th>
                            <th className="px-5 py-4">Odds</th>
                            <th className="px-5 py-4">Result</th>
                          </tr>
                        </thead>

                        <tbody>
                          {visibleMatchRecords.map((item) => (
                            <tr
                              key={item.id}
                              className="border-b border-white/[0.05] last:border-0"
                            >
                              <td className="whitespace-nowrap px-5 py-4 text-gray-400">
                                {formatDate(item.match_date)}
                              </td>

                              <td className="px-5 py-4">
                                <p className="font-bold">
                                  {item.home} vs {item.away}
                                </p>

                                <p className="mt-1 text-[10px] text-gray-500">
                                  {item.league || "Football"}
                                </p>
                              </td>

                              <td className="px-5 py-4 text-gray-400">
                                {item.market}
                              </td>

                              <td className="whitespace-nowrap px-5 py-4 font-black">
                                {item.home_score} - {item.away_score}
                              </td>

                              <td className="px-5 py-4 font-bold text-emerald-400">
                                {formatOdds(item.odds)}
                              </td>

                              <td className="px-5 py-4">
                                <StatusBadge status={item.status} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {filteredMatchRecords.length > 10 && (
                  <div className="mt-5 flex justify-center">
                    <button
                      onClick={() => setShowAllMatches((current) => !current)}
                      className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-emerald-400"
                    >
                      {showAllMatches ? "Show Less" : "View All Matches"}
                    </button>
                  </div>
                )}
              </section>

              {/* MATCH PERFORMANCE TRANSPARENCY */}
              <section className="mt-10 rounded-2xl border border-white/[0.08] bg-[#0b110e] p-6">
                <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
                  MATCH PERFORMANCE METHODOLOGY
                </p>

                <h2 className="mt-2 text-lg font-extrabold">
                  How match results are calculated
                </h2>

                <ul className="mt-4 space-y-3 text-xs leading-6 text-gray-400">
                  <li>
                    • Over 1.5 wins when a match has at least 2 total goals.
                  </li>

                  <li>
                    • Over 2.5 wins when a match has at least 3 total goals.
                  </li>

                  <li>
                    • BTTS wins when both teams score at least once.
                  </li>

                  <li>
                    • Match win rate is calculated using won predictions divided by all completed tracked predictions.
                  </li>

                  <li>
                    • Results are graded using final scores saved in the GoalSense database.
                  </li>

                  <li>
                    • These figures represent tracked match-market predictions, not individual user-generated slip success rates.
                  </li>
                </ul>

                <p className="mt-5 border-t border-white/[0.07] pt-4 text-[10px] text-gray-600">
                  Source: GoalSense Matches Database.
                </p>
              </section>
            </>
          )}
        </section>

      </div>
    </main>
  );
}

// STATISTICS CARD
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color: "white" | "green" | "red" | "yellow";
}) {
  const colors = {
    white: "text-white",
    green: "text-emerald-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0b110e] p-5">
      <p className="text-xs text-gray-500">{label}</p>

      <p className={`mt-3 text-3xl font-black tabular-nums ${colors[color]}`}>
        {typeof value === "number"
          ? value.toLocaleString()
          : value}
      </p>
    </div>
  );
}

// RESULT BADGE
function StatusBadge({
  status,
}: {
  status: "pending" | "won" | "lost";
}) {
  const styles = {
    won: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    lost: "bg-red-500/10 text-red-400 border-red-500/20",
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
}
