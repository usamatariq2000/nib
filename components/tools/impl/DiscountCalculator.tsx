"use client";

import { useMemo, useState } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { Field, Input } from "@/components/ui/Field";
import { Workspace } from "@/components/ui/Workspace";
import { CopyButton } from "@/components/ui/CopyButton";
import { fmt, parseNum } from "@/lib/format";
import { useToolOpen } from "@/lib/useToolOpen";

type Mode = "percent" | "amount";

export function DiscountCalculator() {
  useToolOpen("discount-calculator");
  const [mode, setMode] = useState<Mode>("percent");
  const [price, setPrice] = useState("80");
  const [disc, setDisc] = useState("25");

  const result = useMemo(() => {
    const p = parseNum(price);
    const dv = parseNum(disc);
    if (p === null || dv === null || p < 0) return null;
    let saved = mode === "percent" ? (p * dv) / 100 : dv;
    saved = Math.min(Math.max(saved, 0), p);
    const final = p - saved;
    const effective = p > 0 ? (saved / p) * 100 : 0;
    return { saved, final, effective };
  }, [mode, price, disc]);

  return (
    <Workspace>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <Field label="Original price" htmlFor="price">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">
              $
            </span>
            <Input
              id="price"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="tabular pl-7 text-[16px] font-medium"
            />
          </div>
        </Field>

        <div className="hidden pb-3 text-center text-[20px] text-faint sm:block">−</div>

        <Field label="Discount">
          <div className="flex gap-2">
            <div className="relative flex-1">
              {mode === "amount" ? (
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">
                  $
                </span>
              ) : null}
              <Input
                inputMode="decimal"
                value={disc}
                onChange={(e) => setDisc(e.target.value)}
                aria-label="Discount value"
                className={`tabular text-[16px] font-medium ${mode === "amount" ? "pl-7" : ""} ${mode === "percent" ? "pr-8" : ""}`}
              />
              {mode === "percent" ? (
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[15px] text-faint">
                  %
                </span>
              ) : null}
            </div>
            <Segmented
              ariaLabel="Discount type"
              options={[
                { value: "percent", label: "%" },
                { value: "amount", label: "$" },
              ]}
              value={mode}
              onChange={(m) => setMode(m as Mode)}
            />
          </div>
        </Field>
      </div>

      {result ? (
        <div className="animate-rise mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-5 py-6 text-center sm:col-span-1">
            <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-soft">
              Final price
            </span>
            <p className="tabular mt-1 text-[34px] font-semibold leading-none tracking-[-0.02em] text-ink">
              ${fmt(result.final, 2)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:col-span-2">
            <div className="flex flex-col justify-center rounded-[var(--radius-md)] border border-border px-5 py-4">
              <span className="text-[11.5px] font-medium uppercase tracking-[0.05em] text-faint">
                You save
              </span>
              <p className="tabular mt-1 text-[24px] font-semibold text-ink">${fmt(result.saved, 2)}</p>
            </div>
            <div className="flex flex-col justify-center rounded-[var(--radius-md)] border border-border px-5 py-4">
              <span className="text-[11.5px] font-medium uppercase tracking-[0.05em] text-faint">
                Effective off
              </span>
              <p className="tabular mt-1 text-[24px] font-semibold text-ink">{fmt(result.effective, 1)}%</p>
            </div>
          </div>
        </div>
      ) : null}

      {result ? (
        <div className="mt-4 flex justify-center">
          <CopyButton
            value={() => `$${fmt(result.final, 2)}`}
            event="discount-calculator"
            label="Copy final price"
          />
        </div>
      ) : null}
    </Workspace>
  );
}
