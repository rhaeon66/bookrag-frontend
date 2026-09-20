"use client";

import { useState } from "react";
import type { Source } from "@/lib/types";

export default function SourceCard({ source }: { source: Source }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-xs shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-800 dark:text-slate-100">
            {source.chapter ?? "Untitled"} <span className="text-slate-400">·</span> Page {source.page}
          </p>
          {source.section && (
            <p className="truncate text-slate-500 dark:text-slate-400">Section: {source.section}</p>
          )}
        </div>
        <span className="shrink-0 text-slate-400">{expanded ? "−" : "+"}</span>
      </div>

      {expanded && (
        <div className="mt-2 space-y-1.5 border-t border-slate-100 pt-2 dark:border-slate-800">
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">{source.snippet}</p>
          <p className="font-mono text-[10px] text-slate-400">{source.chunk_id}</p>
        </div>
      )}
    </button>
  );
}
