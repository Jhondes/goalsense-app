
import Image from "next/image";
import Link from "next/link";

const ambassadors = [
  {
    name: "MULA BETTING",
    title: "Founding Brand Ambassador",
    badge: "FOUNDING BRAND AMBASSADOR",
    image: "/mula-betting.jpg",
    description:
      "MULA BETTING is the founding personality representing GoalSense, connecting football enthusiasts with the platform through digital content, community engagement and product education.",
    youtube: "https://www.youtube.com/@MULABETTING",
    channel: "MULA BETTING",
  },
  {
    name: "GAMELLA",
    title: "Official Brand Ambassador",
    badge: "OFFICIAL BRAND AMBASSADOR",
    image: "/gamella.jpg",
    description:
      "Gamella represents the growing GoalSense community, bringing her passion for football content and digital media to the platform's vision of smarter football analysis.",
    youtube: "https://www.youtube.com/@gamella_tv",
    channel: "GamellaTV",
  },
];

export default function AmbassadorsPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">

          <span className="inline-flex px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 text-xs font-bold tracking-widest">
            MEET OUR TEAM
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            The Faces Behind{" "}
            <span className="text-emerald-400">
              GoalSense
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-sm md:text-lg leading-relaxed">
            Meet the personalities representing the GoalSense
            vision and connecting football enthusiasts with
            smarter football analysis.
          </p>

        </div>
      </section>

      {/* Ambassador Profiles */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">

        <div className="mb-10">
          <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
            Our Representatives
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-3">
            Meet Our Brand Ambassadors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {ambassadors.map((ambassador) => (
            <div
              key={ambassador.name}
              className="group rounded-3xl overflow-hidden border border-white/10 bg-[#0b0f10] hover:border-emerald-400/40 transition duration-500"
            >

              {/* Profile Image */}
              <div className="relative aspect-[16/10] overflow-hidden">

                <Image
                  src={ambassador.image}
                  alt={`${ambassador.name} - GoalSense Brand Ambassador`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="px-3 py-2 rounded-full bg-emerald-400/15 border border-emerald-400/40 text-emerald-300 text-[10px] md:text-xs font-bold tracking-wider backdrop-blur-md">
                    {ambassador.badge}
                  </span>
                </div>

              </div>

              {/* Profile Details */}
              <div className="p-6 md:p-8">

                <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">
                  {ambassador.name}
                </h3>

                <p className="mt-2 text-emerald-400 font-semibold text-sm">
                  {ambassador.title}
                </p>

                <div className="w-12 h-1 bg-emerald-400 rounded-full my-5" />

                <p className="text-gray-400 text-sm leading-7">
                  {ambassador.description}
                </p>

                {/* YouTube Channel */}
                <a
                  href={ambassador.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 mt-7 w-full rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-bold text-white hover:bg-red-500/20 hover:border-red-400/60 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-red-500"
                  >
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                  </svg>

                  Visit {ambassador.channel}
                </a>

              </div>

            </div>
          ))}

          {/* Future Ambassadors */}
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] flex flex-col items-center justify-center text-center p-10 min-h-[300px]">

            <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-3xl">
              +
            </div>

            <h3 className="mt-5 text-xl font-bold">
              More Faces. One Vision.
            </h3>

            <p className="mt-3 max-w-xs text-sm text-gray-500 leading-relaxed">
              We're building a growing network of people
              representing the GoalSense vision.
            </p>

          </div>

        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[#07110e] to-black">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">

          <h2 className="text-2xl md:text-4xl font-extrabold">
            One Brand. Multiple Faces.{" "}
            <span className="text-emerald-400">
              One Vision.
            </span>
          </h2>

          <p className="mt-5 text-sm text-gray-500">
            GoalSense is built around technology, football
            analysis and community.
          </p>

          <p className="mt-8 text-xs text-gray-600">
            18+ Only. Football predictions involve uncertainty.
            No guaranteed outcomes.
          </p>

          <Link
            href="/"
            className="inline-flex mt-8 px-7 py-3 rounded-xl bg-emerald-400 text-black font-bold text-sm hover:bg-emerald-300 transition"
          >
            Back to GoalSense
          </Link>

        </div>
      </section>

    </main>
  );
}