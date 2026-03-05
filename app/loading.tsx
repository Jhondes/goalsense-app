export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Spinning Football */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        <div className="text-6xl animate-spin drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]">
          ⚽
        </div>

        <p className="text-emerald-400 text-lg tracking-wide animate-pulse">
          Loading Football Generator...
        </p>

      </div>
    </div>
  );
}