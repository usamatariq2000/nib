"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/tools/categories";
import { cn } from "@/lib/cn";

export function CategoryNav({ variant = "bar" }: { variant?: "bar" | "strip" }) {
  const pathname = usePathname();

  if (variant === "strip") {
    return (
      <nav
        aria-label="Tool categories"
        className="scroll-thin flex gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden"
      >
        {categories.map((c) => {
          const href = `/tools/${c.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={c.id}
              href={href}
              className={cn(
                "shrink-0 rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] font-medium transition-colors",
                active
                  ? "bg-accent-tint text-[var(--accent)]"
                  : "text-ink-soft hover:bg-surface-inset hover:text-ink",
              )}
            >
              {c.nav}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Tool categories" className="hidden items-center gap-0.5 md:flex">
      {categories.map((c) => {
        const href = `/tools/${c.slug}`;
        const active = pathname.startsWith(href);
        return (
          <Link
            key={c.id}
            href={href}
            className={cn(
              "rounded-[var(--radius-sm)] px-2.5 py-1.5 text-[13.5px] font-medium transition-colors",
              active
                ? "text-ink"
                : "text-ink-soft hover:bg-surface-inset hover:text-ink",
            )}
          >
            {c.nav}
          </Link>
        );
      })}
    </nav>
  );
}
