import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://sahiajlucfikkgpkafda.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhaGlhamx1Y2Zpa2tncGthZmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzOTYwODMsImV4cCI6MjA5MDk3MjA4M30._N0Jqdc6pYA1lY5Lc_uHGnGt1GJ46sFjKTM9Ybx7UV8" // your anon key
);