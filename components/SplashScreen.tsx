"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface SplashScreenProps {
  show: boolean;
}

export default function SplashScreen({ show }: SplashScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex flex-col items-center">

            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: [0.9, 1.06, 1],
                filter: [
                  "drop-shadow(0 0 0px rgba(16,185,129,.1))",
                  "drop-shadow(0 0 35px rgba(16,185,129,.8))",
                  "drop-shadow(0 0 14px rgba(16,185,129,.35))",
                ],
              }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
              }}
            >
              <Image
                src="/logomain.png"
                alt="GoalSense"
                width={120}
                height={120}
                priority
              />
            </motion.div>

            {/* Brand */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.18,
                duration: 0.35,
              }}
              className="mt-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent"
            >
              GoalSense
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.32,
                duration: 0.35,
              }}
              className="mt-2 text-sm tracking-[0.35em] text-gray-400 uppercase"
            >
              Intelligence for Goals
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}