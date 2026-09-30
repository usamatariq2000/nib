/** Format a number for display: group thousands, trim trailing zeros. */
export function fmt(n: number, maxDecimals = 6): string {
  if (!Number.isFinite(n)) return "—";
  const rounded = Number(n.toFixed(maxDecimals));
  return rounded.toLocaleString("en-US", {
    maximumFractionDigits: maxDecimals,
  });
}

/** Parse a possibly-empty numeric input; returns null when blank/invalid. */
export function parseNum(value: string): number | null {
  const t = value.trim();
  if (t === "") return null;
  const n = Number(t.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

/** Pluralize helper: plural(1, "day") -> "1 day", plural(2, "day") -> "2 days". */
export function plural(n: number, word: string, suffix = "s"): string {
  return `${n.toLocaleString("en-US")} ${word}${n === 1 ? "" : suffix}`;
}

/** Cryptographically strong integer in [min, max] inclusive. */
export function secureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  if (range <= 0) return min;
  const maxUint = 0xffffffff;
  const limit = maxUint - ((maxUint + 1) % range);
  const buf = new Uint32Array(1);
  let x = 0;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x > limit);
  return min + (x % range);
}
