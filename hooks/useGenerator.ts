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

  const generate = async () => {
    try {
      setLoading(true);

      const data = await generatePredictions(filters);

      // delay so loader is visible
      await new Promise(res => setTimeout(res, 1200));

      setResults(data.picks);
      setTotalOdds(data.totalOdds);

    } catch (err) {
      console.error("Generator error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { filters, setFilters, results, totalOdds, generate, loading };
}