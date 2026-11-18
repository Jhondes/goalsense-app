
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Clock3,
  CreditCard,
  Handshake,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact GoalSense Support | Help & Enquiries",
  description:
    "Contact GoalSense for account assistance, payment enquiries, subscription support and business enquiries. We're here to help.",
  alternates: {
    canonical: "https://goalsense.live/contact",
  },
};

const supportCards = [
  {
    icon: Mail,
    title: "Email Support",
    description:
      "For account assistance, technical issues and general enquiries.",
    detail: "support@goalsense.live",
    href: "mailto:support@goalsense.live",
  },
  {
    icon: Clock3,
    title: "Response Time",
    description:
      "We aim to respond within a few hours. Messages outside business hours are handled as soon as possible.",
  },
  {
    icon: CreditCard,
    title: "Payment Support",
    description:
      "Having trouble with a payment or subscription activation? Contact our support team with your payment details.",
  },
  {
    icon: Handshake,
    title: "Business Enquiries",
    description:
      "For partnerships, sponsorships and other business enquiries, reach us by email.",
    detail: "Contact our team",
    href: "mailto:support@goalsense.live",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">

        {/* HERO */}
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              We're Here to Help
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Have a question or need assistance? Get in touch with the
            GoalSense team. We're happy to help with your enquiries.
          </p>
        </section>

        {/* SUPPORT CARDS */}
        <section className="grid gap-3 sm:grid-cols-2">
          {supportCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:border-emerald-500/30 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08]">
                    <Icon className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-white">
                      {item.title}
                    </h2>

                    <p className="mt-1.5 text-xs leading-6 text-gray-400">
                      {item.description}
                    </p>

                    {item.href && (
                      <Link
                        href={item.href}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
                      >
                        {item.detail}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* PAYMENT SUPPORT */}
        <section className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">
              Payment or Account Assistance
            </h2>
          </div>

          <p className="mt-2 text-xs leading-6 text-gray-400">
            If you need help with a completed payment or account issue,
            include the following information in your email:
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {[
              "Your account email",
              "Payment reference, if applicable",
              "Date of payment, if applicable",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2.5"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-xs text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-6 flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Still need help?
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Send us an email and our team will get back to you.
            </p>
          </div>

          <Link
            href="mailto:support@goalsense.live"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
          >
            Email Support
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

      </div>
    </main>
  );
}
