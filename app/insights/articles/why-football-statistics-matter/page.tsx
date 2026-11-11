
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Clock,
  TrendingUp,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Why Football Statistics Matter When Analysing Matches | GoalSense",
  description:
    "Learn how football statistics, historical results and team form help explain performances on the pitch.",
};

const sections = [
  {
    number: "01",
    title: "Understanding Team Form",
    paragraphs: [
      "Team form describes a team's recent performances over a selected number of matches. It is commonly represented by wins, draws and losses.",
      "For example, a sequence of three wins, one draw and one loss provides a quick summary of five recent results. However, the opponents, competition and match circumstances also matter.",
    ],
  },
  {
    number: "02",
    title: "Goals Scored and Goals Conceded",
    paragraphs: [
      "Goals scored show how many times a team has found the net, while goals conceded show how many goals its opponents have scored.",
      "Looking at both figures gives a broader picture of a team's attacking and defensive performances. It is also useful to compare home and away records separately.",
    ],
  },
  {
    number: "03",
    title: "Historical Results",
    paragraphs: [
      "Historical results help provide context about previous performances. They can show how teams have performed across different periods and competitions.",
      "However, previous meetings should not be viewed in isolation. Squads, managers, tactics and other circumstances can change significantly between matches.",
    ],
  },
  {
    number: "04",
    title: "Looking Beyond One Statistic",
    paragraphs: [
      "No single statistic tells the complete story of a football match. Possession, shots, shots on target, corners and defensive records each describe different aspects of performance.",
      "Combining several relevant statistics usually provides better context than relying on one number alone.",
    ],
  },
];

const relatedArticles = [
  {
    category: "FOOTBALL ANALYSIS",
    title: "How to Interpret Team Form and Historical Results",
    description:
      "Understand recent team form, home and away records, and historical football results.",
    href: "/insights/articles/how-to-interpret-team-form",
    read: "5 min read",
    icon: TrendingUp,
  },
  {
    category: "MARKET EDUCATION",
    title: "Understanding Common Football Markets",
    description:
      "A beginner-friendly introduction to common football market terminology.",
    href: "/insights/articles/understanding-common-football-markets",
    read: "4 min read",
    icon: BookOpen,
  },
];

export default function FootballStatisticsArticle() {
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
            <BarChart3 size={15} />
            FOOTBALL STATISTICS
          </div>

          <h1 className="mt-7 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Why Football Statistics Matter When Analysing Matches
          </h1>

          <p className="mt-6 text-base leading-8 text-gray-400 sm:text-lg">
            Football is more than what happens during 90 minutes. Statistics
            help us understand team performances, identify patterns and put
            match results into context.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-6 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-emerald-400" />
              GoalSense Insights
            </span>

            <span className="flex items-center gap-2">
              <Clock size={15} className="text-emerald-400" />
              5 min read
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
            Football statistics provide a way to understand what happens
            on the pitch beyond the final score. They help describe how
            teams perform, how frequently they score and how their
            performances change over time.
          </p>

          <p className="mt-5 text-base leading-8 text-gray-300">
            Whether you follow domestic leagues or international
            competitions, learning to read football data can make watching
            and discussing the game more informative.
          </p>
        </section>

        {/* Article Sections */}
        <div className="space-y-14">
          {sections.map((section) => (
            <section
              key={section.number}
              className="border-t border-white/10 pt-8"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-sm font-black text-emerald-400">
                  {section.number}
                </span>

                <h2 className="text-xl font-bold leading-tight sm:text-2xl">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-5 text-[15px] leading-8 text-gray-300 sm:text-base">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* GoalSense Perspective */}
        <section className="mt-16 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-7 sm:p-9">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
            <TrendingUp size={24} />
          </div>

          <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">
            THE GOALSENSE PERSPECTIVE
          </p>

          <h2 className="mt-3 text-2xl font-extrabold">
            Making Football Data Easier to Understand
          </h2>

          <p className="mt-5 leading-8 text-gray-300">
            At GoalSense, football data is an important part of understanding
            the game. Our Insights hub is designed to make statistics and
            football concepts easier to explore and understand.
          </p>
        </section>

        {/* Key Takeaway */}
        <section className="mt-14 border-l-2 border-emerald-400 pl-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-400">
            <ShieldCheck size={16} />
            KEY TAKEAWAY
          </div>

          <h2 className="text-xl font-bold">
            Statistics provide context, not certainty.
          </h2>

          <p className="mt-4 leading-8 text-gray-400">
            Football statistics are useful tools for describing performance
            and identifying patterns. They should always be considered
            alongside match context, and they cannot guarantee what will
            happen in a future game.
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
            href="/insights/articles/understanding-common-football-markets"
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
