"use client";

import { useEffect, useRef, useState } from "react";
import BookInfo from "@/components/BookInfo";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import FilterBar from "@/components/FilterBar";
import { ApiError, fetchDocuments, fetchHealth, sendQuery } from "@/lib/api";
import type { DocumentInfo, HealthResponse, Message, QueryFilters } from "@/lib/types";

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filters, setFilters] = useState<QueryFilters>({ chapter: null, page_min: null, page_max: null });
  const [pending, setPending] = useState(false);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [document, setDocument] = useState<DocumentInfo | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch(() => setHealth(null));
    fetchDocuments()
      .then((docs) => setDocument(docs[0] ?? null))
      .catch(() => setDocument(null));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (question: string) => {
    const userMessage: Message = { id: newId(), role: "user", content: question };
    const pendingId = newId();
    const pendingMessage: Message = { id: pendingId, role: "assistant", content: "", pending: true };

    const history = messages.map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, userMessage, pendingMessage]);
    setPending(true);

    try {
      const response = await sendQuery(question, history, filters);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId
            ? {
                ...m,
                pending: false,
                content: response.answer,
                sources: response.sources,
                sufficientEvidence: response.sufficient_evidence,
                debug: response.debug,
              }
            : m
        )
      );
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong contacting the backend.";
      setMessages((prev) =>
        prev.map((m) => (m.id === pendingId ? { ...m, pending: false, error: message } : m))
      );
    } finally {
      setPending(false);
    }
  };

  const notReady = health && (!health.chroma_ready || !health.bm25_ready);

  return (
    <main className="mx-auto flex h-screen max-w-3xl flex-col bg-slate-100 dark:bg-slate-950">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">BookRAG</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Answers are grounded only in retrieved passages, with citations.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={() => setMessages([])}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Clear conversation
          </button>
        )}
      </header>

      <BookInfo document={document} />
      <FilterBar filters={filters} onChange={setFilters} />

      {notReady && (
        <div className="mx-4 mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          The book hasn&apos;t been ingested yet. Run <code className="font-mono">make ingest</code> (or{" "}
          <code className="font-mono">POST /api/ingest</code>) before asking questions.
        </div>
      )}
      {health === null && (
        <div className="mx-4 mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
          Can&apos;t reach the BookRAG backend. Is it running?
        </div>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.length === 0 && (
          <p className="mt-10 text-center text-sm text-slate-400">
            Ask anything about the book — e.g. &quot;What does the book say about the migration to Medina?&quot;
          </p>
        )}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSubmit={handleSubmit} disabled={pending} />
    </main>
  );
}
