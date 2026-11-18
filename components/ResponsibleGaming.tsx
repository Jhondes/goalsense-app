
"use client";

import {
  ShieldCheck,
  ChartNoAxesCombined,
  Headset,
} from "lucide-react";

const sections = [
  {
    icon: ShieldCheck,
    title: "Play Responsibly",
    description:
      "Never risk money you cannot afford to lose. Take breaks and stay in control.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Prediction Disclaimer",
    description:
      "Football predictions are uncertain and cannot guarantee match outcomes.",
  },
  {
    icon: Headset,
    title: "Support & Help",
    description:
      "If gambling becomes stressful, step away and speak with someone you trust.",
  },
];

export default function ResponsibleGaming() {
  return (
    <section className="relative isolate overflow-hidden border-y border-emerald-500/15 bg-[#050807] px-4 py-6 sm:px-6 sm:py-8">

      <div className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-emerald-500/[0.05] blur-[80px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* Three compact information columns */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">

          {sections.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-start gap-3 ${
                  index !== 0
                    ? "border-t border-white/[0.07] pt-5 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0"
                    : ""
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.06]">
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className="text-emerald-400"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-white sm:text-[13px]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-[1.6] text-gray-400 sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

        {/* Compact responsible gambling notice */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-white/[0.07] pt-4 text-center">
          <ShieldCheck size={14} className="text-emerald-400" />

          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-400">
            Responsible Gambling
          </span>

          <span className="hidden text-gray-700 sm:inline">•</span>

          <p className="text-[10px] leading-5 text-gray-500">
            Predictions are informational and do not guarantee results.
          </p>
        </div>

      </div>
    </section>
  );
}
