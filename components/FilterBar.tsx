"use client";

import { useState } from "react";
import type { QueryFilters } from "@/lib/types";

export default function FilterBar({
  filters,
  onChange,
}: {
  filters: QueryFilters;
  onChange: (filters: QueryFilters) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = !!(filters.chapter || filters.page_min != null || filters.page_max != null);

  return (
    <div className="border-b border-slate-200 bg-slate-50/60 px-4 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400"
      >
        Filters {active && <span className="rounded-full bg-slate-900 px-1.5 py-0.5 text-[10px] text-white dark:bg-slate-100 dark:text-slate-900">on</span>}
        <span>{open ? "⌃" : "⌄"}</span>
      </button>

      {open && (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            Chapter
            <input
              type="text"
              placeholder="e.g. Chapter III"
              value={filters.chapter ?? ""}
              onChange={(e) => onChange({ ...filters, chapter: e.target.value || null })}
              className="w-36 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800"
            />
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            Page {"≥"}
            <input
              type="number"
              value={filters.page_min ?? ""}
              onChange={(e) => onChange({ ...filters, page_min: e.target.value ? Number(e.target.value) : null })}
              className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800"
            />
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            Page {"≤"}
            <input
              type="number"
              value={filters.page_max ?? ""}
              onChange={(e) => onChange({ ...filters, page_max: e.target.value ? Number(e.target.value) : null })}
              className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800"
            />
          </label>
          {active && (
            <button
              type="button"
              onClick={() => onChange({ chapter: null, page_min: null, page_max: null })}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}
