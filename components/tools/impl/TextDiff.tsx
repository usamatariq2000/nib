"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { useToolOpen } from "@/lib/useToolOpen";

type Row = { type: "eq" | "add" | "del"; a?: number; b?: number; text: string };

function diffLines(aText: string, bText: string): Row[] {
  const a = aText.split("\n");
  const b = bText.split("\n");
  const n = a.length;
  const m = b.length;

  // LCS table
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const rows: Row[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      rows.push({ type: "eq", a: i + 1, b: j + 1, text: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      rows.push({ type: "del", a: i + 1, text: a[i] });
      i++;
    } else {
      rows.push({ type: "add", b: j + 1, text: b[j] });
      j++;
    }
  }
  while (i < n) rows.push({ type: "del", a: i + 1, text: a[i++] });
  while (j < m) rows.push({ type: "add", b: j + 1, text: b[j++] });
  return rows;
}

export function TextDiff() {
  useToolOpen("text-diff");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const tooBig = left.split("\n").length > 2000 || right.split("\n").length > 2000;

  const rows = useMemo(() => {
    if (!left && !right) return [];
    if (tooBig) return [];
    return diffLines(left, right);
  }, [left, right, tooBig]);

  const counts = useMemo(() => {
    let add = 0;
    let del = 0;
    for (const r of rows) {
      if (r.type === "add") add++;
      else if (r.type === "del") del++;
    }
    return { add, del };
  }, [rows]);

  const hasInput = left.length > 0 || right.length > 0;

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow)]">
      <div className="flex items-center justify-between border-b border-border bg-surface-inset px-3 py-2">
        <div className="flex items-center gap-2">
          {hasInput && !tooBig ? (
            <>
              <Badge tone="success">+{counts.add} added</Badge>
              <Badge tone="danger">−{counts.del} removed</Badge>
            </>
          ) : (
            <span className="pl-1 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
              Compare
            </span>
          )}
        </div>
        <Button size="sm" variant="ghost" onClick={() => { setLeft(""); setRight(""); }} disabled={!hasInput}>
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div>
          <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">Original</div>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            spellCheck={false}
            placeholder="Paste the original text…"
            aria-label="Original text"
            className="scroll-thin h-[180px] w-full resize-y bg-surface px-4 py-3 font-mono text-[13px] leading-relaxed text-ink outline-none placeholder:text-faint md:h-[220px]"
          />
        </div>
        <div>
          <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">Changed</div>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            spellCheck={false}
            placeholder="Paste the changed text…"
            aria-label="Changed text"
            className="scroll-thin h-[180px] w-full resize-y bg-surface px-4 py-3 font-mono text-[13px] leading-relaxed text-ink outline-none placeholder:text-faint md:h-[220px]"
          />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">Differences</div>
        {tooBig ? (
          <p className="px-4 py-8 text-center text-[13px] text-faint">
            That's a lot of lines — the diff view is limited to 2,000 lines per side.
          </p>
        ) : !hasInput ? (
          <div className="relative h-[140px]">
            <div className="workspace-grid absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <p className="text-[13px] text-faint">Paste text on both sides to see what changed.</p>
            </div>
          </div>
        ) : counts.add === 0 && counts.del === 0 ? (
          <p className="px-4 py-8 text-center text-[13px] text-[var(--success)]">
            The two texts are identical.
          </p>
        ) : (
          <div className="scroll-thin max-h-[360px] overflow-auto font-mono text-[13px]">
            {rows.map((r, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-3 px-3 py-0.5 leading-relaxed",
                  r.type === "add" && "bg-[var(--success-tint)]",
                  r.type === "del" && "bg-[var(--danger-tint)]",
                )}
              >
                <span className="tabular w-8 shrink-0 select-none text-right text-faint">
                  {r.type === "add" ? "" : r.a}
                </span>
                <span
                  className={cn(
                    "w-3 shrink-0 select-none text-center",
                    r.type === "add" && "text-[var(--success)]",
                    r.type === "del" && "text-[var(--danger)]",
                    r.type === "eq" && "text-transparent",
                  )}
                >
                  {r.type === "add" ? "+" : r.type === "del" ? "−" : " "}
                </span>
                <span
                  className={cn(
                    "whitespace-pre-wrap break-words",
                    r.type === "add" && "text-[var(--success)]",
                    r.type === "del" && "text-[var(--danger)]",
                    r.type === "eq" && "text-ink-soft",
                  )}
                >
                  {r.text || " "}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
