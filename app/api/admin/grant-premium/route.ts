import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const userId = body.userId;

    console.log("ALL ENV KEYS:", Object.keys(process.env));

console.log(
  "SUPABASE URL EXISTS:",
  !!process.env.NEXT_PUBLIC_SUPABASE_URL
);

console.log(
  "SERVICE ROLE EXISTS:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);

    // 👇 ADD HERE
    console.log("SUPABASE URL:", supabaseUrl);
    console.log("SERVICE ROLE:", !!serviceRoleKey);
    console.log("USER ID:", userId);

    

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    const expiry = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        is_premium: true,
        premium_expires: expiry,
      })
      .eq("id", userId)
      .select();

    // 👇 ADD HERE
    console.log("UPDATED:", data);
    console.log("ERROR:", error);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}