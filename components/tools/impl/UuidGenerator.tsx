"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";
import { CopyButton } from "@/components/ui/CopyButton";
import { track } from "@/lib/analytics";
import { useToolOpen } from "@/lib/useToolOpen";

type Version = "v4" | "v7";

function uuidv4(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0"));
  return `${h[0]}${h[1]}${h[2]}${h[3]}-${h[4]}${h[5]}-${h[6]}${h[7]}-${h[8]}${h[9]}-${h[10]}${h[11]}${h[12]}${h[13]}${h[14]}${h[15]}`;
}

function uuidv7(): string {
  const ts = Date.now();
  const b = crypto.getRandomValues(new Uint8Array(16));
  // 48-bit timestamp
  b[0] = (ts / 2 ** 40) & 0xff;
  b[1] = (ts / 2 ** 32) & 0xff;
  b[2] = (ts / 2 ** 24) & 0xff;
  b[3] = (ts / 2 ** 16) & 0xff;
  b[4] = (ts / 2 ** 8) & 0xff;
  b[5] = ts & 0xff;
  b[6] = (b[6] & 0x0f) | 0x70; // version 7
  b[8] = (b[8] & 0x3f) | 0x80; // variant
  const h = [...b].map((x) => x.toString(16).padStart(2, "0"));
  return `${h[0]}${h[1]}${h[2]}${h[3]}-${h[4]}${h[5]}-${h[6]}${h[7]}-${h[8]}${h[9]}-${h[10]}${h[11]}${h[12]}${h[13]}${h[14]}${h[15]}`;
}

function generate(version: Version, count: number, upper: boolean): string[] {
  const fn = version === "v7" ? uuidv7 : uuidv4;
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(upper ? fn().toUpperCase() : fn());
  return out;
}

export function UuidGenerator() {
  useToolOpen("uuid-generator");
  const [version, setVersion] = useState<Version>("v4");
  const [count, setCount] = useState(1);
  const [upper, setUpper] = useState(false);
  const [ids, setIds] = useState<string[]>([]);

  const regen = useCallback(
    (v = version, c = count, u = upper) => {
      setIds(generate(v, c, u));
      track("tool_complete", { tool: "uuid-generator", version: v, count: c });
    },
    [version, count, upper],
  );

  // Generate on mount so there's an immediate result.
  useEffect(() => {
    setIds(generate("v4", 1, false));
  }, []);

  const single = ids.length === 1;

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow)]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border bg-surface-inset px-3 py-2.5">
        <label className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.05em] text-faint">
          Version
          <Segmented
            size="sm"
            ariaLabel="UUID version"
            options={[
              { value: "v4", label: "v4" },
              { value: "v7", label: "v7" },
            ]}
            value={version}
            onChange={(v) => {
              setVersion(v as Version);
              regen(v as Version);
            }}
          />
        </label>
        <label className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.05em] text-faint">
          Quantity
          <Segmented
            size="sm"
            ariaLabel="How many"
            options={[
              { value: "1", label: "1" },
              { value: "10", label: "10" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
            ]}
            value={String(count)}
            onChange={(v) => {
              const c = Number(v);
              setCount(c);
              regen(version, c);
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            setUpper((u) => {
              regen(version, count, !u);
              return !u;
            });
          }}
          role="switch"
          aria-checked={upper}
          className="ml-auto flex items-center gap-2 text-[12.5px] font-medium text-ink-soft"
        >
          <span
            className={`relative h-5 w-9 rounded-full transition-colors ${upper ? "bg-accent" : "bg-border-strong"}`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${upper ? "translate-x-4" : "translate-x-0.5"}`}
            />
          </span>
          Uppercase
        </button>
      </div>

      <div className="p-4 sm:p-5">
        {single ? (
          <div className="flex flex-col items-center gap-5 py-6">
            <code className="tabular animate-rise select-all break-all text-center font-mono text-[18px] font-medium text-ink sm:text-[24px]">
              {ids[0]}
            </code>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <CopyButton value={() => ids[0] ?? ""} event="uuid-generator" label="Copy" />
              <Button variant="primary" onClick={() => regen()}>
                Generate another
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium uppercase tracking-[0.05em] text-faint">
                {count} UUIDs
              </span>
              <div className="flex items-center gap-2">
                <CopyButton
                  size="sm"
                  value={() => ids.join("\n")}
                  event="uuid-generator"
                  label="Copy all"
                  copiedLabel="Copied all"
                />
                <Button size="sm" variant="primary" onClick={() => regen()}>
                  Regenerate
                </Button>
              </div>
            </div>
            <div className="scroll-thin max-h-[380px] divide-y divide-border overflow-y-auto rounded-[var(--radius-sm)] border border-border bg-surface">
              {ids.map((id, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3.5 py-2 font-mono text-[13px]"
                >
                  <span className="tabular w-8 shrink-0 select-none text-right text-faint">
                    {i + 1}
                  </span>
                  <code className="select-all break-all text-ink">{id}</code>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
