"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { getServices } from "@/data/services";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const services = getServices();
const primaryNavItems = site.nav.filter((item) => item.label !== "Contact");
const contactNavItem = site.nav.find((item) => item.label === "Contact");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeServicesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = () => {
    if (closeServicesTimeout.current) clearTimeout(closeServicesTimeout.current);
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    closeServicesTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeServicesTimeout.current) clearTimeout(closeServicesTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper transition-colors",
        scrolled ? "border-line" : "border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <Image src="/images/logo.svg" alt="" width={33} height={32} className="h-15 w-auto" priority />
          <span className="font-display text-body font-semibold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {primaryNavItems.map((item) =>
              item.label === "Services" ? (
                <div
                  key={item.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((open) => !open)}
                    className="font-display text-body text-ink-soft transition-colors hover:text-accent"
                  >
                    {item.label}
                  </button>
                  {servicesOpen ? (
                    <div className="absolute left-0 top-full mt-2 min-w-[220px] rounded-card border border-line bg-surface py-2">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="block px-4 py-2 font-display text-small text-ink-soft transition-colors hover:text-accent"
                        >
                          {service.name}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="block border-t border-line px-4 py-2 font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-accent"
                      >
                        All services
                      </Link>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-body text-ink-soft transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {contactNavItem ? (
            <Button href={contactNavItem.href} variant="primary" icon className="hidden md:inline-flex">
              {contactNavItem.label}
            </Button>
          ) : null}

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center text-ink md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path
                  d="M4 4L16 16M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path d="M3 6H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div id="mobile-nav" className="border-t border-line bg-paper md:hidden">
          <Container as="nav" aria-label="Mobile" className="flex flex-col gap-1 py-4">
            {primaryNavItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-display text-h3 text-ink"
                >
                  {item.label}
                </Link>
                {item.label === "Services" ? (
                  <div className="ml-4 flex flex-col gap-1 border-l border-line pl-4">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="py-1 font-display text-body text-ink-soft"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {contactNavItem ? (
              <Button
                href={contactNavItem.href}
                variant="primary"
                icon
                onClick={() => setMobileOpen(false)}
                className="mt-4 w-fit"
              >
                {contactNavItem.label}
              </Button>
            ) : null}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
