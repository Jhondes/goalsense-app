"use client";

import { useEffect, useMemo, useState } from "react";

type VaultStatsResponse = {
  totalMatches: number;
  leagues: number;
  markets: number;
  lastUpdated: string | null;
};

export default function VaultStats() {
  const [stats, setStats] = useState<VaultStatsResponse>({
    totalMatches: 0,
    leagues: 0,
    markets: 0,
    lastUpdated: null,
  });

  const [displayCount, setDisplayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadStats() {
    try {
      const res = await fetch("/api/vault/stats", {
        cache: "no-store",
      });

      const data = await res.json();

      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();

    // Refresh every minute so users
    // automatically see new uploads.
    const interval = setInterval(loadStats, 60000);

    return () => clearInterval(interval);
  }, []);

  // Animated counter
  useEffect(() => {
    const target = stats.totalMatches;

    if (target <= 0) {
      setDisplayCount(0);
      return;
    }

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 60));

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      setDisplayCount(current);
    }, 20);

    return () => clearInterval(timer);
  }, [stats.totalMatches]);

  // Progress bar
  const progress = useMemo(() => {
    const goal = 1000;

    return Math.min((stats.totalMatches / goal) * 100, 100);
  }, [stats.totalMatches]);

  const lastUpdated = useMemo(() => {
    if (!stats.lastUpdated) return "Waiting for first upload";

    return new Date(stats.lastUpdated).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, [stats.lastUpdated]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-[#0b1220] via-[#10161f] to-[#0c1117] p-8 shadow-2xl">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_45%)]" />

      <div className="relative">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <p className="text-sm uppercase tracking-[0.35em] text-green-400">
              GoalSense Vault
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-black text-white">
              {loading ? "..." : displayCount.toLocaleString()}
            </h2>

            <p className="mt-2 text-gray-400">
              Matches Available Right Now
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

            <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-300 font-semibold">
              LIVE DATABASE
            </span>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm text-gray-400">

            <span>GOALSENSE VAULT</span>

            <span>{progress.toFixed(0)}%</span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-[#202630]">

            <div
  className="vault-progress relative h-full rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 transition-all duration-700"
  style={{
    width: `${progress}%`,
  }}
>
  <span className="vault-shimmer" />
</div>

          </div>

        </div>

        {/* Cards */}

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-white/5 bg-white/5 p-5">

            <p className="text-sm text-gray-400">
              🌍 Leagues
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {stats.leagues}
            </h3>

          </div>

          <div className="rounded-2xl border border-white/5 bg-white/5 p-5">

            <p className="text-sm text-gray-400">
              🎯 Markets
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {stats.markets}
            </h3>

          </div>

          <div className="rounded-2xl border border-white/5 bg-white/5 p-5">

            <p className="text-sm text-gray-400">
              🕒 Last Update
            </p>

            <p className="mt-2 font-semibold text-white">
              {lastUpdated}
            </p>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-4">

          <p className="text-green-300 font-semibold">
            📦 Fresh football matches are uploaded regularly.
            Visit often so you never miss newly available fixtures.
          </p>

        </div>

      </div>

    </section>
  );
}