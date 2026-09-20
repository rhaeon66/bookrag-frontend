import type { DocumentInfo } from "@/lib/types";

export default function BookInfo({ document }: { document: DocumentInfo | null }) {
  if (!document) return null;

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      <span className="font-medium text-slate-700 dark:text-slate-200">&quot;{document.document}&quot;</span>
      <span>
        {document.total_pages} pages · {document.total_chapters} chapters
      </span>
    </div>
  );
}
