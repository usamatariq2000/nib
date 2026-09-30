"use client";

import { useMemo, useState } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { useToolOpen } from "@/lib/useToolOpen";

type Mode = "encode" | "decode";

function encode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function decode(str: string): string {
  const bin = atob(str.trim());
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function Base64Tool() {
  useToolOpen("base64-encoder");
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");

  const { output, error } = useMemo(() => {
    if (!input) return { output: "", error: null as string | null };
    try {
      return { output: mode === "encode" ? encode(input) : decode(input), error: null };
    } catch {
      return { output: "", error: "That doesn't look like valid Base64. Check for stray characters." };
    }
  }, [mode, input]);

  function swap() {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    if (output) setInput(output);
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface-inset px-3 py-2">
        <Segmented
          size="sm"
          ariaLabel="Mode"
          options={[
            { value: "encode", label: "Encode" },
            { value: "decode", label: "Decode" },
          ]}
          value={mode}
          onChange={(m) => setMode(m as Mode)}
        />
        <Button size="sm" variant="ghost" onClick={swap} disabled={!output}>
          ⇄ Swap
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <CopyButton size="sm" value={() => output} disabled={!output} event="base64-encoder" />
          <Button size="sm" variant="ghost" onClick={() => setInput("")} disabled={!input}>
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div>
          <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
            {mode === "encode" ? "Plain text" : "Base64"}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder={mode === "encode" ? "Type or paste text…" : "Paste Base64…"}
            aria-label="Input"
            className="scroll-thin h-[220px] w-full resize-y bg-surface px-4 py-3 font-mono text-[13.5px] leading-relaxed text-ink outline-none placeholder:text-faint md:h-[300px]"
          />
        </div>
        <div>
          <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
            {mode === "encode" ? "Base64" : "Plain text"}
          </div>
          <textarea
            value={error ? "" : output}
            readOnly
            placeholder="Result appears here…"
            aria-label="Output"
            className="scroll-thin h-[220px] w-full resize-y bg-surface px-4 py-3 font-mono text-[13.5px] leading-relaxed text-ink outline-none placeholder:text-faint md:h-[300px]"
          />
        </div>
      </div>

      {error ? (
        <div role="alert" className="border-t border-border bg-[var(--danger-tint)] px-4 py-2.5 text-[13px] text-[var(--danger)]">
          {error}
        </div>
      ) : null}
    </div>
  );
}
