import type { Metadata } from "next";
import Link from "next/link";
import PredictionLinks from "@/components/PredictionLinks";

export const metadata: Metadata = {
  title: "Premier League Predictions & Football Tips | GoalSense",
  description:
    "Generate Premier League predictions, BTTS picks, Over 2.5 goals and match winner selections for today's EPL fixtures using GoalSense.",
  keywords: [
    "premier league predictions",
    "epl predictions",
    "english premier league tips",
    "premier league betting tips",
    "today premier league predictions",
    "premier league accumulator",
  ],
  alternates: {
    canonical: "https://goalsense.live/premier-league-predictions",
  },
};

export default function PremierLeaguePredictions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6">
        Premier League Predictions
      </h1>

      <p className="text-gray-400 mb-6 leading-8">
        The English Premier League is one of the most competitive football
        leagues in the world. GoalSense helps you generate Premier League
        predictions by selecting today's EPL fixtures and filtering them into
        betting markets such as Over 2.5 Goals, BTTS and Match Winner.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">
        Premier League Markets
      </h2>

      <ul className="list-disc pl-6 text-gray-300 space-y-2">
        <li>Over 1.5 Goals</li>
        <li>Over 2.5 Goals</li>
        <li>Both Teams To Score (BTTS)</li>
        <li>Home or Away Winner</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-12 mb-4">
        Why Use GoalSense for EPL Predictions?
      </h2>

      <p className="text-gray-400 leading-8">
        Instead of manually reviewing every Premier League fixture, GoalSense
        allows you to generate football predictions instantly using smart
        filters. Build your accumulator in seconds and explore multiple betting
        markets from one simple generator.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">
        Create Your Premier League Accumulator
      </h2>

      <p className="text-gray-400 leading-8">
        Generate today's Premier League accumulator by selecting your preferred
        betting market and number of picks. Premium users can unlock advanced
        generator features including mixed markets, target odds and larger
        accumulator slips.
      </p>

      <div className="mt-12">
        <Link
          href="/"
          className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-500 transition"
        >
          Generate Premier League Predictions
        </Link>
      </div>

      <div className="mt-16">
        <PredictionLinks />
      </div>

    </main>
  );
}