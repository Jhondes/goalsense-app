
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
    subtitle: "NEVER MISS AN UPDATE.",
    description: "Football updates, announcements and more.",
    button: "JOIN COMMUNITY",
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
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-2">

      {/* ADVERTISEMENT CAROUSEL */}
      <div
        className="relative"
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
        {/* SLIDES */}
        <div className="overflow-hidden rounded-xl">

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${active * 100}%)`,
            }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full">

                {/* GOKA AD */}
                {slide.type === "goka" ? (
                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit GOKA Sports"
                    className="group block"
                  >
                    <div className="relative h-[112px] overflow-hidden rounded-xl border border-[#d4a72c]/40 bg-[#090909] shadow-lg sm:h-[135px] md:h-[155px]">

                      {/* GOLD ACCENT */}
                      <div className="absolute left-0 top-0 z-10 h-full w-1 bg-gradient-to-b from-[#f5c542] to-[#8d6715]" />

                      {/* BACKGROUND IMAGE */}
                      <div className="absolute inset-y-0 right-0 w-[43%] sm:w-[40%]">
                        <Image
                          src="/goka-sports-banner.jpg"
                          alt="GOKA Sports"
                          fill
                          sizes="(max-width: 768px) 43vw, 400px"
                          className="object-cover object-center"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/30 to-transparent" />
                      </div>

                      {/* AD CONTENT */}
                      <div className="relative z-10 flex h-full w-[72%] flex-col justify-center pl-5 pr-1 sm:w-[68%] sm:pl-7">

                        <div className="mb-1 flex items-center gap-2">
                          <span className="h-px w-5 bg-[#d4a72c]" />

                          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#d4a72c] sm:text-[10px]">
                            {slide.label}
                          </span>
                        </div>

                        <h3 className="text-[16px] font-extrabold leading-tight tracking-tight text-white sm:text-xl md:text-2xl">
                          {slide.title}
                        </h3>

                        <p className="mt-1 line-clamp-1 text-[9px] font-semibold text-[#d4a72c] sm:text-xs md:text-sm">
                          {slide.subtitle}
                        </p>

                        <div className="mt-2 flex items-center gap-2 sm:mt-3">

                          <span className="inline-flex items-center gap-1 rounded-md bg-[#d4a72c] px-3 py-1.5 text-[9px] font-extrabold text-black transition group-hover:bg-[#f5c542] sm:px-4 sm:py-2 sm:text-[11px]">
                            {slide.button} →
                          </span>

                          <span className="hidden text-[10px] text-gray-400 sm:inline">
                            {slide.description}
                          </span>

                        </div>
                      </div>

                      {/* AD DISCLOSURE */}
                      <span className="absolute bottom-2 right-2 z-20 rounded bg-black/70 px-2 py-0.5 text-[9px] font-medium text-white/80">
                        Ad
                      </span>

                    </div>
                  </a>

                ) : (

                  /* GOALSENSE TELEGRAM AD */
                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join GoalSense Telegram Community"
                    className="group block"
                  >
                    <div className="relative h-[112px] overflow-hidden rounded-xl border border-[#229ED9]/40 bg-gradient-to-r from-[#102b43] to-[#090e19] shadow-lg sm:h-[135px] md:h-[155px]">

                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#38bdf8] to-transparent" />

                      {/* DECORATIVE CIRCLES */}
                      <div className="absolute -right-5 -top-12 h-40 w-40 rounded-full border border-[#38bdf8]/10" />
                      <div className="absolute -right-1 -bottom-20 h-44 w-44 rounded-full border border-[#38bdf8]/10" />

                      <div className="relative z-10 flex h-full w-[85%] flex-col justify-center pl-5 sm:w-[75%] sm:pl-7">

                        <div className="mb-1 flex items-center gap-2">
                          <span className="h-px w-5 bg-[#38bdf8]" />

                          <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#38bdf8] sm:text-[10px]">
                            {slide.label}
                          </span>
                        </div>

                        <h3 className="text-[17px] font-extrabold leading-tight text-white sm:text-xl md:text-2xl">
                          {slide.title}
                        </h3>

                        <p className="mt-1 text-[10px] font-semibold text-[#38bdf8] sm:text-sm">
                          {slide.subtitle}
                        </p>

                        <div className="mt-2 flex items-center gap-3">

                          <span className="inline-flex rounded-md bg-[#38bdf8] px-3 py-1.5 text-[9px] font-bold text-[#07111e] transition group-hover:bg-[#7dd3fc] sm:px-4 sm:py-2 sm:text-[11px]">
                            {slide.button} →
                          </span>

                          <span className="hidden text-[10px] text-gray-400 sm:inline">
                            {slide.description}
                          </span>

                        </div>
                      </div>

                      <span className="absolute bottom-2 right-2 z-20 rounded bg-black/50 px-2 py-0.5 text-[9px] text-white/80">
                        Ad
                      </span>

                    </div>
                  </a>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* CAROUSEL INDICATORS */}
        <div className="mt-2 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === index
                  ? slide.type === "goka"
                    ? "w-6 bg-[#d4a72c]"
                    : "w-6 bg-[#38bdf8]"
                  : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
