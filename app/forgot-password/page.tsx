"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  async function handleReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://goalsense.live/reset-password",
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Reset email sent ✅");
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleReset}>
        Send Reset Link
      </button>
    </div>
  );
}