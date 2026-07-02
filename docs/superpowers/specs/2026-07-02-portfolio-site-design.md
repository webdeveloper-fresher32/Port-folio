# Portfolio Site Design

**Date:** 2026-07-02
**Status:** Approved

## Purpose

A personal portfolio website for Ganesh Pirikirala, primarily to support landing a full-time software engineering role. Content is sourced from his current resume (experience, skills, projects, education).

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Deployed on Vercel

## Visual Style

Dark/technical theme:
- Background: `#0a0a0f` (page), `#111114` (panels/cards)
- Text: `#e5e5e5` primary, `#9ca3af` / `#71717a` secondary/muted
- Accent: `#6ee7b7` (green), used for labels, links, highlighted tags
- Borders: `#27272a` / `#374151`
- Typography: monospace for small labels/tags/code-like details (e.g. `$ whoami`), clean sans-serif for body copy and headings
- Terminal-inspired but readable — not a full terminal emulator gimmick

## Site Structure (multi-page)

Persistent top nav (Home / Projects / Experience / Contact) and footer (social links: GitHub, LinkedIn, email) on every page.

### `/` — Home
- Hero: name, role/title, one-line pitch, CTA buttons (View Projects, Resume download, Contact)
- About / Summary (from resume summary section)
- Skills grid (Languages, Frameworks, Backend, Databases, Cloud & DevOps, Tools, Core CS)
- Teaser: 2-3 top featured projects (cards linking to `/projects`)
- Teaser: current/latest role summary (linking to `/experience`)

### `/projects`
- Featured section: full case-study cards for the 3 projects with live links/public artifacts:
  - Stripe Subscription Platform (Cognitivo)
  - Developer Analytics Platform (Cognitivo)
  - Marketing Website & Headless CMS (Cognitivo)
- Side projects grid (smaller cards): ZetFlix Movie App, LetsChat-App, E-Commerce Store — each links to live demo + source code

### `/projects/[slug]`
Individual case study page per featured project, containing:
- Problem/context
- Tech stack used
- Key features (from resume bullets)
- Live link
- Screenshot/mockup placeholder (styled browser-frame graphic in the dark theme; swappable for a real screenshot later)

### `/experience`
Full reverse-chronological timeline of all 5 roles:
- Cognitivo | Full-Stack Software Developer (Aug 2025 – Present)
- Northgaze Inc | SDE Freelance (Jan 2025 – Aug 2025)
- Contenterra Software | Associate Software Developer (Sep 2024 – June 2025)
- Venkys IO | Associate Software Developer (March 2024 – August 2024)

Each entry shows role, company, dates, and bullet highlights from the resume. The 3 Cognitivo projects without public links (AI Document & Meeting Intelligence Platform, Enterprise Collaboration Platform) are included here as sub-bullets rather than as standalone project cards.

### `/contact`
- Working contact form that sends an email via Resend (or Formspree as fallback if Resend setup is a blocker) — requires an API key set as an environment variable
- Direct links: email (mailto), phone, LinkedIn, GitHub

## Data Approach

Resume content lives in typed TypeScript data files, separate from presentation components:
- `data/experience.ts` — array of role objects (company, title, dates, bullets)
- `data/projects.ts` — array of project objects (slug, name, description, tech stack, links, featured flag)
- `data/skills.ts` — skills grouped by category

Components read from these files rather than hardcoding resume content into JSX, so future resume updates are a data edit, not a component rewrite.

## Explicitly Out of Scope (v1)

- Blog
- Light/dark theme toggle
- CMS or admin panel
- Analytics dashboard

## Open Items for Implementation Planning

- Choice between Resend vs Formspree for the contact form (Resend preferred; needs API key)
- Final resume PDF file for the "Resume download" CTA
- Real screenshots for featured projects (placeholders used until provided)
