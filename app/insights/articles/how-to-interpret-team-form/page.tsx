
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Clock,
  History,
  TrendingUp,
  MapPin,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "How to Interpret Team Form and Historical Results | GoalSense",
  description:
    "Learn how recent football form, home and away records, and historical results provide context for understanding team performances.",
};

const formResults = [
  { result: "W", label: "Win" },
  { result: "W", label: "Win" },
  { result: "D", label: "Draw" },
  { result: "L", label: "Loss" },
  { result: "W", label: "Win" },
];

const contextItems = [
  "Strength and quality of recent opponents",
  "Changes in the team's starting lineup",
  "Home or away match conditions",
  "Injuries, suspensions and squad availability",
  "Competition level and fixture schedule",
];

export default function TeamFormArticle() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.16),transparent_65%)]">
        <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={17} />
            Back to Insights
          </Link>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold tracking-widest text-emerald-300">
            <TrendingUp size={15} />
            FOOTBALL ANALYSIS
          </div>

          <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            How to Interpret Team Form and Historical Results
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            Recent results and historical records can reveal useful details
            about football teams. Learn how to read them without overlooking
            the context behind the numbers.
          </p>

          <div className="mt-8 flex flex-wrap gap-5 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-emerald-400" />
              GoalSense Insights
            </span>
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-emerald-400" />
              5 min read
            </span>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="space-y-12 text-[15px] leading-8 text-gray-300 sm:text-base">
          {/* INTRODUCTION */}
          <section>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-emerald-400">
              THE BIG PICTURE
            </p>

            <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
              Understanding a Team Beyond Its Latest Result
            </h2>

            <p>
              A football team's results tell us more than whether it won,
              drew or lost. When viewed over a period of time, they can help
              describe consistency, scoring patterns and changes in
              performance.
            </p>

            <p className="mt-4">
              Two important sources of information are recent team form and
              historical results. Both are useful, but neither should be
              interpreted without considering the circumstances behind them.
            </p>
          </section>

          {/* TEAM FORM */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
                <TrendingUp size={22} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-emerald-400">
                  01 / RECENT PERFORMANCE
                </p>
                <h2 className="text-2xl font-bold text-white">
                  What Is Team Form?
                </h2>
              </div>
            </div>

            <p>
              Team form is a summary of a team's recent match performances.
              It is often measured using a sequence of wins, draws and losses
              from a selected number of games.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b110e] p-6 sm:p-7">
              <p className="text-xs font-bold tracking-widest text-emerald-400">
                ILLUSTRATIVE EXAMPLE
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {formResults.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-16 w-16 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#101a14]"
                  >
                    <span
                      className={`text-xl font-black ${
                        item.result === "L"
                          ? "text-rose-400"
                          : item.result === "D"
                            ? "text-amber-400"
                            : "text-emerald-400"
                      }`}
                    >
                      {item.result}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-6 text-gray-500">
                An example sequence of five results. It is not a real team's
                current record.
              </p>
            </div>

            <p className="mt-5">
              This sequence gives a quick overview, but it does not explain
              everything. The quality of opposition, competition and match
              conditions also matter.
            </p>
          </section>

          {/* HOME AND AWAY */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
                <MapPin size={22} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-emerald-400">
                  02 / MATCH LOCATION
                </p>
                <h2 className="text-2xl font-bold text-white">
                  Home and Away Performance
                </h2>
              </div>
            </div>

            <p>
              Teams can perform differently depending on where a match is
              played. Home and away records should therefore be considered
              separately when studying performance.
            </p>

            <p className="mt-4">
              Comparing home and away goals scored, goals conceded and match
              results can help describe those differences.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-5">
                <p className="text-sm font-bold text-emerald-400">
                  Home Performance
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  Consider results at the team's own ground, including
                  scoring patterns and defensive records.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-5">
                <p className="text-sm font-bold text-emerald-400">
                  Away Performance
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  Examine results in opposing venues and compare them with
                  the team's home record.
                </p>
              </div>
            </div>
          </section>

          {/* HISTORICAL RESULTS */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
                <History size={22} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-emerald-400">
                  03 / LONG-TERM RECORDS
                </p>
                <h2 className="text-2xl font-bold text-white">
                  Understanding Historical Results
                </h2>
              </div>
            </div>

            <p>
              Historical results show how a team has performed over previous
              matches, seasons or competitions. They can help identify
              longer-term patterns that may not be visible from one match.
            </p>

            <p className="mt-4">
              It is important to check how old the information is. A team's
              previous performances from several seasons ago may have limited
              relevance to its current squad and management.
            </p>
          </section>

          {/* HEAD TO HEAD */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
                <BarChart3 size={22} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-emerald-400">
                  04 / PREVIOUS MEETINGS
                </p>
                <h2 className="text-2xl font-bold text-white">
                  Head-to-Head Records
                </h2>
              </div>
            </div>

            <p>
              Head-to-head records describe previous meetings between two
              teams. They can provide historical context about a particular
              fixture.
            </p>

            <p className="mt-4">
              However, past meetings do not determine future results. Changes
              in players, coaches, tactics and team circumstances can make
              older encounters less representative.
            </p>
          </section>

          {/* CONTEXT */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
                <Lightbulb size={22} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-emerald-400">
                  05 / BEYOND THE NUMBERS
                </p>
                <h2 className="text-2xl font-bold text-white">
                  Consider the Wider Context
                </h2>
              </div>
            </div>

            <p>
              Before interpreting a team's record, consider the competition,
              strength of opponents, injuries, squad changes, fixture
              congestion and other relevant circumstances.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b110e] p-6">
              <p className="mb-4 text-sm font-bold text-white">
                Useful context to examine
              </p>

              <ul className="space-y-3">
                {contextItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                    <ShieldCheck
                      size={17}
                      className="mt-1 shrink-0 text-emerald-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5">
              A sequence of results becomes more meaningful when you
              understand what happened during those matches rather than
              simply counting wins and losses.
            </p>
          </section>

          {/* GOALSENSE PERSPECTIVE */}
          <section className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-transparent p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <BarChart3 size={20} />
                <span className="text-xs font-bold tracking-widest">
                  THE GOALSENSE PERSPECTIVE
                </span>
              </div>

              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Data Provides Context, Not Certainty
              </h2>

              <p className="mt-4 text-sm leading-8 text-gray-300 sm:text-base">
                GoalSense Insights encourages a balanced understanding of
                football data. Recent form and historical results are useful
                descriptions of past performance, not guarantees of what will
                happen next.
              </p>
            </div>
          </section>

          {/* FINAL THOUGHTS */}
          <section>
            <p className="mb-3 text-xs font-bold tracking-widest text-emerald-400">
              KEY TAKEAWAY
            </p>

            <h2 className="mb-4 text-2xl font-bold text-white">
              Final Thoughts
            </h2>

            <p>
              Team form and historical results help explain how teams have
              performed over time. The most useful interpretation combines
              these records with relevant match context and recognises the
              limitations of historical data.
            </p>
          </section>
        </div>

        {/* RELATED ARTICLES */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <h2 className="text-xl font-bold text-white">
            Continue Exploring
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/insights/articles/why-football-statistics-matter"
              className="group rounded-2xl border border-white/10 bg-[#0b110e] p-5 transition hover:border-emerald-400/30"
            >
              <p className="text-xs font-bold tracking-widest text-emerald-400">
                FOOTBALL STATISTICS
              </p>
              <h3 className="mt-3 font-bold leading-6 text-white transition group-hover:text-emerald-400">
                Why Football Statistics Matter When Analysing Matches
              </h3>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-gray-400">
                Read article
                <ArrowRight size={15} />
              </span>
            </Link>

            <Link
              href="/insights/articles/understanding-common-football-markets"
              className="group rounded-2xl border border-white/10 bg-[#0b110e] p-5 transition hover:border-emerald-400/30"
            >
              <p className="text-xs font-bold tracking-widest text-emerald-400">
                MARKET EDUCATION
              </p>
              <h3 className="mt-3 font-bold leading-6 text-white transition group-hover:text-emerald-400">
                Understanding Common Football Markets
              </h3>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-gray-400">
                Read article
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>

          <div className="mt-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-black transition hover:bg-emerald-400"
            >
              Explore More Insights
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
