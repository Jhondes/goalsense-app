"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="relative mt-32 text-gray-400 overflow-hidden">

      {/* Animated Top Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />

      {/* Moving Light Sweep */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl animate-spinSlow" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-4 gap-16">

        {/* Brand */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            Football Generator
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Intelligent filtering and probability modeling.
          </p>

          {/* Authority Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            ✔ Advanced Market Logic
          </div>
        </div>

        {/* Platform */}
        <div className="space-y-6">
          <h3 className="text-white font-semibold text-lg tracking-wide">
            Platform
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#generator" className="hover:text-emerald-400 transition duration-300 hover:tracking-wider">
                Generator
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-emerald-400 transition duration-300 hover:tracking-wider">
                How It Works
              </a>
            </li>
            <li className="opacity-60 cursor-not-allowed">
              Dashboard (Coming Soon)
            </li>
          </ul>
        </div>

        {/* Features */}
        <div className="space-y-5">
          <h3 className="text-white font-semibold text-lg">Features</h3>
          <ul className="space-y-3 text-sm">
            <li>Smart Market Filtering</li>
            <li>Multi-League Support</li>
            <li>Confidence Scoring</li>
            
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-6">
          <h3 className="text-white font-semibold text-lg tracking-wide">
            Legal
          </h3>
          <p className="text-sm leading-relaxed">
            This platform provides analytical tools only. No guarantees are made
            regarding outcomes. Always act responsibly.
          </p>
          <p className="text-xs opacity-60">
            18+ Only. For educational purposes.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 py-8 text-center text-xs text-gray-500">

        {/* Neon Pulse Dot */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_25px_6px_rgba(16,185,129,0.7)] animate-pulse" />

        © {year} Football Generator. All rights reserved.

      </div>
    </footer>
  );
}