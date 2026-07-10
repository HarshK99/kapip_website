import type { Config } from "tailwindcss";

// Single source of truth for design tokens (DESIGN.md — Token → Tailwind mapping).
// No component may reference a color/size not defined here.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14171A",
        "ink-soft": "#4A5158",
        paper: "#FBFAF7",
        surface: "#F1EFEA",
        line: "#DAD6CE",
        accent: "#0E5C4A",
        "accent-deep": "#0A3F33",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        container: "1120px",
      },
      borderRadius: {
        card: "4px",
      },
    },
  },
};

export default config;
