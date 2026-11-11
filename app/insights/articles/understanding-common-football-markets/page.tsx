
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  Goal,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "Understanding Common Football Markets | GoalSense",
  description:
    "A simple educational guide to common football markets, goal totals, match results and team scoring terminology.",
};

const relatedArticles = [
  {
    category: "FOOTBALL STATISTICS",
    title: "Why Football Statistics Matter When Analysing Matches",
    description:
      "Learn how football statistics, historical results and team form help explain performances.",
    href: "/insights/articles/why-football-statistics-matter",
    read: "5 min read",
    icon: BarChart3,
  },
  {
    category: "FOOTBALL ANALYSIS",
    title: "How to Interpret Team Form and Historical Results",
    description:
      "Understand recent team form, home and away records, and historical results.",
    href: "/insights/articles/how-to-interpret-team-form",
    read: "5 min read",
    icon: TrendingUp,
  },
];

export default function FootballMarketsArticle() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* Article Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.14),transparent_65%)]">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-20">

          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={17} />
            Back to Insights
          </Link>

          <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold tracking-widest text-emerald-300">
            <BookOpen size={15} />
            MARKET EDUCATION
          </div>

          <h1 className="mt-7 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Understanding Common Football Markets
          </h1>

          <p className="mt-6 text-base leading-8 text-gray-400 sm:text-lg">
            Football has different ways of describing match outcomes and
            statistics. Understanding the terminology makes it easier to
            interpret football information.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-6 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-emerald-400" />
              GoalSense Insights
            </span>

            <span className="flex items-center gap-2">
              <Clock size={15} className="text-emerald-400" />
              4 min read
            </span>

            <span className="flex items-center gap-2">
              <BookOpen size={15} className="text-emerald-400" />
              Educational article
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">

        {/* Introduction */}
        <section className="mb-14">
          <p className="mb-4 text-xs font-bold tracking-[0.25em] text-emerald-400">
            INTRODUCTION
          </p>

          <p className="text-base leading-8 text-gray-300">
            Football statistics can be presented in different categories,
            often called markets. These categories describe specific
            aspects of a match, such as the final result, total goals or
            the number of goals scored by an individual team.
          </p>

          <p className="mt-5 text-base leading-8 text-gray-300">
            This guide explains some common terms and what they mean.
            The examples are for understanding terminology, not
            recommendations or predictions.
          </p>
        </section>

        {/* Over and Under Goals */}
        <section className="border-t border-white/10 pt-9">
          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <Goal size={21} />
            </span>

            <div>
              <p className="text-xs font-bold tracking-widest text-emerald-400">
                01
              </p>
              <h2 className="text-xl font-bold sm:text-2xl">
                Over and Under Goals
              </h2>
            </div>
          </div>

          <p className="leading-8 text-gray-300">
            Over and Under goals describe the total number of goals scored
            by both teams combined during a match.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-5">
              <p className="font-bold text-emerald-400">
                Over 1.5 Goals
              </p>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Means at least two goals are scored in total.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-5">
              <p className="font-bold text-emerald-400">
                Over 2.5 Goals
              </p>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Means at least three goals are scored in total.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-5">
              <p className="font-bold text-emerald-400">
                Under 2.5 Goals
              </p>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Means no more than two goals are scored in total.
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-gray-500">
            These examples describe the combined goals scored by both teams,
            not the goals scored by one team individually.
          </p>
        </section>

        {/* BTTS */}
        <section className="mt-14 border-t border-white/10 pt-9">
          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <Layers size={21} />
            </span>

            <div>
              <p className="text-xs font-bold tracking-widest text-emerald-400">
                02
              </p>
              <h2 className="text-xl font-bold sm:text-2xl">
                Both Teams to Score (BTTS)
              </h2>
            </div>
          </div>

          <p className="leading-8 text-gray-300">
            Both Teams to Score is a term describing whether each team
            scores at least one goal during the match.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-5">
              <p className="font-bold text-emerald-400">
                Both Teams Score
              </p>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                A 1–1, 2–1 or 3–2 scoreline means both teams have scored.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-5">
              <p className="font-bold text-emerald-400">
                Both Teams Do Not Score
              </p>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                A 2–0 or 0–0 scoreline means at least one team has not scored.
              </p>
            </div>
          </div>
        </section>

        {/* 1X2 */}
        <section className="mt-14 border-t border-white/10 pt-9">
          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <BarChart3 size={21} />
            </span>

            <div>
              <p className="text-xs font-bold tracking-widest text-emerald-400">
                03
              </p>
              <h2 className="text-xl font-bold sm:text-2xl">
                Match Result (1X2)
              </h2>
            </div>
          </div>

          <p className="leading-8 text-gray-300">
            The 1X2 format represents the three possible outcomes at the
            end of regular playing time, including stoppage time.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-4 text-center">
              <p className="text-3xl font-black text-emerald-400">1</p>
              <p className="mt-2 text-xs font-semibold text-gray-400">
                Home win
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-4 text-center">
              <p className="text-3xl font-black text-emerald-400">X</p>
              <p className="mt-2 text-xs font-semibold text-gray-400">
                Draw
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-4 text-center">
              <p className="text-3xl font-black text-emerald-400">2</p>
              <p className="mt-2 text-xs font-semibold text-gray-400">
                Away win
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-gray-400">
            In this format, the home team is represented by 1, a draw by X,
            and the away team by 2. Extra-time and penalty shootouts are
            generally excluded unless the competition or market rules
            specify otherwise.
          </p>
        </section>

        {/* Team Goals */}
        <section className="mt-14 border-t border-white/10 pt-9">
          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <Goal size={21} />
            </span>

            <div>
              <p className="text-xs font-bold tracking-widest text-emerald-400">
                04
              </p>
              <h2 className="text-xl font-bold sm:text-2xl">
                Team Goals
              </h2>
            </div>
          </div>

          <p className="leading-8 text-gray-300">
            Team goals refer to the number of goals scored by one specific
            team, rather than the combined total for both sides.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b110e] p-6">
            <p className="text-xs font-bold tracking-widest text-emerald-400">
              SIMPLE EXAMPLE
            </p>

            <div className="mt-5 flex items-center justify-center gap-5">
              <div className="text-center">
                <p className="text-sm text-gray-400">Home</p>
                <p className="mt-1 text-4xl font-black">2</p>
              </div>

              <span className="text-2xl font-bold text-gray-600">–</span>

              <div className="text-center">
                <p className="text-sm text-gray-400">Away</p>
                <p className="mt-1 text-4xl font-black">1</p>
              </div>
            </div>

            <p className="mt-5 text-center text-sm leading-7 text-gray-400">
              The home team scored two goals while the away team scored one.
            </p>
          </div>

          <p className="mt-5 leading-8 text-gray-300">
            This distinction is important when reading statistics that
            separate each team's attacking performance.
          </p>
        </section>

        {/* Definitions Matter */}
        <section className="mt-14 border-t border-white/10 pt-9">
          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <BookOpen size={21} />
            </span>

            <div>
              <p className="text-xs font-bold tracking-widest text-emerald-400">
                05
              </p>
              <h2 className="text-xl font-bold sm:text-2xl">
                Why Understanding the Definitions Matters
              </h2>
            </div>
          </div>

          <p className="leading-8 text-gray-300">
            Similar-looking terms can describe different things. Total
            match goals and individual team goals, for example, measure
            different aspects of a game.
          </p>

          <p className="mt-5 leading-8 text-gray-300">
            Understanding the definitions helps prevent confusion when
            reading football statistics, reports and match data.
          </p>
        </section>

        {/* GoalSense Perspective */}
        <section className="mt-16 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-7 sm:p-9">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
            <BookOpen size={24} />
          </div>

          <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">
            THE GOALSENSE PERSPECTIVE
          </p>

          <h2 className="mt-3 text-2xl font-extrabold">
            Making Football Terminology Easier to Understand
          </h2>

          <p className="mt-5 leading-8 text-gray-300">
            GoalSense Insights aims to make football terminology and
            statistical concepts easier to understand. Our focus is on
            explaining the information clearly, without presenting
            statistical descriptions as guarantees of future outcomes.
          </p>
        </section>

        {/* Key Takeaway */}
        <section className="mt-14 border-l-2 border-emerald-400 pl-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-400">
            <ShieldCheck size={16} />
            KEY TAKEAWAY
          </div>

          <h2 className="text-xl font-bold">
            Understand what each statistic actually measures.
          </h2>

          <p className="mt-4 leading-8 text-gray-400">
            Learning football terminology starts with understanding its
            definitions. Clear definitions make football statistics and
            match reports easier to read and interpret.
          </p>
        </section>

        {/* Related Articles */}
        <section className="mt-20 border-t border-white/10 pt-12">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              CONTINUE READING
            </p>

            <h2 className="mt-3 text-2xl font-extrabold">
              More From GoalSense Insights
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {relatedArticles.map((article) => {
              const Icon = article.icon;

              return (
                <Link
                  key={article.title}
                  href={article.href}
                  className="group rounded-2xl border border-white/10 bg-[#0b110e] p-6 transition hover:-translate-y-1 hover:border-emerald-400/40"
                >
                  <Icon size={23} className="text-emerald-400" />

                  <p className="mt-5 text-[10px] font-bold tracking-widest text-emerald-400">
                    {article.category}
                  </p>

                  <h3 className="mt-3 font-bold leading-7">
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
        </section>

        {/* Bottom Navigation */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={16} />
            All Insights
          </Link>

          <Link
            href="/insights/articles/how-to-interpret-team-form"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-400"
          >
            Next Article
            <ArrowRight size={16} />
          </Link>
        </div>

      </article>
    </main>
  );
}
