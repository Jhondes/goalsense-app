
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

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/[0.08] text-xs font-black text-emerald-400">
        {number}
      </span>
      <h2 className="text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
        {title}
      </h2>
    </div>
  );
}

export default function FootballStatisticsArticle() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      {/* Article Header */}
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_65%)]">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={15} />
            Back to Insights
          </Link>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-emerald-300">
            <BarChart3 size={13} />
            FOOTBALL STATISTICS
          </div>

          <h1 className="mt-4 max-w-3xl text-2xl font-black leading-tight tracking-tight sm:text-4xl">
            Why Football Statistics Matter When Analysing Matches
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-7">
            Football is more than what happens during 90 minutes. Statistics
            help us understand team performances, identify patterns and put
            match results into context.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.08] pt-4 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} className="text-emerald-400" />
              GoalSense Insights
            </span>

            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-emerald-400" />
              5 min read
            </span>

            <span className="flex items-center gap-1.5">
              <BookOpen size={13} className="text-emerald-400" />
              Educational article
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Introduction */}
        <section className="mb-8">
          <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-emerald-400">
            INTRODUCTION
          </p>

          <div className="space-y-3 text-sm leading-7 text-gray-300">
            <p>
              Football statistics provide a way to understand what happens
              on the pitch beyond the final score. They help describe how
              teams perform, how frequently they score and how their
              performances change over time.
            </p>

            <p>
              Whether you follow domestic leagues or international
              competitions, learning to read football data can make watching
              and discussing the game more informative.
            </p>
          </div>
        </section>

        {/* Article Sections */}
        <div className="space-y-7">
          {sections.map((section) => (
            <section
              key={section.number}
              className="border-t border-white/[0.08] pt-5"
            >
              <SectionHeading
                number={section.number}
                title={section.title}
              />

              <div className="space-y-3 text-sm leading-7 text-gray-400">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* GoalSense Perspective */}
        <section className="mt-9 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-[#10251a] via-[#0b1711] to-[#080d0a] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-400">
              <TrendingUp size={19} />
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-emerald-400">
                THE GOALSENSE PERSPECTIVE
              </p>

              <h2 className="mt-2 text-lg font-extrabold tracking-tight text-white sm:text-xl">
                Making Football Data Easier to Understand
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                At GoalSense, football data is an important part of understanding
                the game. Our Insights hub is designed to make statistics and
                football concepts easier to explore and understand.
              </p>
            </div>
          </div>
        </section>

        {/* Key Takeaway */}
        <section className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-emerald-400">
            <ShieldCheck size={14} />
            KEY TAKEAWAY
          </div>

          <h2 className="text-base font-bold text-white sm:text-lg">
            Statistics provide context, not certainty.
          </h2>

          <p className="mt-2 text-sm leading-7 text-gray-400">
            Football statistics are useful tools for describing performance
            and identifying patterns. They should always be considered
            alongside match context, and they cannot guarantee what will
            happen in a future game.
          </p>
        </section>

        {/* Related Articles */}
        <section className="mt-10 border-t border-white/[0.08] pt-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
              CONTINUE READING
            </p>

            <h2 className="mt-2 text-xl font-extrabold tracking-tight">
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
                  className="group rounded-xl border border-white/[0.08] bg-[#0b110e] p-4 transition duration-200 hover:border-emerald-400/30 hover:bg-[#0d1711]"
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
        </section>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-6">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={14} />
            All Insights
          </Link>

          <Link
            href="/insights/articles/understanding-common-football-markets"
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
