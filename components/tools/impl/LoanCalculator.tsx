"use client";

import { useMemo, useState } from "react";
import { Field, Input } from "@/components/ui/Field";
import { Segmented } from "@/components/ui/Segmented";
import { Workspace } from "@/components/ui/Workspace";
import { CopyButton } from "@/components/ui/CopyButton";
import { amortize, money } from "@/lib/finance";
import { parseNum } from "@/lib/format";
import { useToolOpen } from "@/lib/useToolOpen";

type Unit = "years" | "months";

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-0">
      <span className={strong ? "text-[14px] font-medium text-ink" : "text-[13.5px] text-ink-soft"}>
        {label}
      </span>
      <span className="tabular text-right font-medium text-[14px] text-ink">{value}</span>
    </div>
  );
}

export function LoanCalculator() {
  useToolOpen("loan-calculator");
  const [amount, setAmount] = useState("25000");
  const [rate, setRate] = useState("7");
  const [term, setTerm] = useState("5");
  const [unit, setUnit] = useState<Unit>("years");

  const result = useMemo(() => {
    const p = parseNum(amount);
    const r = parseNum(rate);
    const t = parseNum(term);
    if (p === null || r === null || t === null || p <= 0 || t <= 0) return null;
    const months = unit === "years" ? t * 12 : t;
    if (months <= 0) return null;
    const { payment, totalPaid, totalInterest } = amortize(p, r, Math.round(months));
    return { payment, totalPaid, totalInterest, principal: p, months: Math.round(months) };
  }, [amount, rate, term, unit]);

  return (
    <Workspace>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <Field label="Loan amount" htmlFor="amount">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">$</span>
              <Input id="amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} className="tabular pl-7 font-medium" />
            </div>
          </Field>
          <Field label="Interest rate" htmlFor="rate">
            <div className="relative">
              <Input id="rate" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className="tabular pr-9 font-medium" />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">%</span>
            </div>
          </Field>
          <Field label="Loan term" htmlFor="term">
            <div className="flex gap-2">
              <Input id="term" inputMode="numeric" value={term} onChange={(e) => setTerm(e.target.value)} className="tabular font-medium" />
              <Segmented
                ariaLabel="Term unit"
                options={[
                  { value: "years", label: "Years" },
                  { value: "months", label: "Months" },
                ]}
                value={unit}
                onChange={(u) => setUnit(u as Unit)}
              />
            </div>
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          {result ? (
            <>
              <div className="rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-6 text-center">
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft">
                  Monthly payment
                </span>
                <p className="tabular mt-1 text-[40px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[46px]">
                  {money(result.payment)}
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border px-4 py-1">
                <Row label="Loan amount" value={money(result.principal, 0)} />
                <Row label="Number of payments" value={String(result.months)} />
                <Row label="Total interest" value={money(result.totalInterest)} />
                <Row label="Total repaid" value={money(result.totalPaid)} strong />
              </div>
              <CopyButton
                className="self-start"
                size="sm"
                value={() => `Monthly payment ${money(result.payment)}, total interest ${money(result.totalInterest)}`}
                event="loan-calculator"
                label="Copy summary"
              />
            </>
          ) : null}
        </div>
      </div>
    </Workspace>
  );
}
