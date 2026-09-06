// Mirrors the color tokens in tailwind.config.ts as literal hex values.
// CSS gradients (used for the scroll-linked heading color effect) need real
// color values, not Tailwind utility classes — keep these in sync with
// tailwind.config.ts if those tokens ever change.
export const themeColors = {
  ink: "#14171A",
  inkStrong: "#0A0C0E",
  inkSoft: "#4A5158",
  paper: "#FCFBFA",
  // Decorative brand ramp — see tailwind.config.ts brand-* colors. Provisional.
  brandIndigo: "#1B2C74",
  brandTeal: "#14827A",
  brandGreen: "#2E9E5B",
  brandLime: "#AEC61C",
} as const;
