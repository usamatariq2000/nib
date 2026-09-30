"use client";

import { useMemo, useState } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { Input } from "@/components/ui/Field";
import { Workspace } from "@/components/ui/Workspace";
import { CopyButton } from "@/components/ui/CopyButton";
import { fmt, parseNum } from "@/lib/format";
import { useToolOpen } from "@/lib/useToolOpen";

type Mode = "of" | "is" | "change";

const modes = [
  { value: "of" as const, label: "% of a number" },
  { value: "is" as const, label: "X is what %" },
  { value: "change" as const, label: "% change" },
];

function NumBox({
  value,
  onChange,
  ariaLabel,
  suffix,
}: {
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
  suffix?: string;
}) {
  return (
    <span className="relative inline-flex items-center">
      <Input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="tabular h-12 w-full min-w-0 text-center text-[17px] font-medium sm:w-32"
        placeholder="0"
      />
      {suffix ? (
        <span className="pointer-events-none absolute right-3 text-[14px] text-faint">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}

export function PercentageCalculator({
  initialMode = "of",
  initialA = "25",
  initialB = "400",
}: {
  initialMode?: Mode;
  initialA?: string;
  initialB?: string;
} = {}) {
  useToolOpen("percentage-calculator");
  const [mode, setMode] = useState<Mode>(initialMode);
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);

  const { result, label, copyText } = useMemo(() => {
    const x = parseNum(a);
    const y = parseNum(b);
    if (x === null || y === null) {
      return { result: "—", label: "", copyText: "" };
    }
    if (mode === "of") {
      const r = (x / 100) * y;
      return {
        result: fmt(r),
        label: `${fmt(x)}% of ${fmt(y)}`,
        copyText: fmt(r),
      };
    }
    if (mode === "is") {
      if (y === 0) return { result: "—", label: "Cannot divide by zero", copyText: "" };
      const r = (x / y) * 100;
      return {
        result: `${fmt(r)}%`,
        label: `${fmt(x)} is this percent of ${fmt(y)}`,
        copyText: `${fmt(r)}%`,
      };
    }
    if (x === 0) return { result: "—", label: "Starting value cannot be zero", copyText: "" };
    const r = ((y - x) / Math.abs(x)) * 100;
    return {
      result: `${r >= 0 ? "+" : ""}${fmt(r)}%`,
      label: `Change from ${fmt(x)} to ${fmt(y)}`,
      copyText: `${fmt(r)}%`,
    };
  }, [mode, a, b]);

  return (
    <Workspace>
      <div className="flex flex-col items-center gap-7">
        <Segmented
          options={modes}
          value={mode}
          onChange={(m) => setMode(m as Mode)}
          ariaLabel="Calculation type"
        />

        {/* Signature inline-equation layout */}
        <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          {mode === "of" ? (
            <>
              <NumBox value={a} onChange={setA} ariaLabel="Percentage" suffix="%" />
              <span className="text-[15px] text-ink-soft">of</span>
              <NumBox value={b} onChange={setB} ariaLabel="Number" />
            </>
          ) : mode === "is" ? (
            <>
              <NumBox value={a} onChange={setA} ariaLabel="Part" />
              <span className="text-[15px] text-ink-soft">is what percent of</span>
              <NumBox value={b} onChange={setB} ariaLabel="Whole" />
            </>
          ) : (
            <>
              <span className="text-[15px] text-ink-soft">from</span>
              <NumBox value={a} onChange={setA} ariaLabel="Original value" />
              <span className="text-[15px] text-ink-soft">to</span>
              <NumBox value={b} onChange={setB} ariaLabel="New value" />
            </>
          )}
        </div>

        <div className="flex w-full flex-col items-center gap-1 rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-7 text-center">
          <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft">
            {label || "Result"}
          </span>
          <span className="tabular animate-rise text-[40px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[52px]">
            {result}
          </span>
        </div>

        <CopyButton
          value={() => copyText}
          disabled={!copyText}
          event="percentage-calculator"
          label="Copy result"
        />
      </div>
    </Workspace>
  );
}
