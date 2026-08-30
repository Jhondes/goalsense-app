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

type PremiumPerformance = {
  slip_date: string;
  status: "pending" | "won" | "lost";
};

export default function PremiumSlip() {
  const { hasPremium, loading: userLoading } = useUser();

  const [slip, setSlip] = useState<PremiumSlipData | null>(null);

  const [performance, setPerformance] = useState<
    PremiumPerformance[]
  >([]);

  const [slipLoading, setSlipLoading] = useState(true);
  const [performanceLoading, setPerformanceLoading] =
    useState(true);

  /*
   * -----------------------------------------
   * GET TODAY'S DATE
   * -----------------------------------------
   */

  function getTodayDate() {
    const today = new Date();

    return `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;
  }

  /*
   * -----------------------------------------
   * FETCH PREMIUM PERFORMANCE
   *
   * PUBLIC:
   * Everyone can see recent results.
   * -----------------------------------------
   */

  async function fetchPerformance() {
    try {
      setPerformanceLoading(true);

      const response = await fetch(
        "/api/admin/premium-performance",
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(
          "Premium performance fetch error:",
          result
        );

        setPerformance([]);
        return;
      }

      const recentPerformances = (
  result.data || []
)
  .sort(
    (a: { slip_date: string }, b: { slip_date: string }) =>
      new Date(a.slip_date).getTime() -
      new Date(b.slip_date).getTime()
  )
  .slice(-5);

      setPerformance(recentPerformances);
    } catch (error) {
      console.error(
        "Failed to fetch premium performance:",
        error
      );

      setPerformance([]);
    } finally {
      setPerformanceLoading(false);
    }
  }

  /*
   * -----------------------------------------
   * FETCH TODAY'S PREMIUM SLIP
   *
   * PREMIUM USERS ONLY
   * -----------------------------------------
   */

  async function fetchSlip() {
    try {
      setSlipLoading(true);

      const date = getTodayDate();

      const { data, error } = await supabase
        .from("premium_slips")
        .select("*")
        .eq("slip_date", date)
        .eq("is_active", true)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(
          "Premium slip fetch error:",
          error
        );

        setSlip(null);
        return;
      }

      if (data) {
        setSlip({
          ...data,
          matches: Array.isArray(data.matches)
            ? data.matches
            : [],
        });
      } else {
        setSlip(null);
      }
    } catch (error) {
      console.error(
        "Failed to fetch premium slip:",
        error
      );

      setSlip(null);
    } finally {
      setSlipLoading(false);
    }
  }

  /*
   * -----------------------------------------
   * INITIAL PERFORMANCE FETCH
   * -----------------------------------------
   */

  useEffect(() => {
    fetchPerformance();
  }, []);

  /*
   * -----------------------------------------
   * FETCH PREMIUM SLIP AFTER USER STATUS
   * IS KNOWN
   * -----------------------------------------
   */

  useEffect(() => {
    if (!userLoading && hasPremium) {
      fetchSlip();
    }

    if (!userLoading && !hasPremium) {
      setSlipLoading(false);
    }
  }, [userLoading, hasPremium]);

  /*
   * -----------------------------------------
   * PUBLIC PREMIUM PERFORMANCE
   *
   * Compact horizontal layout:
   *
   * 23 Aug   24 Aug   25 Aug   26 Aug
   * WON      LOST     WON      PENDING
   * -----------------------------------------
   */

  const publicPerformance = (
  <section className="mb-4 overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-gray-900 to-gray-950 px-3 py-4 sm:px-4 shadow-[0_0_25px_rgba(234,179,8,0.05)]">

    {/* Header */}
    <div className="mb-3 flex items-center justify-between">

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
          Premium Slip Performance
        </p>

        <p className="mt-0.5 text-xs text-gray-500">
          Recent Results
        </p>
      </div>

      <div className="text-lg">
        🏆
      </div>

    </div>

    {/* Loading */}
    {performanceLoading ? (
      <div className="grid grid-cols-5 gap-1 sm:gap-2">

        {Array.from({ length: 5 }).map(
          (_, index) => (
            <div
              key={index}
              className="min-w-0 text-center"
            >
              <div className="mx-auto h-3 w-10 sm:w-12 animate-pulse rounded bg-gray-800" />

              <div className="mx-auto mt-2 h-3 w-11 sm:w-14 animate-pulse rounded bg-gray-800" />
            </div>
          )
        )}

      </div>
    ) : performance.length > 0 ? (
      <div
        className={`grid gap-1 ${
          performance.length === 1
            ? "grid-cols-1"
            : performance.length === 2
            ? "grid-cols-2"
            : performance.length === 3
            ? "grid-cols-3"
            : performance.length === 4
            ? "grid-cols-4"
            : "grid-cols-5"
        }`}
      >

        {performance.map((item) => {

          const date = new Date(
            `${item.slip_date}T00:00:00`
          );

          const formattedDate =
            date.toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
              }
            );

          const statusText =
            item.status === "won"
              ? "WON"
              : item.status === "lost"
              ? "LOST"
              : "PENDING";

          const statusColor =
            item.status === "won"
              ? "text-green-400"
              : item.status === "lost"
              ? "text-red-400"
              : "text-yellow-400";

          const statusIcon =
            item.status === "won"
              ? "🟢"
              : item.status === "lost"
              ? "🔴"
              : "🟡";

          return (
            <div
              key={item.slip_date}
              className="min-w-0 rounded-lg px-0.5 py-1.5 text-center transition hover:bg-white/[0.03] sm:px-1"
            >

              {/* DATE */}
              <p className="truncate text-[10px] font-semibold text-gray-400 sm:text-[11px]">
                {formattedDate}
              </p>

              {/* STATUS */}
              <p
                className={`mt-1 flex items-center justify-center gap-0.5 text-[9px] font-bold sm:text-[11px] ${statusColor}`}
              >
                <span className="text-[9px] sm:text-[10px]">
                  {statusIcon}
                </span>

                <span>
                  {statusText}
                </span>
              </p>

            </div>
          );
        })}

      </div>
    ) : (
      <div className="py-2 text-center">

        <p className="text-xs text-gray-500">
          No Premium results recorded yet.
        </p>

      </div>
    )}

  </section>
);

  /*
   * -----------------------------------------
   * USER CONTEXT LOADING
   * -----------------------------------------
   */

  if (userLoading) {
    return (
      <>
        {publicPerformance}

        <section className="rounded-2xl border border-yellow-500/20 bg-gray-900 p-6">

          <div className="flex justify-center">
            <div className="h-7 w-7 animate-pulse rounded-full bg-gray-800" />
          </div>

        </section>
      </>
    );
  }

  /*
   * -----------------------------------------
   * FREE USER
   *
   * Can see performance but not the slip.
   * -----------------------------------------
   */

  if (!hasPremium) {
    return (
      <>
        {publicPerformance}

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
              Today's exclusive accumulator is available
              to Premium members.
            </p>

            <a
              href="/pricing"
              className="mt-5 inline-block rounded-xl bg-yellow-500 px-5 py-2.5 font-semibold text-black transition hover:bg-yellow-400"
            >
              Unlock Premium
            </a>

          </div>

        </section>
      </>
    );
  }

  /*
   * -----------------------------------------
   * PREMIUM USER LOADING SLIP
   * -----------------------------------------
   */

  if (slipLoading) {
    return (
      <>
        {publicPerformance}

        <section className="rounded-2xl border border-yellow-500/20 bg-gray-900 p-6">

          <div className="animate-pulse">

            <div className="h-5 w-40 rounded bg-gray-800" />

            <div className="mt-5 space-y-4">

              <div className="h-12 rounded bg-gray-800" />

              <div className="h-12 rounded bg-gray-800" />

              <div className="h-12 rounded bg-gray-800" />

            </div>

          </div>

        </section>
      </>
    );
  }

  /*
   * -----------------------------------------
   * PREMIUM USER
   * NO SLIP PUBLISHED
   * -----------------------------------------
   */

  if (!slip || slip.matches.length === 0) {
    return (
      <>
        {publicPerformance}

        <section className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 text-center">

          <div className="text-3xl">
            🎯
          </div>

          <h2 className="mt-2 text-xl font-bold text-white">
            Premium Slip of the Day
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Today's premium accumulator has not been
            published yet.
          </p>

        </section>
      </>
    );
  }

  /*
   * -----------------------------------------
   * PREMIUM USER
   * SLIP AVAILABLE
   * -----------------------------------------
   */

  const foldLabel =
    slip.matches.length === 1
      ? "Single"
      : `${slip.matches.length}-Fold`;

  return (
    <>
      {/* PUBLIC PERFORMANCE */}

      {publicPerformance}

      {/* PREMIUM SLIP */}

      <section className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gray-900 shadow-[0_0_30px_rgba(234,179,8,0.08)]">

        {/* HEADER */}

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

            {/* FOLD */}

            <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-sm font-bold text-yellow-400">
              {foldLabel}
            </div>

          </div>

        </div>

        {/* MATCHES */}

        <div className="divide-y divide-gray-800">

          {slip.matches.map(
            (match, index) => (
              <div
                key={index}
                className="px-5 py-4"
              >

                <div className="flex items-center justify-between gap-4">

                  <div className="min-w-0 flex-1">

                    <p className="font-medium text-white">

                      {match.home}

                      <span className="text-gray-500">
                        {" "}vs{" "}
                      </span>

                      {match.away}

                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {match.market}
                    </p>

                  </div>

                  <div className="shrink-0 text-right">

                    <p className="text-sm font-bold text-green-400">
                      {Number(
                        match.odds
                      ).toFixed(2)}
                    </p>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

        {/* SUMMARY */}

        <div className="border-t border-gray-800 bg-black/20 px-5 py-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-gray-500">
                Total Odds
              </p>

              <p className="text-2xl font-bold text-green-400">
                {Number(
                  slip.total_odds
                ).toFixed(2)}
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

        {/* BOOKING CODE */}

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
                  navigator.clipboard.writeText(
                    slip.booking_code || ""
                  );
                }}
                className="rounded-lg border border-gray-700 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-yellow-500 hover:text-yellow-400"
              >
                Copy
              </button>

            </div>

          </div>
        )}

      </section>
    </>
  );
}