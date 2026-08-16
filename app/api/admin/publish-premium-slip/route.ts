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



// ================= PUBLISH PREMIUM SLIP =================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      slip_date,
      title,
      booking_code,
      matches,
      total_odds,
    } = body;

    if (!slip_date) {
      return NextResponse.json(
        { error: "Slip date is required" },
        { status: 400 }
      );
    }

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Slip title is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(matches) || matches.length === 0) {
      return NextResponse.json(
        { error: "At least one match is required" },
        { status: 400 }
      );
    }

    // Deactivate any existing Premium Slip for this date
    const { error: deactivateError } = await supabaseAdmin
      .from("premium_slips")
      .update({
        is_active: false,
      })
      .eq("slip_date", slip_date);

    if (deactivateError) {
      console.error(
        "Deactivate old premium slip error:",
        deactivateError
      );

      return NextResponse.json(
        { error: deactivateError.message },
        { status: 500 }
      );
    }

    // Insert the new Premium Slip
    const { data, error } = await supabaseAdmin
      .from("premium_slips")
      .insert([
        {
          slip_date,
          title: title.trim(),
          booking_code: booking_code?.trim() || null,
          matches,
          total_odds: Number(total_odds),
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Premium slip insert error:", error);

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
    console.error("Publish premium slip error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ================= EDIT PREMIUM SLIP =================

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      slip_date,
      title,
      booking_code,
      matches,
      total_odds,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Premium Slip ID is required" },
        { status: 400 }
      );
    }

    if (!slip_date) {
      return NextResponse.json(
        { error: "Slip date is required" },
        { status: 400 }
      );
    }

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Slip title is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(matches) || matches.length === 0) {
      return NextResponse.json(
        { error: "At least one match is required" },
        { status: 400 }
      );
    }

    // Update the existing Premium Slip
    const { data, error } = await supabaseAdmin
      .from("premium_slips")
      .update({
        slip_date,
        title: title.trim(),
        booking_code: booking_code?.trim() || null,
        matches,
        total_odds: Number(total_odds),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Premium slip update error:", error);

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
    console.error("Update premium slip error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ================= DELETE PREMIUM SLIP =================

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Premium Slip ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("premium_slips")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Premium slip delete error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete premium slip error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ================= GET PREMIUM SLIPS =================

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("premium_slips")
      .select("*")
      .order("slip_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Premium slips fetch error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error("Get premium slips error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}