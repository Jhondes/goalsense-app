
import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDaysIcon,
  ChartBarIcon,
  TrophyIcon,
  BookOpenIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import PredictionLinks from "@/components/PredictionLinks";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Today's Football Predictions & Match Insights | GoalSense",
  description:
    "Explore today's football fixtures, team statistics, competition information and football insights with GoalSense.",
  keywords: [
    "today football fixtures",
    "football statistics today",
    "football match insights",
    "today football matches",
    "football competitions",
    "GoalSense",
  ],
  alternates: {
    canonical: "https://goalsense.live/today-football-predictions",
  },
};

const features = [
  {
    icon: CalendarDaysIcon,
    title: "Daily Fixtures",
    description:
      "Explore scheduled football matches and upcoming fixtures.",
  },
  {
    icon: ChartBarIcon,
    title: "Match Statistics",
    description:
      "Discover team records, historical performance and match data.",
  },
  {
    icon: TrophyIcon,
    title: "League Coverage",
    description:
      "Follow competitions and teams from different football leagues.",
  },
  {
    icon: BookOpenIcon,
    title: "Football Insights",
    description:
      "Learn more through football guides, explanations and quizzes.",
  },
];

export default function TodayFootballPredictions() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "https://goalsense.live",
          },
          {
            name: "Today's Football Predictions",
            url: "https://goalsense.live/today-football-predictions",
          },
        ]}
      />

      <ArticleSchema
        headline="Today's Football Predictions"
        description="Explore football fixtures, statistics, competition information and match insights with GoalSense."
        url="https://goalsense.live/today-football-predictions"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
      />

      <main className="min-h-screen bg-[#080d12] text-white">

        <div className="mx-auto max-w-5xl px-5 py-7 sm:py-10">

          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Today's Football Predictions" },
            ]}
          />

          {/* HERO */}
          <section className="mb-8 mt-6 rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-[#10201b] via-[#0c1518] to-[#080d12] p-5 sm:p-7">

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
              GOALSENSE FOOTBALL CENTRE
            </span>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              Today's Football{" "}
              <span className="text-emerald-400">Predictions</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
              Explore football fixtures, team statistics, competition
              information and useful match insights in one place.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/insights/football-statistics"
                className="rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-emerald-400"
              >
                Explore Statistics
              </Link>

              <Link
                href="/insights"
                className="rounded-lg border border-white/10 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-emerald-400/30 hover:text-emerald-400"
              >
                Football Insights
              </Link>
            </div>
          </section>

          {/* INTRODUCTION */}
          <section className="mb-9">
            <h2 className="mb-2 text-lg font-bold text-white">
              Football Information in One Place
            </h2>

            <p className="text-xs leading-6 text-gray-400 sm:text-sm">
              GoalSense brings together football fixtures, statistics and
              competition information through a simple, accessible
              platform. Whether you're following today's matches or
              exploring historical team performance, our goal is to make
              football information easier to discover.
            </p>
          </section>

          {/* FEATURES */}
          <section className="mb-9">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                Explore GoalSense
              </span>

              <h2 className="mt-1 text-xl font-extrabold">
                What You Can Discover
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-[#101820] p-4 transition hover:border-emerald-400/25"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-400/[0.08]">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FOOTBALL ANALYSIS */}
          <section className="mb-9 rounded-xl border border-white/[0.07] bg-[#101820] p-5 sm:p-6">

            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-emerald-400" />

              <h2 className="text-base font-bold text-white">
                Understanding Football Statistics
              </h2>
            </div>

            <p className="mt-3 text-xs leading-6 text-gray-400 sm:text-sm">
              Football statistics provide useful context when studying
              team performances and match history. Results, goals scored,
              goals conceded and recent form can all contribute to a
              broader understanding of the game.
            </p>

            <Link
              href="/insights/articles/why-football-statistics-matter"
              className="mt-3 inline-flex text-xs font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              Learn why football statistics matter →
            </Link>
          </section>

          {/* RESPONSIBLE INFORMATION */}
          <section className="mb-9 flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
            <ShieldCheckIcon className="h-5 w-5 shrink-0 text-emerald-400" />

            <div>
              <h2 className="text-xs font-bold text-white">
                Important Information
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Football is unpredictable. Statistical information and
                predictions are educational resources, not guaranteed
                outcomes.
              </p>
            </div>
          </section>

          {/* MORE FOOTBALL CONTENT */}
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