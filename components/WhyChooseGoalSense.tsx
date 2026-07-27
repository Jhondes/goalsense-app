export default function WhyChooseGoalSense() {
  const features = [
    {
      icon: "🎯",
      title: "Smart Predictions",
      description:
        "Generate football predictions instantly using GoalSense's intelligent match selection and filtering system.",
    },
    {
      icon: "⚡",
      title: "Fast & Easy",
      description:
        "Build your accumulator slip in seconds. No complicated setup or endless searching for matches.",
    },
    {
      icon: "💎",
      title: "Premium Features",
      description:
        "Unlock advanced betting markets, more picks, Lucky Slip, Mixed Markets and additional powerful tools.",
    },
  ];

  return (
    <section className="relative z-10 mt-16 mx-auto max-w-6xl rounded-3xl border border-gray-800 bg-gradient-to-b from-black to-gray-900 p-6 md:p-10">

      {/* Heading */}
      <div className="mx-auto mb-12 max-w-3xl text-center">

        <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          ⭐ Why GoalSense?
        </span>

        <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
          Why Choose GoalSense
        </h2>

        <p className="mt-4 text-sm sm:text-base leading-7 text-gray-400">
          Designed for football fans who want a faster, smarter and more
          organized way to generate betting slips.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-3">

        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10"
          >

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-3xl transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>

            <h3 className="text-lg font-semibold text-white">
              {feature.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-gray-300">
              {feature.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}