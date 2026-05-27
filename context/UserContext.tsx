"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ EXISTING (unchanged)
  const refreshProfile = async () => {
    if (!user?.id) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setProfile(data);
      return data;
    }

    return null;
  };

  // ✅ MODIFIED (IMPORTANT IMPROVEMENT)
  const fetchUser = async () => {
    const { data } = await supabase.auth.getSession();
    const authUser = data?.session?.user;

    if (!authUser) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    setUser(authUser);

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    setProfile(profileData);
    setLoading(false);
  };

  // ✅ EXISTING AUTH LISTENER (unchanged)
  useEffect(() => {
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ==============================
  // 🔥 NEW FIX #1: WINDOW FOCUS REFRESH
  // ==============================
  useEffect(() => {
    const handleFocus = () => {
      if (user?.id) {
        refreshProfile(); // re-check premium after payment redirect
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, [user]);

  // ==============================
  // 🔥 NEW FIX #2: AUTO PROFILE SYNC ON USER CHANGE
  // ==============================
  useEffect(() => {
    if (user?.id) {
      refreshProfile();
    }
  }, [user]);

  const hasPremium =
    profile?.is_premium &&
    profile?.premium_expires &&
    new Date(profile.premium_expires) > new Date();

    const premiumExpiryText = profile?.premium_expires
  ? (() => {
      const now = new Date();
      const expiry = new Date(profile.premium_expires);

      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        return "Expired";
      }

      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (days === 1) {
        return "1 day left";
      }

      return `${days} days left`;
    })()
  : null;

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        hasPremium,
        premiumExpiryText,
        loading,

        // existing
        refresh: fetchUser,

        // important new addition
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);