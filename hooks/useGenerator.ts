"use client";

import { useState, useEffect } from "react";
import { generatePredictions } from "@/lib/generatorLogic";
import { supabase } from "@/lib/supabaseClient";

export function useGenerator() {
  const [filters, setFilters] = useState({
    type: "Over 1.5",
    count: 3,
    dates: [] as string[],     // ✅ array
    leagues: [] as string[],   // ✅ array
    unlocked: false,
  });

  const [results, setResults] = useState<any[]>([]);
  const [totalOdds, setTotalOdds] = useState("0.00");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [availableLeagues, setAvailableLeagues] = useState<any[]>([]); // {name, count}

  /* FETCH MATCHES (✅ FIXED TO SUPABASE) */
  useEffect(() => {
    fetchMatches();
  }, []);

  async function fetchMatches() {
    try {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("match_date", { ascending: true });

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      const formatted = (data || []).map((m: any) => ({
        id: m.id,
        home: m.home_team,
        away: m.away_team,
        league: m.league,
        market: m.market,
        odds: Number(m.odds),
        date: m.match_date
          ? String(m.match_date).split("T")[0]
          : "",
      }));

      setMatches(formatted);
    } catch (err) {
      console.error("Failed to fetch matches", err);
    }
  }

  /* 🔥 UPDATE AVAILABLE LEAGUES WITH COUNT (UNCHANGED) */
  useEffect(() => {
    if (!filters.dates || filters.dates.length === 0) {
      setAvailableLeagues([]);
      return;
    }

    const leagueMap: Record<string, number> = {};

    matches.forEach((m) => {
  const matchDate = m.date;

  if (filters.dates.includes(matchDate)) {
    const cleanLeague = m.league?.trim().toLowerCase();

    if (!leagueMap[cleanLeague]) {
      leagueMap[cleanLeague] = {
        name: m.league.trim(), // keep original for display
        count: 0,
      };
    }

    leagueMap[cleanLeague].count++;
  }
});

    const leaguesWithCount = Object.values(leagueMap);

    setAvailableLeagues(leaguesWithCount);
  }, [filters.dates, matches]);

  /* GENERATE PREDICTIONS (UNCHANGED) */
  const generate = async (lockedPicks: any[] = []) => {
  if (!matches || matches.length === 0) {
    console.warn("No matches loaded yet");
    return;
  }

  setLoading(true);

  try {
    let filteredMatches = [...matches];

    // ✅ FILTER BY DATE
    if (filters.dates && filters.dates.length > 0) {
      filteredMatches = filteredMatches.filter((m) =>
        filters.dates.includes(m.date)
      );
    }

    // ✅ FILTER BY LEAGUE
    if (filters.leagues && filters.leagues.length > 0) {
      filteredMatches = filteredMatches.filter((m) =>
        filters.leagues.includes(m.league)
      );
    }

    // ✅ NOW PASS FILTERED MATCHES
    const data = generatePredictions(filters, filteredMatches);

    await new Promise((res) => setTimeout(res, 1200));

    const filtered = data.picks.filter(
      (r: any) =>
        !lockedPicks.some(
          (p) => p.home === r.home && p.away === r.away
        )
    );

    const combined = [...lockedPicks, ...filtered].slice(0, filters.count);

    setResults(combined);

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

  return {
    filters,
    setFilters,
    results,
    totalOdds,
    generate,
    loading,
    matches,
    availableLeagues, // ✅ IMPORTANT
  };
}