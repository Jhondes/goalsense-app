"use client";

import { useState } from "react";
import { generatePredictions } from "@/lib/generatorLogic";

export function useGenerator() {

  const [filters, setFilters] = useState({
    type: "Over 1.5",
    count: 3,
    unlocked: false,
  });

  const [results, setResults] = useState<any[]>([]);
  const [totalOdds, setTotalOdds] = useState("0.00");
  const [loading, setLoading] = useState(false);

  const generate = async (lockedPicks: any[] = []) => {
    try {
      setLoading(true);

      const data = await generatePredictions(filters);

      await new Promise(res => setTimeout(res, 1200));

// remove duplicates from generated picks
      const filtered = data.picks.filter(
        (r: any) =>
          !lockedPicks.some(
            (p) => p.home === r.home && p.away === r.away
          )
      );

// remove duplicates from generated picks
      const combined = [...lockedPicks, ...filtered].slice(0, filters.count);

      setResults(combined);

// recalculate odds
      const odds = combined.reduce(
        (acc, pick) => acc * Number(pick.odds),
        1
      );

      setTotalOdds(odds.toFixed(2));

    } catch (err) {
      console.error("Generator error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { filters, setFilters, results, totalOdds, generate, loading };
}