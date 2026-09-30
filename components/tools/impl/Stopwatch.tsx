"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToolOpen } from "@/lib/useToolOpen";

function format(ms: number) {
  const cs = Math.floor((ms % 1000) / 10);
  const totalSec = Math.floor(ms / 1000);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  const h = Math.floor(totalSec / 3600);
  const pad = (n: number) => String(n).padStart(2, "0");
  const base = h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  return { base, cs: pad(cs) };
}

export function Stopwatch() {
  useToolOpen("stopwatch");
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const baseRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const loop = useCallback(() => {
    setElapsed(performance.now() - baseRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const start = useCallback(() => {
    baseRef.current = performance.now() - elapsed;
    setRunning(true);
    rafRef.current = requestAnimationFrame(loop);
  }, [elapsed, loop]);

  const stop = useCallback(() => {
    setRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const reset = useCallback(() => {
    stop();
    setElapsed(0);
    setLaps([]);
  }, [stop]);

  const lap = useCallback(() => {
    if (running) setLaps((l) => [...l, elapsed]);
  }, [running, elapsed]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Keyboard shortcuts (ignored while typing in a field).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.code === "Space") {
        e.preventDefault();
        running ? stop() : start();
      } else if (e.key.toLowerCase() === "l") {
        lap();
      } else if (e.key.toLowerCase() === "r") {
        reset();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, start, stop, lap, reset]);

  const t = format(elapsed);
  const lapRows = laps.map((cumulative, i) => ({
    n: i + 1,
    split: cumulative - (laps[i - 1] ?? 0),
    cumulative,
  }));
  const fastest = lapRows.length > 1 ? Math.min(...lapRows.map((l) => l.split)) : -1;
  const slowest = lapRows.length > 1 ? Math.max(...lapRows.map((l) => l.split)) : -1;

  return (
    <div className="mx-auto max-w-[440px] rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)] sm:p-8">
      <div className="text-center">
        <span className="tabular text-[56px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[68px]">
          {t.base}
        </span>
        <span className="tabular text-[26px] font-medium text-ink-soft sm:text-[32px]">.{t.cs}</span>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2.5">
        {running ? (
          <>
            <Button size="lg" variant="secondary" onClick={stop} className="min-w-24">Stop</Button>
            <Button size="lg" variant="primary" onClick={lap} className="min-w-24">Lap</Button>
          </>
        ) : (
          <>
            <Button size="lg" variant="primary" onClick={start} className="min-w-24">
              {elapsed > 0 ? "Resume" : "Start"}
            </Button>
            <Button size="lg" variant="secondary" onClick={reset} disabled={elapsed === 0} className="min-w-24">
              Reset
            </Button>
          </>
        )}
      </div>

      <p className="mt-3 text-center text-[11.5px] text-faint">
        Space start/stop · L lap · R reset
      </p>

      {lapRows.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-[var(--radius-md)] border border-border">
          <div className="grid grid-cols-[auto_1fr_1fr] gap-4 border-b border-border bg-surface-inset px-4 py-2 text-[11px] font-medium uppercase tracking-[0.05em] text-faint">
            <span>Lap</span>
            <span className="text-right">Split</span>
            <span className="text-right">Total</span>
          </div>
          <div className="scroll-thin max-h-[220px] overflow-y-auto">
            {[...lapRows].reverse().map((l) => {
              const sf = format(l.split);
              const cf = format(l.cumulative);
              const highlight =
                fastest >= 0 && l.split === fastest
                  ? "text-[var(--success)]"
                  : slowest >= 0 && l.split === slowest
                    ? "text-[var(--danger)]"
                    : "text-ink";
              return (
                <div key={l.n} className="grid grid-cols-[auto_1fr_1fr] gap-4 border-b border-border px-4 py-2 text-[13.5px] last:border-0">
                  <span className="tabular text-ink-soft">{l.n}</span>
                  <span className={`tabular text-right font-mono font-medium ${highlight}`}>
                    {sf.base}.{sf.cs}
                  </span>
                  <span className="tabular text-right font-mono text-ink-soft">
                    {cf.base}.{cf.cs}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
