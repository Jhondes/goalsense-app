"use client";

import React from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UpgradeModal({ open, onClose }: any) {
  if (!open) return null;

  const handlePaid = async () => {
  const { data, error } = await supabase.auth.getSession();

  const user = data?.session?.user;

  

  // 🚨 NOT LOGGED IN → STOP and redirect
  if (!user) {
    window.location.href = "/login";
    return;
  }

  // ✅ LOGGED IN → proceed to WhatsApp
  const message = `I have paid for GoalSense Premium.
Email: ${user.email}
UserID: ${user.id}`;

  window.open(
    `https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(message)}`,
    "_blank"
  );
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
            <p>Bank: XXXX</p>
            <p>Account Name: XXXX</p>
            <p>Amount: ₦XXXX</p>
          </div>

          <p className="mt-3">
            After payment, click below and send proof via WhatsApp.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handlePaid}
            className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
          >
            I Have Paid
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