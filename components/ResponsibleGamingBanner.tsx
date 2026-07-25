export default function ResponsibleGamingBanner() {
  return (
    <div className="w-full border-b border-yellow-500/20 bg-zinc-900">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <span className="rounded-full bg-yellow-500 px-2 py-0.5 font-bold text-black">
          18+
        </span>

        <span className="text-yellow-400">⚠</span>

        <p className="text-gray-300">
          Football predictions are for informational purposes only. Betting
          involves financial risk. Only bet what you can afford to lose.
        </p>
      </div>
    </div>
  );
}