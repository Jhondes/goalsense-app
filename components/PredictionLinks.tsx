
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Trophy, BarChart3, BookOpen } from "lucide-react";

export default function PredictionLinks() {
  const links = [
    {
      href: "/today-football-predictions",
      label: "Today's Football Fixtures",
      icon: CalendarDays,
    },
    {
      href: "/over-2.5-predictions",
      label: "Football Statistics",
      icon: BarChart3,
    },
    {
      href: "/btts-predictions",
      label: "Match Insights",
      icon: BookOpen,
    },
    {
      href: "/premier-league-predictions",
      label: "Premier League",
      icon: Trophy,
    },
  ];

  return (
    <section className="mt-8 border-t border-white/[0.07] pt-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-white sm:text-base">
            Explore Football
          </h2>
          <p className="mt-1 text-[11px] text-gray-500">
            More from GoalSense
          </p>
        </div>

        <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
          Discover
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 transition-all duration-200 hover:border-emerald-400/25 hover:bg-emerald-400/[0.04]"
            >
              <span className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-gray-400 transition-colors group-hover:bg-emerald-400/10 group-hover:text-emerald-400">
                  <Icon size={15} />
                </span>

                <span className="text-xs font-semibold text-gray-300 transition-colors group-hover:text-white">
                  {link.label}
                </span>
              </span>

              <ArrowUpRight
                size={14}
                className="text-gray-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-400"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
