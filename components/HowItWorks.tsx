
export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose Fixtures",
      description:
        "Select the date you want predictions for. GoalSense automatically loads today's available football matches.",
      color: "#A3E635",
    },
    {
      number: "02",
      title: "Select Market",
      description:
        "Choose your preferred betting market including Over 1.5, Over 2.5, BTTS or Match Winner.",
      color: "#34D399",
    },
    {
      number: "03",
      title: "Customize Slip",
      description:
        "Choose your number of picks and use filters like Lucky Slip, Mixed Markets and Target Odds.",
      color: "#60A5FA",
    },
    {
      number: "04",
      title: "Generate predictions",
      description:
        "Generate your smart football predictions instantly.",
      color: "#A78BFA",
    },
  ];

  return (
    <section className="relative z-10 mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border border-white/[0.07] bg-[#111827] px-4 py-10 sm:px-8 sm:py-12 md:mt-16 md:px-12">

      {/* HEADER */}
      <div className="mx-auto mb-12 max-w-2xl text-center">

        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          <span>⚡</span>
          QUICK START
        </span>

        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
          How GoalSense Works
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
          Generate smart football slips in four simple steps.
        </p>

      </div>

      {/* NUMBERED STEPS */}
      <div className="mx-auto flex max-w-4xl flex-col gap-7 sm:gap-9">

        {steps.map((step) => (
          <div
            key={step.number}
            className="group relative flex min-h-[130px] items-center"
          >

            {/* LARGE BACKGROUND NUMBER */}
            <div
              className="relative z-10 flex w-[65px] shrink-0 items-center justify-center text-[76px] font-black leading-none tracking-tighter sm:w-[105px] sm:text-[112px]"
              style={{ color: step.color }}
            >
              {Number(step.number)}
            </div>

            {/* STEP CARD */}
            <div className="relative -ml-3 flex min-h-[125px] flex-1 items-center overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-br from-[#1c293a] to-[#182333] px-5 py-5 shadow-[8px_12px_25px_rgba(0,0,0,0.20)] transition-all duration-300 group-hover:border-white/[0.12] group-hover:-translate-y-1 sm:-ml-5 sm:px-8 sm:py-6">

              {/* SUBTLE TOP BORDER */}
              <div
                className="absolute left-8 right-8 top-0 h-px opacity-30"
                style={{
                  background: step.color,
                }}
              />

              <div className="relative z-10 min-w-0">

                <h3
                  className="text-lg font-semibold tracking-tight sm:text-2xl"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                <p className="mt-2 max-w-xl text-[11px] leading-5 tracking-wide text-gray-300 sm:text-sm sm:leading-6">
                  {step.description}
                </p>

              </div>

              {/* BACKGROUND GLOW */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-[0.06] blur-3xl"
                style={{
                  background: step.color,
                }}
              />

            </div>

          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="mt-12 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-white/10" />

        <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.15em] text-gray-500 sm:text-[9px]">
          FOOTBALL INSIGHTS. SMARTER UNDERSTANDING.
        </span>

        <span className="h-px w-8 bg-white/10" />
      </div>

    </section>
  );
}
