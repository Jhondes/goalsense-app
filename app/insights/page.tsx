
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Search,
  ShieldCheck,
  TrendingUp,
  Video,
  Clock,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Football Data & Statistics",
    description:
      "Explore historical results, team form, goals statistics and the numbers behind football performances.",
    icon: BarChart3,
    tag: "DATA & ANALYSIS",
    number: "01",
    href: "/insights/football-statistics",
  },
  {
    title: "Market Education",
    description:
      "Understand football terminology, common markets and how different match statistics are defined.",
    icon: BookOpen,
    tag: "LEARN THE BASICS",
    number: "02",
    href: "/insights/market-education",
  },
  {
    title: "GoalSense Academy",
    description:
      "Explore practical platform guides and learn how to navigate the different features of GoalSense.",
    icon: GraduationCap,
    tag: "PLATFORM GUIDES",
    number: "03",
    href: "/insights/academy",
  },
  {
    title: "Performance Insights",
    description:
      "Discover how historical football records and verified performance data can be understood.",
    icon: TrendingUp,
    tag: "PERFORMANCE",
    number: "04",
    href: "#performance-insights",
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
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(16,185,129,0.17),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(16,185,129,0.07),transparent_40%)]" />

        <div className="absolute right-[-100px] top-20 h-80 w-80 rounded-full border border-emerald-400/10 opacity-40" />
        <div className="absolute right-[-55px] top-32 h-56 w-56 rounded-full border border-emerald-400/10 opacity-40" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-emerald-300">
              <Sparkles size={14} />
              THE GOALSENSE KNOWLEDGE HUB
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Understand the Game.
              <span className="mt-2 block text-emerald-400">
                Go Beyond the Numbers.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              A place to explore football statistics, understand match data
              and learn more about the game through clear, educational
              insights.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#explore"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-black transition hover:bg-emerald-400"
              >
                Explore Insights
                <ArrowRight size={18} />
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:border-emerald-400/50 hover:text-emerald-400"
              >
                Visit GoalSense
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-emerald-400" />
                Educational content
              </span>
              <span className="flex items-center gap-2">
                <BarChart3 size={17} className="text-emerald-400" />
                Football data
              </span>
              <span className="flex items-center gap-2">
                <BookOpen size={17} className="text-emerald-400" />
                Practical guides
              </span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-8 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#10231a] via-[#0b110e] to-[#070b09] p-7 shadow-2xl shadow-black/30 sm:p-9">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">
                    THE KNOWLEDGE HUB
                  </p>
                  <p className="mt-2 text-xl font-extrabold">
                    Football, Explained.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-400">
                  <BarChart3 size={25} />
                </div>
              </div>

              <div className="mt-9 space-y-3">
                {[
                  { label: "Football Statistics", icon: BarChart3 },
                  { label: "Market Education", icon: BookOpen },
                  { label: "GoalSense Academy", icon: GraduationCap },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                        <Icon size={19} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-200">
                          {item.label}
                        </p>
                        <p className="mt-1 text-[10px] tracking-widest text-gray-500">
                          EXPLORE SECTION 0{index + 1}
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-gray-500" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-center text-xs tracking-wider text-gray-500">
                  KNOWLEDGE • CONTEXT • UNDERSTANDING
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="explore"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mb-11 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              EXPLORE THE HUB
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Knowledge. Data. Understanding.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              Choose a topic and explore football information through
              straightforward explanations and practical learning resources.
            </p>
          </div>

          <span className="text-xs font-semibold tracking-widest text-gray-600">
            FOUR LEARNING AREAS
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b110e] p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-[#0d1712]"
              >
                <span className="absolute right-6 top-5 text-4xl font-black text-white/[0.035]">
                  {category.number}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 transition group-hover:bg-emerald-400 group-hover:text-black">
                  <Icon size={23} />
                </div>

                <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-emerald-400">
                  {category.tag}
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {category.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-gray-400">
                  {category.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  Explore section
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="border-y border-white/10 bg-[#080d0a]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-9">
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              EDITOR'S PICK
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Start With the Fundamentals.
            </h2>
          </div>

          <Link
            href="/insights/articles/why-football-statistics-matter"
            className="group grid overflow-hidden rounded-3xl border border-white/10 bg-[#0b110e] transition hover:border-emerald-400/40 md:grid-cols-[0.8fr_1.2fr]"
          >
            <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500/20 via-[#102019] to-[#070b09] p-8">
              <div className="absolute h-56 w-56 rounded-full border border-emerald-400/10" />
              <div className="absolute h-40 w-40 rounded-full border border-emerald-400/15" />
              <BarChart3
                size={100}
                strokeWidth={1}
                className="relative text-emerald-400/80 transition duration-500 group-hover:scale-110"
              />
              <span className="absolute bottom-6 left-6 text-xs font-bold tracking-[0.2em] text-emerald-300">
                GOALSENSE INSIGHTS
              </span>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold tracking-widest text-emerald-400">
                  FOOTBALL STATISTICS
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={13} />
                  5 min read
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-black leading-tight sm:text-3xl">
                Why Football Statistics Matter When Analysing Matches
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Discover how team form, historical results and match data
                provide context for understanding football performances.
              </p>

              <span className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-400">
                Read featured article
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400">
              THE KNOWLEDGE CORNER
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Explore More Insights
            </h2>
            <p className="mt-3 text-gray-400">
              More useful reads to help you understand football and data.
            </p>
          </div>

          <span className="text-xs text-gray-500">
            3 ARTICLES AVAILABLE
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => {
            const Icon = article.icon;

            return (
              <Link
                key={article.title}
                href={article.href}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0b110e] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                    <Icon size={21} />
                  </div>
                  <span className="text-2xl font-black text-white/10">
                    {article.number}
                  </span>
                </div>

                <p className="mt-6 text-[10px] font-bold tracking-widest text-emerald-400">
                  {article.category}
                </p>

                <h3 className="mt-3 text-lg font-bold leading-7 transition group-hover:text-emerald-400">
                  {article.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-gray-400">
                  {article.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-500">
                  <span>{article.read}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                    Read article
                    <ArrowRight
                      size={14}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PERFORMANCE */}
      <section
        id="performance-insights"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b110e] p-8 sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <TrendingUp size={24} />
            </div>

            <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">
              TRANSPARENCY & PERFORMANCE
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Understanding Performance Through Data.
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Football performance is best understood through accurate
              historical records, clear measurements and honest analysis.
              This section will grow as verified GoalSense performance
              information becomes available.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              We believe in presenting reliable information rather than
              publishing unverified statistics.
            </p>
          </div>
        </div>
      </section>

      {/* ACADEMY */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-[#10251a] to-[#080d0a] p-8 sm:p-12 md:grid-cols-2">
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <Video size={24} />
            </div>

            <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">
              LEARN WITH GOALSENSE
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Learn how the platform works.
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Visit our Academy for practical walkthroughs and helpful
              explanations of the GoalSense platform.
            </p>

            <Link
              href="/insights/academy"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-black transition hover:bg-emerald-400"
            >
              Explore GoalSense Academy
              <ArrowRight size={18} />
            </Link>
          </div>

          <Link
            href="/#goalsense-video-vault"
            className="group flex min-h-64 items-center justify-center rounded-2xl border border-white/10 bg-black/30 transition hover:border-emerald-400/40"
          >
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 transition group-hover:scale-110">
                <Video size={34} />
              </div>

              <p className="mt-5 font-bold">GoalSense Video Guides</p>
              <p className="mt-2 text-sm text-gray-500">
                Learn at your own pace
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400">
                Visit Video Vault
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-white/10 px-5 py-16 text-center sm:py-20">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
          <Search size={23} />
        </div>

        <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
          Keep Exploring. Keep Learning.
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
          GoalSense Insights is your place to explore football knowledge,
          statistics and platform education.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 px-6 py-3 font-semibold text-emerald-400 transition hover:bg-emerald-400 hover:text-black"
        >
          Back to Homepage
          <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
