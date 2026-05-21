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
    const email = event.data.customer.email;

    const expiry = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { error } = await supabase
      .from("profiles")
      .update({
        is_premium: true,
        premium_expires_at: expiry,
      })
      .eq("email", email);

    console.log("EMAIL:", email);
    console.log("SUPABASE ERROR:", error);
  }

  return NextResponse.json({ received: true });
}