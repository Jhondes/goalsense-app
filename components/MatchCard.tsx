export default function MatchCard({ match }: any) {
  return (
    <div className="
      bg-gray-900 border border-gray-700
      rounded-xl p-4
      transition-all duration-300
      hover:border-green-500
      hover:shadow-[0_0_25px_rgba(34,197,94,0.7)]
      animate-[fadeIn_0.4s_ease]
    ">

      <div className="flex justify-between mb-2">
        <span className="font-semibold">
          {match.home} vs {match.away}
        </span>

        <span className="
          bg-green-600 px-3 py-1 text-sm rounded-full
          shadow-md
        ">
          {match.odds}
        </span>
      </div>

      <div className="text-gray-400">
        Prediction: {match.prediction}
      </div>

    </div>
  );
}
