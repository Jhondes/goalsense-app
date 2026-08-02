import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "SERVICE ROLE EXISTS:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Total matches currently available
    const { count: totalMatches, error: matchesError } = await supabase
      .from("matches")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (matchesError) throw matchesError;

    // Get leagues
    const { data: leaguesData, error: leaguesError } = await supabase
      .from("matches")
      .select("league");

    if (leaguesError) throw leaguesError;

    // Get markets
    const { data: marketsData, error: marketsError } = await supabase
      .from("matches")
      .select("market");

    if (marketsError) throw marketsError;

    // Latest uploaded match
    const { data: latestMatch, error: latestError } = await supabase
      .from("matches")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (latestError && latestError.code !== "PGRST116") {
      throw latestError;
    }

    // Count unique leagues
    const leagues = [
      ...new Set(
        (leaguesData ?? [])
          .map((item) => item.league)
          .filter(Boolean)
      ),
    ].length;

    // Count unique markets
    const markets = [
      ...new Set(
        (marketsData ?? [])
          .map((item) => item.market)
          .filter(Boolean)
      ),
    ].length;

    return NextResponse.json({
      totalMatches: totalMatches ?? 0,
      leagues,
      markets,
      lastUpdated: latestMatch?.created_at ?? null,
    });
  } catch (error) {
    console.error("Vault Stats Error:", error);

    return NextResponse.json(
      {
        totalMatches: 0,
        leagues: 0,
        markets: 0,
        lastUpdated: null,
      },
      {
        status: 500,
      }
    );
  }
}