
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

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.13),transparent_65%)]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">

          <Link
            href="/insights"
            className="mb-7 inline-flex items-center gap-2 text-xs font-medium text-gray-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={15} />
            Back to Insights
          </Link>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-emerald-300">
            <GraduationCap size={14} />
            THE GOALSENSE ACADEMY
          </div>

          <div className="max-w-4xl">
            <h1 className="text-3xl font-black leading-[1.12] tracking-tight sm:text-5xl">
              Learn GoalSense.
              <span className="block text-emerald-400">
                Understand Every Feature.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Welcome to GoalSense Academy, your learning centre for platform
              walkthroughs, feature explanations and practical video guides.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <Video size={15} className="text-emerald-400" />
              Video tutorials
            </span>
            <span className="flex items-center gap-2">
              <BookOpen size={15} className="text-emerald-400" />
              Platform education
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400" />
              Learn at your own pace
            </span>
          </div>

          <Link
            href="/#goalsense-video-vault"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-400"
          >
            <PlayCircle size={17} />
            Explore Video Guides
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-5 py-11 sm:px-8 sm:py-14">
        <div className="grid items-center gap-7 md:grid-cols-[1.15fr_0.85fr]">

          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] text-emerald-400">
              WELCOME TO GOALSENSE
            </p>

            <h2 className="mt-2.5 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              Your guide to understanding the platform.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              GoalSense brings football information, statistics and platform
              tools together in one place. The Academy is designed to help
              visitors understand how the platform is organised and how its
              features work.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Whether you are discovering GoalSense for the first time or
              exploring a feature you haven't used before, start here and
              learn at your own pace.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-6 sm:p-7">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                <GraduationCap size={23} />
              </div>

              <h3 className="mt-4 text-xl font-extrabold">
                Learn. Explore. Understand.
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Explore the platform through clear explanations and
                step-by-step video walkthroughs.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Sparkles size={15} />
                The GoalSense learning experience
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LEARNING JOURNEY */}
      <section className="border-y border-white/[0.07] bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-11 sm:px-8 sm:py-14">

          <div className="mb-7">
            <p className="text-[10px] font-bold tracking-[0.22em] text-emerald-400">
              YOUR LEARNING JOURNEY
            </p>

            <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Explore the Academy
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400">
              Get familiar with the platform through these four learning
              topics. Start with the basics and explore at your own pace.
            </p>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            {learningTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <article
                  key={topic.number}
                  className="group rounded-xl border border-white/[0.08] bg-[#0b110e] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-[#0d1510] sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-400 transition group-hover:bg-emerald-400/15">
                      <Icon size={19} />
                    </div>

                    <span className="text-xl font-black text-white/[0.12]">
                      {topic.number}
                    </span>
                  </div>

                  <p className="mt-4 text-[9px] font-bold tracking-[0.18em] text-emerald-400">
                    {topic.tag}
                  </p>

                  <h3 className="mt-2 text-base font-bold tracking-tight">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-gray-400 sm:text-sm">
                    {topic.description}
                  </p>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* VIDEO VAULT */}
      <section className="mx-auto max-w-7xl px-5 py-11 sm:px-8 sm:py-14">
        <div className="grid items-center gap-6 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-6 sm:p-8 md:grid-cols-2">

          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/10 text-emerald-400">
              <Video size={21} />
            </div>

            <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
              WATCH AND LEARN
            </p>

            <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Learn through video guides.
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Visit the GoalSense Video Vault for practical walkthroughs
              and explanations designed to help you become familiar with
              the platform.
            </p>

            <Link
              href="/#goalsense-video-vault"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-emerald-400"
            >
              Visit Video Vault
              <ArrowRight size={16} />
            </Link>
          </div>

          <Link
            href="/#goalsense-video-vault"
            className="group flex min-h-52 flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-black/25 text-center transition hover:border-emerald-400/30 hover:bg-black/35"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 transition group-hover:scale-110">
              <PlayCircle size={31} />
            </div>

            <h3 className="mt-4 text-base font-bold">
              GoalSense Video Vault
            </h3>

            <p className="mt-1.5 text-xs text-gray-500">
              Your platform learning centre
            </p>

            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
              Explore tutorials
              <ArrowRight size={14} />
            </span>
          </Link>

        </div>
      </section>

      {/* LEARNING PRINCIPLES */}
      <section className="border-y border-white/[0.07] bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-11 sm:px-8 sm:py-14">

          <div className="mb-7 text-center">
            <p className="text-[10px] font-bold tracking-[0.22em] text-emerald-400">
              THE GOALSENSE APPROACH
            </p>

            <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
              A Better Way to Understand the Platform
            </h2>
          </div>

          <div className="grid gap-3.5 md:grid-cols-3">

            <div className="rounded-xl border border-white/[0.08] bg-[#0b110e] p-5">
              <BookOpen size={21} className="text-emerald-400" />

              <h3 className="mt-3.5 text-sm font-bold">
                Learn the Basics
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Understand the purpose of each feature before exploring
                the more detailed information.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0b110e] p-5">
              <PlayCircle size={21} className="text-emerald-400" />

              <h3 className="mt-3.5 text-sm font-bold">
                Follow the Guides
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Use the available video walkthroughs to see how the
                platform works.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0b110e] p-5">
              <ShieldCheck size={21} className="text-emerald-400" />

              <h3 className="mt-3.5 text-sm font-bold">
                Understand the Information
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Remember that football statistics provide information,
                not certainty about future match results.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-5 py-11 text-center sm:py-14">
        <Sparkles size={23} className="mx-auto text-emerald-400" />

        <h2 className="mt-3.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Keep Learning With GoalSense
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-400">
          Explore more educational resources and football knowledge in
          the GoalSense Insights hub.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400 hover:text-black"
          >
            <ArrowLeft size={15} />
            Back to Insights
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-emerald-400"
          >
            Visit GoalSense
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </main>
  );
}
