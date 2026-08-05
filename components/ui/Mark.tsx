import { cn } from "@/lib/utils";
import { themeColors } from "@/lib/theme-colors";

export type MarkProps = {
  size?: number;
  /** "gradient" is the brand-ramp fill — reserved for the primary logo lockup only (DESIGN.md — Signature element). */
  tone?: "accent" | "faint" | "gradient";
  className?: string;
};

// The registration-mark glyph (DESIGN.md — Signature element): a fine-line
// corner-crop framing a small check, standing in for a grant/registration.
// Single source — paths live here only; the animated hero variant imports
// MARK_PATHS rather than redefining them.
export const MARK_PATHS = {
  bracketTopLeft: "M2 8V2H8",
  bracketBottomRight: "M22 16V22H16",
  check: "M8.5 12.5L11 15L15.5 9.5",
};

// Fixed id is safe even with multiple Mark instances on a page (header +
// mobile sheet, say) — every instance defines the same identical stops, so
// resolving to whichever one the browser finds first is visually a no-op.
const GRADIENT_ID = "kap-mark-gradient";

export default function Mark({ size = 20, tone = "accent", className }: MarkProps) {
  const stroke = tone === "gradient" ? `url(#${GRADIENT_ID})` : "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(
        tone === "accent" && "text-accent",
        tone === "faint" && "text-line opacity-60",
        className
      )}
    >
      {tone === "gradient" ? (
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={themeColors.brandIndigo} />
            <stop offset="38%" stopColor={themeColors.brandTeal} />
            <stop offset="68%" stopColor={themeColors.brandGreen} />
            <stop offset="100%" stopColor={themeColors.brandLime} />
          </linearGradient>
        </defs>
      ) : null}
      <path d={MARK_PATHS.bracketTopLeft} stroke={stroke} strokeWidth="1.5" />
      <path d={MARK_PATHS.bracketBottomRight} stroke={stroke} strokeWidth="1.5" />
      <path
        d={MARK_PATHS.check}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
