"use client";

import { useMemo, useState } from "react";
import { Field, Input } from "@/components/ui/Field";
import { Workspace } from "@/components/ui/Workspace";
import { CopyButton } from "@/components/ui/CopyButton";
import { money } from "@/lib/finance";
import { parseNum } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useToolOpen } from "@/lib/useToolOpen";

const PRESETS = [10, 15, 18, 20, 25];

export function TipCalculator() {
  useToolOpen("tip-calculator");
  const [bill, setBill] = useState("80");
  const [tipPct, setTipPct] = useState("18");
  const [people, setPeople] = useState(1);

  const result = useMemo(() => {
    const b = parseNum(bill);
    const t = parseNum(tipPct);
    if (b === null || t === null || b < 0) return null;
    const tip = (b * t) / 100;
    const total = b + tip;
    const n = Math.max(1, people);
    return { tip, total, perPersonTotal: total / n, perPersonTip: tip / n, people: n };
  }, [bill, tipPct, people]);

  return (
    <Workspace>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <Field label="Bill amount" htmlFor="bill">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">$</span>
              <Input id="bill" inputMode="decimal" value={bill} onChange={(e) => setBill(e.target.value)} className="tabular h-12 pl-7 text-[17px] font-medium" />
            </div>
          </Field>

          <div>
            <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.06em] text-faint">Tip percentage</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTipPct(String(p))}
                  className={cn(
                    "rounded-[var(--radius-sm)] border px-3 py-2 text-[13.5px] font-medium transition-colors",
                    tipPct === String(p)
                      ? "border-accent-line bg-accent-tint text-[var(--accent-text)]"
                      : "border-border text-ink-soft hover:border-border-strong hover:text-ink",
                  )}
                >
                  {p}%
                </button>
              ))}
              <div className="relative w-24">
                <Input inputMode="decimal" value={tipPct} onChange={(e) => setTipPct(e.target.value)} aria-label="Custom tip percentage" className="tabular h-10 pr-8 text-center font-medium" />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-faint">%</span>
              </div>
            </div>
          </div>

          <Field label="Split between" htmlFor="people">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPeople((n) => Math.max(1, n - 1))}
                className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] border border-border-strong text-ink-soft transition-colors hover:bg-surface-inset"
                aria-label="Fewer people"
              >
                −
              </button>
              <div className="tabular grid h-10 min-w-16 flex-1 place-items-center rounded-[var(--radius-sm)] border border-border bg-surface-inset text-[16px] font-medium text-ink">
                {people} {people === 1 ? "person" : "people"}
              </div>
              <button
                type="button"
                onClick={() => setPeople((n) => Math.min(99, n + 1))}
                className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] border border-border-strong text-ink-soft transition-colors hover:bg-surface-inset"
                aria-label="More people"
              >
                +
              </button>
            </div>
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          {result ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[var(--radius-md)] border border-border px-5 py-5 text-center">
                  <span className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-faint">Tip</span>
                  <p className="tabular mt-1 text-[26px] font-semibold text-ink">{money(result.tip)}</p>
                </div>
                <div className="rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-5 py-5 text-center">
                  <span className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-soft">Total</span>
                  <p className="tabular mt-1 text-[26px] font-semibold text-ink">{money(result.total)}</p>
                </div>
              </div>

              {result.people > 1 ? (
                <div className="rounded-[var(--radius-md)] border border-border px-5 py-5 text-center">
                  <span className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-faint">
                    Each person pays
                  </span>
                  <p className="tabular mt-1 text-[32px] font-semibold leading-none text-ink">
                    {money(result.perPersonTotal)}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-ink-soft">
                    includes {money(result.perPersonTip)} tip each
                  </p>
                </div>
              ) : null}

              <CopyButton
                className="self-start"
                size="sm"
                value={() =>
                  result.people > 1
                    ? `Total ${money(result.total)} — ${money(result.perPersonTotal)} each (${result.people} people)`
                    : `Tip ${money(result.tip)}, total ${money(result.total)}`
                }
                event="tip-calculator"
                label="Copy"
              />
            </>
          ) : null}
        </div>
      </div>
    </Workspace>
  );
}
