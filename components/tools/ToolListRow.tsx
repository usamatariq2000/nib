import Link from "next/link";
import type { Tool } from "@/lib/tools/types";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { cn } from "@/lib/cn";

const Arrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="translate-x-0 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
  >
    <path
      d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * A compact, editorial tool row: icon · name · one-line description · arrow.
 * Used on the homepage index and category pages. Deliberately not a card.
 */
export function ToolListRow({
  tool,
  stacked = false,
  className,
}: {
  tool: Tool;
  /** Force a single-column name-over-description layout (for narrow rails). */
  stacked?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/${tool.slug}`}
      className={cn(
        "group flex items-center gap-3.5 rounded-[var(--radius-sm)] px-3 py-3 " +
          "outline-none transition-colors hover:bg-surface " +
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
        className,
      )}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-border bg-surface text-ink-soft transition-colors group-hover:border-accent-line group-hover:bg-accent-tint group-hover:text-[var(--accent)]">
        <ToolIcon name={tool.icon} size={19} />
      </span>
      <span
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          !stacked && "sm:flex-row sm:items-baseline sm:gap-3",
        )}
      >
        <span className="truncate text-[14.5px] font-medium text-ink">{tool.name}</span>
        <span className="truncate text-[13px] text-ink-soft">
          {tool.description}
        </span>
      </span>
      <Arrow />
    </Link>
  );
}
