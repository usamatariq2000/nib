"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

interface AdSlotProps {
  /** AdSense ad unit slot id. */
  slot?: string;
  /** Reserve a minimum height to avoid layout shift when an ad loads. */
  minHeight?: number;
  format?: "auto" | "horizontal" | "rectangle";
  label?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A single, self-contained ad placement. Renders nothing unless a publisher id
 * and slot are configured — so there are never fake or placeholder ads. When
 * active, it reserves space to keep CLS at zero and is clearly labelled.
 */
export function AdSlot({
  slot,
  minHeight = 90,
  format = "auto",
  label = true,
  className,
}: AdSlotProps) {
  const client = site.adsensePublisherId;
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!client || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <aside
      className={cn(
        "mx-auto w-full max-w-[728px] overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface-inset",
        className,
      )}
      aria-label="Advertisement"
    >
      {label ? (
        <div className="border-b border-border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-faint">
          Advertisement
        </div>
      ) : null}
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block", minHeight }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
