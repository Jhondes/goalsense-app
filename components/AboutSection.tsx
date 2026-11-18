
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function AboutSection() {
  const highlights = [
    {
      value: "Daily",
      label: "Football Fixtures",
      color: "text-emerald-400",
    },
    {
      value: "Multiple",
      label: "League Coverage",
      color: "text-sky-400",
    },
    {
      value: "Insights",
      label: "Football Education",
      color: "text-yellow-400",
    },
    {
      value: "Statistics",
      label: "Match Information",
      color: "text-purple-400",
    },
  ];

  return (
    <section className="relative z-10 border-t border-white/[0.06] bg-[#0b1220] py-9 sm:py-12">

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#111827] to-[#0c1422] p-5 sm:p-7 md:p-9">

          <div className="grid items-center gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">

            {/* LEFT CONTENT */}
            <div>

              <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                ABOUT GOALSENSE
              </span>

              <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                Discover Football
                <span className="text-emerald-400"> Beyond the Scores.</span>
              </h2>

              <p className="mt-3 max-w-xl text-xs leading-6 text-gray-400 sm:text-sm sm:leading-7">
                GoalSense brings football fixtures, statistics,
                competition information and educational resources
                together in one convenient platform.
              </p>

              <p className="mt-2 max-w-xl text-xs leading-6 text-gray-400 sm:text-sm sm:leading-7">
                Explore major football competitions, discover
                match information and learn more about the
                game through GoalSense Insights.
              </p>

              {/* ABOUT LINK */}
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 sm:text-sm"
              >
                Learn More
                <ArrowRightIcon className="h-4 w-4" />
              </Link>

            </div>

            {/* RIGHT HIGHLIGHTS */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">

              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.04] sm:p-4"
                >

                  <h3 className={`text-base font-extrabold tracking-tight sm:text-xl ${item.color}`}>
                    {item.value}
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-gray-400 sm:text-xs">
                    {item.label}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* BOTTOM ACCENT */}
          <div className="mt-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/[0.06]" />

            <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.15em] text-gray-500">
              FOOTBALL. DATA. INSIGHTS.
            </span>

            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

        </div>

      </div>

    </section>
  );
}