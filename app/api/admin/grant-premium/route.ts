import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const userId = body.userId;
    const planMonths = Number(body.planMonths);
    const amount = Number(body.amount);

    // --------------------------------------------------
    // Validate user
    // --------------------------------------------------

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Valid manual Premium plans
    // --------------------------------------------------

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

    // --------------------------------------------------
    // Environment variables
    // --------------------------------------------------

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: "Missing Supabase environment variables",
          supabaseUrl: !!supabaseUrl,
          serviceRoleKey: !!serviceRoleKey,
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // Supabase admin client
    // --------------------------------------------------

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    // --------------------------------------------------
    // Get current profile
    // IMPORTANT: We get the existing expiry so renewals
    // can extend correctly.
    // --------------------------------------------------

    const { data: profile, error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .select(
          "id, email, is_premium, premium_expires_at"
        )
        .eq("id", userId)
        .single();

    if (profileError || !profile) {
      return NextResponse.json(
        {
          error: "Could not find user profile",
          details: profileError?.message || "Profile not found",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // Determine subscription start date
    // --------------------------------------------------

    const now = new Date();

    let startedAt = new Date(now);

    // If the user is STILL premium and has a future expiry,
    // extend from that expiry.
    //
    // If the subscription has expired, start from NOW.
    if (
      profile.premium_expires_at &&
      new Date(profile.premium_expires_at) > now
    ) {
      startedAt = new Date(profile.premium_expires_at);
    }

    // --------------------------------------------------
    // Calculate new expiry using calendar months
    // --------------------------------------------------

    const expiry = new Date(startedAt);

    expiry.setMonth(
      expiry.getMonth() + planMonths
    );

    // --------------------------------------------------
    // Update Premium profile
    // IMPORTANT:
    // Use premium_expires_at, NOT premium_expires
    // --------------------------------------------------

    const { data: updatedProfile, error: updateError } =
      await supabaseAdmin
        .from("profiles")
        .update({
          is_premium: true,
          premium_expires_at: expiry.toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

    if (updateError) {
      return NextResponse.json(
        {
          error: "Could not activate Premium",
          details: updateError.message,
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // Record manual subscription
    // --------------------------------------------------

    const { data: subscription, error: subscriptionError } =
      await supabaseAdmin
        .from("subscriptions")
        .insert({
          user_id: userId,
          amount: amount,
          started_at: startedAt.toISOString(),
          expires_at: expiry.toISOString(),
          email: profile.email,
        })
        .select()
        .single();

    if (subscriptionError) {
      return NextResponse.json(
        {
          error:
            "Premium was activated, but the subscription record could not be created.",
          details: subscriptionError.message,
          premiumData: updatedProfile,
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // Success
    // --------------------------------------------------

    return NextResponse.json({
      success: true,

      message: "Manual Premium upgrade successful",

      data: updatedProfile,

      subscription: {
        ...subscription,
        plan_months: planMonths,
      },
    });

  } catch (err: any) {
    console.error(
      "Grant Premium Error:",
      err
    );

    return NextResponse.json(
      {
        error:
          err?.message ||
          "Server error while granting Premium",
      },
      { status: 500 }
    );
  }
}