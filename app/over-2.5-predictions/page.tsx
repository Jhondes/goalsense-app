
import type { Metadata } from "next";
import Link from "next/link";
import PredictionLinks from "@/components/PredictionLinks";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Over 2.5 Goals Explained | GoalSense",
  description:
    "Understand Over 2.5 Goals in football, how the goal total is calculated, and how to interpret match scoring statistics.",
  keywords: [
    "over 2.5 goals explained",
    "football goal statistics",
    "over 2.5 meaning",
    "football scoring statistics",
    "football match analysis",
  ],
  alternates: {
    canonical: "https://goalsense.live/over-2.5-predictions",
  },
};

const faqs = [
  {
    question: "What does Over 2.5 Goals mean?",
    answer:
      "It describes a match with at least three goals scored by both teams combined during normal time.",
  },
  {
    question: "Does a 2–1 score reach Over 2.5?",
    answer:
      "Yes. A 2–1 score has three goals in total.",
  },
  {
    question: "Does a 2–0 score reach Over 2.5?",
    answer:
      "No. A 2–0 score has two goals in total.",
  },
  {
    question: "What statistics help explain goal trends?",
    answer:
      "Goals scored, goals conceded, recent scorelines and competition-wide scoring averages can help describe scoring patterns.",
  },
];

export default function Over25Predictions() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://goalsense.live" },
          {
            name: "Over 2.5 Goals",
            url: "https://goalsense.live/over-2.5-predictions",
          },
        ]}
      />

      <ArticleSchema
        headline="Over 2.5 Goals Explained"
        description="A football education guide explaining the Over 2.5 goals total and how to understand match scoring statistics."
        url="https://goalsense.live/over-2.5-predictions"
        datePublished="2026-07-30"
        dateModified="2026-11-18"
      />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Over 2.5 Goals" },
          ]}
        />

        {/* HERO */}
        <section className="mb-8 mt-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Football Explained
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Over 2.5 Goals in Football
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            A simple guide to understanding the three-goal total, common
            scorelines and the statistics used to study football scoring trends.
          </p>
        </section>

        {/* DEFINITION */}
        <section className="mb-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white">
            What Does Over 2.5 Goals Mean?
          </h2>

          <p className="mt-2 text-sm leading-7 text-gray-300">
            Over 2.5 refers to a combined match total of at least three goals
            scored by both teams during normal time. The half-goal figure
            means the total cannot finish exactly at 2.5.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-gray-500">Example score</p>
              <p className="mt-1 text-xl font-bold text-white">2–1</p>
              <p className="text-xs text-emerald-400">3 total goals</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-gray-500">Example score</p>
              <p className="mt-1 text-xl font-bold text-white">2–0</p>
              <p className="text-xs text-gray-400">2 total goals</p>
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white">
            Understanding Football Goal Statistics
          </h2>

          <p className="mt-2 text-sm leading-7 text-gray-400">
            Match scoring patterns can be described through several basic
            statistics. Each provides a different view of how teams and
            competitions produce goals.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Goals Scored",
                description:
                  "The number of goals a team has scored across its matches.",
              },
              {
                title: "Goals Conceded",
                description:
                  "The number of goals opponents have scored against a team.",
              },
              {
                title: "Recent Scorelines",
                description:
                  "A record of the results from a team's recent fixtures.",
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
            Frequently Asked Questions
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

        {/* RELATED PAGES */}
        <section className="mb-8 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
          <h2 className="text-base font-semibold text-white">
            Explore More Football Insights
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Discover more football topics and competition information.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <Link
              href="/today-football-predictions"
              className="text-emerald-400 transition hover:text-emerald-300"
            >
              Today's Football Fixtures →
            </Link>

            <Link
              href="/btts-predictions"
              className="text-emerald-400 transition hover:text-emerald-300"
            >
              BTTS Explained →
            </Link>

            <Link
              href="/premier-league-predictions"
              className="text-emerald-400 transition hover:text-emerald-300"
            >
              Premier League →
            </Link>
          </div>
        </section>

        <PredictionLinks />
      </main>
    </>
  );
}
