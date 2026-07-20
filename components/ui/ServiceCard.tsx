import Link from "next/link";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

export type ServiceCardProps = {
  service: Service;
  className?: string;
};

export default function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-card border border-line bg-surface p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-accent",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-h3 font-semibold text-ink">{service.name}</span>
        </div>
      <p className="font-body text-body text-ink-soft">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft transition-colors group-hover:text-accent">
        Explore
      </span>
    </Link>
  );
}
