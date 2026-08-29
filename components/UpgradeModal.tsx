"use client";

import React from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UpgradeModal({ open, onClose }: any) {
  if (!open) return null;

  const handleUpgrade = async (paymentUrl: string) => {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;

    // 🚨 Not logged in → save intent + redirect
    if (!user) {
      localStorage.setItem("after_login_redirect", "/pricing");
      window.location.href = "/login";
      return;
    }

    // ✅ Logged in → send to selected Paystack page WITH email
    window.location.href = `${paymentUrl}?email=${encodeURIComponent(
      user.email || ""
    )}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-[#0f172a] text-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">

        <h2 className="text-xl font-bold mb-4">
          🚀 Choose Your Premium Plan
        </h2>

        <div className="text-sm space-y-3">

          <p>Unlock:</p>

          <ul className="list-disc ml-5 space-y-1">
            <li>Unlimited locked picks</li>
            <li>Premium markets (Over 2.5, BTTS)</li>
            <li>Lucky Slip 🎰</li>
            <li>Mixed Markets 🎲</li>
            <li>Target Odds 🎯</li>
            <li>Premium Slip 🎯</li>
          </ul>

          <div className="mt-4">
            <p className="font-semibold">
              Choose your Premium duration:
            </p>

            <p className="text-green-400 font-semibold mt-1">
              Secure payment powered by Paystack
            </p>

            <p className="text-gray-300 mt-2">
              Select a plan below to complete payment instantly with
              card or bank transfer.
            </p>
          </div>

        </div>

        {/* PAYMENT OPTIONS */}
        <div className="mt-6 space-y-3">

          {/* 1 MONTH */}
          <button
            onClick={() =>
              handleUpgrade(
                "https://paystack.shop/pay/goalsense-premium-1-month"
              )
            }
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
          >
            <span className="block">1 Month — ₦3,000</span>
            <span className="block text-xs font-normal opacity-80">
              30 days Premium
            </span>
          </button>

          {/* 3 MONTHS */}
          <button
            onClick={() =>
              handleUpgrade(
                "https://paystack.shop/pay/goalsense-premium-3-months"
              )
            }
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-semibold transition"
          >
            <span className="block">3 Months — ₦7,500</span>
            <span className="block text-xs font-normal opacity-80">
              90 days Premium • Save ₦1,500
            </span>
          </button>

          {/* 6 MONTHS */}
          <button
            onClick={() =>
              handleUpgrade(
                "https://paystack.shop/pay/goalsense-premium-6-months"
              )
            }
            className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-semibold transition"
          >
            <span className="block">6 Months — ₦13,500</span>
            <span className="block text-xs font-normal opacity-80">
              180 days Premium • Save ₦4,500
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-800 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

        <p className="text-xs text-blue-400 text-center mt-4">
          After payment, your account will be upgraded automatically.
        </p>

      </div>
    </div>
  );
}
