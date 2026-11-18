
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | GoalSense",
  description:
    "Read the GoalSense Terms and Conditions covering platform access, subscriptions, user responsibilities and service limitations.",
  alternates: {
    canonical: "https://goalsense.live/terms",
  },
};

const terms = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using GoalSense, you agree to these Terms and Conditions.",
  },
  {
    title: "Service Description",
    content:
      "GoalSense provides football match analysis, prediction tools, statistics, and Premium features for informational purposes only.",
  },
  {
    title: "No Guaranteed Results",
    content:
      "Football is unpredictable. While GoalSense uses statistical analysis and probability models, we do not guarantee the accuracy of predictions or any financial outcome.",
  },
  {
    title: "Premium Subscription",
    content:
      "Premium subscriptions provide access to additional features. Subscription benefits begin after successful payment verification.",
  },
  {
    title: "User Responsibilities",
    items: [
      "Provide accurate account information.",
      "Keep your login credentials secure.",
      "Use the platform responsibly.",
      "Comply with applicable laws.",
    ],
  },
  {
    title: "Age Requirement",
    content: "You must be at least 18 years old to use GoalSense.",
  },
  {
    title: "Limitation of Liability",
    content:
      "GoalSense shall not be liable for losses arising from reliance on predictions, statistics, or analytical content provided on the platform.",
  },
  {
    title: "Changes",
    content:
      "We may update these Terms & Conditions at any time. Continued use of GoalSense indicates acceptance of any changes.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">

        {/* HERO */}
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Legal Information
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Terms & Conditions
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>Last updated</span>
            <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-gray-300">
              July 2026
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
            Please read these terms carefully before accessing or using
            the GoalSense platform.
          </p>
        </section>

        {/* TERMS CONTENT */}
        <section className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
          {terms.map((term, index) => (
            <article
              key={term.title}
              className="flex gap-4 border-b border-white/[0.07] p-4 last:border-b-0 sm:gap-5 sm:p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.07] text-xs font-semibold text-emerald-400">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold text-white sm:text-base">
                  {term.title}
                </h2>

                {"content" in term && (
                  <p className="mt-2 text-sm leading-7 text-gray-400">
                    {term.content}
                  </p>
                )}

                {"items" in term && (
                  <ul className="mt-3 space-y-2">
                    {term.items?.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-6 text-gray-400"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </section>

        {/* FOOTER NOTE */}
        <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
          <p className="text-xs leading-6 text-gray-500">
            If you have questions about these Terms & Conditions, please
            contact the GoalSense team through our{" "}
            <a
              href="/contact"
              className="font-medium text-emerald-400 transition hover:text-emerald-300"
            >
              Contact page
            </a>
            .
          </p>
        </div>

      </div>
    </main>
  );
}
