
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
// Permanent saved odds are the source of truth.
// ======================================================

export async function GET() {
  try {
    const { data: performanceData, error: performanceError } =
      await supabaseAdmin
        .from("premium_slip_performance")
        .select("slip_date, status, total_odds, updated_at")
        .order("slip_date", { ascending: true });

    if (performanceError) {
      console.error(
        "Premium performance fetch error:",
        performanceError
      );

      return NextResponse.json(
        { error: performanceError.message },
        { status: 500 }
      );
    }

    // Fallback for older records whose odds have not
    // yet been recovered into the performance table.
    const { data: slipsData, error: slipsError } =
      await supabaseAdmin
        .from("premium_slips")
        .select("slip_date, total_odds, created_at")
        .not("total_odds", "is", null)
        .order("created_at", { ascending: false });

    if (slipsError) {
      console.error(
        "Premium slips odds fetch error:",
        slipsError
      );

      return NextResponse.json(
        { error: slipsError.message },
        { status: 500 }
      );
    }

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

    const allPerformance = (performanceData || []).map(
      (item) => {
        // Never overwrite permanently saved odds.
        const savedOdds =
          item.total_odds != null
            ? Number(item.total_odds)
            : oddsByDate.get(item.slip_date) ?? null;

        return {
          ...item,
          total_odds: savedOdds,
        };
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: allPerformance,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );

  } catch (error) {
    console.error(
      "Get premium performance error:",
      error
    );

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ======================================================
// CREATE / UPDATE PREMIUM SLIP PERFORMANCE
// Save exact odds permanently with the result.
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

    // Find the latest active premium slip for this date.
    const { data: slip, error: slipError } =
      await supabaseAdmin
        .from("premium_slips")
        .select("id, total_odds, created_at")
        .eq("slip_date", slip_date)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
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
            "Cannot save performance because no active Premium Slip exists for this date.",
        },
        { status: 400 }
      );
    }

    // Use the exact total odds saved on the original slip.
    const exactOdds = Number(slip.total_odds);

    if (
      slip.total_odds == null ||
      !Number.isFinite(exactOdds) ||
      exactOdds <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "The original Premium Slip has no valid recorded total odds.",
        },
        { status: 400 }
      );
    }

    // Save status and odds together.
    const { data, error } = await supabaseAdmin
      .from("premium_slip_performance")
      .upsert(
        {
          slip_date,
          status,
          total_odds: exactOdds,
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
