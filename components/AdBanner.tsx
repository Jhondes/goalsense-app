
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AdSlide =
  | {
      id: string;
      label: string;
      title: string;
      subtitle: string;
      description: string;
      button: string;
      href: string;
      image: string;
      type: "xpari" | "evolvex";
    }
  | {
      id: string;
      label: string;
      title: string;
      subtitle: string;
      description: string;
      button: string;
      href: string;
      type: "telegram";
    };

const slides: AdSlide[] = [
  {
    id: "xpari",
    label: "XPARI BET",
    title: "GET 100% BONUS.",
    subtitle: "ON YOUR FIRST DEPOSIT.",
    description: "USE PROMO CODE: MULA",
    button: "REGISTER NOW",
    href: "https://xpariorg.com/mula",
    image: "/xpari-banner.jpg",
    type: "xpari",
  },
  {
    id: "evolvex",
    label: "EVOLVEX",
    title: "GET UP TO 100% BONUS.",
    subtitle: "ON YOUR FIRST DEPOSIT.",
    description: "USE PROMO CODE: MULA",
    button: "JOIN NOW",
    href: "https://bet-evolvex.com/signup?code=MULA",
    image: "/evolvex-banner.jpg",
    type: "evolvex",
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

  // AUTOMATIC SLIDE ROTATION
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

        {/* SLIDE VIEWPORT */}
        <div className="overflow-hidden rounded-xl">

          {/* SLIDE TRACK - FIXED WIDTH FOR ALL 3 SLIDES */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${active * (100 / slides.length)}%)`,
            }}
          >

            {slides.map((slide) => (

              <div
                key={slide.id}
                className="shrink-0"
                style={{
                  width: `${100 / slides.length}%`,
                }}
              >

                {/* XPARI AND EVOLVEX ADS */}
                {slide.type !== "telegram" ? (

                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${slide.label}`}
                    className="group block"
                  >

                    <div
                      className={`relative flex h-[112px] overflow-hidden rounded-xl border shadow-lg sm:h-[135px] md:h-[155px] ${
                        slide.type === "xpari"
                          ? "border-red-500/50 bg-[#080609]"
                          : "border-[#c9a45c]/50 bg-[#071a3b]"
                      }`}
                    >

                      {/* LEFT ACCENT */}
                      <div
                        className={`absolute left-0 top-0 z-20 h-full w-1 ${
                          slide.type === "xpari"
                            ? "bg-gradient-to-b from-red-500 to-red-900"
                            : "bg-gradient-to-b from-[#f5ce72] to-[#a87927]"
                        }`}
                      />

                      {/* AD CONTENT */}
                      <div className="relative z-10 flex h-full flex-1 flex-col justify-center pl-5 pr-1 sm:pl-7">

                        <div className="mb-1 flex items-center gap-2">

                          <span
                            className={`h-px w-5 ${
                              slide.type === "xpari"
                                ? "bg-red-500"
                                : "bg-[#e8bc5b]"
                            }`}
                          />

                          <span
                            className={`text-[8px] font-bold uppercase tracking-[0.2em] sm:text-[10px] ${
                              slide.type === "xpari"
                                ? "text-red-400"
                                : "text-[#f5ce72]"
                            }`}
                          >
                            {slide.label}
                          </span>

                        </div>

                        <h3 className="text-[14px] font-extrabold leading-tight tracking-tight text-white sm:text-xl md:text-2xl">
                          {slide.title}
                        </h3>

                        <p
                          className={`mt-1 text-[9px] font-bold sm:text-xs md:text-sm ${
                            slide.type === "xpari"
                              ? "text-red-400"
                              : "text-[#f5ce72]"
                          }`}
                        >
                          {slide.subtitle}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3">

                          <span
                            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[8px] font-extrabold transition sm:px-4 sm:py-2 sm:text-[11px] ${
                              slide.type === "xpari"
                                ? "bg-red-600 text-white group-hover:bg-red-500"
                                : "bg-[#c69b43] text-[#071a3b] group-hover:bg-[#e5bd69]"
                            }`}
                          >
                            {slide.button} →
                          </span>

                          <span className="text-[8px] font-bold text-white/80 sm:text-[10px]">
                            {slide.description}
                          </span>

                        </div>
                      </div>

                      {/* PROMOTIONAL IMAGE */}
                      <div className="relative h-full w-[105px] shrink-0 overflow-hidden bg-black sm:w-[135px] md:w-[155px]">

                        <Image
                          src={slide.image}
                          alt={`${slide.label} promotional banner`}
                          fill
                          sizes="155px"
                          className="object-contain"
                        />

                        <div
                          className={`absolute inset-y-0 left-0 w-5 ${
                            slide.type === "xpari"
                              ? "bg-gradient-to-r from-[#080609] to-transparent"
                              : "bg-gradient-to-r from-[#071a3b] to-transparent"
                          }`}
                        />

                      </div>

                      {/* AD DISCLOSURE */}
                      <span className="absolute bottom-1.5 right-2 z-20 rounded bg-black/70 px-2 py-0.5 text-[9px] font-medium text-white/80">
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

                      {/* LEFT ACCENT */}
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#38bdf8] to-transparent" />

                      {/* DECORATIVE CIRCLES */}
                      <div className="absolute -right-5 -top-12 h-40 w-40 rounded-full border border-[#38bdf8]/10" />

                      <div className="absolute -right-1 -bottom-20 h-44 w-44 rounded-full border border-[#38bdf8]/10" />

                      {/* CONTENT */}
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
                  ? slide.type === "xpari"
                    ? "w-6 bg-red-500"
                    : slide.type === "evolvex"
                      ? "w-6 bg-[#e5bd69]"
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
