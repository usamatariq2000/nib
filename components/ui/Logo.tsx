import { site } from "@/lib/site";

/**
 * The brand mark: a solid square with one corner cut away — an abstract
 * "cut corner / cursor" shape that stays legible down to 16px. Paired with
 * the lowercase wordmark.
 */
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3h13l5 5v13H3V3Z"
        fill="var(--accent)"
      />
      <path d="M16 3v5h5" fill="var(--paper)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight text-ink lowercase">
        {site.name}
      </span>
    </span>
  );
}
