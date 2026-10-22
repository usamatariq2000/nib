"use client";

import { useMemo, useState } from "react";
import { Field, Input, Select } from "@/components/ui/Field";
import { Workspace } from "@/components/ui/Workspace";
import { CopyButton } from "@/components/ui/CopyButton";
import { compoundGrowth, money } from "@/lib/finance";
import { parseNum } from "@/lib/format";
import { useToolOpen } from "@/lib/useToolOpen";

function MoneyField({
  label,
  id,
  value,
  onChange,
  prefix = "$",
  suffix,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <Field label={label} htmlFor={id}>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">{prefix}</span>
        ) : null}
        <Input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`tabular font-medium ${prefix ? "pl-7" : ""} ${suffix ? "pr-9" : ""}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">{suffix}</span>
        ) : null}
      </div>
    </Field>
  );
}

export function CompoundInterestCalculator() {
  useToolOpen("compound-interest-calculator");
  const [principal, setPrincipal] = useState("10000");
  const [contribution, setContribution] = useState("200");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("20");
  const [freq, setFreq] = useState("12");

  const result = useMemo(() => {
    const p = parseNum(principal) ?? 0;
    const r = parseNum(rate);
    const y = parseNum(years);
    const c = parseNum(contribution) ?? 0;
    const n = parseNum(freq) ?? 12;
    if (r === null || y === null || y <= 0 || (p <= 0 && c <= 0)) return null;
    const g = compoundGrowth(p, r, y, n, c);
    const contribPct = g.futureValue > 0 ? (g.totalContributions / g.futureValue) * 100 : 0;
    return { ...g, contribPct };
  }, [principal, contribution, rate, years, freq]);

  return (
    <Workspace>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyField label="Starting amount" id="principal" value={principal} onChange={setPrincipal} />
            <MoneyField label="Monthly add" id="contribution" value={contribution} onChange={setContribution} />
            <MoneyField label="Interest rate" id="rate" value={rate} onChange={setRate} prefix="" suffix="%" />
            <MoneyField label="Years" id="years" value={years} onChange={setYears} prefix="" suffix="yr" />
          </div>
          <Field label="Compounding" htmlFor="freq">
            <Select id="freq" value={freq} onChange={(e) => setFreq(e.target.value)}>
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </Select>
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          {result ? (
            <>
              <div className="rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-6 text-center">
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft">
                  Future balance
                </span>
                <p className="tabular mt-1 text-[36px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[42px]">
                  {money(result.futureValue, 0)}
                </p>
              </div>

              {/* Contributions vs interest bar */}
              <div>
                <div className="mb-1.5 flex justify-between text-[12.5px]">
                  <span className="text-ink-soft">You put in {money(result.totalContributions, 0)}</span>
                  <span className="font-medium text-[var(--accent-text)]">+{money(result.totalInterest, 0)} interest</span>
                </div>
                <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-inset">
                  <div className="h-full bg-border-strong" style={{ width: `${result.contribPct}%` }} />
                  <div className="h-full bg-accent" style={{ width: `${100 - result.contribPct}%` }} />
                </div>
              </div>

              <CopyButton
                className="self-start"
                size="sm"
                value={() => `Future balance ${money(result.futureValue)} (${money(result.totalInterest)} interest)`}
                event="compound-interest-calculator"
                label="Copy summary"
              />
            </>
          ) : null}
        </div>
      </div>
    </Workspace>
  );
}
