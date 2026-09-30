import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const controlBase =
  "w-full bg-surface text-ink placeholder:text-faint " +
  "border border-border-strong rounded-[var(--radius-sm)] " +
  "px-3 h-11 text-[15px] outline-none transition-colors " +
  "focus:border-accent focus:ring-2 focus:ring-[var(--accent)]/25 " +
  "disabled:opacity-50";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlBase, className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        controlBase,
        "appearance-none cursor-pointer pr-9 bg-no-repeat",
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='%2393928a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
        backgroundPosition: "right 0.7rem center",
      }}
      {...props}
    >
      {children}
    </select>
  );
}

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, hint, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[12px] font-medium uppercase tracking-[0.06em] text-ink-soft"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-[12.5px] text-faint">{hint}</p> : null}
    </div>
  );
}
