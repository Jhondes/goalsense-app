"use client";

import { useEffect, useRef, useState } from "react";
import {
  LockKeyhole,
  Shuffle,
  Sparkles,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const features = [
  {
  title: "Lock Pick",
  description: "Lock your favorite picks with 2 free locks, or unlock unlimited with Premium.",
  icon: LockKeyhole,
  accent: "#10b981",
  bg: "from-emerald-950/70 to-black",
  miniLabel: "LOCK PICK",
  miniText: "2 Free • Unlimited Premium",
},
  {
    title: "Mixed Market",
    description: "Combine different markets into one customized selection.",
    icon: Shuffle,
    accent: "#ec4899",
    bg: "from-pink-950/70 to-black",
    miniLabel: "MIXED MARKET",
    miniText: "Multiple Markets",
  },
  {
    title: "Lucky Slip",
    description: "Generate a unique slip with a single tap.",
    icon: Sparkles,
    accent: "#d4a72c",
    bg: "from-yellow-950/60 to-black",
    miniLabel: "LUCKY SLIP",
    miniText: "Generate Slip",
  },
  {
    title: "Target Odds",
    description: "Choose your target odds and build around your preference.",
    icon: Target,
    accent: "#3b82f6",
    bg: "from-blue-950/70 to-black",
    miniLabel: "TARGET ODDS",
    miniText: "2.00   3.00   5.00",
  },
];

export default function PremiumFeatures() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToCard = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cards = slider.children;
    const card = cards[index] as HTMLElement | undefined;

    if (!card) return;

    slider.scrollTo({
      left: card.offsetLeft - slider.offsetLeft,
      behavior: "smooth",
    });

    setActive(index);
  };

  const next = () => {
    const nextIndex = (active + 1) % features.length;
    scrollToCard(nextIndex);
  };

  const previous = () => {
    const previousIndex =
      (active - 1 + features.length) % features.length;

    scrollToCard(previousIndex);
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [active]);

  // Detect manual scrolling / swiping
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cards = Array.from(slider.children) as HTMLElement[];

    if (!cards.length) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.offsetLeft - slider.scrollLeft - slider.offsetLeft
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActive(closestIndex);
  };

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-3 sm:py-5">
      {/* Heading */}
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-5 bg-emerald-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Premium Features
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            More ways to use GoalSense
          </h2>

          <p className="mt-1 max-w-xl text-sm text-gray-400">
            Powerful tools designed to give Premium members more flexibility.
          </p>
        </div>

        {/* Desktop arrows */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={previous}
            aria-label="Previous feature"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            aria-label="Next feature"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className={`group relative min-w-[285px] snap-start overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${feature.bg} p-4 shadow-[0_10px_35px_rgba(0,0,0,0.3)] transition-all duration-300 sm:min-w-[310px]`}
              style={{
                borderColor: `${feature.accent}30`,
              }}
            >
              {/* Accent glow */}
              <div
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  background: feature.accent,
                }}
              />

              {/* Top */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl border"
                    style={{
                      color: feature.accent,
                      borderColor: `${feature.accent}40`,
                      background: `${feature.accent}12`,
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-0.5 text-[11px] text-gray-500">
                      Premium tool
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="relative z-10 mt-3 max-w-[270px] text-xs leading-5 text-gray-400">
                {feature.description}
              </p>

              {/* Mini preview */}
              <div
                className="relative z-10 mt-3 flex items-center justify-between rounded-xl border px-3 py-2.5"
                style={{
                  borderColor: `${feature.accent}30`,
                  background: `${feature.accent}08`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    size={14}
                    style={{
                      color: feature.accent,
                    }}
                  />

                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      color: feature.accent,
                    }}
                  >
                    {feature.miniLabel}
                  </span>
                </div>

                <span className="text-[10px] font-medium text-gray-400">
                  {feature.miniText}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile swipe hint */}
      <div className="mt-2 text-center text-[10px] text-gray-600 sm:hidden">
        Swipe to explore
      </div>

      {/* Dots */}
      <div className="mt-2 flex justify-center gap-1.5">
        {features.map((feature, index) => (
          <button
            key={feature.title}
            onClick={() => scrollToCard(index)}
            aria-label={`Show ${feature.title}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === index ? "w-5" : "w-1.5"
            }`}
            style={{
              background:
                active === index ? feature.accent : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>
    </section>
  );
}