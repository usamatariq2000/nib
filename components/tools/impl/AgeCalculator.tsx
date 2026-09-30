"use client";

import { useMemo, useState } from "react";
import { Field, Input } from "@/components/ui/Field";
import { Workspace } from "@/components/ui/Workspace";
import { Callout } from "@/components/ui/Callout";
import { plural } from "@/lib/format";
import { useToolOpen } from "@/lib/useToolOpen";

function parseDate(v: string): Date | null {
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3.5">
      <span className="tabular text-[19px] font-semibold leading-none text-ink">{value}</span>
      <span className="text-[11.5px] font-medium uppercase tracking-[0.05em] text-faint">{label}</span>
    </div>
  );
}

export function AgeCalculator() {
  useToolOpen("age-calculator");
  const [birth, setBirth] = useState("");
  const [at, setAt] = useState(todayStr());

  const result = useMemo(() => {
    const from = parseDate(birth);
    const to = parseDate(at);
    if (!from || !to) return null;
    if (from > to) return { error: "The birth date is after the comparison date." };

    let y = to.getFullYear() - from.getFullYear();
    let m = to.getMonth() - from.getMonth();
    let d = to.getDate() - from.getDate();
    if (d < 0) {
      m--;
      d += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    }
    if (m < 0) {
      y--;
      m += 12;
    }

    const msPerDay = 86_400_000;
    const totalDays = Math.floor((to.getTime() - from.getTime()) / msPerDay);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = y * 12 + m;
    const totalHours = totalDays * 24;

    // Next birthday relative to `to`
    let nb = new Date(to.getFullYear(), from.getMonth(), from.getDate());
    if (nb < to) nb = new Date(to.getFullYear() + 1, from.getMonth(), from.getDate());
    const daysToNext = Math.ceil((nb.getTime() - to.getTime()) / msPerDay);

    return { y, m, d, totalDays, totalWeeks, totalMonths, totalHours, daysToNext };
  }, [birth, at]);

  return (
    <Workspace>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date of birth" htmlFor="dob">
          <Input id="dob" type="date" value={birth} max={todayStr()} onChange={(e) => setBirth(e.target.value)} />
        </Field>
        <Field label="Age at date" htmlFor="atdate" hint="Defaults to today.">
          <Input id="atdate" type="date" value={at} onChange={(e) => setAt(e.target.value)} />
        </Field>
      </div>

      <div className="mt-5">
        {!birth ? (
          <Callout>Enter a date of birth to calculate an exact age.</Callout>
        ) : result && "error" in result ? (
          <Callout tone="error">{result.error}</Callout>
        ) : result ? (
          <div className="animate-rise space-y-4">
            <div className="rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-6 text-center">
              <p className="tabular text-[30px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[36px]">
                {result.y} <span className="text-[18px] font-medium text-ink-soft">yr</span>{" "}
                {result.m} <span className="text-[18px] font-medium text-ink-soft">mo</span>{" "}
                {result.d} <span className="text-[18px] font-medium text-ink-soft">days</span>
              </p>
              <p className="mt-1.5 text-[13px] text-ink-soft">
                Next birthday in {plural(result.daysToNext, "day")}
              </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-[var(--radius-md)] border border-border sm:grid-cols-4">
              <Cell label="Months" value={result.totalMonths.toLocaleString()} />
              <Cell label="Weeks" value={result.totalWeeks.toLocaleString()} />
              <Cell label="Days" value={result.totalDays.toLocaleString()} />
              <Cell label="Hours" value={result.totalHours.toLocaleString()} />
            </div>
          </div>
        ) : null}
      </div>
    </Workspace>
  );
}
