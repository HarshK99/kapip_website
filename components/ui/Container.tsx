import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export default function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-container px-5 md:px-10", className)}>{children}</Tag>;
}
