"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { getSectionReveal, sectionRevealViewport, useSafeReducedMotion } from "@/lib/motion";

export type ScrollspyExplorerItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export type ScrollspyExplorerProps = {
  items: ScrollspyExplorerItem[];
  navLabel?: string;
};

// Sidebar nav + long scrollable content, kept in sync both ways: scrolling
// updates which nav item is highlighted (IntersectionObserver "scrollspy"),
// and clicking a nav item jumps straight to its section — deliberately an
// instant jump, not a smooth-scroll, so reaching the last item never means
// gliding past everything in between. Reusable wherever a set of named
// sections needs this sidebar+detail navigation, not just sub-services.
export default function ScrollspyExplorer({ items, navLabel = "Sections" }: ScrollspyExplorerProps) {
  const prefersReducedMotion = useSafeReducedMotion();
  const [activeId, setActiveId] = useState(items[0]?.id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        const id = topmost.target.getAttribute("data-scrollspy-id");
        if (id) setActiveId(id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleNavClick = (id: string) => {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "auto", block: "start" });
  };

  if (items.length === 0) return null;

  return (
    <Container className="grid gap-8 py-16 md:grid-cols-[240px_1fr] md:gap-16 md:py-24">
      <nav
        aria-label={navLabel}
        className="sticky top-16 z-10 -mx-5 flex gap-1 overflow-x-auto bg-paper px-5 py-3 md:top-24 md:mx-0 md:flex-col md:overflow-visible md:self-start md:bg-transparent md:px-0 md:py-0"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive}
              className={cn(
                "flex-none whitespace-nowrap border-l-2 py-2 pl-4 pr-3 text-left font-display text-small transition-colors md:whitespace-normal",
                isActive
                  ? "border-accent font-medium text-ink"
                  : "border-line text-ink-soft hover:border-accent/50 hover:text-ink"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col gap-16">
        {items.map((item) => (
          <motion.section
            key={item.id}
            ref={(el: HTMLElement | null) => {
              sectionRefs.current[item.id] = el;
            }}
            data-scrollspy-id={item.id}
            className="scroll-mt-24"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={getSectionReveal(prefersReducedMotion)}
          >
            {item.content}
          </motion.section>
        ))}
      </div>
    </Container>
  );
}
