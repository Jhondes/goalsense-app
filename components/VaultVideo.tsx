
"use client";

import { useEffect, useState } from "react";
import {
  Play,
  ArrowUpRight,
  X,
  Video,
  Sparkles,
} from "lucide-react";

const VIDEOS = [
  {
    title: "How GoalSense Works",
    videoId: "",
    number: "01",
  },
  {
    title: "Generate Your First Slip",
    videoId: "",
    number: "02",
  },
  {
    title: "Premium Features",
    videoId: "",
    number: "03",
  },
  {
    title: "Lucky Slip & Target Odds",
    videoId: "",
    number: "04",
  },
];

export default function VaultVideo() {
  const [selectedVideo, setSelectedVideo] = useState<
    (typeof VIDEOS)[number] | null
  >(null);

  // Close modal with Escape and prevent background scrolling
  useEffect(() => {
    if (!selectedVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVideo]);

  return (
    <section className="relative">

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-10 top-20 h-48 w-48 rounded-full bg-emerald-500/[0.06] blur-[90px]" />

      {/* Heading */}
      <div className="relative mb-6">

        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <Video size={19} className="text-emerald-400" />
          </div>

          <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-400">
            LEARN THE PLATFORM
          </span>
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          GoalSense Video Guides
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
          Everything you need to get started.
        </p>

      </div>

      {/* Video guide cards */}
      <div className="relative grid gap-4 sm:grid-cols-2">

        {VIDEOS.map((video) => (
          <button
            key={video.title}
            type="button"
            onClick={() => setSelectedVideo(video)}
            aria-label={`Watch ${video.title}`}
            className="group relative flex min-h-[112px] items-center justify-between overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#111C2A] via-[#0C1420] to-[#080E17] px-4 py-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.10)] sm:px-5"

          >

            {/* Hover background glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/0 blur-3xl transition duration-500 group-hover:bg-emerald-400/10" />

            <div className="relative flex min-w-0 items-center gap-4">

              {/* Play button */}
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.05)] transition duration-300 group-hover:scale-105 group-hover:border-emerald-400/60 group-hover:bg-emerald-400/15 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] sm:h-14 sm:w-14">

                <Play
                  size={21}
                  fill="currentColor"
                  strokeWidth={1.5}
                  className="ml-0.5"
                />

              </span>

              {/* Video information */}
              <span className="min-w-0">

                <span className="mb-1 block text-[10px] font-bold tracking-[0.18em] text-emerald-400/70">
                  GUIDE {video.number}
                </span>

                <span className="block text-sm font-bold leading-snug text-white transition-colors group-hover:text-emerald-300 sm:text-base">
                  {video.title}
                </span>

                <span className="mt-1.5 block text-xs text-gray-500">
                  Watch Guide
                </span>

              </span>

            </div>

            {/* Arrow */}
            <span className="relative ml-2 shrink-0 text-gray-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-400">

              <ArrowUpRight size={21} />

            </span>

          </button>
        ))}

      </div>

      {/* Bottom guide label */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">

        <Sparkles size={14} className="text-emerald-400" />

        <span>Explore GoalSense and make the most of its features.</span>

      </div>

      {/* Video modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-md"
          onClick={() => setSelectedVideo(null)}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#0B1220] shadow-[0_0_60px_rgba(16,185,129,0.10)]"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
                  GOALSENSE VIDEO GUIDE
                </span>

                <h3
                  id="video-modal-title"
                  className="mt-1 text-base font-bold text-white"
                >
                  {selectedVideo.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition hover:border-emerald-400/30 hover:text-white"
              >
                <X size={19} />
              </button>

            </div>

            {/* Video player */}
            {selectedVideo.videoId ? (

              <div className="relative aspect-video bg-black">

                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

              </div>

            ) : (

              <div className="flex min-h-[280px] flex-col items-center justify-center bg-gradient-to-b from-[#101B28] to-[#080D14] px-6 py-12 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.10)]">

                  <Play size={27} fill="currentColor" />

                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  {selectedVideo.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  This video guide is coming soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="mt-7 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 px-7 py-3 text-sm font-bold text-black transition hover:scale-105"
                >
                  Close Guide
                </button>

              </div>

            )}

          </div>

        </div>
      )}

    </section>
  );
}
