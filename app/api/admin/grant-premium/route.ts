import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const userId = body.userId;
    const planMonths = Number(body.planMonths);
    const amount = Number(body.amount);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate manual Premium plans
    const validPlans: Record<number, number> = {
      1: 3000,
      3: 7500,
      6: 13500,
    };

    if (
      !validPlans[planMonths] ||
      amount !== validPlans[planMonths]
    ) {
      return NextResponse.json(
        { error: "Invalid Premium plan or amount" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: "Missing env variables",
          supabaseUrl: !!supabaseUrl,
          serviceRoleKey: !!serviceRoleKey,
        },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    // Get user's email
    const { data: profile, error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .select("email")
        .eq("id", userId)
        .single();

    if (profileError) {
      return NextResponse.json(
        {
          error: "Could not find user profile",
          details: profileError.message,
        },
        { status: 404 }
      );
    }

    const startedAt = new Date();

    // Calculate expiry using calendar months
    const expiry = new Date(startedAt);
    expiry.setMonth(expiry.getMonth() + planMonths);

    // Activate Premium
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        is_premium: true,
        premium_expires: expiry.toISOString(),
      })
      .eq("id", userId)
      .select();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          details: error,
        },
        { status: 500 }
      );
    }

    // Record manual subscription
    const { error: subscriptionError } =
      await supabaseAdmin
        .from("subscriptions")
        .insert({
          user_id: userId,
          amount: amount,
          started_at: startedAt.toISOString(),
          expires_at: expiry.toISOString(),
          email: profile.email,
        });

    if (subscriptionError) {
      return NextResponse.json(
        {
          error:
            "Premium activated, but subscription record could not be created.",
          details: subscriptionError.message,
          premiumData: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      subscription: {
        user_id: userId,
        amount: amount,
        started_at: startedAt.toISOString(),
        expires_at: expiry.toISOString(),
        email: profile.email,
        plan_months: planMonths,
      },
    });

  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message || "Server error",
      },
      { status: 500 }
    );
  }
}