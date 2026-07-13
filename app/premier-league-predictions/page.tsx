import type { Metadata } from "next";
import Link from "next/link";
import PredictionLinks from "@/components/PredictionLinks";

export const metadata: Metadata = {
  title: "Premier League Predictions Today | GoalSense",
  description:
    "Generate Premier League football predictions and betting tips using GoalSense.",
};

export default function PremierLeaguePredictions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6">
        Premier League Predictions
      </h1>

      <p className="text-gray-400 mb-6">
        The English Premier League is one of the world's most followed
        football competitions. GoalSense helps generate Premier League
        predictions for today's fixtures.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Popular Premier League Markets
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Match Winner</li>
        <li>Over 2.5 Goals</li>
        <li>BTTS</li>
        <li>Over 1.5 Goals</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Generate Premier League Picks
      </h2>

      <p className="text-gray-400">
        Use GoalSense to quickly generate Premier League accumulator slips
        using today's available matches.
      </p>

      <Link
        href="/"
        className="inline-block mt-10 bg-green-600 px-6 py-3 rounded-lg hover:bg-green-500"
      >
        Generate EPL Predictions
      </Link>

 {/* Internal SEO Links */}
      <div className="mt-16">
        <PredictionLinks />
      </div>
    </main>
  );
}