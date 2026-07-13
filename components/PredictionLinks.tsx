import Link from "next/link";

export default function PredictionLinks() {
  return (
    <section className="mt-16 border-t border-gray-700 pt-10">

      <h2 className="text-2xl font-bold mb-4">
        More Football Predictions
      </h2>

      <div className="grid gap-3">

        <Link
          href="/today-football-predictions"
          className="text-green-400 hover:text-green-300 transition"
        >
          Today's Football Predictions →
        </Link>

        <Link
          href="/over-2.5-predictions"
          className="text-green-400 hover:text-green-300 transition"
        >
          Over 2.5 Predictions →
        </Link>

        <Link
          href="/btts-predictions"
          className="text-green-400 hover:text-green-300 transition"
        >
          BTTS Predictions →
        </Link>

        <Link
          href="/premier-league-predictions"
          className="text-green-400 hover:text-green-300 transition"
        >
          Premier League Predictions →
        </Link>

      </div>

    </section>
  );
}