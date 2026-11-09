
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
    <section className="relative isolate overflow-hidden border-y border-green-500/20 bg-[#050807] px-5 py-12 sm:px-8 sm:py-16">

      {/* Background effects */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-green-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Three information sections */}
        <div className="grid grid-cols-1 gap-9 md:grid-cols-3 md:gap-8">

          {sections.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-start gap-5 ${
                  index !== 0
                    ? "border-t border-green-500/20 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0"
                    : ""
                }`}
              >
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10">
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className="text-green-400"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-extrabold leading-tight text-white sm:text-xl">
                    {item.title}
                    <span className="block text-green-400">
                      {item.highlight}
                    </span>
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

        {/* Footer label */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">

          <div className="rounded-full border border-green-500/40 bg-green-500/5 px-7 py-3">
            <span className="text-xs font-bold tracking-[0.3em] text-green-400 sm:text-sm">
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
