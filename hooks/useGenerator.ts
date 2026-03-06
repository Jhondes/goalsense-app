"use client";

import { useState } from "react";
import { generatePredictions } from "@/lib/generatorLogic";

type Result = {
  home: string;
  away: string;
  prediction: string;
  odds: string;
};

export function useGenerator() {
  const [filters, setFilters] = useState({
    type: "Over 1.5",
    count: 3,
    unlocked: false,
  });

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);

      const data = await generatePredictions(filters);

      await new Promise((res) => setTimeout(res, 1200));

      setResults(data);

    } catch (err) {
      console.error("Generator error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { filters, setFilters, results, generate, loading };
}