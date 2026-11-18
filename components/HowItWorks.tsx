
export default function HowItWorks() {
  const steps = [
    {
      icon: "📅",
      number: "01",
      title: "Choose Fixtures",
      description:
        "Select the date you want predictions for. GoalSense automatically loads today's available football matches.",
    },
    {
      icon: "📊",
      number: "02",
      title: "Select Market",
      description:
        "Choose your preferred betting market including Over 1.5, Over 2.5, BTTS or Match Winner.",
    },
    {
      icon: "💡",
      number: "03",
      title: "Customize Slip",
      description:
        "Choose your number of picks and use filters like Lucky Slip, Mixed Markets and Target Odds.",
    },
    {
      icon: "⚽",
      number: "04",
      title: "Generate SmartSlip",
      description:
        "Generate your smart football predictions instantly",
    },
  ];

  return (
    <section className="relative z-10 mx-auto mt-12 max-w-6xl rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#111827] via-[#0d1421] to-[#080d17] px-5 py-8 sm:px-8 sm:py-10 md:mt-16 md:px-10">

      {/* HEADER */}
      <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">

        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          <span>⚡</span>
          QUICK START
        </span>

        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
          How GoalSense Works
        </h2>

        

      </div>

      {/* STEP CARDS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">

        {steps.map((step, index) => (
          <div
            key={step.number}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.035] sm:p-5"
          >

            {/* SUBTLE GLOW */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/[0.04] blur-3xl transition-all duration-500 group-hover:bg-emerald-400/[0.10]" />

            <div className="relative flex items-center gap-3">

              {/* ICON */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.07] text-xl transition-transform duration-300 group-hover:scale-105">
                {step.icon}
              </div>

              {/* TITLE */}
              <div className="min-w-0 flex-1">

                <span className="text-[9px] font-bold tracking-[0.18em] text-emerald-400/80">
                  STEP {step.number}
                </span>

                <h3 className="mt-0.5 text-base font-bold tracking-tight text-gray-100 sm:text-lg">
                  {step.title}
                </h3>

              </div>

              {/* NUMBER */}
              <span className="text-2xl font-black tracking-tighter text-white/[0.06]">
                {step.number}
              </span>

            </div>

            {/* DESCRIPTION */}
            <p className="relative mt-4 text-[13px] leading-6 text-gray-400 sm:text-sm">
              {step.description}
            </p>

            {/* BOTTOM ACCENT */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-transparent transition-all duration-500 group-hover:w-full" />

          </div>
        ))}

      </div>

      {/* FOOTER ACCENT */}
      <div className="mt-7 flex items-center justify-center gap-2">
  <span className="h-px w-5 shrink-0 bg-white/10 sm:w-8" />

  <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.12em] text-gray-500 sm:text-[9px] sm:tracking-[0.2em]">
    Football insights. Smarter understanding.
  </span>

  <span className="h-px w-5 shrink-0 bg-white/10 sm:w-8" />
</div>

    </section>
  );
}
