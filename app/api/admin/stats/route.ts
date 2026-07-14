import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Total subscriptions ever
  const { count: totalSubscriptions } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true });

  // Unique premium users (first-time subscribers)
  const { data: users } = await supabase
    .from("subscriptions")
    .select("user_id");

  const uniqueUsers = new Set(users?.map((u) => u.user_id) ?? []);

  // Returning subscriptions
  const renewals =
    (totalSubscriptions ?? 0) - uniqueUsers.size;

  // Revenue
  const { data: revenueRows } = await supabase
    .from("subscriptions")
    .select("amount");

  const totalRevenue =
    revenueRows?.reduce(
      (sum, row) => sum + Number(row.amount),
      0
    ) ?? 0;

  return NextResponse.json({
    totalPremiumUsers: uniqueUsers.size,
    firstTimeSubscribers: uniqueUsers.size,
    renewalSubscriptions: renewals,
    totalSubscriptions,
    totalRevenue,
  });
}