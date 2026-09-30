"use client";

import { useState } from "react";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Workspace } from "@/components/ui/Workspace";
import { Callout } from "@/components/ui/Callout";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/cn";
import { secureRandomInt, parseNum } from "@/lib/format";
import { track } from "@/lib/analytics";
import { useToolOpen } from "@/lib/useToolOpen";

export function RandomNumberGenerator() {
  useToolOpen("random-number-generator");
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  function generate() {
    const lo = parseNum(min);
    const hi = parseNum(max);
    const c = parseNum(count);
    if (lo === null || hi === null || c === null) {
      setError("Please fill in all fields with numbers.");
      return;
    }
    const iLo = Math.ceil(lo);
    const iHi = Math.floor(hi);
    const n = Math.floor(c);
    if (iLo > iHi) {
      setError("Minimum must be less than or equal to maximum.");
      return;
    }
    if (n < 1 || n > 1000) {
      setError("Choose a quantity between 1 and 1000.");
      return;
    }
    if (unique && n > iHi - iLo + 1) {
      setError(`Can't draw ${n} unique numbers from a range of ${iHi - iLo + 1}.`);
      return;
    }
    setError(null);
    const out: number[] = [];
    if (unique) {
      const pool = new Set<number>();
      while (pool.size < n) pool.add(secureRandomInt(iLo, iHi));
      out.push(...pool);
    } else {
      for (let i = 0; i < n; i++) out.push(secureRandomInt(iLo, iHi));
    }
    setResults(out);
    track("tool_complete", { tool: "random-number-generator", count: n });
  }

  return (
    <Workspace>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Minimum" htmlFor="min">
          <Input id="min" inputMode="numeric" value={min} onChange={(e) => setMin(e.target.value)} className="tabular" />
        </Field>
        <Field label="Maximum" htmlFor="max">
          <Input id="max" inputMode="numeric" value={max} onChange={(e) => setMax(e.target.value)} className="tabular" />
        </Field>
        <Field label="How many" htmlFor="count">
          <Input id="count" inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value)} className="tabular" />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          role="switch"
          aria-checked={unique}
          onClick={() => setUnique((u) => !u)}
          className="flex items-center gap-2 text-[13px] font-medium text-ink-soft"
        >
          <span className={cn("relative h-5 w-9 rounded-full transition-colors", unique ? "bg-accent" : "bg-border-strong")}>
            <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform", unique ? "translate-x-4" : "translate-x-0.5")} />
          </span>
          No repeats
        </button>
        <Button variant="primary" onClick={generate} className="ml-auto">
          Generate
        </Button>
      </div>

      {error ? <Callout tone="error" className="mt-4">{error}</Callout> : null}

      {results.length > 0 && !error ? (
        <div className="animate-rise mt-5">
          {results.length === 1 ? (
            <div className="rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-8 text-center">
              <p className="tabular text-[52px] font-semibold leading-none tracking-[-0.02em] text-ink">
                {results[0].toLocaleString()}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {results.map((r, i) => (
                <span
                  key={i}
                  className="tabular rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-1.5 font-mono text-[14px] font-medium text-ink"
                >
                  {r.toLocaleString()}
                </span>
              ))}
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <CopyButton value={() => results.join(", ")} event="random-number-generator" label="Copy numbers" />
          </div>
        </div>
      ) : null}
    </Workspace>
  );
}
