"use client";

import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">
            Upgrade to Premium 🚀
          </h1>
          <p className="text-gray-400 text-sm">
            Unlock smarter predictions and advanced betting tools
          </p>
        </div>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* FREE PLAN */}
          <div className="border border-gray-700 rounded-xl p-6 space-y-5 bg-gray-900">
            <h2 className="text-xl font-semibold">Free</h2>

            <p className="text-3xl font-bold">₦0</p>

            <ul className="space-y-3 text-sm text-gray-300">
  <li className="flex items-center gap-2">
    <Check size={16} /> Basic predictions
  </li>
  <li className="flex items-center gap-2">
    <Check size={16} /> Limited markets
  </li>
  <li className="flex items-center gap-2">
    <Check size={16} /> Lock up to 2 picks 🔒
  </li>

  <li className="flex items-center gap-2 text-gray-500 line-through">
    Lucky Slip
  </li>
  <li className="flex items-center gap-2 text-gray-500 line-through">
    Mixed Markets
  </li>
  <li className="flex items-center gap-2 text-gray-500 line-through">
    Target Odds
  </li>
</ul>

            <button className="w-full py-2 rounded-lg border border-gray-600 text-gray-400 cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* PREMIUM PLAN */}
          <div className="border border-yellow-500 rounded-xl p-6 space-y-5 bg-yellow-500/5 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            <h2 className="text-xl font-semibold text-yellow-400">
              Premium ⭐
            </h2>

            <p className="text-3xl font-bold">₦2,500 / month</p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
               <Check size={16} /> Unlimited pick locks 🔒
              </li>
              
              <li className="flex items-center gap-2">
                <Check size={16} /> Lucky Slip 🎰
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Mixed Markets 🎲
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Target Odds 🎯
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Premium markets access 🔒
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Faster generation ⚡
              </li>
            </ul>

            <button
              onClick={() => alert("Payment integration coming soon")}
              className="w-full py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
            >
              Upgrade Now
            </button>
          </div>

        </div>

        {/* FEATURE COMPARISON */}
        <div className="border border-gray-800 rounded-xl p-6 bg-gray-900">
          <h3 className="text-lg font-semibold mb-4">Why go Premium?</h3>

          <div className="space-y-3 text-sm text-gray-300">
            <p>✔ Higher accuracy predictions</p>
            <p>✔ Access to powerful betting strategies</p>
            <p>✔ Save time with smarter slips</p>
            <p>✔ Unlock hidden markets</p>
          </div>
        </div>

      </div>
    </div>
  );
}
