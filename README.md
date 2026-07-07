# Ganesh Pirikirala — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm test
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — API key from [resend.com](https://resend.com) for the contact form
- `CONTACT_EMAIL_TO` — the inbox that should receive contact form submissions
- `VISITOR_LOG_DIR` (optional) — directory for the visitor counter's log file. Defaults to
  `./.visitor-data` locally; set to `/app/.visitor-data` in Docker (see "Visitor Counter" below).

## Visitor Counter

Each site visit is appended as a line (timestamp, page, user agent, IP) to a plain-text log file, and
the nav bar shows a running count next to an eye icon. The count comes from `getVisitCount()` in
[lib/visitorLog.ts](lib/visitorLog.ts), which just counts lines in that file.

**This only works for the Docker deployment**, not Vercel: Vercel's serverless functions have a
read-only, ephemeral filesystem, so writes wouldn't persist between requests or across instances. If
you ever move the primary deployment to Vercel, swap this for a real datastore (Upstash Redis, Vercel
KV, etc.) instead.

When running via Docker, mount a volume at `/app/.visitor-data` so the log file survives container
restarts and redeploys — see the `docker run` command below.

## Continuous Integration

`.github/workflows/ci.yml` runs on every push and pull request to `main`: install, lint, type check,
test, and build. This is a quality gate — it does not deploy anything.

## Deployment (Vercel)

Deployed on [Vercel](https://vercel.com), which deploys automatically on every push to `main` once the
repo is connected — no GitHub Actions needed for the deploy itself:

1. Push this repo to GitHub (see below) if you haven't already.
2. In the [Vercel dashboard](https://vercel.com/new), import the GitHub repository.
3. Framework preset is auto-detected as Next.js — leave build settings as default.
4. Under Project Settings → Environment Variables, add:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL_TO`
5. Deploy. From then on, every push to `main` triggers a new production deployment automatically, and
   every pull request gets its own preview deployment.

Note: the visitor counter (see above) does not persist correctly on Vercel — it will undercount or
reset unexpectedly because the filesystem isn't durable across serverless invocations.

## Running with Docker

A multi-stage `Dockerfile` is included for self-hosting outside Vercel (e.g. on a VPS or another cloud
provider). It builds Next.js's `standalone` output for a small final image. A named volume is mounted
at `/app/.visitor-data` so the visitor log survives container restarts.

```bash
docker build -t portfolio .
docker run -p 3000:3000 \
  -e RESEND_API_KEY=your_key \
  -e CONTACT_EMAIL_TO=your_email \
  -v portfolio-visitor-data:/app/.visitor-data \
  portfolio
```

Then open `http://localhost:3000`.
