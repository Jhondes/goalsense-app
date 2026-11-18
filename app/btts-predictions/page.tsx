
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChartBarIcon,
  AcademicCapIcon,
  TrophyIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import PredictionLinks from "@/components/PredictionLinks";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "BTTS Explained: Both Teams To Score | GoalSense",
  description:
    "Understand Both Teams To Score (BTTS), football scoring statistics and match analysis with GoalSense.",
  keywords: [
    "BTTS meaning",
    "Both Teams To Score explained",
    "football scoring statistics",
    "BTTS football terminology",
    "football match analysis",
    "GoalSense",
  ],
  alternates: {
    canonical: "https://goalsense.live/btts-predictions",
  },
};

const features = [
  {
    icon: ChartBarIcon,
    title: "Scoring Statistics",
    description:
      "Explore goals scored, goals conceded and historical team records.",
  },
  {
    icon: TrophyIcon,
    title: "Football Competitions",
    description:
      "Discover teams and competitions across different football leagues.",
  },
  {
    icon: AcademicCapIcon,
    title: "Football Education",
    description:
      "Learn football terminology through simple explanations and guides.",
  },
];

const faqs = [
  {
    question: "What does BTTS mean in football?",
    answer:
      "BTTS means Both Teams To Score. It describes a match in which both competing teams score at least one goal.",
  },
  {
    question: "What is a BTTS result?",
    answer:
      "A match ending 1–1, 2–1 or 3–2 is an example of a BTTS result because both teams scored.",
  },
  {
    question: "What is a No BTTS result?",
    answer:
      "A match ending 1–0, 2–0 or 0–0 is an example of No BTTS because at least one team did not score.",
  },
  {
    question: "Why are BTTS statistics useful?",
    answer:
      "They provide historical information about how frequently teams score and concede goals. They do not predict or guarantee future results.",
  },
];

export default function BTTSPredictions() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://goalsense.live" },
          {
            name: "BTTS Predictions",
            url: "https://goalsense.live/btts-predictions",
          },
        ]}
      />

      <ArticleSchema
        headline="BTTS Explained: Both Teams To Score"
        description="Understand Both Teams To Score terminology, football scoring statistics and match analysis."
        url="https://goalsense.live/btts-predictions"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
      />

      <main className="min-h-screen bg-[#080d12] text-white">
        <div className="mx-auto max-w-5xl px-5 py-7 sm:py-10">

          {/* BREADCRUMB */}
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "BTTS Predictions" },
            ]}
          />

          {/* HERO */}
          <section className="mb-8 mt-6 rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-[#10201b] via-[#0c1518] to-[#080d12] p-5 sm:p-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
              GOALSENSE FOOTBALL EDUCATION
            </span>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              Both Teams To Score{" "}
              <span className="text-emerald-400">(BTTS)</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
              Understand BTTS football terminology, scoring patterns,
              historical team statistics and how to interpret match data.
            </p>

            <Link
              href="/insights/football-statistics"
              className="mt-5 inline-flex rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-emerald-400"
            >
              Explore Football Statistics
            </Link>
          </section>

          {/* BTTS EXPLANATION */}
          <section className="mb-8 rounded-xl border border-white/[0.07] bg-[#101820] p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <AcademicCapIcon className="h-5 w-5 text-emerald-400" />

              <h2 className="text-base font-bold text-white">
                What Does BTTS Mean?
              </h2>
            </div>

            <p className="mt-3 text-xs leading-6 text-gray-400 sm:text-sm">
              BTTS stands for <strong className="text-gray-200">Both Teams To Score</strong>.
              In football, it describes a match in which both competing
              teams score at least one goal during normal playing time.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.05] p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  BTTS example
                </span>

                <p className="mt-1 text-lg font-extrabold text-white">
                  2 – 1
                </p>

                <p className="text-[10px] text-gray-500">
                  Both teams scored
                </p>
              </div>

              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  No BTTS example
                </span>

                <p className="mt-1 text-lg font-extrabold text-white">
                  2 – 0
                </p>

                <p className="text-[10px] text-gray-500">
                  Only one team scored
                </p>
              </div>
            </div>
          </section>

          {/* STATISTICS */}
          <section className="mb-8">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                Football Analysis
              </span>

              <h2 className="mt-1 text-xl font-extrabold">
                Understanding Scoring Patterns
              </h2>
            </div>

            <p className="mb-4 text-xs leading-6 text-gray-400 sm:text-sm">
              Historical scoring records can help explain how teams perform
              in different competitions. Goals scored, goals conceded and
              previous match results provide useful context when studying
              football statistics.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-white/[0.07] bg-[#101820] p-4"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/[0.08]">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </div>

                    <h3 className="text-sm font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* EDUCATIONAL NOTE */}
          <section className="mb-8 flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
            <ShieldCheckIcon className="h-5 w-5 shrink-0 text-emerald-400" />

            <div>
              <h2 className="text-xs font-bold text-white">
                Understanding Football Statistics
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Historical statistics describe past performances.
                They cannot guarantee how a future football match will end.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8 border-t border-white/[0.07] pt-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
              Quick Answers
            </span>

            <h2 className="mb-4 mt-1 text-xl font-extrabold">
              Frequently Asked Questions
            </h2>

            <div className="divide-y divide-white/[0.07]">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-3">
                  <h3 className="text-xs font-bold text-gray-200 sm:text-sm">
                    {faq.question}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-gray-500">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* RELATED CONTENT */}
          <section className="border-t border-white/[0.07] pt-7">
            <h2 className="mb-4 text-xl font-extrabold">
              Explore More Football Guides
            </h2>

            <PredictionLinks />
          </section>

        </div>
      </main>
    </>
  );
}
