
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const platformLinks = [
    { label: "Generator", href: "#generator" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Brand Ambassadors", href: "/ambassadors" },
  ];

  const featureLinks = [
    { label: "Football Statistics", href: "/insights/football-statistics" },
    { label: "Football Quiz", href: "/insights/football-quiz" },
    { label: "Football Insights", href: "/insights" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="relative mt-0 overflow-hidden border-t border-emerald-500/15 bg-[#050807] text-gray-400">

      {/* Subtle top accent */}
      <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-8 sm:px-7 md:grid-cols-4 md:gap-8 md:py-10">

        {/* Brand */}
        <div className="col-span-2 space-y-3 md:col-span-1">
          <Link href="/" className="inline-block">
            <h2 className="text-xl font-extrabold tracking-tight text-white">
              Goal<span className="text-emerald-400">Sense</span>
              <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </h2>
          </Link>

          <p className="max-w-[220px] text-xs leading-5 text-gray-500">
            Your destination for football fixtures, statistics and insights.
          </p>

          <a
            href="https://x.com/GoalSenseApp"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 pt-1 text-xs font-medium text-gray-400 transition-colors hover:text-emerald-400"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-sm transition-colors group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10">
              𝕏
            </span>
            Follow on X
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Platform */}
        <div>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            Platform
          </h3>

          <ul className="space-y-2.5">
            {platformLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-gray-500 transition-colors hover:text-emerald-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            Explore
          </h3>

          <ul className="space-y-2.5">
            {featureLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-gray-500 transition-colors hover:text-emerald-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            Support & Legal
          </h3>

          <ul className="space-y-2.5">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-gray-500 transition-colors hover:text-emerald-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[10px] leading-4 text-gray-600">
            Football information for educational purposes.
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-5 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] text-gray-600">
            © {year} GoalSense. All rights reserved.
          </p>

          <p className="text-[10px] font-medium tracking-wide text-gray-600">
            FOOTBALL. DATA. INSIGHTS.
          </p>
        </div>
      </div>

    </footer>
  );
}