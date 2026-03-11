"use client";

export default function FloatingSlip({ results, totalOdds }: any) {

  if (!results.length) return null;

  const copySlip = () => {
    const slip = results
      .map((r: any) => `${r.home} vs ${r.away} — ${r.prediction} (${r.odds})`)
      .join("\n");

    const text = `
GoalSense Bet Slip

${slip}

Total Odds: ${totalOdds}
`;

    navigator.clipboard.writeText(text);
    alert("Slip copied!");
  };

  return (
    <div className="
      fixed bottom-6 left-1/2 -translate-x-1/2
      bg-gray-900 border border-green-500
      rounded-xl px-6 py-3
      flex items-center gap-6
      shadow-[0_0_25px_rgba(34,197,94,0.4)]
      backdrop-blur
      z-50
    ">

      <div className="text-sm">
        <span className="text-green-400 font-semibold">
          ⚽ {results.length} Picks
        </span>
      </div>

      <div className="text-lg font-bold text-green-400">
        {totalOdds}
      </div>

      <button
        onClick={copySlip}
        className="
          bg-green-600 px-4 py-1 rounded-lg
          hover:bg-green-500 transition
        "
      >
        Copy Slip
      </button>

    </div>
  );
}