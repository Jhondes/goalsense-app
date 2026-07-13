import type { Metadata } from "next";
import Link from "next/link";
import PredictionLinks from "@/components/PredictionLinks";

export const metadata: Metadata = {
  title: "BTTS Predictions Today | GoalSense",
  description:
    "Generate today's Both Teams To Score predictions with GoalSense.",
};

export default function BTTSPredictions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6">
        BTTS Predictions Today
      </h1>

      <p className="text-gray-400 mb-6">
        BTTS (Both Teams To Score) is a football betting market where both
        teams must score at least one goal for the prediction to win.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Why BTTS is Popular
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Strong value in attacking leagues</li>
        <li>Popular with accumulator bettors</li>
        <li>Easy market to combine with others</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        GoalSense BTTS Generator
      </h2>

      <p className="text-gray-400">
        GoalSense helps generate BTTS predictions using today's football
        fixtures from multiple leagues.
      </p>

      <Link
        href="/"
        className="inline-block mt-10 bg-green-600 px-6 py-3 rounded-lg hover:bg-green-500"
      >
        Generate BTTS Predictions
      </Link>

 {/* Internal SEO Links */}
      <div className="mt-16">
        <PredictionLinks />
      </div>
    </main>
  );
}