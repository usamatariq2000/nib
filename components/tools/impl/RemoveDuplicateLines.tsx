"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { useToolOpen } from "@/lib/useToolOpen";

interface Options {
  trim: boolean;
  ignoreCase: boolean;
  removeEmpty: boolean;
  sort: boolean;
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-[13px] font-medium text-ink-soft"
    >
      <span className={cn("relative h-5 w-9 rounded-full transition-colors", checked ? "bg-accent" : "bg-border-strong")}>
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform", checked ? "translate-x-4" : "translate-x-0.5")} />
      </span>
      {label}
    </button>
  );
}

export function RemoveDuplicateLines() {
  useToolOpen("remove-duplicate-lines");
  const [text, setText] = useState("");
  const [opts, setOpts] = useState<Options>({
    trim: true,
    ignoreCase: false,
    removeEmpty: true,
    sort: false,
  });

  const { output, inCount, outCount } = useMemo(() => {
    if (!text) return { output: "", inCount: 0, outCount: 0 };
    let lines = text.split("\n");
    const original = lines.length;
    if (opts.trim) lines = lines.map((l) => l.trim());
    if (opts.removeEmpty) lines = lines.filter((l) => l.length > 0);

    const seen = new Set<string>();
    const unique: string[] = [];
    for (const line of lines) {
      const key = opts.ignoreCase ? line.toLowerCase() : line;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    }
    if (opts.sort) unique.sort((a, b) => a.localeCompare(b));
    return { output: unique.join("\n"), inCount: original, outCount: unique.length };
  }, [text, opts]);

  const removed = inCount - outCount;

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow)]">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border bg-surface-inset px-4 py-2.5">
        <Toggle checked={opts.trim} onChange={(v) => setOpts({ ...opts, trim: v })} label="Trim spaces" />
        <Toggle checked={opts.ignoreCase} onChange={(v) => setOpts({ ...opts, ignoreCase: v })} label="Ignore case" />
        <Toggle checked={opts.removeEmpty} onChange={(v) => setOpts({ ...opts, removeEmpty: v })} label="Drop empty" />
        <Toggle checked={opts.sort} onChange={(v) => setOpts({ ...opts, sort: v })} label="Sort A→Z" />
      </div>

      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div>
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-faint">Input</span>
            <Button size="sm" variant="ghost" onClick={() => setText("")} disabled={!text}>Clear</Button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            placeholder="Paste your list, one item per line…"
            aria-label="Input list"
            className="scroll-thin h-[260px] w-full resize-y bg-surface px-4 py-3 font-mono text-[13px] leading-relaxed text-ink outline-none placeholder:text-faint md:h-[320px]"
          />
        </div>
        <div>
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
              Unique
              {text ? <Badge tone={removed > 0 ? "accent" : "neutral"}>{removed} removed</Badge> : null}
            </span>
            <CopyButton size="sm" value={() => output} disabled={!output} event="remove-duplicate-lines" />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="De-duplicated lines appear here…"
            aria-label="Unique lines"
            className="scroll-thin h-[260px] w-full resize-y bg-surface px-4 py-3 font-mono text-[13px] leading-relaxed text-ink outline-none placeholder:text-faint md:h-[320px]"
          />
        </div>
      </div>
    </div>
  );
}
