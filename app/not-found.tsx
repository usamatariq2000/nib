import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ToolListRow } from "@/components/tools/ToolListRow";
import { popularTools } from "@/lib/tools/registry";

export default function NotFound() {
  return (
    <Container size="narrow" className="py-24 text-center">
      <p className="font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--accent-text)]">
        404
      </p>
      <h1 className="mt-4 text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[34px]">
        We couldn’t find that page
      </h1>
      <p className="mx-auto mt-3 max-w-[42ch] text-[15px] leading-relaxed text-ink-soft">
        The page may have moved, or the link might be wrong. Press{" "}
        <kbd className="rounded-[var(--radius-xs)] border border-border bg-surface px-1.5 py-0.5 font-mono text-[12px]">
          ⌘K
        </kbd>{" "}
        to search, or head back home.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-[var(--radius-sm)] bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-[var(--accent-hover)]"
        >
          Back to home
        </Link>
      </div>

      <div className="mx-auto mt-14 max-w-[420px] text-left">
        <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-faint">
          Popular tools
        </h2>
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface-inset/50 p-1">
          {popularTools().map((t) => (
            <ToolListRow key={t.slug} tool={t} stacked />
          ))}
        </div>
      </div>
    </Container>
  );
}
