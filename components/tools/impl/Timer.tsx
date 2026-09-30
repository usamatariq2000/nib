"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { useToolOpen } from "@/lib/useToolOpen";

const PRESETS = [
  { label: "1m", ms: 60_000 },
  { label: "5m", ms: 300_000 },
  { label: "10m", ms: 600_000 },
  { label: "15m", ms: 900_000 },
  { label: "25m", ms: 1_500_000 },
  { label: "45m", ms: 2_700_000 },
];

function format(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function beep() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    let t = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.36);
      t += 0.5;
    }
    setTimeout(() => ctx.close(), 2000);
  } catch {
    /* audio may be unavailable */
  }
}

export function Timer({
  initialMs = 300_000,
  autoStart = false,
}: {
  initialMs?: number;
  autoStart?: boolean;
} = {}) {
  useToolOpen("timer");
  const [duration, setDuration] = useState(initialMs);
  const [remaining, setRemaining] = useState(initialMs);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const endRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const [minInput, setMinInput] = useState(String(Math.floor(initialMs / 60000)));
  const [secInput, setSecInput] = useState(
    String(Math.floor((initialMs % 60000) / 1000)).padStart(2, "0"),
  );

  const tick = useCallback(() => {
    const left = endRef.current - Date.now();
    if (left <= 0) {
      setRemaining(0);
      setRunning(false);
      setFinished(true);
      beep();
      if (typeof document !== "undefined") document.title = "⏰ Time's up!";
      track("tool_complete", { tool: "timer" });
      return;
    }
    setRemaining(left);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    // Optional autostart for landing pages (e.g. "5 minute timer").
    if (autoStart && initialMs > 0) {
      endRef.current = Date.now() + initialMs;
      setRunning(true);
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function start() {
    if (remaining <= 0) return;
    setFinished(false);
    endRef.current = Date.now() + remaining;
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  }

  function pause() {
    setRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }

  function reset() {
    pause();
    setRemaining(duration);
    setFinished(false);
  }

  function applyPreset(ms: number) {
    pause();
    setDuration(ms);
    setRemaining(ms);
    setFinished(false);
    setMinInput(String(Math.floor(ms / 60000)));
    setSecInput(String(Math.floor((ms % 60000) / 1000)).padStart(2, "0"));
  }

  function applyCustom() {
    const m = Math.max(0, Math.min(999, parseInt(minInput || "0", 10) || 0));
    const s = Math.max(0, Math.min(59, parseInt(secInput || "0", 10) || 0));
    const ms = (m * 60 + s) * 1000;
    setDuration(ms);
    setRemaining(ms);
    setFinished(false);
    setSecInput(String(s).padStart(2, "0"));
  }

  const pct = duration > 0 ? remaining / duration : 0;
  const C = 2 * Math.PI * 130;

  return (
    <div className="mx-auto max-w-[440px] rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow)] sm:p-8">
      <div className="relative mx-auto grid aspect-square w-full max-w-[300px] place-items-center">
        <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="150" cy="150" r="130" fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle
            cx="150"
            cy="150"
            r="130"
            fill="none"
            stroke={finished ? "var(--success)" : "var(--accent)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            style={{ transition: running ? "none" : "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <div className="flex flex-col items-center">
          <span
            className={cn(
              "tabular text-[52px] font-semibold leading-none tracking-[-0.02em] sm:text-[60px]",
              finished ? "text-[var(--success)]" : "text-ink",
            )}
          >
            {format(remaining)}
          </span>
          <span className="mt-2 text-[12px] font-medium uppercase tracking-[0.1em] text-faint">
            {finished ? "Time's up" : running ? "Running" : "Ready"}
          </span>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2.5">
        {running ? (
          <Button size="lg" variant="secondary" onClick={pause} className="min-w-28">
            Pause
          </Button>
        ) : (
          <Button
            size="lg"
            variant="primary"
            onClick={start}
            disabled={remaining <= 0}
            className="min-w-28"
          >
            {remaining < duration && remaining > 0 ? "Resume" : "Start"}
          </Button>
        )}
        <Button size="lg" variant="secondary" onClick={reset}>
          Reset
        </Button>
      </div>

      {/* Presets + custom, hidden while running to stay minimal */}
      {!running ? (
        <div className="mt-6 animate-rise">
          <div className="flex flex-wrap justify-center gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p.ms)}
                className={cn(
                  "rounded-[var(--radius-sm)] border px-3 py-1.5 text-[13px] font-medium transition-colors",
                  duration === p.ms
                    ? "border-accent-line bg-accent-tint text-[var(--accent)]"
                    : "border-border text-ink-soft hover:border-border-strong hover:text-ink",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-ink-soft">
            <input
              inputMode="numeric"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value.replace(/\D/g, "").slice(0, 3))}
              onBlur={applyCustom}
              aria-label="Minutes"
              className="tabular h-10 w-16 rounded-[var(--radius-sm)] border border-border-strong bg-surface text-center text-[16px] font-medium text-ink outline-none focus:border-accent"
            />
            <span className="text-[13px]">min</span>
            <input
              inputMode="numeric"
              value={secInput}
              onChange={(e) => setSecInput(e.target.value.replace(/\D/g, "").slice(0, 2))}
              onBlur={applyCustom}
              aria-label="Seconds"
              className="tabular h-10 w-16 rounded-[var(--radius-sm)] border border-border-strong bg-surface text-center text-[16px] font-medium text-ink outline-none focus:border-accent"
            />
            <span className="text-[13px]">sec</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
