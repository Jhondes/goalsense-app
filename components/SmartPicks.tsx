"use client";

import { Lock, Sparkles } from "lucide-react";

type SmartPick = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  market: string;
  strength: "Very Strong" | "Strong" | "Moderate";
};

interface SmartPicksProps {
  isPremium: boolean;
  picks?: SmartPick[];
}

export default function SmartPicks({
  isPremium,
  picks = [],
}: SmartPicksProps) {
  if (!isPremium) {
    return (
      <section className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/80 p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
            <Sparkles className="h-5 w-5 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Smart Picks
            </h2>
            <p className="text-sm text-zinc-400">
              GoalSense premium match analysis
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
          <Lock className="mx-auto mb-3 h-6 w-6 text-zinc-500" />

          <h3 className="font-semibold text-white">
            Premium Feature
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
            Smart Picks highlights selected matches using GoalSense's
            premium analysis.
          </p>

          <button
            type="button"
            className="mt-4 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
          >
            Unlock Premium
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/80 p-5 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
            <Sparkles className="h-5 w-5 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Smart Picks
            </h2>

            <p className="text-sm text-zinc-400">
              GoalSense premium analysis
            </p>
          </div>
        </div>

        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          PREMIUM
        </span>
      </div>

      {picks.length === 0 ? (
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <p className="text-sm text-zinc-400">
            No Smart Picks are available for the selected date.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {picks.map((pick) => (
            <div
              key={pick.id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-zinc-500">
                    {pick.league}
                  </p>

                  <h3 className="mt-1 font-semibold text-white">
                    {pick.homeTeam} vs {pick.awayTeam}
                  </h3>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    pick.strength === "Very Strong"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : pick.strength === "Strong"
                      ? "bg-blue-400/10 text-blue-400"
                      : "bg-yellow-400/10 text-yellow-400"
                  }`}
                >
                  {pick.strength}
                </span>
              </div>

              <div className="mt-3 border-t border-white/5 pt-3">
                <p className="text-sm text-zinc-300">
                  {pick.market}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}