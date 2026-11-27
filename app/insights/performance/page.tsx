
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type PerformanceRecord = {
  slip_date: string;
  status: "pending" | "won" | "lost";
  total_odds: number | null;
  updated_at?: string;
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
  const [records, setRecords] = useState<PerformanceRecord[]>([]);
  const [period, setPeriod] = useState<Period>("28");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const periods: { label: string; value: Period }[] = [
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
              Slips with transparent historical results.
              Every result is recorded and updated through
              the GoalSense admin dashboard.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live database records
            </div>
          </div>
        </section>

        {/* PERIOD FILTER */}
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

        {/* LOADING */}
        {loading && (
          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0b110e] p-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
            <p className="mt-4 text-sm text-gray-400">
              Loading performance records...
            </p>
          </div>
        )}

        {/* ERROR */}
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
            {/* STATISTICS */}
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

            {/* WIN RATE */}
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

            {/* HISTORY */}
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

            {/* TRANSPARENCY NOTES */}
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
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
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
        {value.toLocaleString()}
      </p>
    </div>
  );
}

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
