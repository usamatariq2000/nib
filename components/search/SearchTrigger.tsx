"use client";

import { useEffect, useState } from "react";
import { useSearch } from "./SearchProvider";

function useMetaKey() {
  const [key, setKey] = useState("⌘");
  useEffect(() => {
    const isMac = /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);
    setKey(isMac ? "⌘" : "Ctrl");
  }, []);
  return key;
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Compact search control for the header. */
export function HeaderSearchButton() {
  const { open } = useSearch();
  const meta = useMetaKey();
  return (
    <button
      type="button"
      onClick={open}
      className="group flex h-9 items-center gap-2 rounded-[var(--radius-sm)] border border-border-strong bg-surface pl-2.5 pr-2 text-ink-soft transition-colors hover:border-[var(--faint)] hover:text-ink"
      aria-label="Search tools"
    >
      <SearchIcon />
      <span className="hidden text-[13px] sm:inline">Search</span>
      <kbd className="hidden items-center gap-0.5 rounded-[var(--radius-xs)] border border-border bg-surface-inset px-1.5 py-0.5 font-mono text-[11px] text-faint sm:flex">
        {meta}K
      </kbd>
    </button>
  );
}

/** Large search field used as the homepage command bar. */
export function HeroSearchField() {
  const { open } = useSearch();
  const meta = useMetaKey();
  return (
    <button
      type="button"
      onClick={open}
      className="group flex h-14 w-full items-center gap-3 rounded-[var(--radius-md)] border border-border-strong bg-surface px-4 text-left shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--faint)]"
    >
      <SearchIcon className="text-faint transition-colors group-hover:text-ink-soft" />
      <span className="flex-1 text-[15px] text-faint">Search every tool</span>
      <kbd
        aria-hidden="true"
        className="flex items-center gap-0.5 rounded-[var(--radius-sm)] border border-border bg-surface-inset px-2 py-1 font-mono text-[12px] text-ink-soft"
      >
        {meta} K
      </kbd>
    </button>
  );
}
