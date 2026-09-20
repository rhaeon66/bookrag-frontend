import type { ChatTurn, DocumentInfo, HealthResponse, QueryFilters, QueryResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const API_PREFIX = "/api";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${API_PREFIX}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.detail || `Request failed (${res.status})`, res.status);
  }
  return res.json() as Promise<T>;
}

export function fetchHealth(): Promise<HealthResponse> {
  return request<HealthResponse>("/health");
}

export function fetchDocuments(): Promise<DocumentInfo[]> {
  return request<DocumentInfo[]>("/documents");
}

export function sendQuery(
  query: string,
  chatHistory: ChatTurn[],
  filters?: QueryFilters,
  options?: { rerank?: boolean; topK?: number; debug?: boolean }
): Promise<QueryResponse> {
  return request<QueryResponse>("/query", {
    method: "POST",
    body: JSON.stringify({
      query,
      chat_history: chatHistory,
      filters: filters && (filters.chapter || filters.page_min != null || filters.page_max != null) ? filters : null,
      rerank: options?.rerank ?? null,
      top_k: options?.topK ?? null,
      debug: options?.debug ?? null,
    }),
  });
}

export function ingestBook(): Promise<unknown> {
  return request("/ingest", { method: "POST" });
}
