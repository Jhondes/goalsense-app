"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      const authUser = data?.session?.user;

      if (!authUser) {
        setUser(null);
        setProfile(null);
        return;
      }

      setUser(authUser);

      const { data: profileData } = await supabase
        .from("profiles") // ✅ FIXED
        .select("*")
        .eq("id", authUser.id)
        .single();

      setProfile(profileData);
    };

    getUser();

    // ✅ listen for login/logout automatically
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Logo */}
      <Link href="/#generator" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="GoalSense Logo"
          width={40}
          height={40}
          className="drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]"
          priority
        />
        <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          GoalSense.
        </span>
      </Link>

      {/* Menu */}
      <div className="flex items-center gap-4">
        {user ? (
  <div className="flex items-center gap-3">
    
    <div className="flex flex-col text-right">
      <span className="text-green-400 font-semibold">
        {profile?.is_premium ? "Premium ✅" : "Logged in ✅"}
      </span>

      <span className="text-xs text-gray-400">
        {user.email}
      </span>
    </div>

    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-red-400 hover:text-red-300"
    >
      Logout
    </button>

  </div>
) : (
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-5 py-2 bg-emerald-500 text-black rounded-lg"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}