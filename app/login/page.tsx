"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
  setLoading(true);

  if (isSignup) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // ⚠️ IMPORTANT: check session
    if (!data.session) {
      alert("Account created ✅ Check your email to confirm.");
      return;
    }

    // ✅ if auto-login works
    window.location.href = "/";
  } else {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Logged in ✅");
    window.location.href = "/";
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl space-y-5">

        <h1 className="text-2xl font-bold text-center">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-yellow-500 text-black py-2 rounded font-semibold"
        >
          {loading
            ? "Please wait..."
            : isSignup
            ? "Sign Up"
            : "Login"}
        </button>

        <p className="text-sm text-center text-gray-400">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-yellow-400 cursor-pointer"
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>

      </div>
    </div>
  );
}