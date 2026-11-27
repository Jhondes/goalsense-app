
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase environment variables are missing.");
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const allMatches: any[] = [];
    const pageSize = 1000;
    let from = 0;

    while (true) {
      const { data, error } = await supabaseAdmin
        .from("matches")
        .select(`
          id,
          home_team,
          away_team,
          league,
          market,
          odds,
          match_date,
          home_score,
          away_score
        `)
        .not("home_score", "is", null)
        .not("away_score", "is", null)
        .order("match_date", { ascending: false })
        .range(from, from + pageSize - 1);

      if (error) {
        console.error("MATCH PERFORMANCE FETCH ERROR:", error);
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      allMatches.push(...(data || []));

      if (!data || data.length < pageSize) break;

      from += pageSize;
    }

    const results = allMatches
      .map((match) => {
        const market = String(match.market || "")
          .trim()
          .toLowerCase();

        const homeScore = Number(match.home_score);
        const awayScore = Number(match.away_score);
        const totalGoals = homeScore + awayScore;

        let won: boolean;

        switch (market) {
          case "over 1.5":
            won = totalGoals >= 2;
            break;

          case "over 2.5":
            won = totalGoals >= 3;
            break;

          case "btts":
            won = homeScore >= 1 && awayScore >= 1;
            break;

          default:
            return null;
        }

        return {
          id: match.id,
          home: match.home_team,
          away: match.away_team,
          league: match.league,
          market: match.market,
          odds: match.odds,
          match_date: match.match_date,
          home_score: homeScore,
          away_score: awayScore,
          status: won ? "won" : "lost",
        };
      })
      .filter((match) => match !== null);

    const won = results.filter(
      (match) => match.status === "won"
    ).length;

    const lost = results.filter(
      (match) => match.status === "lost"
    ).length;

    const total = results.length;

    return NextResponse.json(
      {
        success: true,
        data: results,
        stats: {
          total,
          won,
          lost,
          winRate:
            total > 0
              ? Number(((won / total) * 100).toFixed(1))
              : 0,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("MATCH PERFORMANCE ERROR:", error);

    return NextResponse.json(
      { error: "Unable to load match performance." },
      { status: 500 }
    );
  }
}
