import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "success" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-inset text-ink-soft border-border",
  accent: "bg-accent-tint text-[var(--accent)] border-accent-line",
  success: "bg-[var(--success-tint)] text-[var(--success)] border-transparent",
  danger: "bg-[var(--danger-tint)] text-[var(--danger)] border-transparent",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  mono,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  mono?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-xs)] border px-1.5 py-0.5 " +
          "text-[11px] font-medium leading-none",
        mono && "font-mono tabular",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
