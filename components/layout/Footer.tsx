import Link from "next/link";
import { site, telHref, whatsappHref, mailHref, formattedAddress } from "@/data/site";
import Container from "@/components/ui/Container";
import Mark from "@/components/ui/Mark";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper">
      <Container className="relative flex flex-col gap-10 py-16 md:flex-row md:justify-between md:py-20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Mark size={16} tone="accent" />
            <span className="font-display text-body font-semibold text-ink">{site.name}</span>
          </div>
          <p className="max-w-sm font-body text-body text-ink-soft">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-2 font-body text-body text-ink-soft">
          <a href={telHref()} className="transition-colors hover:text-accent">
            {site.phone}
          </a>
          <a href={whatsappHref()} className="transition-colors hover:text-accent">
            WhatsApp
          </a>
          <a href={mailHref()} className="transition-colors hover:text-accent">
            {site.email}
          </a>
          <p>{formattedAddress()}</p>
          {site.hours ? <p className="text-small text-ink-soft">{site.hours}</p> : null}
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-col gap-2 font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft"
        >
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      <Mark
        size={220}
        tone="faint"
        className="pointer-events-none absolute -bottom-16 -right-16 hidden md:block"
      />
    </footer>
  );
}
