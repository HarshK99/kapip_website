import { cn } from "@/lib/utils";

export type ExploreAffordanceProps = {
  /** Explicit on/off for JS-driven active states (e.g. NodeExplorer). Omit to fall back to CSS `group-hover` (ServiceCard). */
  active?: boolean;
  label?: string;
  className?: string;
};

export default function ExploreAffordance({ active, label = "Explore", className }: ExploreAffordanceProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-mono-eyebrow uppercase tracking-[0.12em] transition-colors",
        active === undefined ? "text-ink-soft group-hover:text-accent" : active ? "text-accent" : "text-ink-soft",
        className
      )}
    >
      {label}
    </span>
  );
}
