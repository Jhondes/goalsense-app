
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Clock3,
  Database,
  Globe2,
  Layers3,
  RadioTower,
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
  const [isConnected, setIsConnected] = useState(false);
  const [showNewBadge, setShowNewBadge] = useState(false);
  const [newMatches, setNewMatches] = useState(0);
  const [vaultStatus, setVaultStatus] = useState(
    "Connecting to Vault..."
  );

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
      setIsConnected(true);

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
          setVaultStatus(
            "Vault connected. Monitoring for new uploads."
          );
        }, 6000);
      } else if (data.totalMatches > 0 && previous === 0) {
        setVaultStatus(
          "Vault connected. Monitoring for new uploads."
        );
      } else if (!showNewBadge) {
        setVaultStatus(
          "Vault connected. Monitoring for new uploads."
        );
      }

      previousCount.current = data.totalMatches;
    } catch (error) {
      console.error("Vault statistics error:", error);

      setIsConnected(false);
      setVaultStatus("Unable to refresh Vault statistics.");
    } finally {
      setLoading(false);
    }
  }, [showNewBadge]);

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
    <section className="vault-card relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#101a16] via-[#0b110e] to-[#080d0a] p-4 shadow-xl shadow-black/20 sm:p-5">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-emerald-500/[0.06] blur-3xl" />

      <div className="relative">

        {/* Header */}
        <div className="flex items-center justify-between gap-3">

          <div className="flex min-w-0 items-center gap-3">

            {/* Animated Vault Icon */}
            <div className="vault-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/[0.10] text-emerald-400">

              <Database size={23} strokeWidth={1.9} />

              <span className="vault-icon-shine" />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-black tracking-wide text-white sm:text-base">
                GOALSENSE VAULT
              </h2>

              <p className="mt-0.5 text-[10px] font-bold tracking-[0.18em] text-emerald-400">
                FOOTBALL DATA CENTRE
              </p>
            </div>

          </div>

          {/* Live Connection Status */}
          <div
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-500 ${
              isConnected
                ? "border-emerald-500/25 bg-emerald-500/[0.10]"
                : "border-amber-500/20 bg-amber-500/[0.08]"
            }`}
          >

            <span className="relative flex h-2 w-2">

              {isConnected && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              )}

              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isConnected
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
              />

            </span>

            <span
              className={`text-[10px] font-extrabold tracking-wide ${
                isConnected
                  ? "text-emerald-300"
                  : "text-amber-300"
              }`}
            >
              {loading
                ? "CONNECTING"
                : isConnected
                  ? "ACTIVE"
                  : "OFFLINE"}
            </span>

          </div>

        </div>

        {/* Statistics */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">

          {/* Total Matches */}
          <div className="vault-stat-main col-span-2 flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 transition-all duration-300 sm:col-span-1 sm:flex-col sm:items-start sm:justify-center">

            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400">
                TOTAL MATCHES
              </p>

              <div className="mt-1 flex items-center gap-2">

                <span className="text-3xl font-black tracking-tight text-white sm:text-3xl">
                  {loading
                    ? "..."
                    : stats.totalMatches.toLocaleString()}
                </span>

                {showNewBadge && (
                  <span className="new-match-badge rounded-full border border-emerald-400/20 bg-emerald-500/20 px-2 py-1 text-[9px] font-extrabold text-emerald-300">
                    +{newMatches} NEW
                  </span>
                )}

              </div>
            </div>

            <Layers3
              size={29}
              strokeWidth={1.8}
              className="text-emerald-400/70 sm:mt-3"
            />

          </div>

          {/* Leagues */}
          <div className="vault-stat rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 sm:p-4">

            <Globe2
              size={19}
              strokeWidth={1.9}
              className="text-emerald-400"
            />

            <p className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
              {loading ? "..." : stats.leagues.toLocaleString()}
            </p>

            <p className="mt-1 text-[10px] text-gray-500">
              Leagues
            </p>

          </div>

          {/* Markets */}
          <div className="vault-stat rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 sm:p-4">

            <Target
              size={19}
              strokeWidth={1.9}
              className="text-emerald-400"
            />

            <p className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
              {loading ? "..." : stats.markets.toLocaleString()}
            </p>

            <p className="mt-1 text-[10px] text-gray-500">
              Markets
            </p>

          </div>

        </div>

        {/* Footer Status */}
        <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-2">

            {showNewBadge ? (
              <Activity
                size={15}
                className="shrink-0 text-emerald-400"
              />
            ) : (
              <div className="signal-icon shrink-0 text-emerald-400">
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 8.5a5 5 0 0 0 0 7" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M5.5 5.5a9 9 0 0 0 0 13" />
    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
</div>
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

        {/* Auto Refresh */}
        <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-gray-600">

          <span>
            Vault data automatically refreshes every 60 seconds
          </span>

          <span className="flex shrink-0 items-center gap-1 text-emerald-500/70">
            <ArrowUpRight size={12} />
            GoalSense
          </span>

        </div>

      </div>

      {/* Premium Animations */}
      <style jsx>{`
        .vault-icon {
          position: relative;
          overflow: hidden;
          animation: vault-glow 2.2s ease-in-out infinite;
        }

        .vault-icon-shine {
          position: absolute;
          top: -50%;
          left: -100%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(52, 211, 153, 0.18),
            transparent
          );
          transform: rotate(25deg);
          animation: vault-shine 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        .signal-icon {
          animation: signal-pulse 2s ease-in-out infinite;
        }

        .vault-stat {
          transition:
            border-color 0.3s ease,
            background 0.3s ease,
            transform 0.3s ease;
        }

        .vault-stat:hover {
          border-color: rgba(52, 211, 153, 0.3);
          background: rgba(52, 211, 153, 0.06);
          transform: translateY(-2px);
        }

        .vault-stat-main {
          transition:
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .vault-stat-main:hover {
          border-color: rgba(52, 211, 153, 0.4);
          background: rgba(52, 211, 153, 0.09);
        }

        .new-match-badge {
          animation: badge-appear 0.4s ease-out both;
        }

        @keyframes vault-glow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.08);
          }
          50% {
            box-shadow:
              0 0 18px rgba(16, 185, 129, 0.22),
              inset 0 0 12px rgba(16, 185, 129, 0.08);
          }
        }

        @keyframes vault-shine {
          0% {
            left: -100%;
          }
          55%, 100% {
            left: 160%;
          }
        }

        @keyframes signal-pulse {
          0%, 100% {
            opacity: 0.65;
            transform: scale(0.96);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes badge-appear {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vault-icon,
          .vault-icon-shine,
          .signal-icon,
          .new-match-badge {
            animation: none;
          }

          .vault-stat,
          .vault-stat-main {
            transition: none;
          }
        }
      `}</style>

    </section>
  );
}
