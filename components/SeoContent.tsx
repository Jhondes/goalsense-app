export default function SeoContent() {
  return (
    <section className="relative z-10 py-12">
      <div className="max-w-5xl mx-auto rounded-2xl border border-gray-800 bg-gray-900/70 backdrop-blur p-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Football Prediction Generator for Today's Matches
        </h2>

        <p className="text-gray-300 leading-8">
          <span className="text-green-400 font-semibold">GoalSense</span> helps
          football fans generate intelligent accumulator slips using today's
          fixtures from Europe's biggest leagues. Filter matches by
          competition, betting market, and match date to create smarter betting
          slips in seconds.
        </p>

        <p className="text-gray-300 leading-8 mt-4">
          Whether you're looking for{" "}
          <span className="text-green-400 font-medium">Over 1.5 Goals</span>,{" "}
          <span className="text-green-400 font-medium">Over 2.5 Goals</span>,{" "}
          <span className="text-green-400 font-medium">BTTS (Both Teams To Score)</span>,{" "}
          <span className="text-green-400 font-medium">Home Wins</span>,{" "}
          <span className="text-green-400 font-medium">Away Wins</span>, or
          mixed football markets, GoalSense helps organize your selections into
          easy-to-share betting slips.
        </p>

        <p className="text-gray-300 leading-8 mt-4">
          Our football prediction generator supports competitions including the
          Premier League, UEFA Champions League, La Liga, Serie A,
          Bundesliga, Ligue 1, Eredivisie, and many more, helping you discover
          today's football betting opportunities quickly.
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">

          <div className="rounded-lg border border-green-500/20 bg-black/20 p-4">
            <p className="text-2xl">⚽</p>
            <p className="text-sm text-gray-300 mt-2">
              Daily Football Fixtures
            </p>
          </div>

          <div className="rounded-lg border border-green-500/20 bg-black/20 p-4">
            <p className="text-2xl">🎯</p>
            <p className="text-sm text-gray-300 mt-2">
              Smart Bet Generator
            </p>
          </div>

          <div className="rounded-lg border border-green-500/20 bg-black/20 p-4">
            <p className="text-2xl">📊</p>
            <p className="text-sm text-gray-300 mt-2">
              League Filters
            </p>
          </div>

          <div className="rounded-lg border border-green-500/20 bg-black/20 p-4">
            <p className="text-2xl">🚀</p>
            <p className="text-sm text-gray-300 mt-2">
              Instant Slip Builder
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}