import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // ✅ create client INSIDE function (fix)
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

  //if (hash !== signature) {
  //  return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  //}

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const email = event.data.customer.email;

    const expiry = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { error } = await supabase
      .from("users")
      .update({
        is_premium: true,
        premium_expires_at: expiry,
      })
      .eq("email", email);

    if (error) {
      console.error("DB update error:", error);
    }
  }

  return NextResponse.json({ received: true });
}