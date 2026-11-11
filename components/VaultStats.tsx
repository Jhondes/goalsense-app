
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Clock3,
  Database,
  Globe2,
  Radio,
  Target,
} from "lucide-react";

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

  const [loading, setLoading] = useState(true);
  const [showNewBadge, setShowNewBadge] = useState(false);
  const [newMatches, setNewMatches] = useState(0);
  const [vaultStatus, setVaultStatus] = useState("Connecting to Vault...");

  const previousCount = useRef(0);
  const badgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/vault/stats", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Unable to retrieve Vault statistics");
      }

      const data: VaultStatsResponse = await res.json();

      setStats(data);

      const previous = previousCount.current;

      if (previous > 0 && data.totalMatches > previous) {
        const added = data.totalMatches - previous;

        setNewMatches(added);
        setShowNewBadge(true);
        setVaultStatus(
          `${added} new match${added > 1 ? "es" : ""} added to the GoalSense Vault.`
        );

        if (badgeTimer.current) {
          clearTimeout(badgeTimer.current);
        }

        badgeTimer.current = setTimeout(() => {
          setShowNewBadge(false);
          setVaultStatus("Vault is monitoring for new uploads.");
        }, 6000);
      } else if (data.totalMatches > 0 && previous === 0) {
        setVaultStatus("Vault connected. Monitoring for new uploads.");
      }

      previousCount.current = data.totalMatches;
    } catch (error) {
      console.error("Vault statistics error:", error);
      setVaultStatus("Unable to refresh Vault statistics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();

    const interval = setInterval(loadStats, 60000);

    return () => {
      clearInterval(interval);

      if (badgeTimer.current) {
        clearTimeout(badgeTimer.current);
      }
    };
  }, [loadStats]);

  const lastUpdated = stats.lastUpdated
    ? new Date(stats.lastUpdated).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Waiting for first upload";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#101a16] via-[#0b110e] to-[#080d0a] p-4 shadow-xl shadow-black/20 sm:p-5">

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">

        {/* Header */}
        <div className="flex items-center justify-between gap-3">

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <Database size={20} />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-black tracking-wide text-white sm:text-base">
                GOALSENSE VAULT
              </h2>
              <p className="mt-0.5 text-[10px] font-semibold tracking-[0.16em] text-emerald-400">
                FOOTBALL DATA CENTRE
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[10px] font-bold text-emerald-300">
              {loading ? "CONNECTING" : "ACTIVE"}
            </span>
          </div>

        </div>

        {/* Main statistics */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">

          {/* Total matches */}
          <div className="col-span-2 flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 sm:col-span-1 sm:flex-col sm:items-start sm:justify-center sm:p-4">

            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400">
                TOTAL MATCHES
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-3xl font-black tracking-tight text-white sm:text-3xl">
                  {loading ? "..." : stats.totalMatches.toLocaleString()}
                </span>

                {showNewBadge && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[9px] font-bold text-emerald-300">
                    +{newMatches} NEW
                  </span>
                )}
              </div>
            </div>

            <Database
              size={25}
              className="text-emerald-400/60 sm:mt-2"
            />
          </div>

          {/* Leagues */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
            <Globe2 size={17} className="text-emerald-400" />

            <p className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
              {loading ? "..." : stats.leagues.toLocaleString()}
            </p>

            <p className="mt-1 text-[10px] text-gray-500">
              Leagues
            </p>
          </div>

          {/* Markets */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
            <Target size={17} className="text-emerald-400" />

            <p className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
              {loading ? "..." : stats.markets.toLocaleString()}
            </p>

            <p className="mt-1 text-[10px] text-gray-500">
              Markets
            </p>
          </div>

        </div>

        {/* Footer status */}
        <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-2">
            {showNewBadge ? (
              <Activity size={14} className="shrink-0 text-emerald-400" />
            ) : (
              <Radio size={14} className="shrink-0 text-emerald-400" />
            )}

            <p className="text-xs text-gray-400">
              {vaultStatus}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-[10px] text-gray-500">
            <Clock3 size={13} />
            <span>
              Updated: {lastUpdated}
            </span>
          </div>

        </div>

        {/* Auto refresh indicator */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-600">
          <span>Vault data automatically refreshes every 60 seconds</span>
          <span className="flex items-center gap-1 text-emerald-500/70">
            <ArrowUpRight size={12} />
            GoalSense
          </span>
        </div>

      </div>
    </section>
  );
}
