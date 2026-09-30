"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Workspace } from "@/components/ui/Workspace";
import { cn } from "@/lib/cn";
import { secureRandomInt } from "@/lib/format";
import { track } from "@/lib/analytics";
import { useToolOpen } from "@/lib/useToolOpen";

const DICE = [4, 6, 8, 10, 12, 20];

export function DiceRoller() {
  useToolOpen("dice-roller");
  const [sides, setSides] = useState(6);
  const [customSides, setCustomSides] = useState("");
  const [count, setCount] = useState(2);
  const [modifier, setModifier] = useState("0");
  const [rolls, setRolls] = useState<number[]>([]);

  const effectiveSides = sides === 0 ? Math.max(2, parseInt(customSides || "0", 10) || 0) : sides;

  function roll() {
    if (effectiveSides < 2) return;
    const out: number[] = [];
    for (let i = 0; i < count; i++) out.push(secureRandomInt(1, effectiveSides));
    setRolls(out);
    track("tool_complete", { tool: "dice-roller", sides: effectiveSides, count });
  }

  const mod = parseInt(modifier, 10) || 0;
  const sum = rolls.reduce((a, b) => a + b, 0);
  const total = sum + mod;
  const notation = `${count}d${effectiveSides || "?"}${mod ? (mod > 0 ? `+${mod}` : mod) : ""}`;

  return (
    <Workspace>
      <div className="flex flex-col gap-5">
        {/* Die type */}
        <div>
          <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.05em] text-faint">Die</span>
          <div className="flex flex-wrap gap-1.5">
            {DICE.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSides(d)}
                className={cn(
                  "rounded-[var(--radius-sm)] border px-3.5 py-2 font-mono text-[13.5px] font-medium transition-colors",
                  sides === d
                    ? "border-accent-line bg-accent-tint text-[var(--accent)]"
                    : "border-border text-ink-soft hover:border-border-strong hover:text-ink",
                )}
              >
                d{d}
              </button>
            ))}
            <div className={cn("flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-2 transition-colors", sides === 0 ? "border-accent-line bg-accent-tint" : "border-border")}>
              <span className="font-mono text-[13.5px] text-ink-soft">d</span>
              <input
                inputMode="numeric"
                value={customSides}
                onChange={(e) => { setCustomSides(e.target.value.replace(/\D/g, "").slice(0, 4)); setSides(0); }}
                onFocus={() => setSides(0)}
                placeholder="?"
                aria-label="Custom sides"
                className="tabular h-9 w-12 bg-transparent text-center font-mono text-[13.5px] font-medium text-ink outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium uppercase tracking-[0.05em] text-faint">Dice</span>
            <input
              inputMode="numeric"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value.replace(/\D/g, "") || "1", 10))))}
              aria-label="Number of dice"
              className="tabular h-10 w-20 rounded-[var(--radius-sm)] border border-border-strong bg-surface text-center text-[15px] font-medium text-ink outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium uppercase tracking-[0.05em] text-faint">Modifier</span>
            <input
              inputMode="numeric"
              value={modifier}
              onChange={(e) => setModifier(e.target.value.replace(/[^\d-]/g, "").slice(0, 4))}
              aria-label="Modifier"
              className="tabular h-10 w-20 rounded-[var(--radius-sm)] border border-border-strong bg-surface text-center text-[15px] font-medium text-ink outline-none focus:border-accent"
            />
          </label>
          <Button variant="primary" size="lg" onClick={roll} disabled={effectiveSides < 2} className="ml-auto">
            Roll {notation}
          </Button>
        </div>

        {rolls.length > 0 ? (
          <div className="animate-rise rounded-[var(--radius-md)] border border-border bg-surface-inset p-5">
            <div className="flex flex-wrap gap-2">
              {rolls.map((r, i) => (
                <span
                  key={i}
                  className="grid h-11 w-11 place-items-center rounded-[var(--radius-sm)] border border-border bg-surface font-mono text-[16px] font-semibold text-ink shadow-[var(--shadow-sm)]"
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-baseline gap-3 border-t border-border pt-4">
              <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-faint">Total</span>
              <span className="tabular text-[30px] font-semibold leading-none text-ink">{total}</span>
              {mod ? (
                <span className="tabular text-[13px] text-ink-soft">
                  ({sum} {mod > 0 ? "+" : "−"} {Math.abs(mod)})
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </Workspace>
  );
}
