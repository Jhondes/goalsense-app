"use client";

import { useState } from "react";

const VIDEOS = [
  {
    title: "How GoalSense Works",
    videoId: "",
  },
  {
    title: "Generate Your First Slip",
    videoId: "",
  },
  {
    title: "Premium Features",
    videoId: "",
  },
  {
    title: "Lucky Slip & Target Odds",
    videoId: "",
  },
];

export default function VaultVideo() {
  const [selectedVideo, setSelectedVideo] = useState<
    (typeof VIDEOS)[number] | null
  >(null);

  return (
    <section className="mt-8">
      {/* Heading */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          🎥 GoalSense Video Guides
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Everything you need to get started.
        </p>
      </div>

      {/* Video boxes */}
      <div className="grid gap-4 sm:grid-cols-2">
        {VIDEOS.map((video) => (
          <button
            key={video.title}
            type="button"
            onClick={() => setSelectedVideo(video)}
            className="group flex items-center justify-between rounded-2xl border border-green-500/20 bg-[#0b1220] px-5 py-5 text-left shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-green-400/40 hover:bg-[#101824] hover:shadow-[0_0_20px_rgba(34,197,94,0.10)]"
          >
            <div className="flex min-w-0 items-center gap-4">
              {/* Play icon */}
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-green-400/30 bg-green-500/10 text-green-400 transition group-hover:bg-green-500/20">
                <svg
                  className="ml-0.5 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </span>

              {/* Title */}
              <span className="min-w-0">
                <span className="block text-sm font-bold text-white sm:text-base">
                  {video.title}
                </span>

                <span className="mt-1 block text-xs text-gray-500">
                  Watch Guide
                </span>
              </span>
            </div>

            {/* Arrow */}
            <span className="ml-3 shrink-0 text-lg text-gray-500 transition group-hover:translate-x-1 group-hover:text-green-400">
              →
            </span>
          </button>
        ))}
      </div>

      {/* Video modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-green-500/20 bg-[#0b1220] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedVideo.videoId ? (
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-green-400/30 bg-green-500/10 text-green-400">
                  <svg
                    className="ml-0.5 h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  {selectedVideo.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Video coming soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="mt-5 rounded-lg bg-gray-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
