"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

  const [previousCount, setPreviousCount] = useState(0);
  const [showNewBadge, setShowNewBadge] = useState(false);
  const [newMatches, setNewMatches] = useState(0);

  const [vaultStatus, setVaultStatus] = useState(
  "Monitoring active. Waiting for new uploads..."
);

  const badgeTimer = useRef<NodeJS.Timeout | null>(null);

  async function loadStats() {
    try {
      const res = await fetch("/api/vault/stats", {
        cache: "no-store",
      });

      if (!res.ok) return;

      const data: VaultStatsResponse = await res.json();

      setStats(data);

      if (previousCount !== 0 && data.totalMatches > previousCount) {
  const added = data.totalMatches - previousCount;

  setNewMatches(added);
  setShowNewBadge(true);

  setVaultStatus(
    `${added} new match${added > 1 ? "es" : ""} successfully added to the GoalSense Vault.`
  );

  if (badgeTimer.current) {
    clearTimeout(badgeTimer.current);
  }

  badgeTimer.current = setTimeout(() => {
    setShowNewBadge(false);
    setVaultStatus("Monitoring active. Waiting for new uploads...");
  }, 6000);
}

      setPreviousCount(data.totalMatches);
      if (data.totalMatches > 0 && previousCount === 0) {
  setVaultStatus("Vault active. Monitoring for new uploads...");
}
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();

    const interval = setInterval(loadStats, 60000);

    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    return () => {
      if (badgeTimer.current) {
        clearTimeout(badgeTimer.current);
      }
    };
  }, []);

  const progress = useMemo(() => {
    const goal = 500;

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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_45%)]" />

      <div className="relative">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <p className="text-sm uppercase tracking-[0.35em] text-green-400">
              GoalSense Vault
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4">

              <h2 className="text-3xl font-black text-white md:text-5xl">
                {loading ? "..." : displayCount.toLocaleString()}
              </h2>

              {showNewBadge && (
                <span className="animate-bounce rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-green-500/40">
                  +{newMatches} NEW MATCH{newMatches > 1 ? "ES" : ""}
                </span>
              )}

            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">

              <p className="text-gray-400">
                Matches in the Vault
              </p>

              

            </div>

          </div>

          <div className="relative flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 shadow-lg shadow-green-500/10">

  <div className="relative flex h-3 w-3 items-center justify-center">

    <span className="absolute h-3 w-3 rounded-full bg-green-400 animate-ping" />

    <span className="relative h-3 w-3 rounded-full bg-green-400" />

  </div>

  <span className="font-semibold tracking-wide text-green-300">
    Vault Active
  </span>

</div>

        </div>

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm text-gray-400">

            <span>Vault Coverage</span>

            <span>{Math.round(progress)}%</span>

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

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-md shadow-xl transition duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:shadow-green-500/20">

            <p className="text-sm text-gray-400">
              🌍 Leagues
            </p>

            <h3 className="mt-2 text-3xl font-black text-white">
              {stats.leagues}
            </h3>

          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-md shadow-xl transition duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:shadow-green-500/20">

            <p className="text-sm text-gray-400">
              🎯 Markets
            </p>

            <h3 className="mt-2 text-3xl font-black text-white">
              {stats.markets}
            </h3>

          </div>

          

        </div>

        <div className="mt-8">

  {/* Vault Status */}
  <div
  className={`rounded-2xl border p-5 transition-all duration-500 ${
  showNewBadge
    ? "border-yellow-400/50 bg-yellow-500/10 shadow-lg shadow-yellow-500/20"
    : "border-green-500/20 bg-green-500/10"
}`}
>

    <div className="flex items-center gap-3">

      <span
        className={`h-3 w-3 rounded-full animate-pulse ${
          showNewBadge ? "bg-yellow-400" : "bg-green-400"
        }`}
      />

      <h3 className="font-bold text-green-300">
        {showNewBadge ? "NEW DATA DETECTED" : "Vault Status"}
      </h3>

    </div>

    <p className="mt-3 text-gray-300">
      {vaultStatus}
    </p>

    <div className="mt-5 border-t border-green-500/20 pt-4 text-sm">

  {/* Last Sync */}
  <div className="flex items-center justify-between">

    <span className="text-gray-400">
      Vault Updated
    </span>

    <span
      className={`font-medium ${
        showNewBadge ? "text-green-300" : "text-white"
      }`}
    >
      {lastUpdated}
    </span>

  </div>

  {/* Live Feed */}
  <div className="mt-4 flex items-center justify-between">

    <span className="text-gray-400">
      Live Feed
    </span>

    <span
      className={`font-medium ${
        showNewBadge ? "text-green-300 animate-pulse" : "text-green-400"
      }`}
    >
      {showNewBadge ? "Receiving Updates..." : "Listening..."}
    </span>

  </div>

</div>

  </div>

  

</div>

      </div>

    </section>
  );
}