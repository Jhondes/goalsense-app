import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // =====================================================
  // GET ALL SUBSCRIPTIONS
  // =====================================================

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select(`
      id,
      user_id,
      amount,
      started_at,
      expires_at,
      created_at
    `)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("SUBSCRIPTIONS FETCH ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const allSubscriptions = subscriptions ?? [];

  // =====================================================
  // TOTAL SUBSCRIPTIONS
  // =====================================================

  const totalSubscriptions = allSubscriptions.length;

  // =====================================================
  // UNIQUE USERS
  // =====================================================

  const uniqueUsers = new Set(
    allSubscriptions.map((subscription) => subscription.user_id)
  );

  const totalUniqueUsers = uniqueUsers.size;

  // =====================================================
  // RENEWALS
  // =====================================================

  // Every subscription after a user's first subscription
  // counts as a renewal.

  const renewalSubscriptions =
    totalSubscriptions - totalUniqueUsers;

  // =====================================================
  // FIND LATEST SUBSCRIPTION FOR EACH USER
  // =====================================================

  const latestSubscriptionByUser =
    new Map<string, (typeof allSubscriptions)[number]>();

  for (const subscription of allSubscriptions) {
    const existing = latestSubscriptionByUser.get(
      subscription.user_id
    );

    if (
      !existing ||
      new Date(subscription.created_at).getTime() >
        new Date(existing.created_at).getTime()
    ) {
      latestSubscriptionByUser.set(
        subscription.user_id,
        subscription
      );
    }
  }

  // =====================================================
  // EXPIRED USERS
  // =====================================================

  const now = new Date();

  let expiredSubscribers = 0;

  for (const subscription of latestSubscriptionByUser.values()) {
    if (!subscription.expires_at) {
      continue;
    }

    const expiresAt = new Date(subscription.expires_at);

    if (expiresAt.getTime() < now.getTime()) {
      expiredSubscribers++;
    }
  }

  // =====================================================
  // REVENUE
  // =====================================================

  const totalRevenue = allSubscriptions.reduce(
    (sum, subscription) =>
      sum + Number(subscription.amount || 0),
    0
  );

  // =====================================================
  // RESPONSE
  // =====================================================

  return NextResponse.json({
    totalPremiumUsers: totalUniqueUsers,
    firstTimeSubscribers: totalUniqueUsers,
    renewalSubscriptions,
    expiredSubscribers,
    totalSubscriptions,
    totalRevenue,
  });
}