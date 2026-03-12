"use client";

export default function FloatingSlip({ results, totalOdds }: any) {

  if (!results.length) return null;

  const slipText = results
    .map((r: any) => `${r.home} vs ${r.away} — ${r.prediction} (${r.odds})`)
    .join("\n");

  const text = `GoalSense Bet Slip

${slipText}

Total Odds: ${totalOdds}

Generated with GoalSense.live`;

  const copySlip = () => {
    navigator.clipboard.writeText(text);
    alert("Slip copied!");
  };

  const shareSlip = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "GoalSense Bet Slip",
          text: text,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Sharing not supported. Slip copied instead.");
    }
  };

  return (
  <div
    className="
      fixed bottom-6 left-1/2 -translate-x-1/2
      bg-gray-900 border border-green-500
      rounded-xl px-6 py-3
      flex items-center gap-3 sm:gap-6
      shadow-[0_0_25px_rgba(34,197,94,0.4)]
      backdrop-blur
      z-50
    "
  >

      <div className="text-sm">
        <span className="text-green-400 font-semibold">
          ⚽ {results.length} Picks
        </span>
      </div>

      <div className="flex flex-col items-center">
  <span className="text-xs text-gray-400">
    Total Odds
  </span>

  <span className="text-lg font-bold text-green-400">
    {totalOdds}
  </span>
</div>

      {/* Copy Button */}
      <button
        onClick={copySlip}
        className="
          bg-green-600 px-4 py-1 rounded-lg
          hover:bg-green-500 transition
        "
      >
        Copy Slip
      </button>

      {/* Share Button */}
      <button
        onClick={shareSlip}
        className="
          bg-emerald-500 px-4 py-1 rounded-lg
          hover:bg-emerald-400 transition
        "
      >
        Share Slip
      </button>

    </div>
  );
}