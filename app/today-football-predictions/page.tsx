import type { Metadata } from "next";
import Link from "next/link";
import PredictionLinks from "@/components/PredictionLinks";

export const metadata: Metadata = {
  title: "Today's Football Predictions | GoalSense",
  description:
    "Generate today's football predictions, accumulator slips, BTTS, Over 2.5 and match winner selections using GoalSense.",
};

export default function TodayFootballPredictions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6">
        Today's Football Predictions
      </h1>

      <p className="text-gray-400 mb-6">
        GoalSense generates football predictions using today's fixtures from
        Europe's biggest leagues. Select your preferred betting market and
        create accumulator slips in seconds.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Markets Available
      </h2>

      <ul className="list-disc pl-6 text-gray-300 space-y-2">
        <li>Over 1.5 Goals</li>
        <li>Over 2.5 Goals</li>
        <li>BTTS</li>
        <li>Match Winner</li>
      </ul>

      <div className="mt-10">
        <Link
          href="/"
          className="bg-green-600 px-5 py-3 rounded-lg hover:bg-green-500"
        >
          Generate Predictions
        </Link>
      </div>
 {/* Internal SEO Links */}
      <div className="mt-16">
        <PredictionLinks />
      </div>
    </main>
  );
}