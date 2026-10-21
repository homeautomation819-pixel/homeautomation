import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "rgb(var(--c-bg) / <alpha-value>)",
          900: "rgb(var(--c-surface) / <alpha-value>)",
          850: "rgb(var(--c-raised) / <alpha-value>)",
          800: "rgb(var(--c-line) / <alpha-value>)",
          700: "rgb(var(--c-line2) / <alpha-value>)",
        },
        white: "rgb(var(--c-heading) / <alpha-value>)",
        slate: {
          200: "rgb(var(--c-strong) / <alpha-value>)",
          300: "rgb(var(--c-body) / <alpha-value>)",
          400: "rgb(var(--c-muted) / <alpha-value>)",
          500: "rgb(var(--c-faint) / <alpha-value>)",
          600: "rgb(var(--c-faintest) / <alpha-value>)",
        },
        accent: {
          blue: "rgb(var(--c-accent-blue) / <alpha-value>)",
          cyan: "rgb(var(--c-accent-cyan) / <alpha-value>)",
          amber: "rgb(var(--c-accent-amber) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 40px -12px rgb(59 130 246 / 0.25)",
        "glow-amber": "0 10px 40px -12px rgb(245 158 11 / 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
