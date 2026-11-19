
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

function SectionHeading({
  number,
  title,
  icon: Icon,
}: {
  number: string;
  title: string;
  icon: typeof Goal;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08]">
        <Icon size={19} className="text-emerald-400" />
      </div>

      <div>
        <p className="text-[10px] font-bold tracking-[0.16em] text-emerald-400">
          {number} / MARKET EDUCATION
        </p>
        <h2 className="mt-0.5 text-lg font-bold leading-snug text-white sm:text-xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function FootballMarketsArticle() {
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
            <BookOpen size={13} />
            MARKET EDUCATION
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl md:text-[42px]">
            Understanding Common Football Markets
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Football has different ways of describing match outcomes and
            statistics. Understanding the terminology makes it easier to
            interpret football information.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-4 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} className="text-emerald-400" />
              GoalSense Insights
            </span>

            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-emerald-400" />
              4 min read
            </span>

            <span className="flex items-center gap-1.5">
              <BookOpen size={13} className="text-emerald-400" />
              Educational article
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
              INTRODUCTION
            </p>

            <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
              Understanding Football Terminology
            </h2>

            <p>
              Football statistics can be presented in different categories,
              often called markets. These categories describe specific
              aspects of a match, such as the final result, total goals or
              the number of goals scored by an individual team.
            </p>

            <p className="mt-3">
              This guide explains some common terms and what they mean.
              The examples are for understanding terminology, not
              recommendations or predictions.
            </p>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* OVER AND UNDER */}
          <section>
            <SectionHeading
              number="01"
              title="Over and Under Goals"
              icon={Goal}
            />

            <p>
              Over and Under goals describe the total number of goals scored
              by both teams combined during a match.
            </p>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4">
                <p className="text-sm font-bold text-emerald-400">
                  Over 1.5 Goals
                </p>
                <p className="mt-1.5 text-xs leading-6 text-gray-400">
                  Means at least two goals are scored in total.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4">
                <p className="text-sm font-bold text-emerald-400">
                  Over 2.5 Goals
                </p>
                <p className="mt-1.5 text-xs leading-6 text-gray-400">
                  Means at least three goals are scored in total.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 sm:col-span-2">
                <p className="text-sm font-bold text-emerald-400">
                  Under 2.5 Goals
                </p>
                <p className="mt-1.5 text-xs leading-6 text-gray-400">
                  Means no more than two goals are scored in total.
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-6 text-gray-500">
              These examples describe the combined goals scored by both teams,
              not the goals scored by one team individually.
            </p>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* BTTS */}
          <section>
            <SectionHeading
              number="02"
              title="Both Teams to Score (BTTS)"
              icon={Layers}
            />

            <p>
              Both Teams to Score is a term describing whether each team
              scores at least one goal during the match.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4">
                <p className="text-sm font-bold text-emerald-400">
                  Both Teams Score
                </p>
                <p className="mt-2 text-xs leading-6 text-gray-400">
                  A 1–1, 2–1 or 3–2 scoreline means both teams have scored.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-4">
                <p className="text-sm font-bold text-emerald-400">
                  Both Teams Do Not Score
                </p>
                <p className="mt-2 text-xs leading-6 text-gray-400">
                  A 2–0 or 0–0 scoreline means at least one team has not scored.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* 1X2 */}
          <section>
            <SectionHeading
              number="03"
              title="Match Result (1X2)"
              icon={BarChart3}
            />

            <p>
              The 1X2 format represents the three possible outcomes at the
              end of regular playing time, including stoppage time.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-3 text-center">
                <p className="text-2xl font-black text-emerald-400">1</p>
                <p className="mt-1 text-[11px] font-semibold text-gray-400">
                  Home win
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-3 text-center">
                <p className="text-2xl font-black text-emerald-400">X</p>
                <p className="mt-1 text-[11px] font-semibold text-gray-400">
                  Draw
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-[#0b110e] p-3 text-center">
                <p className="text-2xl font-black text-emerald-400">2</p>
                <p className="mt-1 text-[11px] font-semibold text-gray-400">
                  Away win
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-6 text-gray-400">
              In this format, the home team is represented by 1, a draw by X,
              and the away team by 2. Extra-time and penalty shootouts are
              generally excluded unless the competition or market rules
              specify otherwise.
            </p>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* TEAM GOALS */}
          <section>
            <SectionHeading
              number="04"
              title="Team Goals"
              icon={Goal}
            />

            <p>
              Team goals refer to the number of goals scored by one specific
              team, rather than the combined total for both sides.
            </p>

            <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold tracking-[0.15em] text-emerald-400">
                  SIMPLE EXAMPLE
                </p>
                <span className="text-[10px] text-gray-500">
                  Example score
                </span>
              </div>

              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Home</p>
                  <p className="mt-1 text-3xl font-black text-white">2</p>
                </div>

                <span className="text-xl font-bold text-gray-600">–</span>

                <div className="text-center">
                  <p className="text-xs text-gray-400">Away</p>
                  <p className="mt-1 text-3xl font-black text-white">1</p>
                </div>
              </div>

              <p className="mt-3 text-center text-xs leading-6 text-gray-400">
                The home team scored two goals while the away team scored one.
              </p>
            </div>

            <p className="mt-3">
              This distinction is important when reading statistics that
              separate each team's attacking performance.
            </p>
          </section>

          <div className="h-px bg-white/[0.07]" />

          {/* DEFINITIONS */}
          <section>
            <SectionHeading
              number="05"
              title="Why Understanding the Definitions Matters"
              icon={BookOpen}
            />

            <p>
              Similar-looking terms can describe different things. Total
              match goals and individual team goals, for example, measure
              different aspects of a game.
            </p>

            <p className="mt-3">
              Understanding the definitions helps prevent confusion when
              reading football statistics, reports and match data.
            </p>
          </section>

          {/* GOALSENSE PERSPECTIVE */}
          <section className="relative overflow-hidden rounded-xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.09] to-transparent p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/[0.08] blur-3xl" />

            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-emerald-400">
                <BookOpen size={17} />
                <span className="text-[10px] font-bold tracking-[0.16em]">
                  THE GOALSENSE PERSPECTIVE
                </span>
              </div>

              <h2 className="text-lg font-bold text-white sm:text-xl">
                Making Football Terminology Easier to Understand
              </h2>

              <p className="mt-3 text-xs leading-7 text-gray-300 sm:text-sm">
                GoalSense Insights aims to make football terminology and
                statistical concepts easier to understand. Our focus is on
                explaining the information clearly, without presenting
                statistical descriptions as guarantees of future outcomes.
              </p>
            </div>
          </section>

          {/* KEY TAKEAWAY */}
          <section className="border-l-2 border-emerald-400 pl-4">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-emerald-400">
              <ShieldCheck size={14} />
              KEY TAKEAWAY
            </div>

            <h2 className="text-lg font-bold text-white">
              Understand what each statistic actually measures.
            </h2>

            <p className="mt-3 text-xs leading-7 text-gray-400 sm:text-sm">
              Learning football terminology starts with understanding its
              definitions. Clear definitions make football statistics and
              match reports easier to read and interpret.
            </p>
          </section>
        </div>

        {/* RELATED ARTICLES */}
        <section className="mt-10 border-t border-white/[0.07] pt-7">
          <div className="mb-4">
            <p className="text-[10px] font-bold tracking-[0.18em] text-emerald-400">
              CONTINUE READING
            </p>

            <h2 className="mt-1.5 text-lg font-bold text-white">
              More From GoalSense Insights
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {relatedArticles.map((article) => {
              const Icon = article.icon;

              return (
                <Link
                  key={article.title}
                  href={article.href}
                  className="group rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 transition hover:border-emerald-400/30"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={18} className="text-emerald-400" />
                    <span className="text-[10px] text-gray-500">
                      {article.read}
                    </span>
                  </div>

                  <p className="mt-3 text-[9px] font-bold tracking-[0.14em] text-emerald-400">
                    {article.category}
                  </p>

                  <h3 className="mt-2 text-sm font-bold leading-6 text-white transition group-hover:text-emerald-400">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-gray-400">
                    {article.description}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    Read article
                    <ArrowRight
                      size={13}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* BOTTOM NAVIGATION */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={14} />
            All Insights
          </Link>

          <Link
            href="/insights/articles/how-to-interpret-team-form"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-emerald-400"
          >
            Next Article
            <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </main>
  );
}