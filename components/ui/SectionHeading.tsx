import { cn } from "@/lib/utils";
import Mark from "@/components/ui/Mark";
import Rule from "@/components/ui/Rule";

export type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  level?: "h1" | "h2" | "h3";
  className?: string;
};

const headingSize: Record<NonNullable<SectionHeadingProps["level"]>, string> = {
  h1: "text-display-l md:text-display-xl",
  h2: "text-h2",
  h3: "text-h3",
};

export default function SectionHeading({
  eyebrow,
  heading,
  level = "h2",
  className,
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <Mark size={14} tone="accent" />
        <span className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft">
          {eyebrow}
        </span>
      </div>
      <Rule variant="short" />
      <Heading className={cn("font-display font-semibold tracking-tight text-ink", headingSize[level])}>
        {heading}
      </Heading>
    </div>
  );
}
