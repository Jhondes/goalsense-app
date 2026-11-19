
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CircleHelp,
  Goal,
  Layers,
  ShieldCheck,
  Target,
  BarChart3,
  Info,
  TrendingUp,
} from "lucide-react";

const lessons = [
  {
    icon: Goal,
    title: "Over / Under Goals",
    description:
      "Understand how total goals are counted across a football match and what different goal thresholds represent.",
    example:
      "Over 2.5 means at least three total goals. Under 2.5 means no more than two total goals.",
    note:
      "The goals scored by both teams are added together when calculating the total.",
  },
  {
    icon: Target,
    title: "Both Teams to Score",
    description:
      "Learn what it means for both teams to score at least one goal during a match.",
    example:
      "BTTS Yes: both teams score at least once. BTTS No: at least one team does not score.",
    note:
      "The final score is what determines whether both teams scored.",
  },
  {
    icon: Layers,
    title: "Match Results (1X2)",
    description:
      "Understand the three possible outcomes used to describe a match result.",
    example:
      "1 = Home team wins. X = Draw. 2 = Away team wins.",
    note:
      "This terminology generally refers to the result at the end of regular time, including stoppage time.",
  },
  {
    icon: BookOpen,
    title: "Team Goals",
    description:
      "Learn how team-goal statistics describe the number of goals scored by one particular side.",
    example:
      "A home team scoring at least one goal is an example of a team-goal threshold.",
    note:
      "Team-goal statistics focus on one team's score rather than the combined match total.",
  },
];

const relatedArticles = [
  {
    title: "Understanding Common Football Markets",
    category: "MARKET EDUCATION",
    description:
      "A beginner-friendly introduction to common football market terminology.",
    read: "4 min read",
    href: "/insights/articles/understanding-common-football-markets",
    icon: BookOpen,
  },
  {
    title: "Why Football Statistics Matter When Analysing Matches",
    category: "FOOTBALL STATISTICS",
    description:
      "Discover how team form, historical results and match data provide useful context.",
    read: "5 min read",
    href: "/insights/articles/why-football-statistics-matter",
    icon: BarChart3,
  },
];

export default function MarketEducationPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.13),transparent_65%)]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={15} />
            Back to Insights
          </Link>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-emerald-300">
            <BookOpen size={13} />
            LEARN THE BASICS
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Football Market
            <span className="block text-emerald-400">
              Education
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Understand common football terminology, goal totals and match
            statistics through simple educational explanations.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/[0.08] pt-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              Educational resources
            </span>

            <span className="flex items-center gap-1.5">
              <CircleHelp size={14} className="text-emerald-400" />
              Beginner-friendly explanations
            </span>

            <span className="flex items-center gap-1.5">
              <BarChart3 size={14} className="text-emerald-400" />
              Football terminology
            </span>
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
            THE LEARNING CENTRE
          </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Understand the Terminology
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400">
            Explore these introductory lessons to understand how common
            football markets and statistical terms are described.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {lessons.map((lesson) => {
            const Icon = lesson.icon;

            return (
              <article
                key={lesson.title}
                className="group rounded-xl border border-white/[0.08] bg-[#0b110e] p-5 transition duration-200 hover:border-emerald-400/30 hover:bg-[#0d1711]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-400">
                    <Icon size={19} />
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {lesson.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {lesson.description}
                </p>

                <div className="mt-4 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.04] p-3">
                  <p className="text-[9px] font-bold tracking-[0.16em] text-emerald-400">
                    SIMPLE EXAMPLE
                  </p>

                  <p className="mt-1.5 text-xs leading-6 text-gray-300">
                    {lesson.example}
                  </p>
                </div>

                <div className="mt-3 flex gap-2 text-xs leading-6 text-gray-500">
                  <Info
                    size={14}
                    className="mt-1 shrink-0 text-emerald-400/70"
                  />
                  <p>{lesson.note}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Understanding terminology */}
      <section className="border-y border-white/[0.07] bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
              BUILD YOUR KNOWLEDGE
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Understanding the Numbers
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400">
              Learning the terminology is only the beginning. Understanding
              the information behind each statistic is equally important.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-white/[0.08] bg-[#0b110e] p-5">
              <Goal size={21} className="text-emerald-400" />

              <h3 className="mt-3 text-sm font-bold">
                Know What Is Being Measured
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Some statistics describe the combined performance of both
                teams, while others focus on one team's contribution.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0b110e] p-5">
              <TrendingUp size={21} className="text-emerald-400" />

              <h3 className="mt-3 text-sm font-bold">
                Understand the Context
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Competition rules, match duration and the period being
                measured can affect how statistics should be interpreted.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0b110e] p-5">
              <ShieldCheck size={21} className="text-emerald-400" />

              <h3 className="mt-3 text-sm font-bold">
                Avoid Assumptions
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Knowing what a statistic means does not mean it can predict
                exactly what will happen in a future match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible interpretation */}
      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="grid gap-5 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-[#10251a] via-[#0b1711] to-[#080d0a] p-5 sm:p-7 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-400">
              <ShieldCheck size={20} />
            </div>

            <p className="text-[10px] font-bold tracking-[0.18em] text-emerald-400">
              RESPONSIBLE UNDERSTANDING
            </p>

            <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">
              Knowledge Before Interpretation.
            </h2>
          </div>

          <div className="space-y-3 text-sm leading-7 text-gray-400">
            <p>
              Understanding football terminology helps you read statistics
              more accurately and recognise what different figures represent.
            </p>

            <p>
              A statistical description is not a guarantee of a particular
              match outcome. Football remains unpredictable, and no market
              removes that uncertainty.
            </p>

            <p>
              The purpose of this learning centre is to explain the language
              of football data, not to encourage wagering.
            </p>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="border-y border-white/[0.07] bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
              CONTINUE LEARNING
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Related Reads
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Explore more educational resources from GoalSense Insights.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {relatedArticles.map((article) => {
              const Icon = article.icon;

              return (
                <Link
                  key={article.title}
                  href={article.href}
                  className="group rounded-xl border border-white/[0.08] bg-[#0b110e] p-5 transition duration-200 hover:border-emerald-400/30 hover:bg-[#0d1711]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-400">
                    <Icon size={17} />
                  </div>

                  <p className="mt-3 text-[9px] font-bold tracking-[0.16em] text-emerald-400">
                    {article.category}
                  </p>

                  <h3 className="mt-2 text-sm font-bold leading-6 text-white transition group-hover:text-emerald-300">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    {article.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-[10px] text-gray-500">
                    <span>{article.read}</span>

                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
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

      {/* Footer */}
      <section className="px-5 py-9 text-center">
        <BookOpen size={23} className="mx-auto text-emerald-400" />

        <h2 className="mt-3 text-xl font-extrabold sm:text-2xl">
          Keep Learning With GoalSense
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-gray-400">
          Explore more football knowledge and educational resources in the
          GoalSense Insights hub.
        </p>

        <Link
          href="/insights"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-xs font-bold text-black transition hover:bg-emerald-400"
        >
          <ArrowLeft size={14} />
          Back to Insights
        </Link>
      </section>
    </main>
  );
}
