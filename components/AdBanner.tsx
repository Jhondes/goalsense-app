import Image from "next/image";

export default function AdBanner() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-5">
      <a
  href="https://www.goka.ng/?aff=11525"
  target="_blank"
  rel="noopener noreferrer"
  className="group block"
  aria-label="Visit GOKA Sports"
>
        <div className="relative overflow-hidden rounded-2xl border border-[#d4a72c]/30 bg-[#090909] shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4a72c]/60 hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          
          {/* Gold accent */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#f5c542] via-[#d4a72c] to-transparent" />

          <div className="grid min-h-[190px] grid-cols-1 md:grid-cols-[1fr_0.85fr]">
            
            {/* LEFT SIDE */}
            <div className="relative flex flex-col justify-center px-7 py-7 sm:px-9">
              
              {/* Small label */}
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-[#d4a72c]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4a72c]">
                  GOKA.NG
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                20% SPORT CASH BACK.
              </h3>

              <p className="mt-1 text-lg font-medium text-[#d4a72c] sm:text-xl">
                TURN EVERY SET BACK INTO A COMEBACK.
              </p>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                GOKA SPORTS & CASINO.
              </p>

              {/* CTA */}
              <div className="mt-5">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[#d4a72c] px-5 py-2.5 text-sm font-bold text-black transition-all duration-200 group-hover:bg-[#f0bd35]">
                  Visit GOKA.NG
                  <span className="text-base transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative min-h-[180px] overflow-hidden">
              <Image
                src="/goka-sports-banner.jpg"
                alt="GOKA Sports"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark gradient over image */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-transparent to-transparent md:block" />

              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}