"use client";

import { useEffect, useMemo, useState } from "react";
import { Field, Input } from "@/components/ui/Field";
import { Workspace } from "@/components/ui/Workspace";
import { CopyButton } from "@/components/ui/CopyButton";
import { Callout } from "@/components/ui/Callout";
import { useToolOpen } from "@/lib/useToolOpen";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-0">
      <span className="text-[12px] font-medium uppercase tracking-[0.05em] text-faint">{label}</span>
      <span className="tabular text-right font-mono text-[13.5px] text-ink">{value}</span>
    </div>
  );
}

function toLocalInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function TimestampConverter() {
  useToolOpen("timestamp-converter");
  const [now, setNow] = useState<number | null>(null);
  const [tsInput, setTsInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const fromTimestamp = useMemo(() => {
    const raw = tsInput.trim();
    if (!raw) return null;
    if (!/^-?\d+$/.test(raw)) return { error: "Enter a whole number timestamp." };
    const n = Number(raw);
    // Detect ms (13+ digits) vs seconds.
    const ms = raw.replace("-", "").length >= 12 ? n : n * 1000;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return { error: "That timestamp is out of range." };
    return {
      unit: raw.replace("-", "").length >= 12 ? "milliseconds" : "seconds",
      local: d.toLocaleString(),
      utc: d.toUTCString(),
      iso: d.toISOString(),
      relative: relativeTime(d.getTime() - (now ?? Date.now())),
    };
  }, [tsInput, now]);

  const fromDate = useMemo(() => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    if (Number.isNaN(d.getTime())) return null;
    return { seconds: Math.floor(d.getTime() / 1000), ms: d.getTime() };
  }, [dateInput]);

  return (
    <div className="space-y-5">
      {/* Live clock */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border bg-surface px-5 py-4 shadow-[var(--shadow-sm)]">
        <div>
          <p className="text-[11.5px] font-medium uppercase tracking-[0.08em] text-faint">
            Current Unix time
          </p>
          <p className="tabular mt-0.5 font-mono text-[26px] font-semibold text-ink" suppressHydrationWarning>
            {now ? Math.floor(now / 1000) : "—"}
          </p>
        </div>
        <CopyButton
          size="sm"
          value={() => String(Math.floor((now ?? Date.now()) / 1000))}
          event="timestamp-converter"
          label="Copy"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Timestamp -> date */}
        <Workspace>
          <Field label="Timestamp → date" htmlFor="ts" hint="Seconds or milliseconds — auto-detected.">
            <Input
              id="ts"
              inputMode="numeric"
              value={tsInput}
              onChange={(e) => setTsInput(e.target.value)}
              placeholder="1700000000"
              className="font-mono"
            />
          </Field>
          <div className="mt-4">
            {!tsInput ? (
              <Callout>Enter a timestamp to convert it to a date.</Callout>
            ) : fromTimestamp && "error" in fromTimestamp ? (
              <Callout tone="error">{fromTimestamp.error}</Callout>
            ) : fromTimestamp ? (
              <div className="animate-rise">
                <Row label="Detected" value={fromTimestamp.unit} />
                <Row label="Local" value={fromTimestamp.local} />
                <Row label="UTC" value={fromTimestamp.utc} />
                <Row label="ISO 8601" value={fromTimestamp.iso} />
                <Row label="Relative" value={fromTimestamp.relative} />
              </div>
            ) : null}
          </div>
        </Workspace>

        {/* Date -> timestamp */}
        <Workspace>
          <Field label="Date → timestamp" htmlFor="dt">
            <Input
              id="dt"
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </Field>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDateInput(toLocalInput(new Date()))}
              className="text-[12.5px] font-medium text-[var(--accent-text)] hover:underline"
            >
              Use now
            </button>
          </div>
          <div className="mt-4">
            {!dateInput ? (
              <Callout>Pick a date and time to get its Unix timestamp.</Callout>
            ) : fromDate ? (
              <div className="animate-rise">
                <Row label="Seconds" value={String(fromDate.seconds)} />
                <Row label="Milliseconds" value={String(fromDate.ms)} />
                <div className="mt-3 flex gap-2">
                  <CopyButton size="sm" value={() => String(fromDate.seconds)} label="Copy seconds" event="timestamp-converter" />
                  <CopyButton size="sm" variant="ghost" value={() => String(fromDate.ms)} label="Copy ms" event="timestamp-converter" />
                </div>
              </div>
            ) : null}
          </div>
        </Workspace>
      </div>
    </div>
  );
}

function relativeTime(diffMs: number): string {
  const abs = Math.abs(diffMs);
  const sec = Math.round(abs / 1000);
  const past = diffMs < 0;
  const units: [number, string][] = [
    [31_536_000, "year"],
    [2_592_000, "month"],
    [86_400, "day"],
    [3_600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];
  for (const [s, name] of units) {
    if (sec >= s) {
      const v = Math.floor(sec / s);
      return past ? `${v} ${name}${v === 1 ? "" : "s"} ago` : `in ${v} ${name}${v === 1 ? "" : "s"}`;
    }
  }
  return "just now";
}
