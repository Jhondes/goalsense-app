import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function AboutSection() {
  return (
    <section className="border-t border-white/10 bg-[#0b1220] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#111827] to-[#0f172a] p-10 md:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left */}
            <div>
              <span className="rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-semibold text-emerald-400">
                About GoalSense
              </span>

              <h2 className="mt-5 text-4xl font-bold text-white">
                Smarter Football Predictions,
                <span className="text-emerald-400"> Powered by Data.</span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                GoalSense helps football bettors make better decisions through
                intelligent data analysis instead of guesswork.
              </p>

              <p className="mt-4 leading-8 text-gray-400">
                Every prediction is generated using football statistics, team
                form, historical performance and market trends to deliver
                reliable betting opportunities across multiple leagues.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
              >
                Learn More
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>

            {/* Right */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h3 className="text-3xl font-bold text-emerald-400">
                  100%
                </h3>

                <p className="mt-2 text-gray-400">
                  Data-driven predictions
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h3 className="text-3xl font-bold text-sky-400">
                  Daily
                </h3>

                <p className="mt-2 text-gray-400">
                  Updated football matches
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h3 className="text-3xl font-bold text-yellow-400">
                  Premium
                </h3>

                <p className="mt-2 text-gray-400">
                  Advanced betting markets
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h3 className="text-3xl font-bold text-purple-400">
                  Multi-League
                </h3>

                <p className="mt-2 text-gray-400">
                  Coverage across top competitions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}