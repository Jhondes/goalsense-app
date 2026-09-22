"use client";

import { useEffect, useState } from "react";

type VaultStatsResponse = {
  totalMatches: number;
};

export default function PredictionAvailability() {
  const [totalMatches, setTotalMatches] = useState<number | null>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    async function loadVaultStats() {
      try {
        const res = await fetch("/api/vault/stats", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data: VaultStatsResponse = await res.json();

        setTotalMatches(data.totalMatches);

        // If matches become available again,
        // allow the popup to appear next time there are 0.
        if (data.totalMatches > 0) {
          setClosed(false);
        }
      } catch (error) {
        console.error("Failed to load Vault status:", error);
      }
    }

    loadVaultStats();

    const interval = setInterval(loadVaultStats, 60000);

    return () => clearInterval(interval);
  }, []);

  // Still loading
  if (totalMatches === null) {
    return null;
  }

  // Matches available
  if (totalMatches > 0) {
    return null;
  }

  // User closed the popup
  if (closed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md rounded-3xl border border-green-500/30 bg-[#0b1220] p-8 text-center shadow-2xl shadow-green-500/10"
        role="dialog"
        aria-modal="true"
      >
        {/* Close X */}
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-xl text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-400/30 bg-green-500/10 text-2xl">
          📅
        </div>

        <h2 className="mt-5 text-xl font-bold text-white">
          No predictions at the moment
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-400">
          There are no predictions available right now.
          Please check back later for new predictions.
        </p>

        <button
          type="button"
          onClick={() => setClosed(true)}
          className="mt-6 rounded-xl bg-green-500 px-7 py-3 text-sm font-bold text-black transition hover:bg-green-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}