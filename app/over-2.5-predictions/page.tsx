import type { Metadata } from "next";
import Link from "next/link";
import PredictionLinks from "@/components/PredictionLinks";

export const metadata: Metadata = {
  title: "Over 2.5 Predictions Today | GoalSense",
  description:
    "Generate today's Over 2.5 football predictions using GoalSense.",
};

export default function Over25Predictions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6">
        Over 2.5 Predictions Today
      </h1>

      <p className="text-gray-400 mb-6">
        Over 2.5 Goals is one of the most popular football betting markets.
        The prediction wins when three or more goals are scored during the
        match.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Why bettors choose Over 2.5
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Higher odds than Over 1.5</li>
        <li>Popular in attacking leagues</li>
        <li>Ideal for accumulator slips</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        How GoalSense Helps
      </h2>

      <p className="text-gray-400">
        GoalSense filters today's fixtures and helps you quickly generate
        Over 2.5 accumulator slips using multiple leagues and competitions.
      </p>

      <Link
        href="/"
        className="inline-block mt-10 bg-green-600 px-6 py-3 rounded-lg hover:bg-green-500"
      >
        Generate Over 2.5 Picks
      </Link>

 {/* Internal SEO Links */}
      <div className="mt-16">
        <PredictionLinks />
      </div>
    </main>
  );
}