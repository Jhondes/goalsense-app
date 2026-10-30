
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    id: "goka",
    label: "GOKA.NG",
    title: "20% SPORT CASH BACK.",
    subtitle: "TURN EVERY SET BACK INTO A COMEBACK.",
    description: "GOKA SPORTS & CASINO.",
    button: "CLAIM CASHBACK",
    href: "https://www.goka.ng/?aff=11525",
    type: "goka",
  },
  {
    id: "telegram",
    label: "GOALSENSE COMMUNITY",
    title: "STAY CONNECTED.",
    subtitle: "NEVER MISS A GOALSENSE UPDATE.",
    description:
      "Join the GoalSense community for platform announcements, football updates and the latest news.",
    button: "Explore GoalSense",
    href: "https://t.me/goalsenseapp",
    type: "telegram",
  },
];

export default function AdBanner() {
  const [active, setActive] = useState(0);
  const touchStart = useRef(0);

  const next = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const previous = () => {
    setActive((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-3">
      <div
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const difference =
            touchStart.current - e.changedTouches[0].clientX;

          if (Math.abs(difference) > 50) {
            difference > 0 ? next() : previous();
          }
        }}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${active * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full">
              {slide.type === "goka" ? (
                <a
                  href={slide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  aria-label="GoalSense"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-[#d4a72c]/30 bg-[#090909] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                  {/* Ad disclosure badge */}
<div className="absolute bottom-10 right-3 z-30 rounded-md border border-white/20 bg-[#333333]/95 px-3 py-1.5 text-xs font-medium text-white shadow-md">
  Ad
</div>
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#f5c542] via-[#d4a72c] to-transparent" />

                    <div className="grid min-h-[190px] grid-cols-1 md:grid-cols-[1fr_0.85fr]">
                      <div className="relative flex flex-col justify-center px-7 py-7 sm:px-9">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="h-px w-6 bg-[#d4a72c]" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4a72c]">
                            {slide.label}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          {slide.title}
                        </h3>

                        <p className="mt-1 text-lg font-medium text-[#d4a72c] sm:text-xl">
                          {slide.subtitle}
                        </p>

                        <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                          {slide.description}
                        </p>

                        <div className="mt-5">
                          <span className="inline-flex items-center gap-2 rounded-lg bg-[#d4a72c] px-5 py-2.5 text-sm font-bold text-black">
                            {slide.button} →
                          </span>
                        </div>
                      </div>

                      <div className="relative min-h-[180px] overflow-hidden">
                        <Image
                          src="/goka-sports-banner.jpg"
                          alt="GOKA Sports"
                          fill
                          sizes="(max-width: 768px) 100vw, 45vw"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="relative min-h-[452px] md:min-h-[310px] overflow-hidden rounded-2xl border border-[#229ED9]/30 bg-gradient-to-br from-[#102b43] to-[#090e19] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#38bdf8] to-transparent" />

                  <div className="flex min-h-[452px] md:min-h-[310px] flex-col justify-center px-7 py-8 sm:px-10">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-px w-6 bg-[#38bdf8]" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#38bdf8]">
                        {slide.label}
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {slide.title}
                    </h3>

                    <p className="mt-2 text-lg font-semibold text-[#38bdf8] sm:text-xl">
                      {slide.subtitle}
                    </p>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400">
                      {slide.description}
                    </p>

                    <div className="mt-5">
                      <a
                        href={slide.href}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#38bdf8] px-5 py-2.5 text-sm font-bold text-[#07111e] transition hover:bg-[#7dd3fc]"
                      >
                        {slide.button} →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 right-5 z-20 flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-7 bg-white"
                  : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
