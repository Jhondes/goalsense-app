import type { Metadata } from "next";
import Link from "next/link";
import PredictionLinks from "@/components/PredictionLinks";

export const metadata: Metadata = {
  title: "BTTS Predictions Today | GoalSense",
  description:
    "Generate today's Both Teams To Score (BTTS) football predictions with GoalSense. Build BTTS accumulator slips using today's football fixtures.",
  keywords: [
    "BTTS predictions",
    "both teams to score predictions",
    "today BTTS tips",
    "football BTTS today",
    "BTTS accumulator",
    "goal predictions",
  ],
  alternates: {
    canonical: "https://goalsense.live/btts-predictions",
  },
  openGraph: {
    title: "BTTS Predictions Today | GoalSense",
    description:
      "Generate Both Teams To Score predictions using today's football fixtures.",
    url: "https://goalsense.live/btts-predictions",
    siteName: "GoalSense",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BTTS Predictions Today | GoalSense",
    description:
      "Generate BTTS accumulator slips using today's football fixtures.",
  },
};

export default function BTTSPredictions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://goalsense.live",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "BTTS Predictions",
                item: "https://goalsense.live/btts-predictions",
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is BTTS?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "BTTS stands for Both Teams To Score. The prediction wins if both teams score at least one goal during the match.",
                },
              },
              {
                "@type": "Question",
                name: "How does GoalSense generate BTTS predictions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "GoalSense allows users to generate BTTS selections from today's football fixtures using customizable filters.",
                },
              },
              {
                "@type": "Question",
                name: "Can I combine BTTS selections?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. GoalSense lets you combine multiple BTTS predictions into accumulator slips.",
                },
              },
            ],
          }),
        }}
      />

      <h1 className="text-4xl font-bold mb-2">
        BTTS Predictions Today
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Last updated: July 2026
      </p>

      <p className="text-gray-300 leading-8">
        BTTS (Both Teams To Score) is one of the most popular football betting
        markets. Rather than predicting the winner, BTTS simply requires both
        teams to score at least one goal during the match. It has become a
        favourite market for football fans because it focuses on attacking
        football instead of match outcomes.
      </p>

      <p className="text-gray-300 leading-8 mt-6">
        GoalSense helps you generate BTTS football predictions in seconds.
        Select today's fixtures, choose the BTTS market, customize your
        accumulator and instantly create a football betting slip that you can
        copy, save or share.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-4">
        Why Use BTTS Predictions?
      </h2>

      <p className="text-gray-300 leading-8">
        BTTS is popular because many matches feature attacking teams that
        regularly score while also conceding goals. Instead of manually
        analysing every fixture, GoalSense lets you quickly generate BTTS
        selections from today's available football matches.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-4">
        How GoalSense Helps
      </h2>

      <ul className="list-disc pl-6 space-y-3 text-gray-300 leading-8">
        <li>Generate BTTS predictions instantly.</li>
        <li>Create accumulator slips.</li>
        <li>Choose the number of selections.</li>
        <li>Filter today's football fixtures.</li>
        <li>Copy or share your prediction slip.</li>
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-4">
        More Football Markets
      </h2>

      <p className="text-gray-300 leading-8">
        Besides BTTS predictions, GoalSense also allows users to generate
        Over 2.5 Goals, Match Winner and daily football accumulator slips
        using today's available fixtures.
      </p>

      <div className="mt-12">
        <Link
          href="/"
          className="inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-500 transition"
        >
          Generate BTTS Predictions
        </Link>
      </div>

      <section className="mt-20 space-y-8">

        <h2 className="text-3xl font-bold">
          Frequently Asked Questions
        </h2>

        <div>
          <h3 className="text-xl font-semibold">
            What does BTTS mean?
          </h3>

          <p className="text-gray-400 mt-2">
            BTTS means Both Teams To Score. Both teams must score at least one
            goal during the match.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Can BTTS be combined in an accumulator?
          </h3>

          <p className="text-gray-400 mt-2">
            Yes. GoalSense allows you to combine multiple BTTS selections into
            one accumulator slip.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Which competitions are supported?
          </h3>

          <p className="text-gray-400 mt-2">
            GoalSense generates BTTS predictions using today's fixtures from
            Europe's major football leagues and competitions.
          </p>
        </div>

      </section>

      <div className="mt-20">
        <PredictionLinks />
      </div>

    </main>
  );
}