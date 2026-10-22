"use client";

import { useMemo, useState } from "react";
import { Field, Input } from "@/components/ui/Field";
import { Workspace } from "@/components/ui/Workspace";
import { CopyButton } from "@/components/ui/CopyButton";
import { amortize, money } from "@/lib/finance";
import { parseNum } from "@/lib/format";
import { useToolOpen } from "@/lib/useToolOpen";

function MoneyInput({
  id,
  value,
  onChange,
  prefix = "$",
  suffix,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="relative">
      {prefix ? (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">
          {prefix}
        </span>
      ) : null}
      <Input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`tabular font-medium ${prefix ? "pl-7" : ""} ${suffix ? "pr-9" : ""}`}
      />
      {suffix ? (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-0">
      <span className={strong ? "text-[14px] font-medium text-ink" : "text-[13.5px] text-ink-soft"}>
        {label}
      </span>
      <span className={`tabular text-right font-medium ${strong ? "text-[15px] text-ink" : "text-[14px] text-ink"}`}>
        {value}
      </span>
    </div>
  );
}

export function MortgageCalculator() {
  useToolOpen("mortgage-calculator");
  const [price, setPrice] = useState("400000");
  const [down, setDown] = useState("80000");
  const [years, setYears] = useState("30");
  const [rate, setRate] = useState("6.5");
  const [tax, setTax] = useState("3600");
  const [insurance, setInsurance] = useState("1500");
  const [hoa, setHoa] = useState("0");

  const result = useMemo(() => {
    const p = parseNum(price);
    const d = parseNum(down) ?? 0;
    const y = parseNum(years);
    const r = parseNum(rate);
    if (p === null || y === null || r === null || p <= 0 || y <= 0) return null;

    const loan = Math.max(0, p - d);
    const { payment, totalInterest, totalPaid } = amortize(loan, r, y * 12);

    const monthlyTax = (parseNum(tax) ?? 0) / 12;
    const monthlyIns = (parseNum(insurance) ?? 0) / 12;
    const monthlyHoa = parseNum(hoa) ?? 0;
    const monthlyTotal = payment + monthlyTax + monthlyIns + monthlyHoa;

    return {
      loan,
      payment,
      monthlyTax,
      monthlyIns,
      monthlyHoa,
      monthlyTotal,
      totalInterest,
      totalPaid,
      downPct: p > 0 ? (d / p) * 100 : 0,
    };
  }, [price, down, years, rate, tax, insurance, hoa]);

  return (
    <Workspace>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        {/* Inputs */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Home price" htmlFor="price">
              <MoneyInput id="price" value={price} onChange={setPrice} />
            </Field>
            <Field
              label="Down payment"
              htmlFor="down"
              hint={result ? `${result.downPct.toFixed(1)}% down` : undefined}
            >
              <MoneyInput id="down" value={down} onChange={setDown} />
            </Field>
            <Field label="Loan term" htmlFor="years">
              <MoneyInput id="years" value={years} onChange={setYears} prefix="" suffix="yr" />
            </Field>
            <Field label="Interest rate" htmlFor="rate">
              <MoneyInput id="rate" value={rate} onChange={setRate} prefix="" suffix="%" />
            </Field>
          </div>

          <div className="rounded-[var(--radius-md)] border border-border bg-surface-inset/50 p-4">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
              Optional — yearly costs
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Property tax" htmlFor="tax">
                <MoneyInput id="tax" value={tax} onChange={setTax} />
              </Field>
              <Field label="Insurance" htmlFor="ins">
                <MoneyInput id="ins" value={insurance} onChange={setInsurance} />
              </Field>
              <Field label="HOA / mo" htmlFor="hoa">
                <MoneyInput id="hoa" value={hoa} onChange={setHoa} />
              </Field>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col gap-4">
          {result ? (
            <>
              <div className="rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-6 text-center">
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft">
                  Estimated monthly payment
                </span>
                <p className="tabular mt-1 text-[38px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[44px]">
                  {money(result.monthlyTotal, 0)}
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-border px-4 py-1">
                <Row label="Principal & interest" value={money(result.payment)} />
                {result.monthlyTax > 0 ? <Row label="Property tax" value={money(result.monthlyTax)} /> : null}
                {result.monthlyIns > 0 ? <Row label="Home insurance" value={money(result.monthlyIns)} /> : null}
                {result.monthlyHoa > 0 ? <Row label="HOA" value={money(result.monthlyHoa)} /> : null}
                <Row label="Loan amount" value={money(result.loan, 0)} />
                <Row label="Total interest paid" value={money(result.totalInterest, 0)} />
                <Row label="Total of payments" value={money(result.totalPaid, 0)} strong />
              </div>
              <CopyButton
                className="self-start"
                size="sm"
                value={() => `Monthly payment: ${money(result.monthlyTotal)} (P&I ${money(result.payment)})`}
                event="mortgage-calculator"
                label="Copy summary"
              />
            </>
          ) : null}
        </div>
      </div>
    </Workspace>
  );
}
