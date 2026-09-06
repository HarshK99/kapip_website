import { clsx } from "clsx";
import { cn } from "@/lib/utils";
import RevealText from "@/components/ui/RevealText";

export type SectionHeadingProps = {
  /** the section name — the largest element in its section. */
  heading: string;
  /** supporting sentence, smaller, below the name. Omit if there's none. */
  lead?: string;
  level?: "h1" | "h2" | "h3";
  /** `onDark` flips the type to `paper` tones for dark section panels. */
  tone?: "default" | "onDark";
  className?: string;
};

// Section names carry the identity: display scale, Poppins 700, tight negative
// tracking (baked into the size tokens), flat `ink-strong`. Nothing above the
// name, nothing under it — the type does the work.
//
// The size + color classes on the heading/lead are composed with plain `clsx`,
// NOT `cn`: `tailwind-merge` doesn't know the custom `display-*` / `ink-*`
// tokens and collapses `text-display-xl` + `text-ink-strong` into one, silently
// dropping the font size. There's no external className on these nodes, so no
// merge is needed anyway.
const headingSize: Record<NonNullable<SectionHeadingProps["level"]>, string> = {
  h1: "text-display-2xl",
  h2: "text-display-xl",
  h3: "text-display-l",
};

const headingTone: Record<NonNullable<SectionHeadingProps["tone"]>, string> = {
  default: "text-ink-strong",
  onDark: "text-paper",
};

const leadTone: Record<NonNullable<SectionHeadingProps["tone"]>, string> = {
  default: "text-ink-soft",
  onDark: "text-paper/70",
};

export default function SectionHeading({
  heading,
  lead,
  level = "h2",
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <RevealText
        as={level}
        text={heading}
        className={clsx("font-display font-bold", headingSize[level], headingTone[tone])}
      />
      {lead ? (
        <p className={clsx("mt-1 max-w-[46ch] font-body text-lead", leadTone[tone])}>{lead}</p>
      ) : null}
    </div>
  );
}
