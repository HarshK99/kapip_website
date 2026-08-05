import { cn } from "@/lib/utils";
import Mark from "@/components/ui/Mark";
import Rule from "@/components/ui/Rule";
import ScrollColorHeading from "@/components/ui/ScrollColorHeading";

export type SectionHeadingProps = {
  /** the section name — the largest element in its section (DESIGN.md — type hierarchy inversion). Paired inline with the mark, not a separate tiny kicker. */
  heading: string;
  /** supporting sentence, shown smaller below the name. Omit if there's no separate descriptive sentence. */
  lead?: string;
  level?: "h1" | "h2" | "h3";
  className?: string;
};

const headingSize: Record<NonNullable<SectionHeadingProps["level"]>, string> = {
  h1: "text-display-xl tracking-wide",
  h2: "text-display-l tracking-wide",
  h3: "text-h2 tracking-tight",
};

const markSize: Record<NonNullable<SectionHeadingProps["level"]>, number> = {
  h1: 22,
  h2: 18,
  h3: 14,
};

export default function SectionHeading({ heading, lead, level = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-3">
        <Mark size={markSize[level]} tone="accent" className="flex-none" />
        <ScrollColorHeading
          as={level}
          tone="brand"
          className={cn("font-display font-semibold", headingSize[level])}
        >
          {heading}
        </ScrollColorHeading>
      </div>
      <Rule variant="short" />
      {lead ? <p className="max-w-[60ch] font-body text-lead text-ink-soft">{lead}</p> : null}
    </div>
  );
}
