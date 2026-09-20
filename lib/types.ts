export type ChatRole = "user" | "assistant";

export interface ChatTurn {
  role: ChatRole;
  content: string;
}

export interface QueryFilters {
  chapter?: string | null;
  page_min?: number | null;
  page_max?: number | null;
}

export interface Source {
  chunk_id: string;
  chapter: string | null;
  chapter_title: string | null;
  section: string | null;
  page: number;
  start_page: number;
  end_page: number;
  label: string;
  snippet: string;
}

export interface QueryResponse {
  answer: string;
  sources: Source[];
  sufficient_evidence: boolean;
  standalone_query: string | null;
  retrieved_count: number;
  debug?: Record<string, unknown> | null;
}

export interface Message extends ChatTurn {
  id: string;
  sources?: Source[];
  sufficientEvidence?: boolean;
  pending?: boolean;
  error?: string;
  debug?: Record<string, unknown> | null;
}

export interface HealthResponse {
  status: string;
  chroma_ready: boolean;
  bm25_ready: boolean;
  ollama_ready: boolean;
  indexed_chunks: number;
}

export interface DocumentInfo {
  document: string;
  total_pages: number;
  total_chapters: number;
  total_chunks: number;
  ingested_at: string | null;
}
