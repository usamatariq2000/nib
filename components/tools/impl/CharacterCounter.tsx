"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/cn";
import { useToolOpen } from "@/lib/useToolOpen";

const LIMITS = [
  { label: "SEO title", limit: 60 },
  { label: "Meta description", limit: 160 },
  { label: "Tweet / X post", limit: 280 },
  { label: "SMS segment", limit: 160 },
];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-3">
      <span className="tabular text-[22px] font-semibold leading-none text-ink">{value}</span>
      <span className="text-[11.5px] font-medium uppercase tracking-[0.05em] text-faint">{label}</span>
    </div>
  );
}

export function CharacterCounter() {
  useToolOpen("character-counter");
  const [text, setText] = useState("");

  const s = useMemo(() => {
    const characters = text.length;
    const noSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const lines = text ? text.split("\n").length : 0;
    return { characters, noSpaces, words, lines };
  }, [text]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow)]">
      <div className="flex items-center justify-between border-b border-border bg-surface-inset px-3 py-2">
        <span className="pl-1 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
          Text
        </span>
        <div className="flex items-center gap-2">
          <CopyButton size="sm" variant="ghost" value={() => text} disabled={!text} event="character-counter" />
          <Button size="sm" variant="ghost" onClick={() => setText("")} disabled={!text}>
            Clear
          </Button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text to count characters…"
        aria-label="Text to count"
        className="scroll-thin h-[220px] w-full resize-y bg-surface px-5 py-4 text-[15px] leading-relaxed text-ink outline-none placeholder:text-faint sm:h-[260px]"
      />

      <div className="grid grid-cols-2 divide-x divide-y divide-border border-t border-border sm:grid-cols-4">
        <Stat label="Characters" value={s.characters.toLocaleString()} />
        <Stat label="No spaces" value={s.noSpaces.toLocaleString()} />
        <Stat label="Words" value={s.words.toLocaleString()} />
        <Stat label="Lines" value={s.lines.toLocaleString()} />
      </div>

      <div className="border-t border-border p-4 sm:p-5">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
          Against common limits
        </p>
        <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {LIMITS.map((l) => {
            const used = s.characters;
            const over = used > l.limit;
            const pct = Math.min((used / l.limit) * 100, 100);
            return (
              <div key={l.label}>
                <div className="mb-1 flex items-center justify-between text-[12.5px]">
                  <span className="text-ink-soft">{l.label}</span>
                  <span className={cn("tabular font-medium", over ? "text-[var(--danger)]" : "text-ink")}>
                    {used} / {l.limit}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-inset">
                  <div
                    className={cn("h-full rounded-full transition-all", over ? "bg-[var(--danger)]" : "bg-accent")}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
