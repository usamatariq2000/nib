"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const el = document.documentElement;
    el.classList.toggle("dark", next);
    el.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted ? (dark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"
      }
      className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] border border-transparent text-ink-soft transition-colors hover:border-border hover:bg-surface-inset hover:text-ink"
    >
      {/* Render both and reveal via CSS-in-JS state only after mount to avoid mismatch */}
      <span suppressHydrationWarning>
        {mounted && dark ? (
          <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="4" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4" />
            </g>
          </svg>
        ) : (
          <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M16 11.5A6.5 6.5 0 0 1 8.5 4a6.5 6.5 0 1 0 7.5 7.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
