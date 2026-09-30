"use client";

import { useMemo, useState } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { Input } from "@/components/ui/Field";
import { Workspace } from "@/components/ui/Workspace";
import { Callout } from "@/components/ui/Callout";
import { CopyButton } from "@/components/ui/CopyButton";
import { fmt, parseNum } from "@/lib/format";
import { useToolOpen } from "@/lib/useToolOpen";

type Mode = "simplify" | "solve";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function Box({
  value,
  onChange,
  ariaLabel,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
  placeholder?: string;
}) {
  return (
    <Input
      inputMode="decimal"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      placeholder={placeholder}
      className="tabular h-12 w-20 text-center text-[17px] font-medium sm:w-24"
    />
  );
}

export function RatioCalculator() {
  useToolOpen("ratio-calculator");
  const [mode, setMode] = useState<Mode>("simplify");
  const [a, setA] = useState("1920");
  const [b, setB] = useState("1080");
  const [c, setC] = useState("");
  const [d, setD] = useState("");

  const simplify = useMemo(() => {
    const x = parseNum(a);
    const y = parseNum(b);
    if (x === null || y === null) return null;
    if (x === 0 && y === 0) return { error: "Enter non-zero values." };
    // Support decimals by scaling to integers.
    const decimals = Math.max(
      (a.split(".")[1] || "").length,
      (b.split(".")[1] || "").length,
    );
    const factor = 10 ** decimals;
    const xi = Math.round(x * factor);
    const yi = Math.round(y * factor);
    const g = gcd(xi, yi);
    return {
      ratio: `${xi / g} : ${yi / g}`,
      decimal: y !== 0 ? fmt(x / y) : "—",
    };
  }, [a, b]);

  const solve = useMemo(() => {
    const vals = [a, b, c, d].map(parseNum);
    const blanks = vals.filter((v) => v === null).length;
    if (blanks === 0) {
      const [A, B, C, D] = vals as number[];
      return { note: "Leave one box empty to solve for it.", check: A * D === B * C };
    }
    if (blanks > 1) return { note: "Fill three boxes and leave exactly one empty." };
    const [A, B, C, D] = vals;
    // A/B = C/D
    if (A === null && B && C !== null && D) return { solved: (B * C) / D, pos: 0 };
    if (B === null && A !== null && C !== null && D) {
      if (C === 0) return { error: "Cannot solve: division by zero." };
      return { solved: (A * D) / C, pos: 1 };
    }
    if (C === null && A !== null && B && D !== null) {
      if (B === 0) return { error: "Cannot solve: division by zero." };
      return { solved: (A * D) / B, pos: 2 };
    }
    if (D === null && A && B !== null && C !== null) {
      if (A === 0) return { error: "Cannot solve: division by zero." };
      return { solved: (B * C) / A, pos: 3 };
    }
    return { error: "Fill three boxes with numbers." };
  }, [a, b, c, d]);

  const solvedValues = useMemo(() => {
    if (!solve || !("solved" in solve) || solve.solved === undefined) return null;
    const arr = [a, b, c, d];
    arr[solve.pos!] = fmt(solve.solved);
    return arr;
  }, [solve, a, b, c, d]);

  return (
    <Workspace>
      <div className="flex flex-col items-center gap-7">
        <Segmented
          options={[
            { value: "simplify", label: "Simplify" },
            { value: "solve", label: "Solve proportion" },
          ]}
          value={mode}
          onChange={(m) => setMode(m as Mode)}
          ariaLabel="Ratio mode"
        />

        {mode === "simplify" ? (
          <>
            <div className="flex items-center justify-center gap-3">
              <Box value={a} onChange={setA} ariaLabel="First value" />
              <span className="text-[22px] font-medium text-ink-soft">:</span>
              <Box value={b} onChange={setB} ariaLabel="Second value" />
            </div>
            {simplify && "error" in simplify ? (
              <Callout tone="error">{simplify.error}</Callout>
            ) : simplify ? (
              <div className="flex w-full flex-col items-center gap-3">
                <div className="w-full rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-7 text-center">
                  <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft">
                    Simplified ratio
                  </span>
                  <p className="tabular mt-1 text-[40px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[48px]">
                    {simplify.ratio}
                  </p>
                  <p className="mt-2 text-[13px] text-ink-soft">
                    Decimal: <span className="tabular font-medium text-ink">{simplify.decimal}</span>
                  </p>
                </div>
                <CopyButton value={() => simplify.ratio} event="ratio-calculator" label="Copy ratio" />
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <Box value={solvedValues ? solvedValues[0] : a} onChange={setA} ariaLabel="A" placeholder="A" />
              <span className="text-[20px] font-medium text-ink-soft">:</span>
              <Box value={solvedValues ? solvedValues[1] : b} onChange={setB} ariaLabel="B" placeholder="B" />
              <span className="px-1 text-[18px] font-medium text-ink-soft">=</span>
              <Box value={solvedValues ? solvedValues[2] : c} onChange={setC} ariaLabel="C" placeholder="C" />
              <span className="text-[20px] font-medium text-ink-soft">:</span>
              <Box value={solvedValues ? solvedValues[3] : d} onChange={setD} ariaLabel="D" placeholder="D" />
            </div>
            {solve && "error" in solve && solve.error ? (
              <Callout tone="error">{solve.error}</Callout>
            ) : solve && "solved" in solve && solve.solved !== undefined ? (
              <div className="w-full rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-6 text-center">
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft">
                  Solved value
                </span>
                <p className="tabular mt-1 text-[36px] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {fmt(solve.solved)}
                </p>
              </div>
            ) : (
              <Callout>{(solve && "note" in solve && solve.note) || "Enter values."}</Callout>
            )}
          </>
        )}
      </div>
    </Workspace>
  );
}
