"use client";

/**
 * Tiny, dependency-free SVG charts. Kept deliberately minimal so tool pages
 * stay fast and the bundle doesn't grow. Both are client-rendered, so the
 * "runs in your browser" promise holds. Each is labelled for accessibility.
 */
import { useId } from "react";

export interface Segment {
  label: string;
  value: number;
  color: string;
}

/** Donut chart with a centered total and a legend. */
export function DonutChart({
  segments,
  centerLabel,
  centerValue,
  ariaLabel,
  size = 180,
}: {
  segments: Segment[];
  centerLabel?: string;
  centerValue?: string;
  ariaLabel: string;
  size?: number;
}) {
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0);
  const stroke = 22;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;

  let offset = 0;
  const arcs = segments
    .filter((s) => s.value > 0)
    .map((s) => {
      const frac = total > 0 ? s.value / total : 0;
      const dash = frac * circ;
      const arc = {
        color: s.color,
        dashArray: `${dash} ${circ - dash}`,
        dashOffset: -offset,
      };
      offset += dash;
      return arc;
    });

  return (
    <figure className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={ariaLabel}
        className="shrink-0"
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {arcs.map((a, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={a.color}
              strokeWidth={stroke}
              strokeDasharray={a.dashArray}
              strokeDashoffset={a.dashOffset}
            />
          ))}
        </g>
        {centerValue ? (
          <text x={cx} y={cy - 2} textAnchor="middle" className="fill-ink" style={{ fontSize: 22, fontWeight: 600 }}>
            {centerValue}
          </text>
        ) : null}
        {centerLabel ? (
          <text x={cx} y={cy + 16} textAnchor="middle" className="fill-faint" style={{ fontSize: 10, letterSpacing: "0.08em" }}>
            {centerLabel.toUpperCase()}
          </text>
        ) : null}
      </svg>
      <figcaption className="flex w-full flex-col gap-2">
        {segments
          .filter((s) => s.value > 0)
          .map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 text-[13px]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: s.color }} />
              <span className="flex-1 text-ink-soft">{s.label}</span>
              <span className="tabular font-medium text-ink">
                {total > 0 ? Math.round((s.value / total) * 100) : 0}%
              </span>
            </div>
          ))}
      </figcaption>
    </figure>
  );
}

export interface SeriesPoint {
  x: number;
  contributions: number;
  total: number;
}

/**
 * Stacked area chart: contributions (base) + interest (the gap up to total),
 * over time. Used by the compound-interest tool.
 */
export function GrowthAreaChart({
  data,
  ariaLabel,
  xLabel,
  height = 200,
}: {
  data: SeriesPoint[];
  ariaLabel: string;
  xLabel?: string;
  height?: number;
}) {
  const gid = useId();
  const w = 520;
  const h = height;
  const padX = 8;
  const padY = 10;
  if (data.length < 2) return null;

  const maxY = Math.max(...data.map((d) => d.total)) || 1;
  const minX = data[0].x;
  const maxX = data[data.length - 1].x;
  const spanX = maxX - minX || 1;

  const sx = (x: number) => padX + ((x - minX) / spanX) * (w - padX * 2);
  const sy = (y: number) => h - padY - (y / maxY) * (h - padY * 2);

  const line = (key: "total" | "contributions") =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${sx(d.x).toFixed(1)},${sy(d[key]).toFixed(1)}`).join(" ");

  const totalArea = `${line("total")} L${sx(maxX)},${h - padY} L${sx(minX)},${h - padY} Z`;
  const contribArea = `${line("contributions")} L${sx(maxX)},${h - padY} L${sx(minX)},${h - padY} Z`;

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={ariaLabel} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${gid}-int`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* interest fill = area up to total */}
        <path d={totalArea} fill={`url(#${gid}-int)`} />
        {/* contributions fill on top of the base */}
        <path d={contribArea} fill="var(--surface-inset)" />
        {/* lines */}
        <path d={line("total")} fill="none" stroke="var(--accent)" strokeWidth="2" />
        <path d={line("contributions")} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
      <figcaption className="mt-2 flex items-center justify-between text-[12px] text-faint">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-sm" style={{ background: "var(--accent)" }} /> Balance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-sm border border-border-strong" /> Contributions
          </span>
        </span>
        {xLabel ? <span>{xLabel}</span> : null}
      </figcaption>
    </figure>
  );
}
