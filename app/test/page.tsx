"use client";

import { supabase } from "@/lib/supabaseClient";

export default function AuthTest() {
  const testSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "test@gmail.com",
      password: "12345678",
    });

    console.log("SIGNUP:", data, error);
  };

  const testLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "test@gmail.com",
      password: "12345678",
    });

    console.log("LOGIN:", data, error);
  };

  const checkUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log("USER:", data, error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Auth Test</h2>

      <button onClick={testSignup}>Test Signup</button>
      <br /><br />

      <button onClick={testLogin}>Test Login</button>
      <br /><br />

      <button onClick={checkUser}>Check User</button>
    </div>
  );
}