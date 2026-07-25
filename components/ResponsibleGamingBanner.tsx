export default function ResponsibleGamingBanner() {
  return (
    <div className="w-full border-b border-yellow-500/20 bg-zinc-900">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-3 py-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-bold text-[10px] text-black">
          18+
        </span>

        <span className="shrink-0 text-yellow-400">⚠</span>

        {/* Mobile */}
        <p className="text-[11px] leading-tight text-gray-300 sm:hidden">
          Bet responsibly. Only wager what you can afford to lose.
        </p>

        {/* Desktop */}
        <p className="hidden text-sm text-gray-300 sm:block">
          Football predictions are for informational purposes only. Betting
          involves financial risk. Only wager what you can afford to lose.
        </p>
      </div>
    </div>
  );
}