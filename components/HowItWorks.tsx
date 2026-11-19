
export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Choose Fixtures",
      description:
        "Select the date you want predictions for. GoalSense automatically loads today's available football matches.",
      color: "#00D9B5",
    },
    {
      number: "2",
      title: "Select Market",
      description:
        "Choose your preferred betting market including Over 1.5, Over 2.5, BTTS or Match Winner.",
      color: "#20DCC4",
    },
    {
      number: "3",
      title: "Customize Slip",
      description:
        "Choose your number of picks and use filters like Lucky Slip, Mixed Markets and Target Odds.",
      color: "#45C9D9",
    },
    {
      number: "4",
      title: "Generate predictions",
      description:
        "Generate your smart football predictions instantly.",
      color: "#65B8F5",
    },
  ];

  return (
    <section className="relative z-10 mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl border border-white/[0.07] bg-[#111827] px-4 py-7 sm:px-8 sm:py-9 md:mt-12 md:px-12">

      {/* HEADER */}
      <div className="mx-auto mb-7 max-w-2xl text-center">

        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          ⚡ QUICK START
        </span>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
          How GoalSense Works
        </h2>

        <p className="mt-2 text-xs leading-5 text-gray-400 sm:text-sm">
          Generate smart football slips in four simple steps.
        </p>

      </div>

      {/* COMPACT STEPS */}
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:gap-5">

        {steps.map((step) => (
          <div
            key={step.number}
            className="group relative flex min-h-[88px] items-center sm:min-h-[100px]"
          >

            {/* LARGE NUMBER */}
            <div
              className="relative z-10 flex w-[58px] shrink-0 items-center justify-center text-[65px] font-black leading-none tracking-tighter sm:w-[85px] sm:text-[90px]"
              style={{ color: step.color }}
            >
              {step.number}
            </div>

            {/* COMPACT CARD */}
            <div className="relative -ml-2 flex min-h-[88px] flex-1 items-center overflow-hidden rounded-[24px] border border-white/[0.06] bg-gradient-to-br from-[#1c293a] to-[#182333] px-4 py-3 shadow-[5px_8px_18px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:border-white/[0.12] sm:-ml-4 sm:min-h-[100px] sm:px-6">

              {/* TOP ACCENT */}
              <div
                className="absolute left-6 right-6 top-0 h-px opacity-40"
                style={{ background: step.color }}
              />

              <div className="relative z-10 min-w-0">

                <h3
                  className="text-[15px] font-bold tracking-tight sm:text-lg"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                <p className="mt-1 text-[11px] leading-[1.5] text-gray-300 sm:text-sm sm:leading-5">
                  {step.description}
                </p>

              </div>

              {/* SUBTLE GLOW */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-[0.06] blur-2xl"
                style={{ background: step.color }}
              />

            </div>

          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="h-px w-6 bg-white/10" />

        <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.12em] text-gray-500">
          FOOTBALL INSIGHTS. SMARTER UNDERSTANDING.
        </span>

        <span className="h-px w-6 bg-white/10" />
      </div>

    </section>
  );
}
