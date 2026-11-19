import Link from "next/link";
import data from "@/data/goalsense-performance-data.json";

const marketCards = [
  { label: "Over 1.5 goals", key: "OVER 1.5", description: "Matches with at least 2 total goals." },
  { label: "Over 2.5 goals", key: "OVER 2.5", description: "Matches with at least 3 total goals." },
  { label: "Both teams scored", key: "BTTS", description: "Matches where both teams scored." },
] as const;

const decisionRows = [
  { label: "Strong Pass", key: "DECISION_STRONG_PASS" },
  { label: "Watch", key: "DECISION_WATCH" },
  { label: "Pass", key: "DECISION_PASS" },
] as const;

function pct(value: number | null | undefined) {
  return typeof value === "number" ? `${value.toFixed(2)}%` : "—";
}

export default function PerformanceInsightsPage() {
  const metrics = data.metrics;
  const selected = metrics.SELECTED_MARKET;

  return (
    <main className="min-h-screen bg-[#050806] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        <Link href="/insights" className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300">
          <span aria-hidden="true">←</span> Back to Insights
        </Link>

        <section className="relative mt-7 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b120e] p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/[0.09] blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-[10px] font-bold tracking-[0.24em] text-emerald-400">GOALSENSE · DATA TRANSPARENCY</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Performance Insights</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              A historical view of completed football records in the GoalSense workbook. Every figure below is calculated from recorded final scores, not estimated outcomes.
            </p>
          </div>
        </section>

        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b110e] p-5 sm:col-span-1">
            <p className="text-xs font-medium text-gray-500">Verified completed records</p>
            <p className="mt-2 text-4xl font-black tabular-nums">{data.totalCompletedMatches.toLocaleString()}</p>
            <p className="mt-2 text-[11px] text-gray-500">Rows marked COMPLETE with validated home and away goals.</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b110e] p-5 sm:col-span-2">
            <p className="text-xs font-medium text-gray-500">Selected GoalSense market · historical result</p>
            <div className="mt-2 flex flex-wrap items-end gap-x-5 gap-y-2">
              <p className="text-4xl font-black tabular-nums text-emerald-400">{pct(selected.accuracy)}</p>
              <p className="pb-1 text-xs text-gray-400">{selected.wins.toLocaleString()} successful results from {selected.total.toLocaleString()} records with a selected market</p>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-gray-500">NO BET records are excluded from this selected-market calculation.</p>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">MARKET HISTORY</p>
              <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">Results across all completed matches</h2>
            </div>
            <span className="hidden text-[10px] text-gray-600 sm:block">{data.totalCompletedMatches.toLocaleString()} matches per market</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {marketCards.map((item) => {
              const metric = metrics[item.key];
              return (
                <article key={item.key} className="rounded-2xl border border-white/[0.08] bg-[#0b110e] p-5">
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="mt-3 text-3xl font-black tabular-nums">{pct(metric.accuracy)}</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: `${metric.accuracy ?? 0}%` }} />
                  </div>
                  <div className="mt-3 flex justify-between text-[11px] text-gray-500">
                    <span>{metric.wins.toLocaleString()} successful</span>
                    <span>{metric.losses.toLocaleString()} unsuccessful</span>
                  </div>
                  <p className="mt-3 text-[11px] leading-5 text-gray-500">{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b110e] p-5 sm:p-6">
            <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">DECISION HISTORY</p>
            <h2 className="mt-1 text-xl font-extrabold">Historical results by decision</h2>
            <div className="mt-5 space-y-5">
              {decisionRows.map((item) => {
                const metric = metrics[item.key];
                return (
                  <div key={item.key}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold">{item.label}</span>
                      <span className="font-bold tabular-nums text-emerald-400">{pct(metric.accuracy)}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: `${metric.accuracy ?? 0}%` }} />
                    </div>
                    <p className="mt-2 text-[11px] text-gray-500">{metric.wins} successful · {metric.losses} unsuccessful · {metric.total} records</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0b110e] p-5 sm:p-6">
            <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">GOALSENSE SCORE</p>
            <h2 className="mt-1 text-xl font-extrabold">Results by score range</h2>
            <div className="mt-5 space-y-4">
              {data.scoreRanges.map((range) => (
                <div key={range.range}>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-gray-300">{range.range}</span>
                    <span className="font-bold tabular-nums">{pct(range.accuracy)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: `${range.accuracy ?? 0}%` }} />
                  </div>
                  <p className="mt-1.5 text-[10px] text-gray-600">{range.wins} successful · {range.losses} unsuccessful · {range.total} records</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/[0.08] bg-[#0b110e] p-5 sm:p-6">
          <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">DATA NOTES</p>
          <h2 className="mt-1 text-xl font-extrabold">How these figures are counted</h2>
          <ul className="mt-4 grid gap-3 text-xs leading-6 text-gray-400 sm:grid-cols-2">
            <li>• A completed record must have a COMPLETE status and numeric validated home and away goals.</li>
            <li>• Over 1.5 means at least 2 total goals; Over 2.5 means at least 3 total goals.</li>
            <li>• Both teams scored means each team recorded at least one goal.</li>
            <li>• Selected-market results include Over 1.5, Over 2.5 and BTTS. NO BET records are not included.</li>
            <li>• Decision and score-range figures are based on the workbook's recorded Best Market, Overall Score and Final Decision fields.</li>
            <li>• This is historical data, not a guarantee of future match outcomes.</li>
          </ul>
          <div className="mt-5 border-t border-white/[0.07] pt-4 text-[10px] leading-5 text-gray-600">
            Source: GoalSense Automatic Match Workbook · Match Analysis sheet. {data.recordsWithUsableDate} of {data.totalCompletedMatches} records contain a usable date; date-based trend charts are therefore not displayed.
          </div>
        </section>
      </div>
    </main>
  );
}
