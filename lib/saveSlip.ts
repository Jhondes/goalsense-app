import { supabase } from "@/lib/supabaseClient";

export async function saveSlip(
  results: any[],
  totalOdds: number | string
) {
  if (!results.length) return;

  // Get the current session
  let {
    data: { session },
  } = await supabase.auth.getSession();

  // If we have a session, refresh it before saving
  if (session) {
    const {
      data: refreshedSession,
      error: refreshError,
    } = await supabase.auth.refreshSession();

    if (refreshError) {
      console.error("SESSION REFRESH ERROR:", refreshError);
      return;
    }

    session = refreshedSession.session;
  }

  const user = session?.user;

  console.log("Saving slip:", {
    userId: user?.id ?? null,
    totalOdds,
    resultsCount: results.length,
  });

  const {
    data: slip,
    error: slipError,
  } = await supabase
    .from("slips")
    .insert({
      user_id: user?.id ?? null,
      total_odds: Number(totalOdds),
    })
    .select()
    .single();

  if (slipError) {
    console.error("SLIPS INSERT ERROR:", {
      message: slipError.message,
      details: slipError.details,
      hint: slipError.hint,
      code: slipError.code,
    });

    return;
  }

  const rows = results.map((pick) => ({
    slip_id: slip.id,
    match_id: pick.id,
  }));

  console.log("Rows to insert:", rows);

  const { error: slipMatchesError } = await supabase
    .from("slip_matches")
    .insert(rows);

  if (slipMatchesError) {
    console.error("SLIP MATCHES INSERT ERROR:", {
      message: slipMatchesError.message,
      details: slipMatchesError.details,
      hint: slipMatchesError.hint,
      code: slipMatchesError.code,
    });

    return;
  }

  console.log("Slip saved successfully.");
}