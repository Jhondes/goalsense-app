import Navbar from "@/components/Navbar";
import GeneratorForm from "@/components/GeneratorForm";
import HowItWorks from "@/components/HowItWorks";
/*import ActivityTicker from "@/components/ActivityTicker";*/
import BackgroundBalls from "@/components/BackgroundBalls";
import Footer from "@/components/Footer";

async function delay() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default async function Home() {
  await delay();
  return (
    <>
      <Navbar />

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
              Generate intelligent football markets using advanced filters,
              league selection.
            </p>

            {/* Anchor scroll (no JS needed) */}
            <a
              href="#generator"
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-black font-semibold hover:scale-105 transition shadow-lg hover:shadow-emerald-500/40"
            >
              Start Generating
            </a>
          </section>

          {/* GENERATOR SECTION */}
          <section id="generator" className="relative z-20 scroll-mt-32">
            <GeneratorForm />
          </section>

          {/* HOW IT WORKS */}
          <section className="relative z-10">
            <HowItWorks />
          </section>

        </main>
      </div>

      
<Footer />
    </>
  );
}