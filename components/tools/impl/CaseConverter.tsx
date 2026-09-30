"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { track } from "@/lib/analytics";
import { useToolOpen } from "@/lib/useToolOpen";

function words(str: string): string[] {
  return str.match(/[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+|[0-9]+/g) || [];
}

const transforms: { key: string; label: string; fn: (s: string) => string }[] = [
  { key: "upper", label: "UPPERCASE", fn: (s) => s.toUpperCase() },
  { key: "lower", label: "lowercase", fn: (s) => s.toLowerCase() },
  {
    key: "title",
    label: "Title Case",
    fn: (s) => s.replace(/\b\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    key: "sentence",
    label: "Sentence case",
    fn: (s) =>
      s
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()),
  },
  { key: "camel", label: "camelCase", fn: (s) => words(s).map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join("") },
  { key: "pascal", label: "PascalCase", fn: (s) => words(s).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("") },
  { key: "snake", label: "snake_case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("_") },
  { key: "kebab", label: "kebab-case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("-") },
  { key: "constant", label: "CONSTANT_CASE", fn: (s) => words(s).map((w) => w.toUpperCase()).join("_") },
];

export function CaseConverter() {
  useToolOpen("case-converter");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [active, setActive] = useState<string | null>(null);

  function apply(key: string, fn: (s: string) => string) {
    setOutput(fn(text));
    setActive(key);
    track("tool_complete", { tool: "case-converter", mode: key });
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow)]">
      <div className="flex items-center justify-between border-b border-border bg-surface-inset px-3 py-2">
        <span className="pl-1 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">Input</span>
        <Button size="sm" variant="ghost" onClick={() => { setText(""); setOutput(""); setActive(null); }} disabled={!text}>
          Clear
        </Button>
      </div>

      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setActive(null); }}
        placeholder="Type or paste text to convert…"
        aria-label="Text to convert"
        className="scroll-thin h-[150px] w-full resize-y bg-surface px-5 py-4 text-[15px] leading-relaxed text-ink outline-none placeholder:text-faint"
      />

      <div className="flex flex-wrap gap-1.5 border-y border-border bg-surface-inset px-3 py-3">
        {transforms.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => apply(t.key, t.fn)}
            disabled={!text}
            className={`rounded-[var(--radius-sm)] border px-2.5 py-1.5 font-mono text-[12.5px] transition-colors disabled:opacity-40 ${
              active === t.key
                ? "border-accent-line bg-accent-tint text-[var(--accent)]"
                : "border-border bg-surface text-ink-soft hover:border-border-strong hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-faint">Output</span>
          <CopyButton size="sm" value={() => output} disabled={!output} event="case-converter" />
        </div>
        <div className="min-h-[80px] whitespace-pre-wrap break-words rounded-[var(--radius-sm)] border border-border bg-surface-inset px-4 py-3 text-[15px] leading-relaxed text-ink">
          {output || <span className="text-faint">Choose a case above to convert your text.</span>}
        </div>
      </div>
    </div>
  );
}
