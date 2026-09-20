# bookrag-frontend

The chat UI for **BookRAG** — ask questions about a book and get answers
grounded only in retrieved passages, with citations. Talks to the companion
API at [bookrag-backend](https://github.com/rhaeon66/bookrag-backend).

Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- Chat interface with conversation history and a clear-conversation button
- Book info panel (title, page/chapter counts, pulled from the backend)
- Source cards per answer — chapter, section, page, and an expandable
  snippet of the retrieved passage
- Chapter/page-range filters
- Loading and error states, including a clear message when the backend or
  its local LLM isn't reachable
- Debug panel (shown when the backend response includes one) with the
  retrieval trace and per-stage latency

## Getting started

Requires the [bookrag-backend](https://github.com/rhaeon66/bookrag-backend)
API running (default `http://localhost:8000`), with a book already ingested.

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_BASE_URL if the backend isn't on :8000
npm run dev
```

Open http://localhost:3000.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # next lint
```

## Layout

```
app/
├── layout.tsx     # root layout, metadata
├── page.tsx        # main chat page
└── globals.css      # Tailwind entrypoint
components/
├── ChatMessage.tsx   # a single chat bubble (user or assistant), incl. sources/debug
├── ChatInput.tsx      # message input box
├── SourceCard.tsx      # one expandable citation card
├── BookInfo.tsx          # book title/page count panel
└── FilterBar.tsx          # chapter/page-range filters
lib/
├── api.ts          # typed fetch wrappers for the backend API (/api/*)
└── types.ts          # shared request/response types, mirroring the backend schemas
```

## Configuration

Only one environment variable: `NEXT_PUBLIC_API_BASE_URL`, the base URL of
the bookrag-backend API (see `.env.example`). Note this is inlined into the
client bundle at build/dev-server start — restart `npm run dev` after
changing it.
