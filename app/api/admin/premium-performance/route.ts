import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase server environment variables are missing");
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

// ======================================================
// GET PREMIUM SLIP PERFORMANCE
// Only return performance for active premium slips
// ======================================================


export async function GET() {
  try {
    // Fetch all performance records
    const { data: performanceData, error: performanceError } =
      await supabaseAdmin
        .from("premium_slip_performance")
        .select("*");

    if (performanceError) {
      console.error("Premium performance fetch error:", performanceError);

      return NextResponse.json(
        { error: performanceError.message },
        { status: 500 }
      );
    }

    // Fetch available premium slip odds
    const { data: slipsData, error: slipsError } =
      await supabaseAdmin
        .from("premium_slips")
        .select("slip_date, total_odds, created_at")
        .order("created_at", { ascending: false });

    if (slipsError) {
      console.error("Premium slips odds fetch error:", slipsError);

      return NextResponse.json(
        { error: slipsError.message },
        { status: 500 }
      );
    }

    // Use the latest slip record for each date
    const oddsByDate = new Map<string, number>();

    (slipsData || []).forEach((slip) => {
      if (
        slip.slip_date &&
        slip.total_odds != null &&
        !oddsByDate.has(slip.slip_date)
      ) {
        oddsByDate.set(
          slip.slip_date,
          Number(slip.total_odds)
        );
      }
    });

    // Attach odds to each performance record
    const allPerformance = (performanceData || [])
      .map((item) => ({
        ...item,
        total_odds: oddsByDate.get(item.slip_date) ?? null,
      }))
      .sort(
        (a, b) =>
          new Date(a.slip_date).getTime() -
          new Date(b.slip_date).getTime()
      );

    return NextResponse.json({
      success: true,
      data: allPerformance,
    });

  } catch (error) {
    console.error("Get premium performance error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


// ======================================================
// CREATE / UPDATE PREMIUM SLIP PERFORMANCE
// ======================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { slip_date, status } = body;

    if (!slip_date) {
      return NextResponse.json(
        { error: "Slip date is required" },
        { status: 400 }
      );
    }

    if (!["pending", "won", "lost"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid performance status" },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Make sure a premium slip actually exists
    // before creating/updating its performance.
    // --------------------------------------------------

    const { data: slip, error: slipError } =
      await supabaseAdmin
        .from("premium_slips")
        .select("id")
        .eq("slip_date", slip_date)
        .eq("is_active", true)
        .limit(1)
        .maybeSingle();

    if (slipError) {
      console.error(
        "Premium slip verification error:",
        slipError
      );

      return NextResponse.json(
        { error: slipError.message },
        { status: 500 }
      );
    }

    if (!slip) {
      return NextResponse.json(
        {
          error:
            "Cannot create performance because no active Premium Slip exists for this date.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Create or update performance
    // --------------------------------------------------

    const { data, error } = await supabaseAdmin
      .from("premium_slip_performance")
      .upsert(
        {
          slip_date,
          status,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "slip_date",
        }
      )
      .select()
      .single();

    if (error) {
      console.error(
        "Premium performance save error:",
        error
      );

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "Save premium performance error:",
      error
    );

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}