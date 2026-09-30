"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Workspace } from "@/components/ui/Workspace";
import { secureRandomInt } from "@/lib/format";
import { track } from "@/lib/analytics";
import { useToolOpen } from "@/lib/useToolOpen";

export function CoinFlip() {
  useToolOpen("coin-flip");
  const [result, setResult] = useState<"H" | "T" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [tally, setTally] = useState({ heads: 0, tails: 0 });
  const [batch, setBatch] = useState(10);
  const [lastBatch, setLastBatch] = useState<{ heads: number; tails: number } | null>(null);

  function flipOne() {
    setFlipping(true);
    setLastBatch(null);
    const r = secureRandomInt(0, 1) === 0 ? "H" : "T";
    setTimeout(() => {
      setResult(r);
      setFlipping(false);
      setTally((t) => ({
        heads: t.heads + (r === "H" ? 1 : 0),
        tails: t.tails + (r === "T" ? 1 : 0),
      }));
      track("tool_complete", { tool: "coin-flip" });
    }, 500);
  }

  function flipMany() {
    let heads = 0;
    for (let i = 0; i < batch; i++) if (secureRandomInt(0, 1) === 0) heads++;
    const tails = batch - heads;
    setLastBatch({ heads, tails });
    setResult(heads >= tails ? "H" : "T");
    setTally((t) => ({ heads: t.heads + heads, tails: t.tails + tails }));
    track("tool_complete", { tool: "coin-flip", batch });
  }

  const total = tally.heads + tally.tails;

  return (
    <Workspace>
      <div className="flex flex-col items-center gap-7">
        {/* Coin */}
        <div className="grid h-40 w-40 place-items-center">
          <div
            className={`grid h-36 w-36 place-items-center rounded-full border-4 shadow-[var(--shadow)] transition-transform duration-500 ${
              flipping ? "[transform:rotateY(720deg)]" : ""
            } ${
              result === "T"
                ? "border-[var(--ink-soft)] bg-surface-inset"
                : "border-accent bg-accent-tint"
            }`}
            aria-live="polite"
          >
            <span className="text-[44px] font-bold tracking-tight text-ink">
              {result === null ? "?" : result === "H" ? "H" : "T"}
            </span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[20px] font-semibold text-ink">
            {result === null ? "Ready to flip" : result === "H" ? "Heads" : "Tails"}
          </p>
          {lastBatch ? (
            <p className="tabular mt-1 text-[13px] text-ink-soft">
              {batch} flips · {lastBatch.heads} heads · {lastBatch.tails} tails
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button variant="primary" size="lg" onClick={flipOne} disabled={flipping}>
            Flip coin
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={flipMany} disabled={flipping}>
              Flip
            </Button>
            <input
              inputMode="numeric"
              value={batch}
              onChange={(e) => setBatch(Math.max(1, Math.min(10000, parseInt(e.target.value.replace(/\D/g, "") || "1", 10))))}
              aria-label="Number of coins"
              className="tabular h-10 w-16 rounded-[var(--radius-sm)] border border-border-strong bg-surface text-center text-[15px] font-medium text-ink outline-none focus:border-accent"
            />
            <span className="text-[13px] text-ink-soft">times</span>
          </div>
        </div>

        {total > 0 ? (
          <div className="flex w-full max-w-[320px] items-center justify-center gap-6 rounded-[var(--radius-md)] border border-border px-5 py-3">
            <div className="text-center">
              <p className="tabular text-[20px] font-semibold text-ink">{tally.heads}</p>
              <p className="text-[11px] uppercase tracking-[0.06em] text-faint">Heads</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="tabular text-[20px] font-semibold text-ink">{tally.tails}</p>
              <p className="text-[11px] uppercase tracking-[0.06em] text-faint">Tails</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <button
              type="button"
              onClick={() => { setTally({ heads: 0, tails: 0 }); setLastBatch(null); }}
              className="text-[12px] font-medium text-ink-soft hover:text-[var(--accent)]"
            >
              Reset
            </button>
          </div>
        ) : null}
      </div>
    </Workspace>
  );
}
