import { cn } from "@/lib/utils";

export type RuleProps = {
  variant?: "full" | "short";
  className?: string;
};

export default function Rule({ variant = "full", className }: RuleProps) {
  return (
    <hr
      className={cn("border-t border-line", variant === "short" ? "w-10" : "w-full", className)}
    />
  );
}
