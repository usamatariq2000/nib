import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max =
    size === "narrow"
      ? "max-w-[760px]"
      : size === "wide"
        ? "max-w-[1200px]"
        : "max-w-[1080px]";
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6", max, className)}>
      {children}
    </div>
  );
}
