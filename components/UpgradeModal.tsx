"use client";

import React from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UpgradeModal({ open, onClose }: any) {
  if (!open) return null;

  const handleUpgrade = async () => {
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user;

  // 🚨 Not logged in → save intent + redirect
  if (!user) {
    localStorage.setItem("after_login_redirect", "/pricing");
    window.location.href = "/login";
    return;
  }

  // ✅ Logged in → send to Paystack WITH email
  window.location.href = `https://paystack.shop/pay/goalsense-premium?email=${user.email}`;
};

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] text-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">

        <h2 className="text-xl font-bold mb-4">🚀 Upgrade to Premium</h2>

        <div className="text-sm space-y-3">
          <p>Unlock:</p>
          <ul className="list-disc ml-5">
            <li>Unlimited locked picks</li>
            <li>Premium markets (Over 2.5, BTTS)</li>
          </ul>

          <div className="mt-4">
  <p className="font-semibold">To upgrade:</p>

  <p className="text-green-400 font-semibold">
    Secure payment powered by Paystack
  </p>

  <p className="text-gray-300 mt-2">
    Click the button below to complete payment instantly with card or bank transfer.
  </p>
</div>

<p className="mt-3 text-blue-400">
  After payment, your account will be upgraded automatically.
</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleUpgrade}
            className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
          >
            Pay Now
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-800 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}