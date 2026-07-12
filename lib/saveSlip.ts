import { supabase } from "@/lib/supabaseClient";

export async function saveSlip(results: any[], totalOdds: number | string) {
  if (!results.length) return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  const { data: slip, error: slipError } = await supabase
    .from("slips")
    .insert({
      user_id: user?.id ?? null,
      total_odds: Number(totalOdds),
    })
    .select()
    .single();

  if (slipError) {
    console.error(slipError);
    return;
  }

  const rows = results.map((pick) => ({
    slip_id: slip.id,
    match_id: pick.id,
  }));

  console.log("Rows to insert:", rows);

  const { error } = await supabase
    .from("slip_matches")
    .insert(rows);

  if (error) {
  console.log("Slip matches error:", {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });
}
}