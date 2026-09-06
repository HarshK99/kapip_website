import Image from "next/image";
import { cn } from "@/lib/utils";
import RevealText from "@/components/ui/RevealText";

export type PageBannerProps = {
  /** Path under public/images. */
  src: string;
  alt?: string;
  title: string;
  lead?: string;
  /** Default "h1" — the page's one h1. Pass "h2" if this page already has its own h1 elsewhere. */
  as?: "h1" | "h2";
  className?: string;
};

// Full-bleed photo banner for the top of interior pages (Contact today,
// others as they get the same treatment) — title (+ optional lead) sits
// directly on the image via a bottom-anchored gradient tint, rather than a
// separate heading block underneath it. No gap, no redundant heading.
//
// Kept deliberately short (industry norm for an interior-page title band is
// ~160–260px, not a full hero) so it reads as "you've arrived at this page"
// rather than pushing real content below the fold.
export default function PageBanner({ src, alt = "", title, lead, as = "h1", className }: PageBannerProps) {
  return (
    <div className={cn("relative flex h-40 w-full items-end md:h-56 lg:h-64", className)}>
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-accent-deep/85 via-accent-deep/40 to-accent-deep/10" />
      <div className="relative w-full px-5 pb-6 sm:px-6 md:px-10 md:pb-8 lg:px-16">
        {/* The title clip-rises as one line — the interior-page share of the
            sitewide text reveal (DESIGN.md — Motion), the same move SectionHeading
            names and Statement get. `split="line"` + a single-line title → it
            rises as one unit, not a word cascade. */}
        <RevealText
          as={as}
          split="line"
          text={title}
          className="block max-w-3xl font-display text-display-l font-bold text-paper md:text-display-xl"
        />
        {lead ? <p className="mt-2 max-w-md font-body text-small text-paper/80">{lead}</p> : null}
      </div>
    </div>
  );
}
