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

## Running with Docker

A multi-stage `Dockerfile` is included for self-hosting outside Vercel (e.g. on a VPS or another cloud
provider). It builds Next.js's `standalone` output for a small final image.

```bash
docker build -t portfolio .
docker run -p 3000:3000 \
  -e RESEND_API_KEY=your_key \
  -e CONTACT_EMAIL_TO=your_email \
  portfolio
```

Then open `http://localhost:3000`.
