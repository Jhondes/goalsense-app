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
import PremiumSlip from "@/components/PremiumSlip";



export default function Home() {
  
  return (
    <>
      <Navbar />
      <ResponsibleGamingBanner />

      <div className="relative overflow-hidden">

        {/* Animated Background */}
        <BackgroundBalls />

        <main className="relative z-10 p-6 max-w-4xl mx-auto space-y-16">

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

          {/* ===========================
              GOALSENSE VAULT
          ============================ */}
          <section className="relative z-10">
            <VaultStats />
          </section>


          

          {/* GENERATOR SECTION */}
          <section id="generator" className="relative z-20 scroll-mt-32">
            <GeneratorForm />
          </section>

          {/* PREMIUM SLIP OF THE DAY */}
<section className="relative z-10">
  <PremiumSlip />
</section>

          {/* HOW IT WORKS */}
          <section className="relative z-10">
            <HowItWorks />
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
<section className="relative z-10 py-16">
  <AboutSection />
</section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <PredictionLinks />
      </section>

      <Footer />
    </>
  );
}