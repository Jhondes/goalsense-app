module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        100: "100",
        200: "200",
      },

      animation: {
        rotateSlow: "rotateSlow 40s linear infinite",
        rotateSlower: "rotateSlower 60s linear infinite",
        rotateFast: "rotateFast 25s linear infinite",
        bounceDiagonal1: "bounceDiagonal1 20s ease-in-out infinite alternate",
        bounceDiagonal2: "bounceDiagonal2 25s ease-in-out infinite alternate",
        bounceDiagonal3: "bounceDiagonal3 30s ease-in-out infinite alternate",

        // NEW
        spinSlow: "spin 40s linear infinite",
      },

      keyframes: {
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotateSlower: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotateFast: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        bounceDiagonal1: {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(50px, 30px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        bounceDiagonal2: {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-60px, 40px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        bounceDiagonal3: {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(40px, -50px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
    },
  },
  plugins: [],
};