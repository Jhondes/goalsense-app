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
import { ArrowRight, BookOpen } from "lucide-react";



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
            <a
              href="#generator"
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-black font-semibold hover:scale-105 transition shadow-lg hover:shadow-emerald-500/40"
            >
              Start Generating
            </a>
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
  <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-gray-900 via-[#071410] to-black p-6 sm:p-10">

    {/* Background glow */}
    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

      {/* Ambassador Image */}
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        <Image
          src="/mula-betting.jpg"
          alt="MULA BETTING, Founding Brand Ambassador of GoalSense"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full border border-emerald-400/40 bg-black/70 px-3 py-2 text-[10px] sm:text-xs font-bold tracking-wider text-emerald-300 backdrop-blur">
            FOUNDING BRAND AMBASSADOR
          </span>
        </div>
      </div>

      {/* Ambassador Details */}
      <div className="space-y-5">

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            Meet Our Ambassadors
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            The Faces Behind{" "}
            <span className="text-emerald-400">GoalSense.</span>
          </h2>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">
            MULA BETTING
          </h3>

          <p className="mt-1 text-sm font-semibold text-emerald-400">
            Founding Brand Ambassador
          </p>
        </div>

        <p className="text-sm leading-7 text-gray-400">
          Meet the personalities representing the GoalSense
          vision. Starting with MULA BETTING, our founding
          brand ambassador, we're building a growing community
          around football analysis and technology.
        </p>

        <Link
          href="/ambassadors"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-emerald-400 hover:scale-[1.02]"
        >
          Meet Our Ambassadors
          <span>→</span>
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