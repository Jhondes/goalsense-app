
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Video,
  Clock,
  Sparkles,
  Brain,
  Trophy,
  ShieldCheck,
  Search,
} from "lucide-react";

const categories = [
  {
    title: "Football Data & Statistics",
    description: "Historical results, team form, goals statistics and football data.",
    icon: BarChart3,
    tag: "DATA & ANALYSIS",
    number: "01",
    href: "/insights/football-statistics",
  },
  {
    title: "Market Education",
    description: "Understand football terminology, common markets and statistics.",
    icon: BookOpen,
    tag: "LEARN THE BASICS",
    number: "02",
    href: "/insights/market-education",
  },
  {
    title: "GoalSense Academy",
    description: "Practical guides to help you navigate GoalSense features.",
    icon: GraduationCap,
    tag: "PLATFORM GUIDES",
    number: "03",
    href: "/insights/academy",
  },
  {
    title: "Performance Insights",
    description: "Explore historical football records and verified performance data.",
    icon: TrendingUp,
    tag: "PERFORMANCE",
    number: "04",
    href: "/insights/performance",
  },
  {
    title: "Football Knowledge Quiz",
    description: "Test your knowledge of football history, rules, tactics and statistics.",
    icon: Brain,
    tag: "TEST YOUR KNOWLEDGE",
    number: "05",
    href: "/insights/football-quiz",
  },
];

