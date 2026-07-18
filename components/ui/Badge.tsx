import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-card border border-line px-2 py-0.5 font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
