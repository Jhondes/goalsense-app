
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET() {
  try {
    // Get today's date using Nigeria's local timezone.
    const dateParts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Lagos",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());

    const dateValues = Object.fromEntries(
      dateParts.map((part) => [part.type, part.value])
    );

    const today = `${dateValues.year}-${dateValues.month}-${dateValues.day}`;

    // Fetch today's and future fixtures, including records beyond
    // Supabase's default 1,000-row response limit.
    let matches: {
      league: string | null;
      market: string | null;
      created_at: string | null;
    }[] = [];

    const pageSize = 1000;
    let from = 0;

    while (true) {
      const { data, error } = await supabase
        .from("matches")
        .select("league, market, created_at")
        .gte("match_date", today)
        .order("match_date", { ascending: true })
        .range(from, from + pageSize - 1);

      if (error) throw error;

      const batch = data ?? [];
      matches = matches.concat(batch);

      if (batch.length < pageSize) break;

      from += pageSize;
    }

    // Count unique leagues.
    const leagues = new Set(
      matches
        .map((m) => m.league?.trim().toLowerCase())
        .filter(Boolean)
    ).size;

    // Count unique markets.
    const markets = new Set(
      matches
        .map((m) => m.market?.trim().toLowerCase())
        .filter(Boolean)
    ).size;

    // Latest upload timestamp among today's and future fixtures.
    const lastUpdated =
      matches.length > 0
        ? matches
            .filter((m) => m.created_at)
            .sort(
              (a, b) =>
                new Date(b.created_at!).getTime() -
                new Date(a.created_at!).getTime()
            )[0]?.created_at ?? null
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
