
import Link from "next/link";
import {
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: ChartBarIcon,
    title: "Football Statistics",
    description: "Explore team performance, match records and football data.",
  },
  {
    icon: SparklesIcon,
    title: "Daily Updates",
    description: "Discover fixtures and information from multiple competitions.",
  },
  {
    icon: TrophyIcon,
    title: "League Coverage",
    description: "Follow football competitions and teams from around the world.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Simple Experience",
    description: "A clean platform designed for easy navigation and discovery.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080d12] text-white">

      {/* HERO */}
      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center sm:py-16">

          <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
            About GoalSense
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Football, Data &{" "}
            <span className="text-emerald-400">Insights.</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Discover a smarter way to explore football through fixtures,
            statistics, technology and educational resources.
          </p>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mx-auto max-w-6xl px-5 py-9 sm:py-12">
        <div className="grid gap-3 md:grid-cols-2">

          <div className="rounded-xl border border-white/[0.07] bg-[#101820] p-5 sm:p-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
              Our Mission
            </span>

            <h2 className="mt-2 text-lg font-bold text-white">
              Making Football Information Accessible
            </h2>

            <p className="mt-2 text-xs leading-6 text-gray-400 sm:text-sm">
              GoalSense brings football fixtures, statistics and useful
              insights together in one convenient platform.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/15 bg-gradient-to-br from-[#10201b] to-[#0c1415] p-5 sm:p-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
              Our Vision
            </span>

            <h2 className="mt-2 text-lg font-bold text-white">
              Building a Better Football Experience
            </h2>

            <p className="mt-2 text-xs leading-6 text-gray-400 sm:text-sm">
              We aim to create a leading football information destination
              through technology, analytics and continuous improvement.
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-white/[0.06] bg-[#0b1118] py-9 sm:py-12">
        <div className="mx-auto max-w-6xl px-5">

          <div className="mb-6 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
              The GoalSense Experience
            </span>

            <h2 className="mt-2 text-2xl font-extrabold text-white">
              Explore What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-white/[0.07] bg-[#111a22] p-4 transition-colors hover:border-emerald-400/25"
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

        </div>
      </section>

      {/* RESPONSIBLE USE */}
      <section className="mx-auto max-w-6xl px-5 py-7">
        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
          <ShieldCheckIcon className="h-5 w-5 shrink-0 text-emerald-400" />

          <div>
            <h2 className="text-xs font-bold text-white">
              Responsible Use & Transparency
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-400">
              Football information and statistical analysis are
              informational resources. Predictions cannot guarantee
              match outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-3">
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-[#101820] p-5 text-center sm:flex-row sm:text-left">

          <div>
            <h2 className="text-base font-bold text-white">
              Discover more of GoalSense
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Explore our football insights and educational resources.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/insights"
              className="rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-emerald-400"
            >
              Explore Insights
            </Link>

            <Link
              href="/"
              className="rounded-lg border border-white/10 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-emerald-400/30 hover:text-emerald-400"
            >
              Homepage
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
