import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

type ButtonAsButton = {
  href?: undefined;
  variant?: Variant;
  icon?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

type ButtonAsAnchor = {
  href: string;
  variant?: Variant;
  icon?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-paper hover:bg-accent-deep",
  ghost: "border border-line text-ink hover:border-accent hover:text-accent",
};

// Trailing directional glyph, opt-in via `icon` — reused wherever a CTA
// wants the "action with direction" affordance (header CTA, hero CTA, ...).
function ButtonIcon() {
  return (
    <span
      className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-card border border-current"
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M3 9L9 3M9 3H4.5M9 3V7.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Button({
  variant = "primary",
  icon = false,
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-card px-5 font-display text-small font-medium transition-colors",
    variantClasses[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon ? <ButtonIcon /> : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">)}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">)}>
      {content}
    </button>
  );
}
