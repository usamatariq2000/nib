import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared article typography for legal/info pages. */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-[15px] leading-relaxed text-ink-soft",
        "[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-[17px] [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-ink",
        "[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:text-ink",
        "[&_p]:my-3.5",
        "[&_ul]:my-3.5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5",
        "[&_a]:font-medium [&_a]:text-[var(--accent-text)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-80",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}
