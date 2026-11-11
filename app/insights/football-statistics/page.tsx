
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.16),transparent_65%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">

          <Link
            href="/insights"
            className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={17} />
            Back to Insights
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold tracking-widest text-emerald-300">
            <BarChart3 size={15} />
            DATA & ANALYSIS
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            Football Data
            <span className="block text-emerald-400">
              & Statistics
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Discover the numbers behind football. Learn how historical
            results, team form and match statistics help explain what happens
            on the pitch.
          </p>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-emerald-400" />
              Educational resources
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays size={17} className="text-emerald-400" />
              Historical context
            </span>

            <span className="flex items-center gap-2">
              <Activity size={17} className="text-emerald-400" />
              Performance analysis
            </span>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">

        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
            EXPLORE THE NUMBERS
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Understanding Football Data
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-gray-400">
            Football statistics provide useful descriptions of team and match
            performance. Explore these four important areas.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <article
                key={topic.title}
                className="group rounded-2xl border border-white/10 bg-[#0b110e] p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                  <Icon size={23} />
                </div>

                <h3 className="text-xl font-bold">
                  {topic.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  {topic.description}
                </p>

                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-sm leading-7 text-gray-500">
                    {topic.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Reading Football Statistics */}
      <section className="border-y border-white/10 bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">

          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              BUILD YOUR UNDERSTANDING
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              How to Read Football Statistics
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              Numbers become more meaningful when they are viewed in context.
              Here are some useful principles to keep in mind.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-6">
              <div className="mb-4 text-emerald-400">
                <History size={25} />
              </div>

              <h3 className="font-bold">
                Consider the Time Period
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Recent performances and longer historical records can tell
                different stories. Always understand the period being studied.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-6">
              <div className="mb-4 text-emerald-400">
                <BarChart3 size={25} />
              </div>

              <h3 className="font-bold">
                Compare Relevant Data
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Compare similar competitions, opponents and home or away
                performances wherever possible.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-6">
              <div className="mb-4 text-emerald-400">
                <ShieldCheck size={25} />
              </div>

              <h3 className="font-bold">
                Understand the Limitations
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Statistics describe recorded performances. They cannot account
                for every factor that may influence a future match.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-8 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-8 sm:p-12 md:grid-cols-2">

          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <ShieldCheck size={24} />
            </div>

            <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">
              A RESPONSIBLE APPROACH
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight">
              Statistics tell part of the story.
            </h2>
          </div>

          <div className="space-y-5 leading-8 text-gray-400">
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

      {/* Related Articles */}
      <section className="border-y border-white/10 bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">

          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              CONTINUE LEARNING
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Related Reads
            </h2>

            <p className="mt-3 text-gray-400">
              Explore more educational articles from GoalSense Insights.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {articles.map((article) => {
              const Icon = article.icon;

              return (
                <Link
                  key={article.title}
                  href={article.href}
                  className="group rounded-2xl border border-white/10 bg-[#0b110e] p-6 transition hover:-translate-y-1 hover:border-emerald-400/40"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                    <Icon size={21} />
                  </div>

                  <p className="text-[10px] font-bold tracking-widest text-emerald-400">
                    {article.category}
                  </p>

                  <h3 className="mt-3 text-lg font-bold leading-7">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {article.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-500">
                    <span>{article.read}</span>

                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                      Read article
                      <ArrowRight
                        size={14}
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

      {/* Footer */}
      <section className="px-5 py-16 text-center">
        <Clock size={27} className="mx-auto text-emerald-400" />

        <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
          Keep Exploring. Keep Learning.
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
          Continue exploring football knowledge, statistics and educational
          resources through the GoalSense Knowledge Hub.
        </p>

        <Link
          href="/insights"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-black transition hover:bg-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Insights
        </Link>
      </section>

    </main>
  );
}
