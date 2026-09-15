"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UpgradeModal({ open, onClose }: any) {
  const [showManualPayments, setShowManualPayments] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
  if (!open) return;

  const loadUserEmail = async () => {
    const { data } = await supabase.auth.getSession();
    const email = data?.session?.user?.email || "";
    setUserEmail(email);
  };

  loadUserEmail();
}, [open]);

  if (!open) return null;

  const handleUpgrade = async (paymentUrl: string) => {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;

    if (!user) {
      localStorage.setItem("after_login_redirect", "/pricing");
      window.location.href = "/login";
      return;
    }

    const email = encodeURIComponent(user.email || "");
    window.location.href = paymentUrl + "?email=" + email;
  };

  const handleManualPayment = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;

    if (!user) {
      localStorage.setItem("after_login_redirect", "/pricing");
      window.location.href = "/login";
      return;
    }

    setShowManualPayments(true);
  };

  const contactWhatsApp = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;

    if (!user) {
      localStorage.setItem("after_login_redirect", "/pricing");
      window.location.href = "/login";
      return;
    }

    const email = user.email || "";

    const message =
      "Hello GoalSense 👋 " +
      "I want to subscribe to GoalSense Premium. " +
      "My GoalSense email: " +
      email +
      " Please send me the available manual payment options and instructions.";

    const whatsappNumber = "2348054549670";

    window.open(
      "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message),
      "_blank"
    );
  };

  const copyEmail = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;

    if (user?.email) {
      await navigator.clipboard.writeText(user.email);
      alert("Your GoalSense email has been copied.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 overflow-y-auto">
      <div className="bg-[#0f172a] text-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl my-6">

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

        {/* PAYSTACK PAYMENT OPTIONS */}
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

          {/* OTHER PAYMENT METHODS */}
          <div className="border border-gray-700 rounded-xl mt-5 overflow-hidden">

            <button
              onClick={handleManualPayment}
              className="w-full px-4 py-3 flex items-center justify-between bg-[#172033] hover:bg-[#1d293d] transition"
            >
              <span className="font-semibold">
                🌍 Other Payment Methods
              </span>

              <span className="text-gray-400">
                {showManualPayments ? "▲" : "▼"}
              </span>
            </button>

            {showManualPayments && (
              <div className="p-4 space-y-4 bg-[#111827]">

                <p className="text-sm text-gray-300">
                  Prefer another payment method? Contact us and we will
                  help you complete your Premium subscription manually.
                </p>

                {/* USER EMAIL */}
                <div className="bg-[#0f172a] border border-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">
                    Your GoalSense account email
                  </p>

                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium break-all flex-1">
  {userEmail || "Account email"}
</p>

                    <button
                      onClick={copyEmail}
                      className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md"
                    >
                      Copy
                    </button>
                  </div>

                  <p className="text-xs text-green-400 mt-2">
                    Use your GoalSense account email when sending payment
                    proof.
                  </p>
                </div>

                {/* WHATSAPP */}
                <div className="bg-[#0f172a] rounded-lg p-3">
                  <p className="font-semibold">
                    💬 WhatsApp
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Contact us, choose your plan and send your payment
                    confirmation.
                  </p>

                  <button
                    onClick={contactWhatsApp}
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm font-semibold"
                  >
                    Contact on WhatsApp
                  </button>
                </div>

                {/* BANK TRANSFER */}
                <div className="bg-[#0f172a] rounded-lg p-3">
                  <p className="font-semibold">
                    🏦 Bank Transfer
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Contact us for bank transfer details and send your
                    payment receipt after payment.
                  </p>
                </div>

                {/* PAYPAL */}
                <div className="bg-[#0f172a] rounded-lg p-3">
                  <p className="font-semibold">
                    💳 PayPal
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Contact us for PayPal payment details and send your
                    confirmation after payment.
                  </p>
                </div>

                {/* MOBILE MONEY */}
                <div className="bg-[#0f172a] rounded-lg p-3">
                  <p className="font-semibold">
                    📱 Mobile Money
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Available for supported countries. Contact us for
                    payment instructions.
                  </p>
                </div>

                {/* CRYPTO */}
                <div className="bg-[#0f172a] rounded-lg p-3">
                  <p className="font-semibold">
                    ₮ USDT / Crypto
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Contact us for supported wallet and payment
                    instructions.
                  </p>
                </div>

                {/* MANUAL PROCESS */}
                <div className="border-t border-gray-700 pt-4">

                  <p className="text-sm font-semibold mb-2">
                    How manual payment works
                  </p>

                  <ol className="text-xs text-gray-400 space-y-2">
                    <li>1️⃣ Choose a payment method.</li>
                    <li>2️⃣ Contact GoalSense for payment details.</li>
                    <li>3️⃣ Select your Premium duration.</li>
                    <li>4️⃣ Complete the payment.</li>
                    <li>5️⃣ Send your payment confirmation.</li>
                    <li>6️⃣ We verify the payment and activate Premium.</li>
                  </ol>

                </div>

                <p className="text-xs text-yellow-400 text-center">
                  ⚡ Manual payments are verified before Premium is activated.
                </p>

              </div>
            )}

          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-800 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

        <p className="text-xs text-blue-400 text-center mt-4">
          Paystack payments upgrade your account automatically.
          Manual payments are activated after verification.
        </p>

      </div>
    </div>
  );
}

