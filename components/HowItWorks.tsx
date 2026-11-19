
"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Choose Fixtures",
      description:
        "Select your preferred date. GoalSense automatically loads available football matches.",
      color: "#00D9B5",
    },
    {
      number: "2",
      title: "Select Market",
      description:
        "Choose your preferred market: Over 1.5, Over 2.5, BTTS or Match Winner.",
      color: "#20DCC4",
    },
    {
      number: "3",
      title: "Customize Slip",
      description:
        "Set your picks and explore Lucky Slip, Mixed Markets and Target Odds.",
      color: "#45C9D9",
    },
    {
      number: "4",
      title: "Generate Predictions",
      description:
        "Generate your football predictions instantly.",
      color: "#65B8F5",
    },
  ];

  return (
    <section className="relative z-10 mx-auto mt-6 max-w-6xl overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#111827] px-3.5 py-5 sm:mt-10 sm:rounded-3xl sm:px-7 sm:py-7 md:px-10">

      {/* HEADER */}
      <div className="mx-auto mb-5 max-w-2xl text-center">

        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          ⚡ QUICK START
        </span>

        <h2 className="mt-2.5 text-xl font-extrabold tracking-tight text-white sm:text-2xl md:text-3xl">
          How GoalSense Works
        </h2>

        <p className="mt-1.5 text-[11px] leading-5 text-gray-400 sm:text-xs">
          Generate smart football slips in four simple steps.
        </p>

      </div>

      {/* ANIMATED STEPS */}
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:gap-4">

        {steps.map((step) => (
          <motion.div
            key={step.number}
            className="group relative flex min-h-[72px] items-center touch-manipulation"
            whileTap={{
              scale: 1.035,
              filter: "brightness(1.15)",
            }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 24,
              mass: 0.7,
            }}
            style={{
              transformOrigin: "center center",
              WebkitTapHighlightColor: "transparent",
            }}
          >

            {/* NUMBER */}
            <div
              className="relative z-10 flex w-[49px] shrink-0 items-center justify-center text-[54px] font-black leading-none tracking-tighter transition-all duration-200 group-active:drop-shadow-[0_0_12px_currentColor] sm:w-[72px] sm:text-[72px]"
              style={{ color: step.color }}
            >
              {step.number}
            </div>

            {/* CARD */}
            <div
              className="relative -ml-1.5 flex min-h-[72px] flex-1 items-center overflow-hidden rounded-[19px] border border-white/[0.06] bg-gradient-to-br from-[#1c293a] to-[#182333] px-3.5 py-2.5 shadow-[3px_5px_14px_rgba(0,0,0,0.16)] transition-all duration-200 group-active:border-white/25 group-active:shadow-[0_0_25px_rgba(0,217,181,0.18)] sm:-ml-3 sm:min-h-[82px] sm:rounded-[21px] sm:px-5"
            >

              {/* TOP ACCENT */}
              <div
                className="absolute left-5 right-5 top-0 h-px opacity-40 transition-opacity duration-200 group-active:opacity-100"
                style={{ background: step.color }}
              />

              <div className="relative z-10 min-w-0">

                <h3
                  className="text-[13px] font-bold tracking-tight sm:text-base"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                <p className="mt-0.5 text-[10px] leading-[1.5] text-gray-300 sm:text-xs sm:leading-[1.6]">
                  {step.description}
                </p>

              </div>

              {/* INTERACTIVE GLOW */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-[0.05] blur-2xl transition-all duration-200 group-active:scale-150 group-active:opacity-25"
                style={{ background: step.color }}
              />

            </div>

          </motion.div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-center gap-2">

        <span className="h-px w-5 bg-white/10" />

        <span className="whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.13em] text-gray-500 sm:text-[8px]">
          FOOTBALL INSIGHTS. SMARTER UNDERSTANDING.
        </span>

        <span className="h-px w-5 bg-white/10" />

      </div>

    </section>
  );
}
