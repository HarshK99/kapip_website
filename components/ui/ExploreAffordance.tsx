import { cn } from "@/lib/utils";

export type ExploreAffordanceProps = {
  /** Explicit on/off for JS-driven active states. Omit to fall back to CSS `group-hover` (ServiceCard). */
  active?: boolean;
  label?: string;
  className?: string;
};

export default function ExploreAffordance({ active, label = "Explore", className }: ExploreAffordanceProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-display font-medium text-eyebrow uppercase tracking-[0.12em] transition-colors",
        active === undefined ? "text-ink-soft group-hover:text-accent" : active ? "text-accent" : "text-ink-soft",
        className
      )}
    >
      {label}
    </span>
  );
}
