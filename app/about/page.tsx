import Link from "next/link";
import {
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f1117] text-white">
      {/* Hero */}
      <section className="border-b border-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="text-5xl font-bold">
            About <span className="text-emerald-400">GoalSense</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Smarter football predictions powered by data, statistics and
            intelligent analysis.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">
              Our Mission
            </h2>

            <p className="leading-8 text-gray-400">
              GoalSense was created to help football bettors make smarter
              decisions through reliable data analysis instead of guesswork.
            </p>

            <p className="mt-5 leading-8 text-gray-400">
              Every prediction is generated from football statistics, recent
              team performances, market trends and league data to provide users
              with quality betting opportunities.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-8">
            <h3 className="mb-4 text-2xl font-semibold text-emerald-400">
              Our Vision
            </h3>

            <p className="leading-8 text-gray-400">
              We aim to become one of Africa's leading football prediction
              platforms by combining technology, analytics and a seamless user
              experience.
            </p>

            <p className="mt-5 leading-8 text-gray-400">
              As GoalSense grows, users can expect smarter prediction models,
              more football markets, improved analytics and additional premium
              tools.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#151922] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-14 text-center text-3xl font-bold">
            Why Choose GoalSense?
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-800 bg-[#1c212b] p-8">
              <ChartBarIcon className="mb-5 h-12 w-12 text-emerald-400" />

              <h3 className="mb-3 text-xl font-semibold">
                Data Driven
              </h3>

              <p className="text-gray-400">
                Predictions generated using statistics, trends and match
                analysis.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#1c212b] p-8">
              <SparklesIcon className="mb-5 h-12 w-12 text-yellow-400" />

              <h3 className="mb-3 text-xl font-semibold">
                Daily Predictions
              </h3>

              <p className="text-gray-400">
                Fresh football matches updated every day across multiple
                leagues.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#1c212b] p-8">
              <TrophyIcon className="mb-5 h-12 w-12 text-sky-400" />

              <h3 className="mb-3 text-xl font-semibold">
                Premium Markets
              </h3>

              <p className="text-gray-400">
                Unlock BTTS, Over 2.5, Team Goals, Home Wins, Away Wins and
                more.
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#1c212b] p-8">
              <ShieldCheckIcon className="mb-5 h-12 w-12 text-green-400" />

              <h3 className="mb-3 text-xl font-semibold">
                Reliable Platform
              </h3>

              <p className="text-gray-400">
                Built with performance, simplicity and reliability in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Premium */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          What We Offer
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-8">
            <h3 className="mb-6 text-2xl font-bold text-emerald-400">
              Free
            </h3>

            <ul className="space-y-4 text-gray-300">
              <li>✅ Over 1.5 Goals</li>
              <li>✅ Daily Predictions</li>
              <li>✅ Multiple Leagues</li>
              <li>✅ Prediction Generator</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500 bg-[#161b22] p-8">
            <h3 className="mb-6 text-2xl font-bold text-yellow-400">
              Premium
            </h3>

            <ul className="space-y-4 text-gray-300">
              <li>⭐ Over 2.5 Goals</li>
              <li>⭐ BTTS</li>
              <li>⭐ Home Wins</li>
              <li>⭐ Away Wins</li>
              <li>⭐ Team Goals Markets</li>
              <li>⭐ More Daily Picks</li>
              <li>⭐ Higher Pick Limits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-y border-gray-800 bg-[#151922]">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Responsible Betting
          </h2>

          <p className="mx-auto max-w-4xl leading-8 text-gray-400">
            GoalSense provides football predictions for informational purposes
            only. While our predictions are generated using data analysis, no
            betting outcome is ever guaranteed. Please gamble responsibly and
            never bet more than you can afford to lose.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-emerald-500 bg-gradient-to-r from-emerald-600 to-green-500 px-8 py-16 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Start Winning Smarter?
          </h2>

          <p className="mt-5 text-lg text-white/90">
            Join GoalSense today and discover football predictions backed by
            intelligent analysis.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              href="/"
              className="rounded-xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              Generate Predictions
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl border border-white px-8 py-4 font-bold transition hover:bg-white hover:text-black"
            >
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}