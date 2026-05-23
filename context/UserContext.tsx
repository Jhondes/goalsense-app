"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const refreshProfile = async () => {
  if (!user?.id) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!error && data) {
    setProfile(data);
    return data;
  }

  return null;
};

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
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  setProfile(profileData);
  setLoading(false);
};

  useEffect(() => {
    fetchUser();

    // 🔥 listens for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, loading, refresh: fetchUser, refreshProfile, }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);