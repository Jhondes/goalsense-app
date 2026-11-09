
"use client";

import {
  ShieldCheck,
  ChartNoAxesCombined,
  Headset,
} from "lucide-react";

const sections = [
  {
    icon: ShieldCheck,
    title: "PLAY",
    highlight: "RESPONSIBLY",
    description:
      "Bet responsibly and only wager what you can afford to lose.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "PREDICTION",
    highlight: "DISCLAIMER",
    description:
      "Football predictions are not guaranteed outcomes. Always make informed decisions.",
  },
  {
    icon: Headset,
    title: "SUPPORT",
    highlight: "& HELP",
    description:
      "If betting is causing stress, take a break and seek support from someone you trust.",
  },
];

export default function ResponsibleGaming() {
  return (
    <section className="relative isolate overflow-hidden border-y border-emerald-500/20 bg-[#050807] px-5 py-10 sm:px-8 sm:py-14">

      {/* Subtle background lighting */}
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-emerald-500/[0.06] blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-green-500/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Information sections */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-8">

          {sections.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`group flex items-start gap-4 ${
                  index !== 0
                    ? "border-t border-emerald-500/15 pt-7 md:border-l md:border-t-0 md:pl-8 md:pt-0"
                    : ""
                }`}
              >

                {/* Premium icon container */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] transition duration-300 group-hover:border-emerald-400/50 group-hover:bg-emerald-400/10 sm:h-14 sm:w-14">
                  <Icon
                    size={26}
                    strokeWidth={1.7}
                    className="text-emerald-400"
                  />
                </div>

                {/* Information */}
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-tight tracking-wide text-white sm:text-lg">
                    {item.title}
                    <span className="mt-1 block text-emerald-400">
                      {item.highlight}
                    </span>
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

        {/* Elegant divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent md:my-10" />

        {/* Responsible gambling label */}
        <div className="flex flex-col items-center gap-4 text-center">

          <div className="rounded-full border border-emerald-400/30 bg-emerald-400/[0.04] px-5 py-2.5 shadow-[0_0_25px_rgba(16,185,129,0.06)]">
            <span className="text-[11px] font-bold tracking-[0.25em] text-emerald-400 sm:text-xs">
              RESPONSIBLE GAMBLING
            </span>
          </div>

          <p className="max-w-2xl text-xs leading-6 text-gray-500 sm:text-sm">
            GoalSense promotes responsible betting and informed
            decision-making. Predictions are for informational
            purposes and do not guarantee results.
          </p>

        </div>

      </div>
    </section>
  );
}
