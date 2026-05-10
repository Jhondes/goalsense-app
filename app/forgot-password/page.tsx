"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BackgroundBalls from "@/components/BackgroundBalls";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://goalsense.live/reset-password",
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Reset email sent ✅");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-950 text-white px-4 overflow-hidden">
      
      {/* Animated Background */}
      <BackgroundBalls />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl space-y-5 border border-gray-800">

        <h1 className="text-2xl font-bold text-center">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-400 text-center">
          Enter your email address and we’ll send you a password reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none"
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-yellow-500 text-black py-3 rounded font-semibold"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </div>
    </div>
  );
}