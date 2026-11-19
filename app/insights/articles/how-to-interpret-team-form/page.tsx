
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

const sections = [
  {
    number: "01",
    label: "RECENT PERFORMANCE",
    title: "What Is Team Form?",
    icon: TrendingUp,
  },
  {
    number: "02",
    label: "MATCH LOCATION",
    title: "Home and Away Performance",
    icon: MapPin,
  },
  {
    number: "03",
    label: "LONG-TERM RECORDS",
    title: "Understanding Historical Results",
    icon: History,
  },
  {
    number: "04",
    label: "PREVIOUS MEETINGS",
    title: "Head-to-Head Records",
    icon: BarChart3,
  },
  {
    number: "05",
    label: "BEYOND THE NUMBERS",
    title: "Consider the Wider Context",
    icon: Lightbulb,
  },
];

function SectionHeading({
  number,
  label,
  title,
  icon: Icon,
}: {
  number: string;
  label: string;
  title: string;
  icon: React.ElementType;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08]">
        <Icon size={19} className="text-emerald-400" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold tracking-[0.16em] text-emerald-400">
          {number} / {label}
        </p>
        <h2 className="mt-0.5 text-lg font-bold leading-snug text-white sm:text-xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function TeamFormArticle() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_65%)]">
        <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-emerald-500/[0.07] blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 py-9 sm:px-8 sm:py-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={15} />
            Back to Insights
          </Link>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] text-emerald-300">
            <TrendingUp size={13} />
            FOOTBALL ANALYSIS
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl md:text-[42px]">
            How to Interpret Team Form and Historical Results
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Recent results and historical records can reveal useful details
            about football teams. Learn how to read them without overlooking
            the context behind the numbers.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} className="text-emerald-400" />
              GoalSense Insights
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-emerald-400" />
              5 min read
            </span>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="mx-auto max-w-4xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="space-y-9 text-sm leading-7 text-gray-300 sm:space-y-10 sm:text-[15px] sm:leading-8">

          {/* INTRODUCTION */}
          <section>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-emerald-400">
              THE BIG PICTURE
            </p>

            <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
              Understanding a Team Beyond Its Latest Result
            </h2>

            <p>
              A football team's results tell us more than whether it won,
              drew or lost. When viewed over a period of time, they can help
              describe consistency, scoring patterns and changes in
              performance.
            </p>

            <p className="mt-3">
              Two important sources of information are recent team form and
              historical results. Both are useful, but neither should be
              interpreted without considering the circumstances behind them.
            </p>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* TEAM FORM */}
          <section>
            <SectionHeading {...sections[0]} />

            <p>
              Team form is a summary of a team's recent match performances.
              It is often measured using a sequence of wins, draws and losses
              from a selected number of games.
            </p>

            <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#0b110e] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-bold tracking-[0.16em] text-emerald-400">
                  ILLUSTRATIVE EXAMPLE
                </p>
                <span className="text-[10px] text-gray-500">
                  Last 5 results
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {formResults.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-white/[0.07] bg-[#101a14]"
                  >
                    <span
                      className={`text-base font-black ${
                        item.result === "L"
                          ? "text-rose-400"
                          : item.result === "D"
                            ? "text-amber-400"
                            : "text-emerald-400"
                      }`}
                    >
                      {item.result}
                    </span>
                    <span className="text-[9px] text-gray-500">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] leading-5 text-gray-500">
                An example sequence of five results. It is not a real team's
                current record.
              </p>
            </div>

            <p className="mt-4">
              This sequence gives a quick overview, but it does not explain
              everything. The quality of opposition, competition and match
              conditions also matter.
            </p>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* HOME AND AWAY */}
          <section>
            <SectionHeading {...sections[1]} />

            <p>
              Teams can perform differently depending on where a match is
              played. Home and away records should therefore be considered
              separately when studying performance.
            </p>

            <p className="mt-3">
              Comparing home and away goals scored, goals conceded and match
              results can help describe those differences.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4">
                <p className="text-sm font-bold text-emerald-400">
                  Home Performance
                </p>
                <p className="mt-2 text-xs leading-6 text-gray-400">
                  Consider results at the team's own ground, including
                  scoring patterns and defensive records.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4">
                <p className="text-sm font-bold text-emerald-400">
                  Away Performance
                </p>
                <p className="mt-2 text-xs leading-6 text-gray-400">
                  Examine results in opposing venues and compare them with
                  the team's home record.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* HISTORICAL RESULTS */}
          <section>
            <SectionHeading {...sections[2]} />

            <p>
              Historical results show how a team has performed over previous
              matches, seasons or competitions. They can help identify
              longer-term patterns that may not be visible from one match.
            </p>

            <p className="mt-3">
              It is important to check how old the information is. A team's
              previous performances from several seasons ago may have limited
              relevance to its current squad and management.
            </p>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* HEAD TO HEAD */}
          <section>
            <SectionHeading {...sections[3]} />

            <p>
              Head-to-head records describe previous meetings between two
              teams. They can provide historical context about a particular
              fixture.
            </p>

            <p className="mt-3">
              However, past meetings do not determine future results. Changes
              in players, coaches, tactics and team circumstances can make
              older encounters less representative.
            </p>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* CONTEXT */}
          <section>
            <SectionHeading {...sections[4]} />

            <p>
              Before interpreting a team's record, consider the competition,
              strength of opponents, injuries, squad changes, fixture
              congestion and other relevant circumstances.
            </p>

            <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 sm:p-5">
              <p className="mb-3 text-xs font-bold text-white">
                Useful context to examine
              </p>

              <ul className="space-y-2.5">
                {contextItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-xs leading-6 text-gray-400"
                  >
                    <ShieldCheck
                      size={15}
                      className="mt-1 shrink-0 text-emerald-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4">
              A sequence of results becomes more meaningful when you
              understand what happened during those matches rather than
              simply counting wins and losses.
            </p>
          </section>

          {/* GOALSENSE PERSPECTIVE */}
          <section className="relative overflow-hidden rounded-xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.09] to-transparent p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/[0.08] blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-emerald-400">
                <BarChart3 size={17} />
                <span className="text-[10px] font-bold tracking-[0.16em]">
                  THE GOALSENSE PERSPECTIVE
                </span>
              </div>

              <h2 className="text-lg font-bold text-white sm:text-xl">
                Data Provides Context, Not Certainty
              </h2>

              <p className="mt-3 text-xs leading-7 text-gray-300 sm:text-sm">
                GoalSense Insights encourages a balanced understanding of
                football data. Recent form and historical results are useful
                descriptions of past performance, not guarantees of what will
                happen next.
              </p>
            </div>
          </section>

          {/* FINAL THOUGHTS */}
          <section>
            <p className="mb-2 text-[10px] font-bold tracking-[0.16em] text-emerald-400">
              KEY TAKEAWAY
            </p>

            <h2 className="mb-3 text-xl font-bold text-white">
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
        <div className="mt-10 border-t border-white/[0.07] pt-7">
          <h2 className="text-lg font-bold text-white">
            Continue Exploring
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href="/insights/articles/why-football-statistics-matter"
              className="group rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 transition hover:border-emerald-400/30"
            >
              <p className="text-[9px] font-bold tracking-[0.15em] text-emerald-400">
                FOOTBALL STATISTICS
              </p>
              <h3 className="mt-2 text-sm font-bold leading-6 text-white transition group-hover:text-emerald-400">
                Why Football Statistics Matter When Analysing Matches
              </h3>
              <span className="mt-3 inline-flex items-center gap-2 text-xs text-gray-400">
                Read article
                <ArrowRight size={13} />
              </span>
            </Link>

            <Link
              href="/insights/articles/understanding-common-football-markets"
              className="group rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 transition hover:border-emerald-400/30"
            >
              <p className="text-[9px] font-bold tracking-[0.15em] text-emerald-400">
                MARKET EDUCATION
              </p>
              <h3 className="mt-2 text-sm font-bold leading-6 text-white transition group-hover:text-emerald-400">
                Understanding Common Football Markets
              </h3>
              <span className="mt-3 inline-flex items-center gap-2 text-xs text-gray-400">
                Read article
                <ArrowRight size={13} />
              </span>
            </Link>
          </div>

          <div className="mt-5">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-xs font-bold text-black transition hover:bg-emerald-400"
            >
              Explore More Insights
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
