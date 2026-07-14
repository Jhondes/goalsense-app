import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.text(); // ✅ FIXED

  const signature = req.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  console.log("SIGNATURE:", signature);
  console.log("MATCH:", hash === signature);

  if (hash !== signature) {
    console.log("❌ INVALID SIGNATURE - STOPPED");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  console.log("PAYSTACK EVENT:", event.event);

  if (event.event === "charge.success") {
  const email = event.data.customer.email.toLowerCase().trim();

  console.log("PAYSTACK EMAIL:", email);

  const expiry = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  ).toISOString();

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

  // ✅ Record the subscription
    if (data && data.length > 0) {
      const profile = data[0];

      const { error: subscriptionError } = await supabase
        .from("subscriptions")
        .insert({
          user_id: profile.id,
          amount: event.data.amount / 100, // Paystack sends kobo
          expires_at: expiry,
        });

      console.log("SUBSCRIPTION ERROR:", subscriptionError);
    }
  }



  return NextResponse.json({ received: true });
}