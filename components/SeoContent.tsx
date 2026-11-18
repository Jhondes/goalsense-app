
export default function SeoContent() {
  const features = [
    { icon: "⚽", label: "Daily Fixtures" },
    { icon: "📊", label: "Football Statistics" },
    { icon: "🏆", label: "League Coverage" },
    { icon: "🎓", label: "Football Insights" },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-7 sm:py-9">

      <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#111827] to-[#090e18] p-5 shadow-lg sm:p-7">

        {/* HEADER */}
        <div className="mb-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400">
            ABOUT GOALSENSE
          </span>

          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Your Football Information Hub
          </h2>
        </div>

        {/* DESCRIPTION */}
        <div className="max-w-4xl space-y-3 text-[12px] leading-6 text-gray-400 sm:text-sm sm:leading-7">

          <p>
            <span className="font-semibold text-emerald-400">
              GoalSense
            </span>{" "}
            brings football fixtures, competition information,
            statistics and educational resources together in one
            convenient platform.
          </p>

          <p>
            Explore major competitions including the Premier League,
            UEFA Champions League, La Liga, Serie A, Bundesliga
            and Ligue 1. Discover team information, football
            statistics and useful match insights.
          </p>

          <p>
            Whether you're following today's fixtures or learning
            more about football statistics, GoalSense makes
            football information easier to explore.
          </p>

        </div>

        {/* FEATURE GRID */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">

          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-3 transition-colors hover:border-emerald-500/20"
            >
              <span className="text-lg">
                {feature.icon}
              </span>

              <span className="text-[10px] font-medium text-gray-300 sm:text-xs">
                {feature.label}
              </span>
            </div>
          ))}

        </div>

        {/* FOOTER */}
        <div className="mt-5 flex items-center gap-2">
          <div className="h-px flex-1 bg-white/[0.07]" />

          <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.15em] text-gray-500">
            DISCOVER GOALSENSE
          </span>

          <div className="h-px flex-1 bg-white/[0.07]" />
        </div>

      </div>
    </section>
  );
}
