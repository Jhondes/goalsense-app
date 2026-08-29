import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.text();

  const signature = req.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  console.log("SIGNATURE:", signature);
  console.log("MATCH:", hash === signature);

  if (hash !== signature) {
    console.log("❌ INVALID SIGNATURE - STOPPED");
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 401 }
    );
  }

  const event = JSON.parse(body);

  console.log("PAYSTACK EVENT:", event.event);

  if (event.event === "charge.success") {
    const email = event.data.customer.email.toLowerCase().trim();

    console.log("PAYSTACK EMAIL:", email);

    // Paystack amount is in kobo
    const amount = Number(event.data.amount);

    // Determine Premium duration from payment amount
    let durationDays: number;

    if (amount === 300000) {
      durationDays = 30;
    } else if (amount === 750000) {
      durationDays = 90;
    } else if (amount === 1350000) {
      durationDays = 180;
    } else {
      console.log("❌ UNKNOWN PREMIUM PAYMENT AMOUNT:", amount);

      return NextResponse.json(
        { error: "Unknown Premium payment amount" },
        { status: 400 }
      );
    }

    console.log("PREMIUM AMOUNT:", amount);
    console.log("PREMIUM DURATION:", durationDays, "days");

    // Find existing profile first
    const { data: existingProfile, error: profileError } =
      await supabase
        .from("profiles")
        .select("id, premium_expires")
        .eq("email", email)
        .maybeSingle();

    if (profileError) {
      console.error(
        "PROFILE LOOKUP ERROR:",
        profileError
      );

      return NextResponse.json(
        { error: "Profile lookup failed" },
        { status: 500 }
      );
    }

    if (!existingProfile) {
      console.log("❌ PROFILE NOT FOUND:", email);

      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    // Extend from current expiry if the user is still Premium.
    // Otherwise start from today.
    const now = new Date();

    const currentExpiry = existingProfile.premium_expires
      ? new Date(existingProfile.premium_expires)
      : null;

    const startDate =
      currentExpiry && currentExpiry > now
        ? currentExpiry
        : now;

    const expiry = new Date(
      startDate.getTime() +
        durationDays * 24 * 60 * 60 * 1000
    ).toISOString();

    console.log("PREMIUM START:", startDate.toISOString());
    console.log("PREMIUM EXPIRY:", expiry);

    const { data, error } = await supabase
      .from("profiles")
      .update({
        is_premium: true,
        premium_expires: expiry,
      })
      .eq("email", email)
      .select();

    console.log("UPDATED DATA:", data);
    console.log("SUPABASE ERROR:", error);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update Premium status" },
        { status: 500 }
      );
    }

    // Record the subscription
    if (data && data.length > 0) {
      const profile = data[0];

      const startedAt = new Date().toISOString();

      const { error: subscriptionError } = await supabase
  .from("subscriptions")
  .insert({
    user_id: profile.id,
    email: email,
    amount: event.data.amount / 100,
    started_at: startedAt,
    expires_at: expiry,
  });

      console.log(
        "SUBSCRIPTION ERROR:",
        subscriptionError
      );
    }
  }

  return NextResponse.json({ received: true });
}