
import type { Metadata } from "next";
import Link from "next/link";
import PredictionLinks from "@/components/PredictionLinks";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Premier League Predictions Today | GoalSense",
  description:
    "Explore Premier League fixtures, football statistics, match analysis and team performance insights with GoalSense.",
  keywords: [
    "Premier League predictions today",
    "Premier League fixtures",
    "Premier League match analysis",
    "English Premier League statistics",
    "Premier League team form",
    "football predictions",
  ],
  alternates: {
    canonical: "https://goalsense.live/premier-league-predictions",
  },
  openGraph: {
    title: "Premier League Predictions Today | GoalSense",
    description:
      "Explore Premier League fixtures, team form, match statistics and football insights with GoalSense.",
    url: "https://goalsense.live/premier-league-predictions",
    type: "article",
  },
};

const faqs = [
  {
    question: "Where can I find today's Premier League fixtures?",
    answer:
      "You can explore the latest available Premier League fixtures and football information through GoalSense.",
  },
  {
    question: "What statistics are useful when analysing Premier League matches?",
    answer:
      "Goals scored, goals conceded, recent results, home and away records, and team performance trends are useful areas to examine.",
  },
  {
    question: "How many teams compete in the Premier League?",
    answer:
      "The Premier League features 20 clubs competing across a 38-match season.",
  },
  {
    question: "Does GoalSense cover Premier League football?",
    answer:
      "Yes. GoalSense provides football information and insights covering Premier League fixtures and related statistics.",
  },
];

export default function PremierLeaguePredictions() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://goalsense.live" },
          {
            name: "Premier League Predictions",
            url: "https://goalsense.live/premier-league-predictions",
          },
        ]}
      />

      <ArticleSchema
        headline="Premier League Predictions Today"
        description="Explore Premier League fixtures, football statistics, team form and match analysis with GoalSense."
        url="https://goalsense.live/premier-league-predictions"
        datePublished="2026-07-30"
        dateModified="2026-11-18"
      />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Premier League Predictions" },
          ]}
        />

        {/* HERO */}
        <section className="mb-8 mt-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              English Football
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Premier League Predictions Today
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Explore Premier League fixtures, team performance, match statistics
            and football insights. GoalSense brings useful football information
            together in one simple place.
          </p>
        </section>

        {/* INTRO */}
        <section className="mb-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white">
            About the English Premier League
          </h2>

          <p className="mt-2 text-sm leading-7 text-gray-300">
            The English Premier League is one of the world's most followed
            football competitions. It features 20 clubs competing across a
            38-match season, with each team playing home and away fixtures.
          </p>

          <p className="mt-2 text-sm leading-7 text-gray-400">
            From title challenges to the battle for European qualification,
            the competition provides plenty of interesting football stories
            and statistical trends throughout the season.
          </p>
        </section>

        {/* STATISTICS */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white">
            Premier League Statistics to Explore
          </h2>

          <p className="mt-2 text-sm leading-7 text-gray-400">
            Looking beyond the final score can provide a broader understanding
            of team performance. These are some useful areas of football analysis.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Team Form",
                description:
                  "Review recent results and how teams have performed over their latest fixtures.",
              },
              {
                title: "Goals Statistics",
                description:
                  "Explore goals scored, goals conceded and overall scoring patterns.",
              },
              {
                title: "Home & Away Records",
                description:
                  "Compare team performances across home and away matches.",
              },
              {
                title: "League Standings",
                description:
                  "Follow points, wins, draws, defeats and positions in the competition.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"
              >
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white">
            Premier League FAQs
          </h2>

          <div className="mt-3 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-gray-200">
                  {faq.question}
                  <span className="text-lg text-gray-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 pr-6 text-sm leading-6 text-gray-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* RELATED CONTENT */}
        <section className="mb-8 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
          <h2 className="text-base font-semibold text-white">
            Explore More Football Insights
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Discover more football topics and statistics on GoalSense.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <Link
              href="/today-football-predictions"
              className="text-emerald-400 transition hover:text-emerald-300"
            >
              Today's Football Fixtures →
            </Link>

            <Link
              href="/over-2.5-predictions"
              className="text-emerald-400 transition hover:text-emerald-300"
            >
              Over 2.5 Goals Explained →
            </Link>

            <Link
              href="/btts-predictions"
              className="text-emerald-400 transition hover:text-emerald-300"
            >
              BTTS Explained →
            </Link>
          </div>
        </section>

        <PredictionLinks />
      </main>
    </>
  );
}
