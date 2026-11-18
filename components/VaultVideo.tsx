
"use client";

import { useEffect, useState } from "react";
import {
  Play,
  ArrowUpRight,
  X,
  Video,
  LockKeyhole,
} from "lucide-react";

const VIDEOS = [
  {
    title: "How GoalSense Works",
    videoId: "k6iq8jSsHG8",
    number: "01",
    available: true,
  },
  {
    title: "Platform Overview",
    videoId: "",
    number: "02",
    available: false,
  },
  {
    title: "Understanding GoalSense Features",
    videoId: "",
    number: "03",
    available: false,
  },
  {
    title: "Exploring Football Insights",
    videoId: "",
    number: "04",
    available: false,
  },
];

export default function VaultVideo() {
  const [selectedVideo, setSelectedVideo] =
    useState<(typeof VIDEOS)[number] | null>(null);

  useEffect(() => {
    if (!selectedVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVideo]);

  return (
    <section
      id="goalsense-video-vault"
      className="relative scroll-mt-24"
    >
      {/* Heading */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Video size={15} className="text-emerald-400" />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
              Video Library
            </span>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            GoalSense Video Guides
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Explore the platform through short guides.
          </p>
        </div>

        <div className="hidden shrink-0 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 sm:block">
          <span className="text-[10px] font-semibold text-gray-400">
            {VIDEOS.length} GUIDES
          </span>
        </div>
      </div>

      {/* Guide cards */}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {VIDEOS.map((video) => (
          <button
            key={video.number}
            type="button"
            onClick={() => setSelectedVideo(video)}
            aria-label={`${video.available ? "Watch" : "View details for"} ${video.title}`}
            className="group flex min-h-[76px] items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#0b1219] px-3 py-3 text-left transition-all duration-200 hover:border-emerald-400/30 hover:bg-[#101c24]"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-400 transition-colors group-hover:bg-emerald-400/15">
                {video.available ? (
                  <Play size={16} fill="currentColor" />
                ) : (
                  <LockKeyhole size={15} />
                )}
              </span>

              <span className="min-w-0">
                <span className="mb-1 block text-[9px] font-bold tracking-wider text-gray-500">
                  GUIDE {video.number}
                </span>

                <span className="block truncate text-xs font-bold text-gray-200 transition-colors group-hover:text-emerald-300 sm:text-sm">
                  {video.title}
                </span>

                <span
                  className={`mt-1 block text-[9px] font-semibold uppercase tracking-wider ${
                    video.available
                      ? "text-emerald-400"
                      : "text-gray-600"
                  }`}
                >
                  {video.available ? "Available" : "Coming soon"}
                </span>
              </span>
            </span>

            <ArrowUpRight
              size={16}
              className="shrink-0 text-gray-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400"
            />
          </button>
        ))}
      </div>

      {/* Video modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-3 py-5 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-emerald-500/20 bg-[#0b1219] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div>
                <span className="text-[9px] font-bold tracking-[0.18em] text-emerald-400">
                  GOALSENSE VIDEO LIBRARY
                </span>

                <h3
                  id="video-modal-title"
                  className="mt-1 text-sm font-bold text-white"
                >
                  {selectedVideo.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-emerald-400/30 hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

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
              <div className="flex min-h-[220px] flex-col items-center justify-center px-5 py-10 text-center">
                <LockKeyhole
                  size={27}
                  className="text-emerald-400"
                />

                <h3 className="mt-4 text-base font-bold text-white">
                  Coming Soon
                </h3>

                <p className="mt-2 text-xs text-gray-500">
                  This video guide is currently being prepared.
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="mt-5 rounded-lg border border-white/10 px-5 py-2 text-xs font-semibold text-gray-300 transition hover:border-emerald-400/30 hover:text-emerald-400"
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