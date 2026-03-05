"use client";

import { useState } from "react";
import { generatePredictions } from "@/lib/generatorLogic";

export function useGenerator() {
  const [filters, setFilters] = useState({
    type: "Over 1.5",
    count: 3,        // ✅ use count (NOT picks)
    unlocked: false, // ✅ for premium markets
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);

      const data = await generatePredictions(filters);

      // delay so loader is visible
      await new Promise(res => setTimeout(res, 1200));

      setResults(data);

    } catch (err) {
      console.error("Generator error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { filters, setFilters, results, generate, loading };
}
