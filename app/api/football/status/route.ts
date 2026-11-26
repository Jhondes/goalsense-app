
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, message: "API key is missing from environment variables." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/status",
      {
        method: "GET",
        headers: {
          "x-apisports-key": apiKey,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok || data.errors && Object.keys(data.errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Football API rejected the request.", errors: data.errors },
        { status: response.status || 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "GoalSense connected to API-Football successfully!",
      subscription: data.response?.subscription?.plan,
      active: data.response?.subscription?.active,
      requestsUsed: data.response?.requests?.current,
      dailyLimit: data.response?.requests?.limit_day,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not connect to API-Football." },
      { status: 500 }
    );
  }
}