const articles = [
  {
    category: "FOOTBALL STATISTICS",
    title: "Why Football Statistics Matter When Analysing Matches",
    description:
      "Discover how team form, historical results and match data provide context for understanding football.",
    read: "5 min read",
    number: "01",
    icon: BarChart3,
    href: "/insights/articles/why-football-statistics-matter",
  },
  {
    category: "MARKET EDUCATION",
    title: "Understanding Common Football Markets",
    description:
      "A beginner-friendly introduction to common football market terminology and definitions.",
    read: "4 min read",
    number: "02",
    icon: BookOpen,
    href: "/insights/articles/understanding-common-football-markets",
  },
  {
    category: "FOOTBALL ANALYSIS",
    title: "How to Interpret Team Form and Historical Results",
    description:
      "Understand recent team form, home and away records, and historical football results.",
    read: "5 min read",
    number: "03",
    icon: TrendingUp,
    href: "/insights/articles/how-to-interpret-team-form",
  },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-white">

      {/* HERO */}
      <section className="relative border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(16,185,129,0.13),transparent_48%),radial-gradient(ellipse_at_90%_80%,rgba(16,185,129,0.06),transparent_40%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] text-emerald-300">
              <Sparkles size={12} />
              THE GOALSENSE KNOWLEDGE HUB
            </div>

            <h1 className="max-w-2xl text-3xl font-black leading-[1.13] tracking-tight sm:text-5xl lg:text-[56px]">
              Understand the Game.
              <span className="mt-1 block text-emerald-400">
                Go Beyond the Numbers.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              Explore football statistics, understand match data and discover
              more about the game through clear, educational insights.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#explore"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-xs font-bold text-black transition hover:bg-emerald-400"
              >
                Explore Insights
                <ArrowRight size={15} />
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-xs font-semibold text-gray-200 transition hover:border-emerald-400/40 hover:text-emerald-400"
              >
                Visit GoalSense
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[10px] font-medium text-gray-400 sm:text-xs">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                Educational content
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 size={14} className="text-emerald-400" />
                Football data
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} className="text-emerald-400" />
                Practical guides
              </span>
            </div>
          </div>

          {/* COMPACT KNOWLEDGE PREVIEW */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-8 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-[#10231a] via-[#0b110e] to-[#070b09] p-5 shadow-xl shadow-black/20 sm:p-6">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.2em] text-emerald-400">
                    GOALSENSE INTELLIGENCE
                  </p>
                  <h2 className="mt-1.5 text-lg font-extrabold">
                    Football, Explained.
                  </h2>
                </div>

                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-2.5 text-emerald-400">
                  <BarChart3 size={22} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {[
                  { label: "Football Data", icon: BarChart3 },
                  { label: "Knowledge", icon: BookOpen },
                  { label: "Performance", icon: TrendingUp },
                  { label: "Learning", icon: GraduationCap },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3"
                    >
                      <Icon size={16} className="shrink-0 text-emerald-400" />
                      <span className="text-[10px] font-semibold text-gray-300">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] p-3.5">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-400" />
                  <span className="text-[10px] font-bold tracking-wider text-emerald-300">
                    KNOWLEDGE. CONTEXT. UNDERSTANDING.
                  </span>
                </div>
                <p className="mt-1.5 text-[10px] leading-5 text-gray-500">
                  A smarter way to explore the beautiful game.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="explore"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] text-emerald-400">
              EXPLORE THE HUB
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Knowledge. Data. Understanding.
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-6 text-gray-400 sm:text-sm">
              Explore football information through practical learning and insights.
            </p>
          </div>

          <span className="text-[9px] font-semibold tracking-widest text-gray-500">
            05 LEARNING AREAS
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group relative flex min-h-[158px] flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-[#0d1712] sm:min-h-[166px] sm:p-5"
              >
                <span className="absolute right-4 top-3 text-3xl font-black text-white/[0.035]">
                  {category.number}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-400 transition group-hover:bg-emerald-400 group-hover:text-black">
                    <Icon size={18} />
                  </div>

                  <span className="text-[9px] font-bold tracking-[0.13em] text-emerald-400">
                    {category.tag}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-bold tracking-tight transition group-hover:text-emerald-400">
                  {category.title}
                </h3>

                <p className="mt-1.5 flex-1 text-[11px] leading-5 text-gray-400">
                  {category.description}
                </p>

                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                  Explore section
                  <ArrowRight
                    size={13}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FOOTBALL QUIZ */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="relative isolate overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-[#10231a] via-[#0b110e] to-[#070b09] p-5 sm:p-7">

          <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full border border-emerald-400/[0.08]" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-400/[0.05] blur-3xl" />

          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[9px] font-bold tracking-widest text-emerald-400">
                <Brain size={13} />
                THE GOALSENSE CHALLENGE
              </div>

              <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                Think You Know Football?
                <span className="block text-emerald-400">Prove It.</span>
              </h2>

              <p className="mt-2 max-w-lg text-xs leading-6 text-gray-400 sm:text-sm">
                From legendary football moments to tactics, statistics and
                competitions, put your knowledge to the test.
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-[9px] font-bold tracking-wider text-gray-400">
                <span>10 QUESTIONS</span>
                <span>INSTANT RESULTS</span>
                <span>FREE TO PLAY</span>
              </div>

              <Link
                href="/insights/football-quiz"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-xs font-extrabold text-black transition hover:bg-emerald-400"
              >
                Take the Challenge
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="hidden h-32 w-32 items-center justify-center rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] md:flex">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/10">
                <Trophy size={49} strokeWidth={1.2} className="text-emerald-400" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="border-y border-white/[0.06] bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">

          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-[0.22em] text-emerald-400">
              EDITOR'S PICK
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Start With the Fundamentals.
            </h2>
          </div>

          <Link
            href="/insights/articles/why-football-statistics-matter"
            className="group grid overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b110e] transition hover:border-emerald-400/30 md:grid-cols-[0.65fr_1.35fr]"
          >
            <div className="relative flex min-h-[170px] items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500/15 via-[#102019] to-[#070b09] p-6">
              <div className="absolute h-36 w-36 rounded-full border border-emerald-400/10" />
              <div className="absolute h-24 w-24 rounded-full border border-emerald-400/15" />
              <BarChart3
                size={72}
                strokeWidth={1}
                className="relative text-emerald-400/80 transition duration-500 group-hover:scale-110"
              />
              <span className="absolute bottom-4 left-5 text-[9px] font-bold tracking-[0.18em] text-emerald-300">
                GOALSENSE INSIGHTS
              </span>
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.08] px-2.5 py-1 text-[9px] font-bold tracking-wider text-emerald-400">
                  FOOTBALL STATISTICS
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <Clock size={12} />
                  5 min read
                </span>
              </div>

              <h3 className="mt-3 text-lg font-black leading-snug sm:text-2xl">
                Why Football Statistics Matter When Analysing Matches
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Discover how team form, historical results and match data
                provide context for understanding football performances.
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
                Read featured article
                <ArrowRight
                  size={15}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] text-emerald-400">
              THE KNOWLEDGE CORNER
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Explore More Insights
            </h2>
            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              Useful reads to help you understand football and data.
            </p>
          </div>

          <span className="text-[9px] font-semibold tracking-wider text-gray-500">
            03 ARTICLES AVAILABLE
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {articles.map((article) => {
            const Icon = article.icon;

            return (
              <Link
                key={article.title}
                href={article.href}
                className="group flex h-full flex-col rounded-xl border border-white/[0.07] bg-[#0b110e] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-emerald-400">
                    <Icon size={17} />
                  </div>
                  <span className="text-xl font-black text-white/[0.08]">
                    {article.number}
                  </span>
                </div>

                <p className="mt-4 text-[9px] font-bold tracking-wider text-emerald-400">
                  {article.category}
                </p>

                <h3 className="mt-2 text-sm font-bold leading-6 transition group-hover:text-emerald-400">
                  {article.title}
                </h3>

                <p className="mt-2 flex-1 text-[11px] leading-5 text-gray-400">
                  {article.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 text-[10px] text-gray-500">
                  <span>{article.read}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                    Read article
                    <ArrowRight
                      size={12}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      
      {/* PERFORMANCE INSIGHTS */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
        <Link
          href="/insights/performance"
          className="group relative block overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-[#10231a] via-[#0b110e] to-[#070b09] p-5 transition duration-300 hover:border-emerald-400/35 sm:p-7"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.09] text-emerald-400">
                <TrendingUp size={21} />
              </div>

              <div className="max-w-2xl">
                <p className="text-[9px] font-bold tracking-[0.2em] text-emerald-400">
                  TRANSPARENCY & PERFORMANCE
                </p>

                <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
                  GoalSense Performance Insights
                </h2>

                <p className="mt-2 text-xs leading-6 text-gray-400 sm:text-sm">
                  Explore historical football records, completed-match
                  statistics and performance trends calculated from
                  verified GoalSense data.
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
                  Explore Performance Dashboard
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </div>

            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.05] text-emerald-400 sm:flex">
              <BarChart3 size={30} strokeWidth={1.5} />
            </div>
          </div>
        </Link>
      </section>


      {/* ACADEMY */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="grid items-center gap-5 overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-5 sm:p-7 md:grid-cols-2">

          <div>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-emerald-400">
              <Video size={20} />
            </div>

            <p className="text-[9px] font-bold tracking-[0.2em] text-emerald-400">
              LEARN WITH GOALSENSE
            </p>

            <h2 className="mt-2 text-xl font-extrabold leading-tight sm:text-2xl">
              Learn how the platform works.
            </h2>

            <p className="mt-2 max-w-md text-xs leading-6 text-gray-400">
              Visit our Academy for practical walkthroughs and helpful
              explanations of the GoalSense platform.
            </p>

            <Link
              href="/insights/academy"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-xs font-bold text-black transition hover:bg-emerald-400"
            >
              Explore GoalSense Academy
              <ArrowRight size={15} />
            </Link>
          </div>

          <Link
            href="/#goalsense-video-vault"
            className="group flex min-h-[145px] items-center justify-center rounded-xl border border-white/[0.08] bg-black/20 transition hover:border-emerald-400/30"
          >
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-400 transition group-hover:scale-110">
                <Video size={23} />
              </div>

              <p className="mt-3 text-xs font-bold">GoalSense Video Guides</p>
              <p className="mt-1 text-[10px] text-gray-500">
                Learn at your own pace
              </p>

              <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                Visit Video Vault
                <ArrowRight size={12} />
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-white/[0.06] px-5 py-10 text-center sm:py-12">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-400">
          <Search size={19} />
        </div>

        <h2 className="mt-3 text-xl font-extrabold sm:text-2xl">
          Keep Exploring. Keep Learning.
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-gray-400">
          GoalSense Insights is your place to explore football knowledge,
          statistics and platform education.
        </p>

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 px-5 py-2.5 text-xs font-bold text-emerald-400 transition hover:bg-emerald-400 hover:text-black"
        >
          Back to Homepage
          <ArrowRight size={14} />
        </Link>
      </section>

    </main>
  );
}
