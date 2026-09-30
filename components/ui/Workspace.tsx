import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The signature "tool surface" — a slightly raised, bordered panel that the
 * tool lives inside. An optional toolbar sits flush along the top edge.
 */
export function Workspace({
  children,
  toolbar,
  className,
  bodyClassName,
}: {
  children: ReactNode;
  toolbar?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border " +
          "bg-surface shadow-[var(--shadow)]",
        className,
      )}
    >
      {toolbar ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface-inset px-3 py-2">
          {toolbar}
        </div>
      ) : null}
      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
    </div>
  );
}

/** A big, primary numeric/text result surface used by calculators. */
export function ResultPanel({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] " +
          "border border-accent-line bg-accent-tint px-6 py-8 text-center",
        className,
      )}
    >
      {label ? (
        <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft">
          {label}
        </span>
      ) : null}
      {children}
    </div>
  );
}
