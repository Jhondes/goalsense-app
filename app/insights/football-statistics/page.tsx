
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChartNoAxesCombined,
  Clock,
  Goal,
  History,
  ShieldCheck,
  TrendingUp,
  Activity,
} from "lucide-react";

const topics = [
  {
    icon: History,
    title: "Historical Results",
    description:
      "Explore previous match results across competitions and seasons. Historical records provide context for understanding how teams have performed over time.",
    detail:
      "Look beyond individual results. Consider the competition, opponents, venue and period in which each match was played.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Team Form",
    description:
      "Understand how recent performances, wins, draws and losses help describe a team's current form.",
    detail:
      "Compare recent home and away performances, while remembering that a short run of results does not tell the entire story.",
  },
  {
    icon: Goal,
    title: "Goals Statistics",
    description:
      "Learn about goals scored, goals conceded, scoring frequency and clean sheets.",
    detail:
      "Goals data can help explain a team's attacking output and defensive record across a selected period.",
  },
  {
    icon: BarChart3,
    title: "Match Statistics",
    description:
      "Discover how possession, shots, corners and other match statistics help describe what happened during a game.",
    detail:
      "Different statistics measure different aspects of a match. Possession, for example, does not automatically mean a team played better.",
  },
];

const articles = [
  {
    category: "FOOTBALL STATISTICS",
    title: "Why Football Statistics Matter When Analysing Matches",
    description:
      "Discover how team form, historical results and match data provide useful context.",
    read: "5 min read",
    href: "/insights/articles/why-football-statistics-matter",
    icon: BarChart3,
  },
  {
    category: "FOOTBALL ANALYSIS",
    title: "How to Interpret Team Form and Historical Results",
    description:
      "Understand recent team form, home and away records, and historical results.",
    read: "5 min read",
    href: "/insights/articles/how-to-interpret-team-form",
    icon: TrendingUp,
  },
];

export default function FootballStatisticsPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.13),transparent_65%)]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">

          <Link
            href="/insights"
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={15} />
            Back to Insights
          </Link>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[9px] font-bold tracking-[0.17em] text-emerald-300">
            <BarChart3 size={13} />
            DATA & ANALYSIS
          </div>

          <h1 className="max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-5xl">
            Football Data
            <span className="block text-emerald-400">
              & Statistics
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Discover the numbers behind football. Learn how historical
            results, team form and match statistics help explain what happens
            on the pitch.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-[10px] font-medium text-gray-400 sm:text-xs">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              Educational resources
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} className="text-emerald-400" />
              Historical context
            </span>

            <span className="flex items-center gap-1.5">
              <Activity size={14} className="text-emerald-400" />
              Performance analysis
            </span>
          </div>

        </div>
      </section>

      {/* FOOTBALL STATISTICS TOPICS */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">

        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.22em] text-emerald-400">
            EXPLORE THE NUMBERS
          </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Understanding Football Data
          </h2>

          <p className="mt-2 max-w-2xl text-xs leading-6 text-gray-400 sm:text-sm">
            Football statistics provide useful descriptions of team and match
            performance. Explore these four important areas.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <article
                key={topic.title}
                className="group rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 sm:p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-400 transition group-hover:bg-emerald-400 group-hover:text-black">
                  <Icon size={18} />
                </div>

                <h3 className="text-base font-bold tracking-tight">
                  {topic.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-gray-400">
                  {topic.description}
                </p>

                <div className="mt-3 border-t border-white/[0.07] pt-3">
                  <p className="text-[11px] leading-5 text-gray-500">
                    {topic.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* READING FOOTBALL STATISTICS */}
      <section className="border-y border-white/[0.06] bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">

          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-[0.22em] text-emerald-400">
              BUILD YOUR UNDERSTANDING
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              How to Read Football Statistics
            </h2>

            <p className="mt-2 max-w-2xl text-xs leading-6 text-gray-400 sm:text-sm">
              Numbers become more meaningful when they are viewed in context.
              Here are some useful principles to keep in mind.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">

            <article className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 sm:p-5">
              <div className="mb-3 text-emerald-400">
                <History size={20} />
              </div>

              <h3 className="text-sm font-bold">
                Consider the Time Period
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Recent performances and longer historical records can tell
                different stories. Always understand the period being studied.
              </p>
            </article>

            <article className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 sm:p-5">
              <div className="mb-3 text-emerald-400">
                <BarChart3 size={20} />
              </div>

              <h3 className="text-sm font-bold">
                Compare Relevant Data
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Compare similar competitions, opponents and home or away
                performances wherever possible.
              </p>
            </article>

            <article className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 sm:p-5">
              <div className="mb-3 text-emerald-400">
                <ShieldCheck size={20} />
              </div>

              <h3 className="text-sm font-bold">
                Understand the Limitations
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Statistics describe recorded performances. They cannot account
                for every factor that may influence a future match.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* IMPORTANT NOTE */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-5 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-5 sm:p-7 md:grid-cols-2">

          <div>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-emerald-400">
              <ShieldCheck size={20} />
            </div>

            <p className="text-[9px] font-bold tracking-[0.2em] text-emerald-400">
              A RESPONSIBLE APPROACH
            </p>

            <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
              Statistics tell part of the story.
            </h2>
          </div>

          <div className="space-y-3 text-xs leading-6 text-gray-400 sm:text-sm">
            <p>
              Football statistics can help describe patterns across matches,
              competitions and seasons.
            </p>

            <p>
              However, statistics do not guarantee future results. Team
              selection, injuries, tactics, match conditions and many other
              factors can influence what happens during a game.
            </p>

            <p>
              The goal is to understand the information, not treat numbers
              as certainty.
            </p>
          </div>

        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section className="border-y border-white/[0.06] bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">

          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-[0.22em] text-emerald-400">
              CONTINUE LEARNING
            </p>

            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Related Reads
            </h2>

            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              Explore more educational articles from GoalSense Insights.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {articles.map((article) => {
              const Icon = article.icon;

              return (
                <Link
                  key={article.title}
                  href={article.href}
                  className="group rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 transition hover:-translate-y-0.5 hover:border-emerald-400/30 sm:p-5"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-emerald-400">
                    <Icon size={17} />
                  </div>

                  <p className="text-[9px] font-bold tracking-widest text-emerald-400">
                    {article.category}
                  </p>

                  <h3 className="mt-2 text-sm font-bold leading-6 transition group-hover:text-emerald-400">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    {article.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 text-[10px] text-gray-500">
                    <span>{article.read}</span>

                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                      Read article
                      <ArrowRight
                        size={12}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <section className="px-5 py-10 text-center sm:py-12">
        <Clock size={22} className="mx-auto text-emerald-400" />

        <h2 className="mt-3 text-xl font-extrabold sm:text-2xl">
          Keep Exploring. Keep Learning.
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-gray-400">
          Continue exploring football knowledge, statistics and educational
          resources through the GoalSense Knowledge Hub.
        </p>

        <Link
          href="/insights"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-xs font-bold text-black transition hover:bg-emerald-400"
        >
          <ArrowLeft size={15} />
          Back to Insights
        </Link>
      </section>

    </main>
  );
}
