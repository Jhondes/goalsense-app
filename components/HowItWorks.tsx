export default function HowItWorks() {
  const steps = [
    {
      icon: "📅",
      step: "STEP 1",
      title: "Choose Fixtures",
      description:
        "Select the date you want predictions for. GoalSense automatically loads today's available football matches.",
    },
    {
      icon: "🎯",
      step: "STEP 2",
      title: "Select Market",
      description:
        "Choose your preferred betting market including Over 1.5, Over 2.5, BTTS or Match Winner.",
    },
    {
      icon: "⚙️",
      step: "STEP 3",
      title: "Customize Slip",
      description:
        "Choose your number of picks and use filters like Lucky Slip, Mixed Markets and Target Odds.",
    },
    {
      icon: "🚀",
      step: "STEP 4",
      title: "Generate & Save",
      description:
        "Generate your football predictions instantly, then save, copy or share your accumulator slip anytime.",
    },
  ];

  return (
    <section className="relative z-10 mt-16 mx-auto max-w-6xl rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black p-6 md:p-10">

      {/* Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center">

        <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
          ⚡ Quick Start
        </span>

        <h2 className="mt-5 text-[2rem] sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          How GoalSense Works
        </h2>

        <p className="mt-3 text-sm sm:text-base leading-7 text-gray-400">
          Generate football predictions in just four simple steps.
          Choose today's fixtures, customize your betting preferences,
          and receive your accumulator slip in seconds.
        </p>

      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {steps.map((step) => (
          <div
            key={step.step}
            className="group relative overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10"
          >
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-500/5 blur-3xl transition-all duration-500 group-hover:bg-green-500/15" />

            <div className="relative flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-2xl transition-transform duration-300 group-hover:scale-110">
                {step.icon}
              </div>

              <div>

                <span className="inline-block rounded-full bg-green-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-green-400">
                  {step.step}
                </span>

                <h3 className="mt-2 text-lg font-semibold text-gray-100">
                  {step.title}
                </h3>

              </div>

            </div>

            <p className="mt-5 text-sm leading-7 text-gray-300 md:text-[15px]">
              {step.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}