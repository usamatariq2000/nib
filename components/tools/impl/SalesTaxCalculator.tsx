"use client";

import { useMemo, useState } from "react";
import { Field, Input } from "@/components/ui/Field";
import { Segmented } from "@/components/ui/Segmented";
import { Workspace } from "@/components/ui/Workspace";
import { CopyButton } from "@/components/ui/CopyButton";
import { money } from "@/lib/finance";
import { parseNum } from "@/lib/format";
import { useToolOpen } from "@/lib/useToolOpen";

type Mode = "add" | "remove";

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-0">
      <span className={strong ? "text-[14px] font-medium text-ink" : "text-[13.5px] text-ink-soft"}>{label}</span>
      <span className="tabular text-right font-medium text-[14px] text-ink">{value}</span>
    </div>
  );
}

export function SalesTaxCalculator() {
  useToolOpen("sales-tax-calculator");
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("8");

  const result = useMemo(() => {
    const a = parseNum(amount);
    const r = parseNum(rate);
    if (a === null || r === null || a < 0 || r < 0) return null;
    if (mode === "add") {
      const tax = (a * r) / 100;
      return { net: a, tax, gross: a + tax };
    }
    const net = a / (1 + r / 100);
    return { net, tax: a - net, gross: a };
  }, [mode, amount, rate]);

  return (
    <Workspace>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <Segmented
            ariaLabel="Mode"
            options={[
              { value: "add", label: "Add tax" },
              { value: "remove", label: "Remove tax" },
            ]}
            value={mode}
            onChange={(m) => setMode(m as Mode)}
          />
          <Field label={mode === "add" ? "Price before tax" : "Price including tax"} htmlFor="amount">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">$</span>
              <Input id="amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} className="tabular h-12 pl-7 text-[17px] font-medium" />
            </div>
          </Field>
          <Field label="Sales tax rate" htmlFor="rate">
            <div className="relative">
              <Input id="rate" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className="tabular pr-9 font-medium" />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">%</span>
            </div>
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          {result ? (
            <>
              <div className="rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-6 text-center">
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft">
                  {mode === "add" ? "Total with tax" : "Price before tax"}
                </span>
                <p className="tabular mt-1 text-[38px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[44px]">
                  {money(mode === "add" ? result.gross : result.net)}
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border px-4 py-1">
                <Row label="Price before tax" value={money(result.net)} />
                <Row label="Sales tax" value={money(result.tax)} />
                <Row label="Total with tax" value={money(result.gross)} strong />
              </div>
              <CopyButton
                className="self-start"
                size="sm"
                value={() => `Before tax ${money(result.net)}, tax ${money(result.tax)}, total ${money(result.gross)}`}
                event="sales-tax-calculator"
                label="Copy"
              />
            </>
          ) : null}
        </div>
      </div>
    </Workspace>
  );
}
