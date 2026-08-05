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
        // Decorative brand ramp — logo/signature mark + gradient moments only,
        // never a substitute for accent/accent-deep. Provisional until synced
        // to the final logo (DESIGN.md — Palette).
        "brand-indigo": "#1B2C74",
        "brand-teal": "#14827A",
        "brand-green": "#2E9E5B",
        "brand-lime": "#AEC61C",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        // Reuses Tailwind's own "serif" utility name rather than inventing a
        // new one. Used in exactly one place — the Home hero H1 — everything
        // else stays on font-display/font-body/font-mono.
        serif: ["var(--font-hero-serif)"],
      },
      maxWidth: {
        container: "1120px",
      },
      borderRadius: {
        card: "4px",
        hero: "28px",
      },
      fontSize: {
        "display-xl": [
          "clamp(2.5rem, 2rem + 3vw, 4.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.01em" },
        ],
        "display-l": [
          "clamp(2rem, 1.6rem + 2vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.01em" },
        ],
        lead: ["clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)", { lineHeight: "1.4" }],
        h2: ["clamp(1.5rem, 1.3rem + 1vw, 2rem)", { lineHeight: "1.15" }],
        h3: ["clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)", { lineHeight: "1.15" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        small: ["0.9375rem", { lineHeight: "1.6" }],
        "mono-eyebrow": ["0.75rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
    },
  },
};

export default config;
