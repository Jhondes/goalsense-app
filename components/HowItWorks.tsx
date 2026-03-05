export default function HowItWorks() {
  return (
    <div className="relative z-10 mt-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white text-center mb-6">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        
        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-lg font-bold">
            1
          </div>
          <h3 className="text-white font-semibold">Select Date</h3>
          <p className="text-gray-400 text-sm">
            Choose your preferred match date to get available games.
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-lg font-bold">
            2
          </div>
          <h3 className="text-white font-semibold">Choose Market</h3>
          <p className="text-gray-400 text-sm">
            Pick your desired prediction market like Over 1.5 or BTTS.
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-lg font-bold">
            3
          </div>
          <h3 className="text-white font-semibold">
            Generate Smart Predictions
          </h3>
          <p className="text-gray-400 text-sm">
            Instantly receive statistically generated football picks.
          </p>
        </div>

      </div>
    </div>
  );
}