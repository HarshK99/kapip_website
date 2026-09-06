"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { getServices } from "@/data/services";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CopyrightIcon, DesignIcon, PatentIcon, TrademarkIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const services = getServices();
const primaryNavItems = site.nav.filter((item) => item.label !== "Contact");
const contactNavItem = site.nav.find((item) => item.label === "Contact");
const serviceIcons = {
  patents: PatentIcon,
  trademarks: TrademarkIcon,
  copyrights: CopyrightIcon,
  designs: DesignIcon,
} as const;

// Exact match for "/" (every path starts with "/", so it needs its own
// case); prefix match otherwise — a service detail page at
// /services/patents still marks the "Services" nav item active.
function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
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
          <Image
            id="site-logo-anchor"
            src="/images/logo.svg"
            alt=""
            width={33}
            height={32}
            className="h-15 py-1 w-auto"
            priority
          />
          <span className="font-display text-body font-semibold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {primaryNavItems.map((item) =>
              item.label === "Services" ? (
                <div
                  key={item.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) scheduleCloseServices();
                  }}
                >
                  <div
                    className={cn(
                      "flex items-center border-b-2 pb-1 font-display text-body transition-colors focus-within:text-accent hover:text-accent",
                      isNavActive(pathname, "/services")
                        ? "border-accent text-accent"
                        : "border-transparent text-ink-soft"
                    )}
                  >
                    <Link
                      href={item.href}
                      aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                      onClick={() => setServicesOpen(false)}
                      className="outline-none focus-visible:underline focus-visible:underline-offset-4"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      aria-controls="services-dropdown"
                      aria-label="Toggle services menu"
                      className="ml-1 flex h-6 w-6 items-center justify-center rounded-card outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      onClick={() => setServicesOpen((open) => !open)}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className={cn("transition-transform", servicesOpen ? "rotate-180" : "rotate-0")}
                      >
                        <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  {servicesOpen ? (
                    <div className="absolute left-0 top-full pt-3">
                      <div
                        id="services-dropdown"
                        aria-label="Services"
                        className="flex w-72 flex-col gap-2 rounded-card border border-line bg-paper p-2"
                      >
                        {services.map((service) => {
                          const ServiceIcon = serviceIcons[service.slug as keyof typeof serviceIcons];
                          const active = pathname === `/services/${service.slug}`;

                          return (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setServicesOpen(false)}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex min-h-14 items-center justify-between gap-6 rounded-card border border-line px-4 py-3 font-display text-small font-medium text-ink transition-colors outline-none hover:bg-accent-wash hover:text-accent focus-visible:bg-accent-wash focus-visible:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                                active ? "bg-accent-wash text-accent" : "bg-paper"
                              )}
                            >
                              <span>{service.name}</span>
                              {ServiceIcon ? <ServiceIcon className="h-5 w-5 shrink-0" /> : null}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "border-b-2 pb-1 font-display text-body transition-colors hover:text-accent",
                    isNavActive(pathname, item.href)
                      ? "border-accent text-accent"
                      : "border-transparent text-ink-soft"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {contactNavItem ? (
            <Button
              href={contactNavItem.href}
              variant="primary"
              icon
              shimmer
              className="hidden lg:inline-flex"
            >
              {contactNavItem.label}
            </Button>
          ) : null}

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
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
        <div id="mobile-nav" className="border-t border-line bg-paper lg:hidden">
          <Container as="nav" aria-label="Mobile" className="flex flex-col gap-1 py-4">
            {primaryNavItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "block border-l-2 py-2 pl-3 font-display text-h3 transition-colors",
                    isNavActive(pathname, item.href) ? "border-accent text-accent" : "border-transparent text-ink"
                  )}
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
                        aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
                        className={cn(
                          "py-1 font-display text-body transition-colors",
                          pathname === `/services/${service.slug}` ? "text-accent" : "text-ink-soft"
                        )}
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
                shimmer
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
