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

## Deployment

Deployed on [Vercel](https://vercel.com). Connect this repository in the Vercel dashboard and set the
same environment variables (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`) in the project's Environment Variables
settings.
