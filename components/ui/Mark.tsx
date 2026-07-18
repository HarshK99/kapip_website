import { cn } from "@/lib/utils";

export type MarkProps = {
  size?: number;
  tone?: "accent" | "faint";
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

export default function Mark({ size = 20, tone = "accent", className }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(tone === "accent" ? "text-accent" : "text-line opacity-60", className)}
    >
      <path d={MARK_PATHS.bracketTopLeft} stroke="currentColor" strokeWidth="1.5" />
      <path d={MARK_PATHS.bracketBottomRight} stroke="currentColor" strokeWidth="1.5" />
      <path
        d={MARK_PATHS.check}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
