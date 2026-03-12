import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="
        bg-gray-900 border-b border-gray-800
        px-6 py-4
        flex items-center justify-between
        sticky top-0 z-50
      "
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="GoalSense Logo"
          width={40}
          height={40}
          className="drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]"
          priority
        />

        <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          GoalSense.
        </span>
      </Link>

      {/* Menu */}
      <div className="flex items-center gap-4">
        <button
  className="
    px-5 py-2 rounded-lg font-semibold
    bg-emerald-500 text-black
    transition-all duration-300
    hover:scale-105
    hover:shadow-[0_0_20px_rgba(16,185,129,0.8)]
    shadow-[0_0_10px_rgba(16,185,129,0.5)]
  "
>
  Login
</button>
      </div>
    </nav>
  );
}