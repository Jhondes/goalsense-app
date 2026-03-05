"use client";

import { useEffect, useState } from "react";

type Ball = {
  top: string;
  left: string;
  opacity: number;
  size: string;
  glow: string;
  floatAnim: string;
  rotateAnim: string;
  glowIntensity: number;
};

export default function BackgroundBalls() {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    const glowColors = [
      "#22d3ee",
      "#a855f7",
      "#f472b6",
      "#facc15",
      "#34d399",
    ];

    const sizes = ["text-4xl", "text-5xl", "text-6xl", "text-7xl"];

    const floatAnims = [
      "animate-bounceDiagonal1",
      "animate-bounceDiagonal2",
      "animate-bounceDiagonal3",
    ];

    const rotateSpeeds = [
      "animate-rotateSlow",
      "animate-rotateSlower",
      "animate-rotateFast",
    ];

    const generated = Array.from({ length: 25 }).map(() => {
      const size = sizes[Math.floor(Math.random() * sizes.length)];

      const glowIntensity =
        size === "text-7xl"
          ? 60
          : size === "text-6xl"
          ? 45
          : size === "text-5xl"
          ? 30
          : 20;

      return {
        top: Math.random() * 95 + "%",
        left: Math.random() * 95 + "%",
        opacity: 0.05 + Math.random() * 0.1,
        size,
        glow: glowColors[Math.floor(Math.random() * glowColors.length)],
        floatAnim:
          floatAnims[Math.floor(Math.random() * floatAnims.length)],
        rotateAnim:
          rotateSpeeds[Math.floor(Math.random() * rotateSpeeds.length)],
        glowIntensity,
      };
    });

    setBalls(generated);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {balls.map((ball, i) => (
        <div
          key={i}
          className={`absolute ${ball.size} ${ball.floatAnim} ${ball.rotateAnim}`}
          style={{
            top: ball.top,
            left: ball.left,
            opacity: ball.opacity,
            filter: `
              drop-shadow(0 0 ${ball.glowIntensity / 3}px ${ball.glow})
              drop-shadow(0 0 ${ball.glowIntensity}px ${ball.glow})
            `,
          }}
        >
          ⚽
        </div>
      ))}
    </div>
  );
}