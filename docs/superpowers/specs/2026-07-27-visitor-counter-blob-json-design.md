# Visitor Counter: Switch to JSON-backed Storage via Vercel Blob

## Context

The portfolio already has a working visitor counter (added in a prior commit): `components/VisitorCounter.tsx` displays a count in the nav, backed by `app/api/visits/route.ts` and `lib/visitorLog.ts`. Today `lib/visitorLog.ts` stores raw visit lines in a tab-separated log file (`.visitor-data/visits.log`) on local disk.

The user wants the storage to be a JSON file instead of a line-oriented log, tracking just a total visit count (similar in spirit to a "profile view counter").

The site deploys to **Vercel**, where serverless functions have a read-only filesystem outside `/tmp`, and `/tmp` does not persist across invocations or deploys. A plain JSON file written to the repo directory would work locally but silently fail to persist in production. To get real JSON-file semantics that actually persist, this design uses **Vercel Blob** as the storage backend for a single JSON file, rather than local disk.

## Goals

- Store the visit count as JSON: `{ "count": number }`.
- Storage must persist correctly in the real Vercel production deployment, not just in local dev.
- Same code path for local dev and production (no separate local-only fallback branch).
- Preserve existing behavior: one increment per browser session (via `sessionStorage`), count displayed in the nav, silent no-render on failure.

## Non-goals

- Per-page breakdown, visit history, or any analytics beyond a single total count.
- Perfect concurrency correctness. Vercel Blob has no atomic increment; under simultaneous requests, a read-modify-write race could drop an increment. This is an accepted tradeoff given the traffic level of a personal portfolio site — not something this design engineers around.

## Architecture

Replace the log-file storage in `lib/visitorLog.ts` with `@vercel/blob`, storing a single JSON blob at a fixed pathname (e.g. `visitor-count.json`), written with `addRandomSuffix: false` and `allowOverwrite: true` so the same URL is reused across writes.

`app/api/visits/route.ts` and `components/VisitorCounter.tsx` are unchanged — only the internals of `lib/visitorLog.ts` change (function signatures/behavior stay the same: `getVisitCount()` returns a number, `logVisit(...)` records a visit and returns the new count).

## Data flow

1. Visitor loads a page. `VisitorCounter` checks `sessionStorage` for `ganesh-dev-visited` (unchanged).
2. **New session:** `POST /api/visits` → `logVisit()`:
   - Fetch `visitor-count.json` from its known Blob URL.
   - If not found (first-ever visit), treat current count as `0`.
   - Parse JSON, increment `count`, `put()` the updated JSON back to the same pathname.
   - Return the new count.
3. **Returning session (already visited this browser session):** `GET /api/visits` → `getVisitCount()`:
   - Fetch and parse the same JSON blob.
   - Return `count` (or `0` if the blob doesn't exist yet).

## Error handling

Unchanged contract with the API route: any failure in the storage layer (fetch error, malformed JSON, blob write failure) causes `app/api/visits/route.ts` to catch and return `{ count: null }` with a non-2xx status, exactly as it does today. `VisitorCounter` already treats `count === null` as "render nothing," so storage hiccups never break the nav bar.

## Setup required

Vercel Blob is not yet enabled on this project. Before/alongside implementation:

1. Enable Blob storage for this project in the Vercel dashboard (Storage tab).
2. Add `@vercel/blob` as a project dependency.
3. Pull the resulting `BLOB_READ_WRITE_TOKEN` into local `.env.local` via `vercel env pull .env.local` so local dev exercises the same code path as production.
4. Ensure `.env.local` remains gitignored (already covered by the existing `.env*.local` rule).

## Testing

- Unit tests for `lib/visitorLog.ts`, mocking `@vercel/blob`'s `put` and the fetch-by-URL read:
  - First-ever visit: no existing blob → count starts at 0, increments to 1.
  - Normal increment: existing `{ "count": N }` blob → increments to `N + 1`.
  - Read failure (fetch throws / blob missing after first write) → propagates as an error the API route catches, resulting in `{ count: null }`.
- Existing tests for `VisitorCounter.tsx` and `app/api/visits/route.ts` should continue to pass unmodified, since their contracts with `lib/visitorLog.ts` don't change.

## Out of scope / follow-ups (not part of this change)

- `.visitor-data/` local log directory and its `.gitignore` entry become unused once this ships; removing them is a small cleanup that can happen as part of implementation but isn't a design concern.
