"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { useToolOpen } from "@/lib/useToolOpen";

function computeStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed ? (trimmed.match(/[^.!?…]+[.!?…]+(\s|$)|[^.!?…]+$/g) || []).length : 0;
  const paragraphs = trimmed ? trimmed.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).length : 0;
  const readingSeconds = Math.round((words / 220) * 60);
  const speakingSeconds = Math.round((words / 130) * 60);
  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingSeconds, speakingSeconds };
}

function duration(totalSeconds: number): string {
  if (totalSeconds <= 0) return "0 sec";
  if (totalSeconds < 60) return `${totalSeconds} sec`;
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return s ? `${m} min ${s} sec` : `${m} min`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-3">
      <span className="tabular text-[22px] font-semibold leading-none tracking-[-0.01em] text-ink">
        {value}
      </span>
      <span className="text-[11.5px] font-medium uppercase tracking-[0.05em] text-faint">
        {label}
      </span>
    </div>
  );
}

export function WordCounter() {
  useToolOpen("word-counter");
  const [text, setText] = useState("");
  const s = useMemo(() => computeStats(text), [text]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow)]">
      <div className="flex items-center justify-between border-b border-border bg-surface-inset px-3 py-2">
        <span className="pl-1 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
          Write or paste
        </span>
        <div className="flex items-center gap-2">
          <CopyButton size="sm" variant="ghost" value={() => text} disabled={!text} event="word-counter" />
          <Button size="sm" variant="ghost" onClick={() => setText("")} disabled={!text}>
            Clear
          </Button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text…"
        aria-label="Text to count"
        spellCheck
        className="scroll-thin h-[300px] w-full resize-y bg-surface px-5 py-4 text-[15px] leading-relaxed text-ink outline-none placeholder:text-faint sm:h-[380px]"
      />

      <div className="grid grid-cols-2 divide-x divide-y divide-border border-t border-border sm:grid-cols-4 lg:grid-cols-7">
        <Stat label="Words" value={s.words.toLocaleString()} />
        <Stat label="Characters" value={s.characters.toLocaleString()} />
        <Stat label="No spaces" value={s.charactersNoSpaces.toLocaleString()} />
        <Stat label="Sentences" value={s.sentences.toLocaleString()} />
        <Stat label="Paragraphs" value={s.paragraphs.toLocaleString()} />
        <Stat label="Reading" value={duration(s.readingSeconds)} />
        <Stat label="Speaking" value={duration(s.speakingSeconds)} />
      </div>
    </div>
  );
}
