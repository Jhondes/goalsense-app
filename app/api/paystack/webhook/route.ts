import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = req.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  // 🔒 Verify Paystack request
  if (hash !== signature) {
    console.error("❌ Invalid Paystack signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  console.log("📩 Paystack event received:", event.event);

  // ✅ Only handle successful payments
  if (event.event === "charge.success") {
    const email = event?.data?.customer?.email;

    if (!email) {
      console.error("❌ No email in payment data");
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    console.log("💰 Payment success for:", email);

    // 🔥 Set expiry (30 days)
    const expiry = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    // 🔥 Update user
    const { data, error } = await supabase
      .from("users")
      .update({
        is_premium: true,
        premium_expires_at: expiry,
      })
      .eq("email", email)
      .select();

    if (error) {
      console.error("❌ DB update error:", error);
    } else if (!data || data.length === 0) {
      console.error("⚠️ No user found for email:", email);
    } else {
      console.log("✅ User upgraded:", email);
    }
  }

  return NextResponse.json({ received: true });
}