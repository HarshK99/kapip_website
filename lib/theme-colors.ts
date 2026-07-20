// Mirrors the color tokens in tailwind.config.ts as literal hex values.
// CSS gradients (used for the scroll-linked heading color effect) need real
// color values, not Tailwind utility classes — keep these in sync with
// tailwind.config.ts if those tokens ever change.
export const themeColors = {
  ink: "#14171A",
  inkSoft: "#4A5158",
  paper: "#FBFAF7",
} as const;
