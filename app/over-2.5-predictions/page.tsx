import type { Metadata } from "next";
import Link from "next/link";
import PredictionLinks from "@/components/PredictionLinks";

export const metadata: Metadata = {
  title: "Over 2.5 Goals Predictions Today | GoalSense",
  description:
    "Generate today's Over 2.5 Goals football predictions using GoalSense. Create smart accumulator slips with today's fixtures from Europe's biggest leagues.",
  keywords: [
    "over 2.5 predictions",
    "over 2.5 football tips",
    "today over 2.5 predictions",
    "over 2.5 goals today",
    "football over 2.5",
    "goal predictions",
  ],
  alternates: {
    canonical: "https://goalsense.live/over-2.5-predictions",
  },
  openGraph: {
    title: "Over 2.5 Goals Predictions Today | GoalSense",
    description:
      "Generate today's Over 2.5 football predictions with GoalSense.",
    url: "https://goalsense.live/over-2.5-predictions",
    siteName: "GoalSense",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Over 2.5 Goals Predictions Today | GoalSense",
    description:
      "Create Over 2.5 accumulator slips using today's football fixtures.",
  },
};

export default function Over25Predictions() {
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
                name: "Over 2.5 Predictions",
                item: "https://goalsense.live/over-2.5-predictions",
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
                name: "What are Over 2.5 Goals predictions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Over 2.5 Goals predictions identify football matches expected to produce at least three total goals.",
                },
              },
              {
                "@type": "Question",
                name: "How does GoalSense generate Over 2.5 predictions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "GoalSense lets users generate Over 2.5 selections using today's football fixtures and customizable filters.",
                },
              },
              {
                "@type": "Question",
                name: "Can I build accumulator slips?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. GoalSense allows you to combine multiple Over 2.5 selections into accumulator slips.",
                },
              },
            ],
          }),
        }}
      />

      <h1 className="text-4xl font-bold mb-2">
        Over 2.5 Goals Predictions Today
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Last updated: July 2026
      </p>

      <p className="text-gray-300 leading-8">
        Over 2.5 Goals remains one of the most popular football betting
        markets because it focuses on exciting matches expected to produce
        three or more total goals. Instead of predicting the exact winner,
        bettors simply need the match to finish with at least three goals,
        making it a favourite market for accumulator betting.
      </p>

      <p className="text-gray-300 leading-8 mt-6">
        GoalSense simplifies the process by allowing you to generate today's
        Over 2.5 football predictions in seconds. Simply choose today's
        fixtures, select the Over 2.5 market, decide how many selections you
        want and instantly create an accumulator slip.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-4">
        Why Choose Over 2.5 Predictions?
      </h2>

      <p className="text-gray-300 leading-8">
        Many football leagues consistently produce high-scoring matches.
        Instead of spending hours analysing every fixture manually, GoalSense
        helps you quickly generate selections using today's available
        matches. Whether you're creating a small double or a larger
        accumulator, the generator saves time and keeps everything organised.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-4">
        How GoalSense Works
      </h2>

      <ol className="list-decimal pl-6 space-y-3 text-gray-300 leading-8">
        <li>Select today's football fixtures.</li>
        <li>Choose the Over 2.5 Goals market.</li>
        <li>Select the number of picks.</li>
        <li>Generate your prediction slip instantly.</li>
        <li>Save, copy or share your accumulator.</li>
      </ol>

      <h2 className="text-3xl font-bold mt-12 mb-4">
        More Betting Markets
      </h2>

      <p className="text-gray-300 leading-8">
        Looking for additional football markets? GoalSense also lets you
        generate BTTS predictions, Match Winner selections and today's
        football accumulators using the same simple workflow.
      </p>

      <div className="mt-12">
        <Link
          href="/"
          className="inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-500 transition"
        >
          Generate Over 2.5 Predictions
        </Link>
      </div>

      <section className="mt-20 space-y-8">

        <h2 className="text-3xl font-bold">
          Frequently Asked Questions
        </h2>

        <div>
          <h3 className="text-xl font-semibold">
            What does Over 2.5 Goals mean?
          </h3>

          <p className="text-gray-400 mt-2">
            The match must finish with at least three total goals for the
            prediction to win.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Can I generate accumulators?
          </h3>

          <p className="text-gray-400 mt-2">
            Yes. GoalSense allows you to combine multiple Over 2.5 selections
            into one accumulator slip.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Which leagues are available?
          </h3>

          <p className="text-gray-400 mt-2">
            GoalSense supports today's fixtures from major football leagues,
            making it easy to generate predictions across multiple
            competitions.
          </p>
        </div>

      </section>

      <div className="mt-20">
        <PredictionLinks />
      </div>

    </main>
  );
}