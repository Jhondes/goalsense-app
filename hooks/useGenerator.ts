"use client";

import { useState, useEffect } from "react";
import { generatePredictions } from "@/lib/generatorLogic";
import { supabase } from "@/lib/supabaseClient";

export function useGenerator() {
  const [filters, setFilters] = useState({
    type: "Over 1.5",
    count: 3,
    dates: [] as string[],
    leagues: [] as string[],
  });

  const [results, setResults] = useState<any[]>([]);
  const [totalOdds, setTotalOdds] = useState("0.00");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [availableLeagues, setAvailableLeagues] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  const isPremium = profile?.is_premium === true;

  /* =========================
     🔐 FETCH PROFILE (FIXED)
  ========================== */
  useEffect(() => {
    fetchProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile() {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;

  if (!user) {
    setProfile(null);
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle(); // ✅ IMPORTANT CHANGE

  if (error) {
    console.error("Profile fetch error:", error);
    return;
  }

  if (!data) {
    console.warn("No profile found for user:", user.id);
    setProfile(null);
    return;
  }

  setProfile(data);
}

  /* =========================
     📊 FETCH MATCHES
  ========================== */
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

  /* =========================
     🏆 AVAILABLE LEAGUES
  ========================== */
  useEffect(() => {
    if (!filters.dates.length) {
      setAvailableLeagues([]);
      return;
    }

    const leagueMap: Record<string, { name: string; count: number }> = {};

    matches.forEach((m) => {
      if (filters.dates.includes(m.date)) {
        const key = m.league?.trim().toLowerCase();

        if (!leagueMap[key]) {
          leagueMap[key] = {
            name: m.league.trim(),
            count: 0,
          };
        }

        leagueMap[key].count++;
      }
    });

    setAvailableLeagues(Object.values(leagueMap));
  }, [filters.dates, matches]);

  /* =========================
     ⚡ GENERATE
  ========================== */
  const generate = async (lockedPicks: any[] = []) => {
    if (!matches.length) return;

    setLoading(true);

    try {
      let filteredMatches = [...matches];

      // filter by date
      if (filters.dates.length) {
        filteredMatches = filteredMatches.filter((m) =>
          filters.dates.includes(m.date)
        );
      }

      // filter by league
      if (filters.leagues.length) {
        filteredMatches = filteredMatches.filter((m) =>
          filters.leagues.includes(m.league)
        );
      }

      const data = generatePredictions(filters, filteredMatches);

      await new Promise((res) => setTimeout(res, 1200));

      const filtered = data.picks.filter(
        (r: any) =>
          !lockedPicks.some(
            (p) => p.home === r.home && p.away === r.away
          )
      );

      const combined = [...lockedPicks, ...filtered].slice(
        0,
        filters.count
      );

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
    availableLeagues,
    isPremium, // 🔥 THIS IS YOUR MASTER SWITCH
  };
}