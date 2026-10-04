"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabaseClient";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // REFRESH PROFILE
  // ==========================================

  const refreshProfile = async () => {
    if (!user?.id) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Profile refresh error:", error);
      return null;
    }

    if (data) {
      console.log("UPDATED PROFILE:", data);

      setProfile(data);

      return data;
    }

    return null;
  };

  // ==========================================
  // FETCH USER
  // ==========================================

  const fetchUser = async () => {
    try {
      const { data } = await supabase.auth.getSession();

      const authUser = data?.session?.user;

      if (!authUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(authUser);

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
      }

      console.log("PROFILE LOADED:", profileData);

      setProfile(profileData);

      setLoading(false);
    } catch (error) {
      console.error("Fetch user error:", error);
      setLoading(false);
    }
  };

  // ==========================================
  // AUTH LISTENER
  // ==========================================

  useEffect(() => {
    fetchUser();

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ==========================================
  // REFRESH WHEN WINDOW GETS FOCUS
  // ==========================================

  useEffect(() => {
    const handleFocus = () => {
      if (user?.id) {
        refreshProfile();
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [user]);

  // ==========================================
  // REFRESH WHEN USER CHANGES
  // ==========================================

  useEffect(() => {
    if (user?.id) {
      refreshProfile();
    }
  }, [user]);

  // ==========================================
  // PREMIUM STATUS
  // ==========================================

  const hasPremium =
    profile?.is_premium === true &&
    profile?.premium_expires_at &&
    new Date(profile.premium_expires_at) > new Date();

  // ==========================================
  // PREMIUM EXPIRY TEXT
  // ==========================================

  const premiumExpiryText = profile?.premium_expires_at
    ? (() => {
        const now = new Date();

        const expiry = new Date(
          profile.premium_expires_at
        );

        const diff =
          expiry.getTime() - now.getTime();

        if (diff <= 0) {
          return "Expired";
        }

        const days = Math.ceil(
          diff / (1000 * 60 * 60 * 24)
        );

        if (days === 1) {
          return "1 day left";
        }

        return `${days} days left`;
      })()
    : null;

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        hasPremium,
        premiumExpiryText,
        loading,

        refresh: fetchUser,
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export const useUser = () =>
  useContext(UserContext);