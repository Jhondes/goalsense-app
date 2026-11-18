import Navbar from "@/components/Navbar";
import GeneratorForm from "@/components/GeneratorForm";
import HowItWorks from "@/components/HowItWorks";
/*import ActivityTicker from "@/components/ActivityTicker";*/
import BackgroundBalls from "@/components/BackgroundBalls";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import PredictionLinks from "@/components/PredictionLinks";
import ResponsibleGamingBanner from "@/components/ResponsibleGamingBanner";
import WhyChooseGoalSense from "@/components/WhyChooseGoalSense";
import FAQ from "@/components/FAQ";
import AboutSection from "@/components/AboutSection";
import VaultStats from "@/components/VaultStats";
import VaultVideo from "@/components/VaultVideo";
import PredictionAvailability from "@/components/PredictionAvailability";
import PremiumSlip from "@/components/PremiumSlip";
import AdBanner from "@/components/AdBanner";
import PremiumFeatures from "@/components/PremiumFeatures";
import ResponsibleGaming from "@/components/ResponsibleGaming";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain } from "lucide-react";



export default function Home() {
  
  return (
    <>
      <Navbar />
      <ResponsibleGamingBanner />

      <div className="relative overflow-hidden">

        {/* Animated Background */}
        <BackgroundBalls />

        <main className="relative z-10 px-4 py-6 sm:p-6 max-w-4xl mx-auto space-y-12 md:space-y-16">

          {/* HERO SECTION */}
          <section className="text-center space-y-6 py-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              GoalSense.
            </h1>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Generate smarter football predictions using advanced data analysis, powerful filters, and intelligent league selection.
            </p>

            {/* Anchor scroll (no JS needed) */}
            
<div className="flex flex-wrap items-center justify-center gap-3">

  {/* PRIMARY ACTION */}
  <a
    href="#generator"
    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 px-8 py-3 font-semibold text-black shadow-lg shadow-emerald-500/20 transition hover:scale-105 hover:shadow-emerald-500/40"
  >
    Start Generating
    <ArrowRight size={17} />
  </a>

  {/* FOOTBALL QUIZ */}
<Link
  href="/insights/football-quiz"
  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/5 px-6 py-3 font-semibold text-emerald-400 transition hover:border-emerald-400 hover:bg-emerald-400/10"
>
  <Brain size={17} />
  Play Football Quiz
</Link>

</div>
</section>

{/* COMPACT GOALSENSE INSIGHTS */}
<section className="relative z-10">
  <Link
    href="/insights"
    className="group flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-[#10251a] to-[#0b110e] px-4 py-4 transition hover:border-emerald-400/50 sm:px-5"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
      <BookOpen size={21} />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-extrabold text-white">
        GoalSense Insights
      </p>
      <p className="mt-1 text-xs leading-5 text-gray-400">
        Football knowledge, statistics & educational guides.
      </p>
    </div>

    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-400 transition group-hover:translate-x-1">
      Explore
      <ArrowRight size={15} />
    </span>
  </Link>
</section>


          {/* ===========================
              GOALSENSE VAULT
          ============================ */}
          <section className="relative z-10">
            <VaultStats />
          </section>

<PredictionAvailability />
          

          {/* GENERATOR SECTION */}
          <section id="generator" className="relative z-20 scroll-mt-32">
            <GeneratorForm />
          </section>

          {/* PREMIUM SLIP OF THE DAY */}
<section className="relative z-10">
  <PremiumSlip />
</section>

{/* PREMIUM FEATURES */}
<PremiumFeatures />

{/* GOKA SPORTS */}
<AdBanner />

          {/* HOW IT WORKS */}
          <section className="relative z-10">
            <HowItWorks />
          </section>



{/* GOALSENSE BRAND AMBASSADORS */}
<section className="relative z-10">
  <div className="relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-[#101a19] via-[#091310] to-[#050807] p-4 sm:p-6">

    {/* Subtle background glow */}
    <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-emerald-500/[0.08] blur-[80px]" />

    <div className="relative grid grid-cols-1 items-center gap-5 sm:gap-7 md:grid-cols-[0.85fr_1.15fr]">

      {/* Ambassador Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08]">
        <Image
          src="/mula-betting.jpg"
          alt="MULA BETTING, Founding Brand Ambassador of GoalSense"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        <div className="absolute bottom-3 left-3">
          <span className="rounded-md border border-emerald-400/30 bg-black/70 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
            Founding Ambassador
          </span>
        </div>
      </div>

      {/* Ambassador Details */}
      <div className="relative">

        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-5 bg-emerald-400" />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
            Meet Our Ambassadors
          </p>
        </div>

        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
          The Faces Behind{" "}
          <span className="text-emerald-400">GoalSense.</span>
        </h2>

        <div className="mt-4">
          <h3 className="text-base font-bold text-white">
            MULA BETTING
          </h3>

          <p className="mt-1 text-xs font-medium text-emerald-400">
            Founding Brand Ambassador
          </p>
        </div>

        <p className="mt-3 max-w-md text-xs leading-6 text-gray-400 sm:text-sm">
          Meet the personalities representing the GoalSense vision.
          Discover the people behind our growing football community.
        </p>

        <Link
          href="/ambassadors"
          className="group mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/[0.08] px-4 py-2.5 text-xs font-bold text-emerald-300 transition-all hover:border-emerald-400/50 hover:bg-emerald-400/15"
        >
          Meet Our Ambassadors
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>
    </div>
  </div>
</section>


          {/* HOW TO USE GOALSENSE VIDEO */}
          <section className="relative z-10">
            <VaultVideo />
          </section>

          {/* WHY CHOOSE GOALSENSE */}
<section className="relative z-10">
  <WhyChooseGoalSense />
</section>

{/* FAQ */}
<section className="relative z-10">
  <FAQ />
</section>



{/* SEO CONTENT */}
<SeoContent />

        </main>
            </div>

      {/* ABOUT GOALSENSE */}
<section className="relative z-10 py-8 md:py-12">
  <AboutSection />
</section>

      <section className="max-w-4xl mx-auto px-6 py-6 md:py-10">
  <PredictionLinks />
</section>
      
<ResponsibleGaming />

      <Footer />
    </>
  );
}