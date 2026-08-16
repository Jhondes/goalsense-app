"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";

type PremiumMatch = {
  home: string;
  away: string;
  market: string;
  odds: number;
};

type PremiumSlipData = {
  id: string;
  slip_date: string;
  title: string;
  booking_code: string | null;
  matches: PremiumMatch[];
  total_odds: number;
};

export default function PremiumSlip() {
  const { hasPremium, loading: userLoading } = useUser();

  const [slip, setSlip] = useState<PremiumSlipData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlip();
  }, []);

  async function fetchSlip() {
    try {
      const today = new Date();

      const date =
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      const { data, error } = await supabase
        .from("premium_slips")
        .select("*")
        .eq("slip_date", date)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Premium slip fetch error:", error);
        setSlip(null);
        return;
      }

      if (data) {
        setSlip({
          ...data,
          matches: Array.isArray(data.matches) ? data.matches : [],
        });
      } else {
        setSlip(null);
      }
    } catch (error) {
      console.error("Failed to fetch premium slip:", error);
      setSlip(null);
    } finally {
      setLoading(false);
    }
  }

  if (userLoading || loading) {
    return null;
  }

  /*
   * Don't show the actual slip to free users.
   * They only see the premium teaser.
   */
  if (!hasPremium) {
    return (
      <section className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 via-gray-900 to-gray-950 p-6 shadow-lg">

        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative z-10 text-center">

          <div className="mb-3 text-3xl">
            🔒
          </div>

          <h2 className="text-xl font-bold text-yellow-400">
            GoalSense Premium Slip
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Today's exclusive accumulator is available to Premium members.
          </p>

          <a
            href="/pricing"
            className="mt-5 inline-block rounded-xl bg-yellow-500 px-5 py-2.5 font-semibold text-black transition hover:bg-yellow-400"
          >
            Unlock Premium
          </a>

        </div>
      </section>
    );
  }

  /*
   * Premium user but no slip has been published yet.
   */
  if (!slip || slip.matches.length === 0) {
    return (
      <section className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 text-center">

        <div className="text-3xl">
          🎯
        </div>

        <h2 className="mt-2 text-xl font-bold text-white">
          Premium Slip of the Day
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Today's premium accumulator has not been published yet.
        </p>

      </section>
    );
  }

  const foldLabel =
    slip.matches.length === 1
      ? "Single"
      : `${slip.matches.length}-Fold`;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gray-900 shadow-[0_0_30px_rgba(234,179,8,0.08)]">

      {/* Header */}
      <div className="border-b border-gray-800 px-5 py-4">

        <div className="flex items-center justify-between gap-3">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
              Premium
            </p>

            <h2 className="mt-1 text-lg font-bold text-white">
              {slip.title}
            </h2>
          </div>

          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-sm font-bold text-yellow-400">
            {foldLabel}
          </div>

        </div>

      </div>

      {/* Matches */}
      <div className="divide-y divide-gray-800">

        {slip.matches.map((match, index) => (

          <div
            key={index}
            className="px-5 py-4"
          >

            <div className="flex items-center justify-between gap-4">

              <div className="min-w-0 flex-1">

                <p className="font-medium text-white">
                  {match.home}{" "}
                  <span className="text-gray-500">
                    vs
                  </span>{" "}
                  {match.away}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {match.market}
                </p>

              </div>

              <div className="shrink-0 text-right">

                <p className="text-sm font-bold text-green-400">
                  {Number(match.odds).toFixed(2)}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Summary */}
      <div className="border-t border-gray-800 bg-black/20 px-5 py-4">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs text-gray-500">
              Total Odds
            </p>

            <p className="text-2xl font-bold text-green-400">
              {Number(slip.total_odds).toFixed(2)}
            </p>
          </div>

          <div className="text-right">

            <p className="text-xs text-gray-500">
              Selections
            </p>

            <p className="font-semibold text-white">
              {slip.matches.length}
            </p>

          </div>

        </div>

      </div>

      {/* Booking Code */}
      {slip.booking_code && (
        <div className="border-t border-yellow-500/20 bg-yellow-500/5 px-5 py-4">

          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-yellow-400">
            Booking Code
          </p>

          <div className="flex items-center justify-between gap-3">

            <code className="rounded-lg border border-yellow-500/30 bg-black/30 px-3 py-2 font-mono text-sm font-bold tracking-wider text-white">
              {slip.booking_code}
            </code>

            <button
              onClick={() => {
                navigator.clipboard.writeText(slip.booking_code || "");
              }}
              className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-yellow-500 hover:text-yellow-400"
            >
              Copy
            </button>

          </div>

        </div>
      )}

    </section>
  );
}