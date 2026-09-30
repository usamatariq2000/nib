import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "info" | "error" | "success";

const tones: Record<Tone, string> = {
  info: "border-border bg-surface-inset text-ink-soft",
  error: "border-[var(--danger)]/40 bg-[var(--danger-tint)] text-[var(--danger)]",
  success:
    "border-[var(--success)]/40 bg-[var(--success-tint)] text-[var(--success)]",
};

/** Inline status message for validation errors, hints and confirmations. */
export function Callout({
  children,
  tone = "info",
  className,
  role,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  role?: "status" | "alert";
}) {
  return (
    <div
      role={role ?? (tone === "error" ? "alert" : "status")}
      className={cn(
        "flex items-start gap-2 rounded-[var(--radius-sm)] border px-3 py-2 text-[13.5px]",
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
