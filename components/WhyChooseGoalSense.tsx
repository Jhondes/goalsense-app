
export default function WhyChooseGoalSense() {
  const features = [
  {
    icon: "⚽",
    title: "Smart Predictions",
    label: "MATCH INSIGHTS",
    description: "Generate football predictions instantly using GoalSense's intelligent match selection and filtering system.",
  },
  {
    icon: "⚡",
    title: "Fast & Easy",
    label: "SIMPLE EXPERIENCE",
    description: "Build your accumulator slip in seconds. No complicated setup or endless searching for matches.",
  },
  {
    icon: "📊",
    title: "Premium Features",
    label: "ADVANCED TOOLS",
    description: "Unlock advanced betting markets, more picks, Lucky Slip, Mixed Markets and additional powerful tools.",
  },
  {
    icon: "🎓",
    title: "Football Education",
    label: "LEARNING HUB",
    description: "Learn through football guides, quizzes and easy-to-understand explanations.",
  },

  ];

  return (
    <section className="relative z-10 mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#090d15] to-[#111827] px-4 py-7 sm:px-8 sm:py-9 md:mt-12 md:px-10">

      {/* HEADER */}
      <div className="mx-auto mb-7 max-w-2xl text-center">

        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.07] px-4 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          ⭐ WHY GOALSENSE?
        </span>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Why Choose GoalSense
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-gray-400 sm:text-sm">
          Designed for football fans who want a faster, smarter and more
          organized way to generate betting slips.
        </p>

      </div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#1c293a] to-[#141e2c] p-4 transition-all duration-300 hover:border-emerald-500/30 sm:p-5"
          >

            {/* SUBTLE GLOW */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-400/[0.05] blur-2xl transition-all duration-300 group-hover:bg-emerald-400/[0.10]" />

            <div className="relative flex items-center gap-3">

              {/* ICON */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.07] text-lg">
                {feature.icon}
              </div>

              {/* TITLE */}
              <div className="min-w-0">
                <h3 className="text-sm font-bold tracking-tight text-white sm:text-base">
                  {feature.title}
                </h3>

                <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-widest text-emerald-400/70">
                  {feature.label}
                </span>
              </div>

            </div>

            {/* DESCRIPTION */}
            <p className="relative mt-3 text-[11px] leading-[1.6] text-gray-400 sm:text-sm">
              {feature.description}
            </p>

            {/* BOTTOM ACCENT */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400/60 transition-all duration-500 group-hover:w-full" />

          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="h-px w-6 bg-white/10" />

        <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.12em] text-gray-500">
          FOOTBALL. STATISTICS. INSIGHTS.
        </span>

        <span className="h-px w-6 bg-white/10" />
      </div>

    </section>
  );
}