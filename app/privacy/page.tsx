
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GoalSense",
  description:
    "Learn how GoalSense collects, uses, and protects your personal information, including account, payment and service-related data.",
  alternates: {
    canonical: "https://goalsense.live/privacy",
  },
};

const privacySections = [
  {
    title: "Information We Collect",
    content:
      "GoalSense collects information you provide when creating an account, purchasing Premium, or contacting support. This may include your email address and payment-related information.",
  },
  {
    title: "How We Use Your Information",
    items: [
      "Create and manage your account.",
      "Provide Premium access.",
      "Process payments securely.",
      "Improve our services.",
      "Respond to support requests.",
    ],
  },
  {
    title: "Payments",
    content:
      "Payments are processed securely through trusted third-party payment providers. GoalSense does not store your card or bank details.",
  },
  {
    title: "Cookies",
    content:
      "We may use cookies or similar technologies to improve your experience and keep you signed in.",
  },
  {
    title: "Data Security",
    content:
      "We take reasonable measures to protect your personal information from unauthorized access or misuse.",
  },
  {
    title: "Third-Party Services",
    content:
      "GoalSense uses trusted third-party services including Supabase, Paystack, and Vercel to operate the platform.",
  },
  {
    title: "Contact",
    content:
      "If you have any questions regarding this Privacy Policy, please contact us through our Contact page.",
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>Last updated</span>
            <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-gray-300">
              July 2026
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
            Your privacy matters to us. This policy explains how GoalSense
            collects, uses and protects information when you use our platform.
          </p>
        </section>

        {/* PRIVACY CONTENT */}
        <section className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
          {privacySections.map((section, index) => (
            <article
              key={section.title}
              className="flex gap-4 border-b border-white/[0.07] p-4 last:border-b-0 sm:gap-5 sm:p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.07] text-xs font-semibold text-emerald-400">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold text-white sm:text-base">
                  {section.title}
                </h2>

                {"content" in section && (
                  <p className="mt-2 text-sm leading-7 text-gray-400">
                    {section.content}
                  </p>
                )}

                {"items" in section && (
                  <ul className="mt-3 space-y-2">
                    {section.items?.map((item) => (
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

        {/* CONTACT NOTE */}
        <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
          <p className="text-xs leading-6 text-gray-500">
            Have questions about how your information is handled? Visit our{" "}
            <a
              href="/contact"
              className="font-medium text-emerald-400 transition hover:text-emerald-300"
            >
              Contact page
            </a>{" "}
            to reach the GoalSense team.
          </p>
        </div>

      </div>
    </main>
  );
}
