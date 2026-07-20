import Link from "next/link";
import { site, telHref, whatsappHref, mailHref, formattedAddress } from "@/data/site";
import Container from "@/components/ui/Container";
import Mark from "@/components/ui/Mark";
import { LinkedInIcon, TwitterIcon, WhatsAppIcon } from "@/components/ui/icons";

const contactItems = [
  { label: "Phone", href: telHref(), value: site.phone },
  { label: "WhatsApp", href: whatsappHref(), value: "Chat on WhatsApp" },
  { label: "Email", href: mailHref(), value: site.email },
];

const socialLinks = [
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
  { label: "Twitter", href: site.socials.twitter, Icon: TwitterIcon },
  { label: "WhatsApp", href: whatsappHref(), Icon: WhatsAppIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-accent-deep">
      <Container className="relative flex flex-col gap-10 py-16 md:flex-row md:justify-between md:py-20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Mark size={16} tone="accent" className="text-paper" />
            <span className="font-display text-body font-semibold text-paper">{site.name}</span>
          </div>
          <p className="max-w-sm font-body text-body text-paper/70">{site.tagline}</p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-card border border-paper/25 text-paper/80 transition-colors hover:border-paper hover:text-paper"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {contactItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-paper/50">
                {item.label}
              </span>
              <a
                href={item.href}
                className="font-body text-body text-paper/80 transition-colors hover:text-paper"
              >
                {item.value}
              </a>
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <span className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-paper/50">
              Address
            </span>
            <p className="font-body text-body text-paper/80">{formattedAddress()}</p>
          </div>

          {site.hours ? (
            <div className="flex flex-col gap-1">
              <span className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-paper/50">
                Hours
              </span>
              <p className="font-body text-body text-paper/80">{site.hours}</p>
            </div>
          ) : null}
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-col gap-2 font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-paper/70"
        >
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-paper">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      <div className="relative border-t border-paper/15">
        <Container className="flex flex-col gap-2 py-6 font-body text-small text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          {site.developer ? <p>Developed by {site.developer}</p> : null}
        </Container>
      </div>

      <Mark
        size={220}
        tone="faint"
        className="pointer-events-none absolute -bottom-16 -right-16 hidden md:block"
      />
    </footer>
  );
}
