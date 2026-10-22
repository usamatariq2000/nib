import type { SVGProps } from "react";

/**
 * A small, deliberately-drawn monoline icon set. One glyph per tool concept,
 * keyed by the `icon` field in the registry. Stroke-based, inherits color.
 */
const glyphs: Record<string, React.ReactNode> = {
  home: (
    <>
      <path d="M3.5 9.5 10 4l6.5 5.5" />
      <path d="M5 8.5v7.5h10V8.5" />
      <rect x="8.5" y="11.5" width="3" height="4.5" />
    </>
  ),
  bank: (
    <>
      <path d="M3.5 7.5 10 4l6.5 3.5" />
      <line x1="3.5" y1="7.5" x2="16.5" y2="7.5" />
      <line x1="5.5" y1="9" x2="5.5" y2="14" />
      <line x1="8.5" y1="9" x2="8.5" y2="14" />
      <line x1="11.5" y1="9" x2="11.5" y2="14" />
      <line x1="14.5" y1="9" x2="14.5" y2="14" />
      <line x1="4" y1="16" x2="16" y2="16" />
    </>
  ),
  growth: (
    <>
      <path d="M3.5 14 8 9.5l2.5 2.5L16.5 6" />
      <path d="M12.5 6h4v4" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3.5h10v13l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2V3.5Z" />
      <line x1="7.5" y1="7" x2="12.5" y2="7" />
      <line x1="7.5" y1="10" x2="12.5" y2="10" />
    </>
  ),
  percent: (
    <>
      <line x1="5" y1="15" x2="15" y2="5" />
      <circle cx="6.5" cy="6.5" r="1.75" />
      <circle cx="13.5" cy="13.5" r="1.75" />
    </>
  ),
  cake: (
    <>
      <path d="M4 16.5h12" />
      <path d="M4.5 16.5v-4.5a1.5 1.5 0 0 1 1.5-1.5h8a1.5 1.5 0 0 1 1.5 1.5v4.5" />
      <path d="M10 10V6.5" />
      <circle cx="10" cy="4.5" r="0.6" fill="currentColor" stroke="none" />
      <path d="M4.5 13.2c1.2 1 2.2 1 3.4 0s2.2-1 3.4 0 2.2 1 3.4 0" />
    </>
  ),
  ratio: (
    <>
      <rect x="3.5" y="6" width="13" height="8" rx="1" />
      <line x1="9" y1="6" x2="9" y2="14" />
    </>
  ),
  tag: (
    <>
      <path d="M10.5 3.5H15a1.5 1.5 0 0 1 1.5 1.5v4.5L9 17 3 11l7.5-7.5Z" />
      <circle cx="12.75" cy="7.25" r="1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="4.5" width="13" height="12" rx="1.5" />
      <line x1="3.5" y1="8" x2="16.5" y2="8" />
      <line x1="7" y1="3" x2="7" y2="6" />
      <line x1="13" y1="3" x2="13" y2="6" />
    </>
  ),
  braces: (
    <>
      <path d="M8 4c-1.6 0-2 .9-2 2.2 0 1.3.2 2.6-1.4 3.8 1.6 1.2 1.4 2.5 1.4 3.8C6 15.1 6.4 16 8 16" />
      <path d="M12 4c1.6 0 2 .9 2 2.2 0 1.3-.2 2.6 1.4 3.8-1.6 1.2-1.4 2.5-1.4 3.8 0 1.3-.4 2.2-2 2.2" />
    </>
  ),
  hash: (
    <>
      <line x1="7" y1="4" x2="5.5" y2="16" />
      <line x1="14.5" y1="4" x2="13" y2="16" />
      <line x1="4" y1="7.5" x2="16" y2="7.5" />
      <line x1="4" y1="12.5" x2="16" y2="12.5" />
    </>
  ),
  binary: (
    <>
      <rect x="3.5" y="4" width="5" height="5" rx="0.8" />
      <rect x="11.5" y="11" width="5" height="5" rx="0.8" />
      <path d="M13 4h1.5v5" />
      <path d="M5 11h1.5v5" />
    </>
  ),
  link: (
    <>
      <path d="M8.5 11.5 11.5 8.5" />
      <path d="M9 6.5l1-1a2.8 2.8 0 0 1 4 4l-1 1" />
      <path d="M11 13.5l-1 1a2.8 2.8 0 0 1-4-4l1-1" />
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M10 6.5V10l2.5 1.5" />
    </>
  ),
  text: (
    <>
      <line x1="4.5" y1="6" x2="15.5" y2="6" />
      <line x1="4.5" y1="10" x2="15.5" y2="10" />
      <line x1="4.5" y1="14" x2="11" y2="14" />
    </>
  ),
  type: (
    <>
      <path d="M5 6.5V5h10v1.5" />
      <line x1="10" y1="5" x2="10" y2="15" />
      <line x1="7.5" y1="15" x2="12.5" y2="15" />
    </>
  ),
  diff: (
    <>
      <path d="M7 4v6" />
      <path d="M4 7h6" />
      <line x1="11" y1="14" x2="16" y2="14" />
      <path d="M12.5 4.5 15.5 7.5 8 15h-3v-3l7.5-7.5Z" />
    </>
  ),
  list: (
    <>
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="16" y2="14" />
      <circle cx="4.75" cy="6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="4.75" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="4.75" cy="14" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  dice: (
    <>
      <rect x="4" y="4" width="12" height="12" rx="2.5" />
      <circle cx="7.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="10" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="12.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="12.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  coin: (
    <>
      <ellipse cx="10" cy="10" rx="6.5" ry="6.5" />
      <path d="M8 8.5c0-1 .9-1.5 2-1.5s2 .6 2 1.4c0 1.6-2 1.1-2 2.6" />
      <circle cx="10" cy="13" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  timer: (
    <>
      <circle cx="10" cy="11" r="6" />
      <path d="M10 11V7.5" />
      <line x1="8" y1="3.5" x2="12" y2="3.5" />
      <line x1="15" y1="6" x2="16" y2="5" />
    </>
  ),
  stopwatch: (
    <>
      <circle cx="10" cy="11" r="5.5" />
      <path d="M10 11 12.5 8.5" />
      <line x1="8.5" y1="3.5" x2="11.5" y2="3.5" />
      <line x1="10" y1="3.5" x2="10" y2="5.5" />
    </>
  ),
};

interface ToolIconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

export function ToolIcon({ name, size = 20, ...rest }: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {glyphs[name] ?? glyphs.percent}
    </svg>
  );
}
