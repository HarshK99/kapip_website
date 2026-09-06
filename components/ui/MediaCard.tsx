import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type MediaCardProps = {
  title: string;
  /** revealed on hover / focus; the name shows on its own otherwise */
  subtitle?: string;
  href: string;
  /** path under /public */
  image: string;
  /** loading hint for the grid this sits in */
  sizes?: string;
  className?: string;
};

// A full-bleed image card: rounded media, a name tag bottom-left, a filled
// arrow button bottom-right, and the subtitle fading in on hover / focus.
// The whole card is the link (DESIGN.md — Home services media grid).
export default function MediaCard({
  title,
  subtitle,
  href,
  image,
  sizes = "(min-width: 640px) 45vw, 92vw",
  className,
}: MediaCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block h-56 overflow-hidden rounded-media bg-ink-strong lg:h-64",
        className
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      {/* bottom scrim — deepens on hover so the revealed subtitle stays legible */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-strong/80 via-ink-strong/25 to-transparent transition-opacity duration-300 group-hover:from-ink-strong/90" />

      {subtitle ? (
        <p className="absolute inset-x-5 bottom-16 max-w-[42ch] translate-y-1 font-body text-small text-paper/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
          {subtitle}
        </p>
      ) : null}

      <span className="absolute bottom-5 left-5 rounded-full bg-paper px-3.5 py-1.5 font-display text-small font-semibold text-ink-strong">
        {title}
      </span>

      <span
        className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink-strong transition-colors group-hover:bg-accent group-hover:text-paper"
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 9L9 3M9 3H4.5M9 3V7.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
