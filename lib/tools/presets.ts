import { fmt } from "@/lib/format";

/* ------------------------------------------------------------------ *
 * Timer duration landing pages — /timer/[preset]
 * High-intent, genuinely distinct queries ("5 minute timer") that the
 * biggest timer sites rank for. Each page pre-sets and auto-starts the
 * timer and has unique, duration-specific copy.
 * ------------------------------------------------------------------ */

const TIMER_SECONDS = [
  10, 15, 20, 30, 45, 60, 120, 180, 240, 300, 360, 420, 480, 600, 720, 900,
  1200, 1500, 1800, 2400, 2700, 3600, 5400, 7200,
];

const TIMER_USES: Record<number, string> = {
  10: "quick drills, countdowns and HIIT bursts",
  15: "sprint intervals and reaction drills",
  20: "plank holds and short intervals",
  30: "HIIT intervals, drills and quick rounds",
  45: "interval training and short exercises",
  60: "quick breaks, plank holds and brushing up",
  120: "brushing teeth, short meditation and rest intervals",
  180: "steeping tea, a soft-boiled egg and short breaks",
  240: "brewing coffee and short focus bursts",
  300: "a short break, steeping tea and guided breathing",
  360: "brewing tea and warm-ups",
  420: "steeping green tea and short workouts",
  480: "quick workouts and study warm-ups",
  600: "meditation, a quick workout and tidying up",
  720: "focused reading and short sessions",
  900: "a focused sprint and a power-nap wind-down",
  1200: "a nap, a study block or a workout",
  1500: "a Pomodoro focus session",
  1800: "workouts, cooking and study sessions",
  2400: "a deep-work block",
  2700: "a class period or a deep-work block",
  3600: "study sessions, cooking and meetings",
  5400: "a full sleep cycle or an exam",
  7200: "exams, long study sessions and events",
};

export interface TimerPreset {
  slug: string;
  seconds: number;
  ms: number;
  label: string; // "5 minutes"
  title: string; // "5 Minute Timer"
  uses: string;
}

function timerLabel(s: number): { slug: string; label: string; title: string } {
  if (s < 60) {
    return { slug: `${s}-seconds`, label: `${s} seconds`, title: `${s} Second Timer` };
  }
  if (s % 3600 === 0) {
    const h = s / 3600;
    return {
      slug: `${h}-hour${h > 1 ? "s" : ""}`,
      label: `${h} hour${h > 1 ? "s" : ""}`,
      title: `${h} Hour Timer`,
    };
  }
  const m = s / 60;
  return { slug: `${m}-minutes`, label: `${m} minutes`, title: `${m} Minute Timer` };
}

export const timerPresets: TimerPreset[] = TIMER_SECONDS.map((s) => {
  const { slug, label, title } = timerLabel(s);
  return {
    slug,
    seconds: s,
    ms: s * 1000,
    label,
    title,
    uses: TIMER_USES[s] ?? "focus sessions, cooking, workouts and breaks",
  };
});

export const timerPresetBySlug: Record<string, TimerPreset> = timerPresets.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<string, TimerPreset>,
);

/* ------------------------------------------------------------------ *
 * Percentage landing pages — /percentage-calculator/[calc]
 * A curated set of common "what is X% of Y" queries. Each page shows the
 * worked answer, the formula, the reverse, and a table of nearby values —
 * substantive and distinct, not a doorway page.
 * ------------------------------------------------------------------ */

const PERCENTS = [10, 15, 20, 25, 30, 40, 50];
const VALUES = [50, 100, 200, 500, 1000];

export interface PercentPreset {
  slug: string;
  percent: number;
  value: number;
  answer: number;
  title: string;
}

export const percentPresets: PercentPreset[] = PERCENTS.flatMap((percent) =>
  VALUES.map((value) => ({
    slug: `what-is-${percent}-percent-of-${value}`,
    percent,
    value,
    answer: (percent / 100) * value,
    title: `What is ${percent}% of ${value}?`,
  })),
);

export const percentPresetBySlug: Record<string, PercentPreset> =
  percentPresets.reduce(
    (acc, p) => {
      acc[p.slug] = p;
      return acc;
    },
    {} as Record<string, PercentPreset>,
  );

/** Values other than the current one, for the cross-link table on a percent page. */
export function percentSiblings(percent: number): PercentPreset[] {
  return percentPresets.filter((p) => p.percent === percent);
}

export function percentColumn(value: number): PercentPreset[] {
  return percentPresets.filter((p) => p.value === value);
}

export const fmtMoney = fmt;
