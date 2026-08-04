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
    <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-green-500/20 bg-gradient-to-r from-[#0b1220] to-[#10161f] px-5 py-4 shadow-lg">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-400">
          ▶
        </div>

        <div>
          <p className="font-bold text-white">
            New to GoalSense?
          </p>

          <p className="text-sm text-gray-400">
            Watch our quick tutorial to see how it works.
          </p>
        </div>

      </div>

      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="shrink-0 rounded-full bg-green-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-400"
      >
        ▶ Watch
      </button>

    </div>
  );
}