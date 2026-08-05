import { cn } from "@/lib/utils";

export type RuleProps = {
  variant?: "full" | "short";
  /** "gradient" is the brand ramp — reserved for the one hero accent moment (DESIGN.md — Palette). Everywhere else stays "line". */
  tone?: "line" | "gradient";
  className?: string;
};

export default function Rule({ variant = "full", tone = "line", className }: RuleProps) {
  const widthClass = variant === "short" ? "w-10" : "w-full";

  if (tone === "gradient") {
    return (
      <div
        role="separator"
        aria-hidden="true"
        className={cn("h-px", widthClass, className)}
        style={{ backgroundImage: "var(--brand-gradient)" }}
      />
    );
  }

  return <hr className={cn("border-t border-line", widthClass, className)} />;
}
