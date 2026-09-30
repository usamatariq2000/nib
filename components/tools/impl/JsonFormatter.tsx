"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";
import { CopyButton } from "@/components/ui/CopyButton";
import { Badge } from "@/components/ui/Badge";
import { track } from "@/lib/analytics";
import { useToolOpen } from "@/lib/useToolOpen";

type Indent = "2" | "4" | "tab";

const SAMPLE = `{"name":"Ada Lovelace","born":1815,"fields":["math","computing"],"active":true,"notes":null}`;

function indentValue(i: Indent): string | number {
  return i === "tab" ? "\t" : Number(i);
}

/** Try to pull a character offset out of a JSON.parse error message. */
function errorPosition(message: string, source: string) {
  const m = message.match(/position (\d+)/i);
  if (!m) return null;
  const pos = Number(m[1]);
  let line = 1;
  let col = 1;
  for (let i = 0; i < pos && i < source.length; i++) {
    if (source[i] === "\n") {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return { line, col };
}

export function JsonFormatter() {
  useToolOpen("json-formatter");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<Indent>("2");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "valid">("idle");

  const run = useCallback(
    (mode: "format" | "minify") => {
      setStatus("idle");
      if (!input.trim()) {
        setError(null);
        setOutput("");
        return;
      }
      try {
        const parsed = JSON.parse(input);
        const out =
          mode === "minify"
            ? JSON.stringify(parsed)
            : JSON.stringify(parsed, null, indentValue(indent));
        setOutput(out);
        setError(null);
        setStatus("valid");
        track("tool_complete", { tool: "json-formatter", mode });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Invalid JSON";
        const pos = errorPosition(msg, input);
        setError(
          pos
            ? `${msg.replace(/ in JSON.*/i, "")} — line ${pos.line}, column ${pos.col}`
            : msg,
        );
        setStatus("idle");
      }
    },
    [input, indent],
  );

  const validate = useCallback(() => {
    if (!input.trim()) {
      setError(null);
      setStatus("idle");
      return;
    }
    try {
      JSON.parse(input);
      setError(null);
      setStatus("valid");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      const pos = errorPosition(msg, input);
      setError(
        pos ? `${msg.replace(/ in JSON.*/i, "")} — line ${pos.line}, column ${pos.col}` : msg,
      );
      setStatus("idle");
    }
  }, [input]);

  function clear() {
    setInput("");
    setOutput("");
    setError(null);
    setStatus("idle");
  }

  function download() {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
    track("download_result", { tool: "json-formatter" });
  }

  const inputStats = useMemo(() => {
    const bytes = new Blob([input]).size;
    const lines = input ? input.split("\n").length : 0;
    return { bytes, lines };
  }, [input]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface-inset px-3 py-2">
        <Button size="sm" variant="primary" onClick={() => run("format")}>
          Format
        </Button>
        <Button size="sm" onClick={() => run("minify")}>
          Minify
        </Button>
        <Button size="sm" onClick={validate}>
          Validate
        </Button>
        <div className="mx-1 hidden h-5 w-px bg-border sm:block" />
        <Segmented
          size="sm"
          ariaLabel="Indentation"
          options={[
            { value: "2", label: "2" },
            { value: "4", label: "4" },
            { value: "tab", label: "Tab" },
          ]}
          value={indent}
          onChange={(v) => setIndent(v as Indent)}
        />
        <div className="ml-auto flex items-center gap-2">
          {status === "valid" && !error ? (
            <Badge tone="success">Valid JSON</Badge>
          ) : null}
          <CopyButton
            size="sm"
            value={() => output}
            disabled={!output}
            event="json-formatter"
          />
          <Button size="sm" onClick={download} disabled={!output}>
            Download
          </Button>
          <Button size="sm" variant="ghost" onClick={clear} disabled={!input && !output}>
            Clear
          </Button>
        </div>
      </div>

      {/* Two-pane editor */}
      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
            <span>Input</span>
            {input ? (
              <span className="tabular normal-case tracking-normal">
                {inputStats.lines} lines · {inputStats.bytes} B
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setInput(SAMPLE)}
                className="normal-case tracking-normal text-[var(--accent-text)] hover:underline"
              >
                Paste sample
              </button>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder='{ "paste": "your JSON here" }'
            className="scroll-thin h-[300px] w-full resize-y bg-surface px-4 py-3 font-mono text-[13px] leading-relaxed text-ink outline-none placeholder:text-faint md:h-[440px]"
            aria-label="JSON input"
          />
        </div>

        <div className="flex flex-col">
          <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
            Output
          </div>
          {output ? (
            <pre className="scroll-thin h-[300px] w-full overflow-auto bg-surface px-4 py-3 font-mono text-[13px] leading-relaxed text-ink md:h-[440px]">
              {output}
            </pre>
          ) : (
            <div className="relative h-[300px] md:h-[440px]">
              <div className="workspace-grid absolute inset-0" aria-hidden="true" />
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <p className="text-[13.5px] text-faint">
                  Formatted JSON appears here. Paste input and press{" "}
                  <span className="font-medium text-ink-soft">Format</span>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          className="flex items-start gap-2 border-t border-border bg-[var(--danger-tint)] px-4 py-2.5 font-mono text-[12.5px] text-[var(--danger)]"
        >
          <span className="font-semibold">Error:</span>
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
}
