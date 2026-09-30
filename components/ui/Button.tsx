import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium select-none " +
  "rounded-[var(--radius-sm)] border transition-colors duration-100 " +
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[var(--ring)] disabled:opacity-45 " +
  "disabled:pointer-events-none active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink border-transparent hover:bg-[var(--accent-hover)] " +
    "active:bg-[var(--accent-press)]",
  secondary:
    "bg-surface text-ink border-border-strong hover:bg-surface-inset " +
    "hover:border-[var(--faint)]",
  ghost:
    "bg-transparent text-ink-soft border-transparent hover:bg-surface-inset " +
    "hover:text-ink",
  danger:
    "bg-transparent text-[var(--danger)] border-border-strong " +
    "hover:bg-[var(--danger-tint)] hover:border-[var(--danger)]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-[15px]",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
