"use client";

import { useState } from "react";

const VIDEO_ID = "PR0bEwFUTso";

export default function VaultVideo() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="mt-6 overflow-hidden rounded-2xl border border-green-500/20 bg-[#0b1220]">
        <div className="relative aspect-video">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
            title="How the GoalSense Vault Works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
  <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-green-500/20 bg-gradient-to-r from-[#0b1220] via-[#10161f] to-[#0b1220] px-5 py-4 shadow-lg">

    {/* Left side */}
    <div className="flex items-center gap-3">

      {/* Premium Play Icon */}
      <div className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-green-400/30 bg-green-500/10 shadow-[0_0_18px_rgba(34,197,94,0.18)]">

        {/* Soft glow */}
        <span className="absolute inset-0 rounded-full bg-green-400/10 blur-md" />

        {/* Play icon */}
        <svg
          className="relative h-5 w-5 text-green-300 drop-shadow-[0_0_7px_rgba(74,222,128,0.7)] transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M8.5 5.5L18 12L8.5 18.5V5.5Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>

      </div>

      {/* Text */}
      <div>
  <p className="text-sm font-bold text-white sm:text-base">
    New to GoalSense?
  </p>

  <p className="mt-1 max-w-[170px] text-xs leading-5 text-gray-400 sm:text-sm">
    Watch our quick tutorial to see how it works.
  </p>
</div>

    </div>

    {/* Watch button */}
    <button
  type="button"
  onClick={() => setPlaying(true)}
  className="group relative flex shrink-0 items-center gap-2 overflow-hidden rounded-xl border border-green-400/30 bg-green-500/10 px-3 py-2 text-xs font-bold text-white shadow-[0_0_18px_rgba(34,197,94,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300/60 hover:bg-green-500/20 hover:shadow-[0_0_25px_rgba(34,197,94,0.25)] sm:px-4 sm:py-2.5 sm:text-sm"
>

      {/* Button glow */}
      <span className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Play icon */}
      <svg
        className="relative h-4 w-4 text-green-300 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8.5 5.5L18 12L8.5 18.5V5.5Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>

      <span className="relative">
        Watch Guide
      </span>

    </button>

  </div>
);
}