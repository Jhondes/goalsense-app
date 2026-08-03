import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select("league, market, created_at");

    if (error) throw error;

    const matches = data ?? [];

    const leagues = new Set(
      matches
        .map((m) => m.league)
        .filter(Boolean)
    ).size;

    const markets = new Set(
      matches
        .map((m) => m.market)
        .filter(Boolean)
    ).size;

    const lastUpdated =
      matches.length > 0
        ? matches
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )[0].created_at
        : null;

    return NextResponse.json({
      totalMatches: matches.length,
      leagues,
      markets,
      lastUpdated,
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
      { status: 500 }
    );
  }
}