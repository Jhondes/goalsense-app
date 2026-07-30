"use client";

import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, hasPremium, premiumExpiryText } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900 px-4 py-4">
  <div className="mx-auto flex max-w-7xl items-center justify-between">

    {/* Logo */}
    <Link href="/#generator" className="flex items-center gap-2">
      <Image
        src="/logomain.png"
        alt="GoalSense"
        width={50}
        height={50}
        className="h-12 w-12 object-contain drop-shadow-[0_0_6px_rgba(16,185,129,0.35)]"
        priority
      />

      <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-xl font-extrabold text-transparent">
        GoalSense
      </span>
    </Link>

    {/* Right side */}
    {user ? (
      <div className="flex items-center gap-4">

        {/* User info */}
<div className="flex flex-col items-end">

  {/* Premium/Login badge */}
  <div className="rounded-full bg-emerald-500/15 px-3 py-1">
    <span className="text-xs font-semibold text-emerald-400">
      {hasPremium ? "Premium ✓" : "Logged in ✓"}
    </span>
  </div>

  {/* Email (hidden on mobile) */}
  <span className="hidden text-xs text-gray-400 sm:block mt-1">
    {user.email}
  </span>

  {/* Premium expiry */}
  {hasPremium && premiumExpiryText && (
    <span className="mt-1 text-[11px] text-yellow-300">
      👑 {premiumExpiryText}
    </span>
  )}

</div>

        <button
          onClick={handleLogout}
          className="rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
        >
          Logout
        </button>

      </div>
    ) : (
      <button
        onClick={() => (window.location.href = "/login")}
        className="rounded-lg bg-emerald-500 px-5 py-2 font-medium text-black hover:bg-emerald-400"
      >
        Login
      </button>
    )}

  </div>
</nav>
  );
}