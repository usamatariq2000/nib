"use client";

import { useMemo, useState } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { useToolOpen } from "@/lib/useToolOpen";

type Mode = "encode" | "decode";
type Scope = "component" | "uri";

export function UrlEncoderTool() {
  useToolOpen("url-encoder");
  const [mode, setMode] = useState<Mode>("encode");
  const [scope, setScope] = useState<Scope>("component");
  const [input, setInput] = useState("");

  const { output, error } = useMemo(() => {
    if (!input) return { output: "", error: null as string | null };
    try {
      let out: string;
      if (mode === "encode") {
        out = scope === "component" ? encodeURIComponent(input) : encodeURI(input);
      } else {
        out = scope === "component" ? decodeURIComponent(input) : decodeURI(input);
      }
      return { output: out, error: null };
    } catch {
      return { output: "", error: "Couldn't decode this — it contains an invalid percent-sequence." };
    }
  }, [mode, scope, input]);

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
        <Segmented
          size="sm"
          ariaLabel="Scope"
          options={[
            { value: "component", label: "Component" },
            { value: "uri", label: "Full URI" },
          ]}
          value={scope}
          onChange={(s) => setScope(s as Scope)}
        />
        <Button size="sm" variant="ghost" onClick={swap} disabled={!output}>
          ⇄ Swap
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <CopyButton size="sm" value={() => output} disabled={!output} event="url-encoder" />
          <Button size="sm" variant="ghost" onClick={() => setInput("")} disabled={!input}>
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div>
          <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
            Input
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder={mode === "encode" ? "Type text or a URL…" : "Paste an encoded string…"}
            aria-label="Input"
            className="scroll-thin h-[200px] w-full resize-y bg-surface px-4 py-3 font-mono text-[13.5px] leading-relaxed text-ink outline-none placeholder:text-faint md:h-[260px]"
          />
        </div>
        <div>
          <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
            Output
          </div>
          <textarea
            value={error ? "" : output}
            readOnly
            placeholder="Result appears here…"
            aria-label="Output"
            className="scroll-thin h-[200px] w-full resize-y bg-surface px-4 py-3 font-mono text-[13.5px] leading-relaxed text-ink outline-none placeholder:text-faint md:h-[260px]"
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
