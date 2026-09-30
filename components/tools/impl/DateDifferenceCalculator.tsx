"use client";

import { useMemo, useState } from "react";
import { Field, Input } from "@/components/ui/Field";
import { Workspace } from "@/components/ui/Workspace";
import { Callout } from "@/components/ui/Callout";
import { useToolOpen } from "@/lib/useToolOpen";

function parseDate(v: string): Date | null {
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

function businessDays(from: Date, to: Date): number {
  let count = 0;
  const cur = new Date(from);
  cur.setDate(cur.getDate() + 1); // exclusive of start, inclusive of end
  while (cur <= to) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3.5">
      <span className="tabular text-[19px] font-semibold leading-none text-ink">{value}</span>
      <span className="text-[11.5px] font-medium uppercase tracking-[0.05em] text-faint">{label}</span>
    </div>
  );
}

export function DateDifferenceCalculator() {
  useToolOpen("date-difference-calculator");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const result = useMemo(() => {
    let from = parseDate(start);
    let to = parseDate(end);
    if (!from || !to) return null;
    if (from > to) [from, to] = [to, from];

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
    const totalDays = Math.round((to.getTime() - from.getTime()) / msPerDay);
    return {
      y,
      m,
      d,
      totalDays,
      totalWeeks: Math.floor(totalDays / 7),
      remWeekDays: totalDays % 7,
      business: businessDays(from, to),
    };
  }, [start, end]);

  return (
    <Workspace>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Start date" htmlFor="start">
          <Input id="start" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
        <Field label="End date" htmlFor="end">
          <Input id="end" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </Field>
      </div>

      <div className="mt-5">
        {!start || !end ? (
          <Callout>Pick a start and end date to see the duration between them.</Callout>
        ) : result ? (
          <div className="animate-rise space-y-4">
            <div className="rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-6 text-center">
              <p className="tabular text-[28px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[34px]">
                {result.y > 0 ? <>{result.y} <span className="text-[17px] font-medium text-ink-soft">yr</span> </> : null}
                {result.m > 0 ? <>{result.m} <span className="text-[17px] font-medium text-ink-soft">mo</span> </> : null}
                {result.d} <span className="text-[17px] font-medium text-ink-soft">days</span>
              </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-[var(--radius-md)] border border-border sm:grid-cols-3">
              <Cell label="Total days" value={result.totalDays.toLocaleString()} />
              <Cell
                label="Weeks"
                value={`${result.totalWeeks}${result.remWeekDays ? ` w ${result.remWeekDays} d` : ""}`}
              />
              <Cell label="Business days" value={result.business.toLocaleString()} />
            </div>
          </div>
        ) : null}
      </div>
    </Workspace>
  );
}
