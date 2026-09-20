import type { Message } from "@/lib/types";
import SourceCard from "./SourceCard";

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            : message.error
            ? "border border-red-200 bg-red-50 text-red-800"
            : message.sufficientEvidence === false
            ? "border border-amber-200 bg-amber-50 text-amber-900"
            : "border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        }`}
      >
        {message.pending ? (
          <span className="inline-flex items-center gap-1 text-slate-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:300ms]" />
          </span>
        ) : (
          <p className="whitespace-pre-wrap">{message.error ?? message.content}</p>
        )}

        {!!message.sources?.length && (
          <div className="mt-3 border-t border-slate-200/70 pt-2 dark:border-slate-700">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Sources
            </p>
            <div className="space-y-1.5">
              {message.sources.map((s) => (
                <SourceCard key={s.chunk_id} source={s} />
              ))}
            </div>
          </div>
        )}

        {!!message.debug && (
          <details className="mt-3 border-t border-slate-200/70 pt-2 text-[11px] text-slate-400 dark:border-slate-700">
            <summary className="cursor-pointer select-none font-semibold uppercase tracking-wide">
              Debug info
            </summary>
            <pre className="mt-1.5 max-h-64 overflow-auto rounded-md bg-slate-50 p-2 dark:bg-slate-800">
              {JSON.stringify(message.debug, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
