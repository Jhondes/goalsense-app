
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  PlayCircle,
  Sparkles,
  Video,
  LayoutDashboard,
  SlidersHorizontal,
  BarChart3,
  ShieldCheck,
  Compass,
} from "lucide-react";

const learningTopics = [
  {
    number: "01",
    icon: Compass,
    title: "Getting Started",
    description:
      "Discover the GoalSense platform, its purpose and the main areas available to explore.",
    tag: "INTRODUCTION",
  },
  {
    number: "02",
    icon: LayoutDashboard,
    title: "Understanding the Interface",
    description:
      "Become familiar with the platform layout and understand where to find its different features.",
    tag: "PLATFORM NAVIGATION",
  },
  {
    number: "03",
    icon: SlidersHorizontal,
    title: "Exploring Platform Features",
    description:
      "Learn about the available tools, settings and the information displayed throughout GoalSense.",
    tag: "FEATURE GUIDES",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Understanding Results",
    description:
      "Learn how to read historical results and understand the statistics presented on the platform.",
    tag: "DATA & RESULTS",
  },
];

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.16),transparent_65%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">

          <Link
            href="/insights"
            className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={17} />
            Back to Insights
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold tracking-widest text-emerald-300">
            <GraduationCap size={16} />
            THE GOALSENSE ACADEMY
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            Learn GoalSense.
            <span className="block text-emerald-400">
              Understand Every Feature.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Welcome to GoalSense Academy, your learning centre for platform
            walkthroughs, feature explanations and practical video guides.
          </p>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Video size={17} className="text-emerald-400" />
              Video tutorials
            </span>

            <span className="flex items-center gap-2">
              <BookOpen size={17} className="text-emerald-400" />
              Platform education
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-emerald-400" />
              Learn at your own pace
            </span>
          </div>

          <Link
            href="/#goalsense-video-vault"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-black transition hover:bg-emerald-400"
          >
            <PlayCircle size={19} />
            Explore Video Guides
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">

          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              WELCOME TO GOALSENSE
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Your guide to understanding the platform.
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              GoalSense brings football information, statistics and platform
              tools together in one place. The Academy is designed to help
              visitors understand how the platform is organised and how its
              features work.
            </p>

            <p className="mt-4 leading-8 text-gray-400">
              Whether you are discovering GoalSense for the first time or
              exploring a feature you haven't used before, start here and
              learn at your own pace.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-8 sm:p-10">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                <GraduationCap size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-extrabold">
                Learn. Explore. Understand.
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Explore the platform through clear explanations and
                step-by-step video walkthroughs.
              </p>

              <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-emerald-400">
                <Sparkles size={17} />
                The GoalSense learning experience
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Learning Journey */}
      <section className="border-y border-white/10 bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">

          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              YOUR LEARNING JOURNEY
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Explore the Academy
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              Get familiar with the platform through these four learning
              topics. Start with the basics and explore at your own pace.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {learningTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <article
                  key={topic.number}
                  className="group rounded-2xl border border-white/10 bg-[#0b110e] p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                      <Icon size={23} />
                    </div>

                    <span className="text-2xl font-black text-white/10">
                      {topic.number}
                    </span>
                  </div>

                  <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-emerald-400">
                    {topic.tag}
                  </p>

                  <h3 className="mt-3 text-xl font-bold">
                    {topic.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-400">
                    {topic.description}
                  </p>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* Video Vault */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-10 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-8 sm:p-12 md:grid-cols-2">

          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <Video size={25} />
            </div>

            <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">
              WATCH AND LEARN
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Learn through video guides.
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Visit the GoalSense Video Vault for practical walkthroughs
              and explanations designed to help you become familiar with
              the platform.
            </p>

            <Link
              href="/#goalsense-video-vault"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-black transition hover:bg-emerald-400"
            >
              Visit Video Vault
              <ArrowRight size={18} />
            </Link>
          </div>

          <Link
            href="/#goalsense-video-vault"
            className="group flex min-h-72 flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-center transition hover:border-emerald-400/40"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 transition group-hover:scale-110">
              <PlayCircle size={43} />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              GoalSense Video Vault
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your platform learning centre
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
              Explore tutorials
              <ArrowRight size={15} />
            </span>
          </Link>

        </div>
      </section>

      {/* Learning Principles */}
      <section className="border-y border-white/10 bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">

          <div className="mb-10 text-center">
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              THE GOALSENSE APPROACH
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              A Better Way to Understand the Platform
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-6">
              <BookOpen size={26} className="text-emerald-400" />

              <h3 className="mt-5 font-bold">
                Learn the Basics
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Understand the purpose of each feature before exploring
                the more detailed information.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-6">
              <PlayCircle size={26} className="text-emerald-400" />

              <h3 className="mt-5 font-bold">
                Follow the Guides
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Use the available video walkthroughs to see how the
                platform works.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b110e] p-6">
              <ShieldCheck size={26} className="text-emerald-400" />

              <h3 className="mt-5 font-bold">
                Understand the Information
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Remember that football statistics provide information,
                not certainty about future match results.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-5 py-16 text-center">
        <Sparkles size={28} className="mx-auto text-emerald-400" />

        <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
          Keep Learning With GoalSense
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
          Explore more educational resources and football knowledge in
          the GoalSense Insights hub.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 px-6 py-3 font-semibold text-emerald-400 transition hover:bg-emerald-400 hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to Insights
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-black transition hover:bg-emerald-400"
          >
            Visit GoalSense
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

    </main>
  );
}
