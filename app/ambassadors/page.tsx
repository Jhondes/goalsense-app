
import Image from "next/image";
import Link from "next/link";

const ambassadors = [
  {
    name: "MULA BETTING",
    title: "Founding Brand Ambassador",
    image: "/mula-betting.jpg",
    description:
      "MULA BETTING is the first personality representing GoalSense, helping introduce the platform through digital content, community engagement and product education.",
    badge: "FOUNDING AMBASSADOR",
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
            THE PEOPLE BEHIND GOALSENSE
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Meet Our{" "}
            <span className="text-emerald-400">
              Brand Ambassadors
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
            The Faces of GoalSense
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
