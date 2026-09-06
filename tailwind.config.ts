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
        // Display-scale type only — deeper than `ink` so very large headings
        // don't read grey (DESIGN.md — Palette).
        "ink-strong": "#0A0C0E",
        "ink-soft": "#4A5158",
        // Near-white base with only a whisper of warmth — not cream, not
        // clinical. `surface` is a clean, barely-warm light grey that reads as
        // a distinct layer, not aged paper (DESIGN.md — Palette).
        paper: "#FCFBFA",
        surface: "#F4F3F1",
        line: "#DBD9D3",
        accent: "#0E5C4A",
        "accent-deep": "#0A3F33",
        // The one sanctioned faint-accent fill — hover/active washes (folder
        // open body, hovered rows). Replaces ad-hoc `bg-accent/5`.
        "accent-wash": "#ECF2F0",
        // Decorative brand ramp — logo/signature mark + gradient moments only,
        // never a substitute for accent/accent-deep. Provisional until synced
        // to the final logo (DESIGN.md — Palette).
        "brand-indigo": "#1B2C74",
        "brand-teal": "#14827A",
        "brand-green": "#2E9E5B",
        "brand-lime": "#AEC61C",
      },
      fontFamily: {
        // Poppins — display/headings/nav/header, and the eyebrow/label voice
        // (uppercase + tracked at `text-eyebrow` size). Weights 500/600/700.
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        // IBM Plex Sans — all body/reading copy.
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Spectral — the assertion voice. Reuses Tailwind's own "serif" utility
        // name. Used in exactly two places — the Home hero H1 and the
        // once-per-page Statement block — everything else stays on
        // font-display/font-body.
        serif: ["var(--font-hero-serif)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: {
        container: "1120px",
      },
      borderRadius: {
        card: "4px",
        // Media cards (service grid) — a deliberate premium-rounded exception,
        // between the 4px UI cap and the 28px hero.
        media: "14px",
        hero: "28px",
      },
      fontSize: {
        // DESIGN.md — Type scale. Display sizes carry tight negative tracking;
        // a short word set this big is the design.
        "display-2xl": [
          "clamp(3rem, 2rem + 4vw, 6rem)",
          { lineHeight: "0.98", letterSpacing: "-0.03em" },
        ],
        // Home hero H1 only. A dedicated ramp tuned so `site.brandLine` holds
        // its two authored lines from ~360px up without dropping to a third —
        // steeper low end than `display-2xl` (mobile shrinks more), same 88px cap.
        "display-hero": [
          "clamp(1.75rem, 0.55rem + 5.1vw, 5.5rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
        "display-xl": [
          "clamp(2.5rem, 2rem + 3vw, 4.25rem)",
          { lineHeight: "1", letterSpacing: "-0.025em" },
        ],
        "display-l": [
          "clamp(2rem, 1.6rem + 2vw, 3rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        // Statement block only (DESIGN.md — Statement block). Its own ramp,
        // steeper than before so it reads as a real display moment at laptop
        // widths (~68px at 1440), while the ~68px cap + the block's widened
        // `max-w-[82rem]` measure keep a short claim ("Fewer filings. Stronger
        // claims.") on one centred line on desktop. A longer sentence takes an
        // authored `\n` (→ RevealText line split). Mobile floors at 32px.
        "display-statement": [
          "clamp(2rem, 1.55rem + 3vw, 4.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        lead: ["clamp(1.125rem, 1.03rem + 0.45vw, 1.375rem)", { lineHeight: "1.4" }],
        // (`h2` token retired — section names use `display-xl`, sub-heads `display-l`.)
        h3: ["clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        small: ["0.9375rem", { lineHeight: "1.55" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
    },
  },
};

export default config;
