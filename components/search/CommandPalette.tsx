"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchTools } from "@/lib/search";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { track } from "@/lib/analytics";

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => searchTools(query, 8), [query]);

  // Reset state whenever the palette opens; focus the input.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function go(slug: string) {
    track("search_tool", { query, tool: slug });
    onClose();
    router.push(`/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[active];
      if (hit) go(hit.tool.slug);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  }

  // Keep the active row scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
    >
      <button
        aria-label="Close search"
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-[color-mix(in_srgb,var(--ink)_38%,transparent)] backdrop-blur-[1px]"
        onClick={onClose}
      />
      <div className="animate-pop relative w-full max-w-[560px] overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-surface shadow-[var(--shadow-pop)]">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="text-faint">
            <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search tools…"
            className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-faint"
            aria-label="Search tools"
            aria-activedescendant={results[active] ? `cmd-${results[active].tool.slug}` : undefined}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <kbd className="hidden select-none rounded-[var(--radius-xs)] border border-border px-1.5 py-0.5 font-mono text-[11px] text-faint sm:block">
            Esc
          </kbd>
        </div>

        <div
          ref={listRef}
          role="listbox"
          aria-label="Search results"
          className="scroll-thin max-h-[52vh] overflow-y-auto p-1.5"
        >
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-faint">
              No tools match “{query}”.
            </p>
          ) : (
            results.map((r, i) => (
              <button
                key={r.tool.slug}
                id={`cmd-${r.tool.slug}`}
                data-idx={i}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => go(r.tool.slug)}
                className={`flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-2 text-left transition-colors ${
                  i === active ? "bg-surface-inset" : ""
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-sm)] border ${
                    i === active
                      ? "border-accent-line bg-accent-tint text-[var(--accent)]"
                      : "border-border bg-surface text-ink-soft"
                  }`}
                >
                  <ToolIcon name={r.tool.icon} size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium text-ink">
                    {r.tool.name}
                  </span>
                  <span className="block truncate text-[12.5px] text-faint">
                    {r.tool.description}
                  </span>
                </span>
                <span className="hidden shrink-0 text-[11px] font-medium uppercase tracking-[0.05em] text-faint sm:block">
                  {r.categoryTitle}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface-inset px-3 py-2 text-[11.5px] text-faint">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Key>↑</Key>
              <Key>↓</Key>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <Key>↵</Key>
              to open
            </span>
          </span>
          <span>{results.length} of {searchTotal()}</span>
        </div>
      </div>
    </div>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="grid h-5 min-w-5 place-items-center rounded-[var(--radius-xs)] border border-border bg-surface px-1 font-mono text-[10.5px] text-ink-soft">
      {children}
    </kbd>
  );
}

function searchTotal() {
  return searchTools("", 999).length;
}
