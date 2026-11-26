
import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://v3.football.api-sports.io";

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.API_FOOTBALL_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Football API key is missing." },
        { status: 500 }
      );
    }

    const search = request.nextUrl.searchParams.get("search")?.trim();

    if (!search || search.length < 3) {
      return NextResponse.json({ success: true, teams: [] });
    }

    const response = await fetch(
      `${API_BASE}/teams?search=${encodeURIComponent(search)}`,
      {
        headers: {
          "x-apisports-key": apiKey,
        },
        next: {
          revalidate: 2592000,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || (data.errors && Object.keys(data.errors).length > 0)) {
      console.error(
  "API-FOOTBALL TEAM SEARCH ERROR:",
  JSON.stringify(data.errors)
);
      const errorText = JSON.stringify(data.errors || "").toLowerCase();

      if (
  errorText.includes("ratelimit") ||
  errorText.includes("too many requests") ||
  errorText.includes("request limit") ||
  errorText.includes("reached the request limit")
) {
        return NextResponse.json(
          {
            success: false,
            message: "The daily football API request limit has been reached. Please try again after the limit resets.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Team search is temporarily unavailable. Please try again later.",
        },
        { status: response.status || 500 }
      );
    }

    const teams = (data.response || [])
      .filter((item: any) => item.team?.id && item.team?.name)
      .map((item: any) => ({
        id: item.team.id,
        name: item.team.name,
        country: item.team.country || "",
        logo: item.team.logo || "",
      }));

    return NextResponse.json({
      success: true,
      teams,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to team search. Please try again.",
      },
      { status: 500 }
    );
  }
}
