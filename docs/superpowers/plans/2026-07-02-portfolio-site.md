# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page Next.js portfolio site for Ganesh Pirikirala, sourced from his resume, in the dark/technical visual style, deployable to Vercel.

**Architecture:** Next.js App Router site with typed data files (`data/*.ts`) separated from presentation components. Pure helper functions (`lib/*.ts`) handle lookups and validation and are unit tested with Vitest. Presentational components are tested with Vitest + React Testing Library where they contain logic (conditional rendering, data mapping); purely static markup is verified by a build + manual check instead of a redundant snapshot test. The contact form posts to a Next.js API route that calls Resend to deliver email.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Vitest, @testing-library/react, Resend (transactional email), deployed on Vercel.

---

## File Structure

```
portfolio/
  app/
    layout.tsx                    # Root layout: Nav + Footer + global styles
    page.tsx                      # Home page
    globals.css                   # Tailwind directives + theme tokens
    projects/
      page.tsx                    # Projects listing page
      [slug]/
        page.tsx                  # Project detail page
    experience/
      page.tsx                    # Experience timeline page
    contact/
      page.tsx                    # Contact page
    api/
      contact/
        route.ts                  # POST handler, calls lib/sendContactEmail
  components/
    Nav.tsx
    Nav.test.tsx
    Footer.tsx
    SkillsGrid.tsx
    SkillsGrid.test.tsx
    ProjectCard.tsx
    ProjectCard.test.tsx
    ExperienceEntry.tsx
    ExperienceEntry.test.tsx
    ContactForm.tsx
    ContactForm.test.tsx
  data/
    types.ts                      # Shared TS types (Project, ExperienceRole, SkillCategory)
    projects.ts
    projects.test.ts
    experience.ts
    skills.ts
  lib/
    getProjectBySlug.ts
    getProjectBySlug.test.ts
    validateContactForm.ts
    validateContactForm.test.ts
    sendContactEmail.ts
    sendContactEmail.test.ts
  public/
    resume.pdf                    # placeholder until real PDF is dropped in
  vitest.config.ts
  vitest.setup.ts
  package.json
  tsconfig.json
  tailwind.config.ts
  postcss.config.js
  next.config.js
  .env.local.example
  .gitignore
  README.md
```

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.js`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

- [ ] **Step 1: Initialize git and Next.js app**

```bash
cd /Users/ganeshpirikirala/Desktop/PortFolio
git init
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*" --use-npm
```

When prompted, accept defaults (App Router: yes, `src/` directory: no, import alias `@/*`).

- [ ] **Step 2: Verify the scaffold builds and runs**

Run: `npm run dev`
Expected: Server starts on `http://localhost:3000`, default Next.js welcome page loads. Stop the server (Ctrl+C) once confirmed.

- [ ] **Step 3: Install test tooling**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 4: Add Vitest config**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

Create `vitest.setup.ts`:

```typescript
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Add test script to package.json**

Modify `package.json` scripts block to add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Verify test runner works with a throwaway test**

Create `sanity.test.ts` (temporary, delete after this step):

```typescript
import { describe, it, expect } from 'vitest'

describe('sanity', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

Run: `npm test`
Expected: `1 passed`

Delete `sanity.test.ts`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with Tailwind and Vitest"
```

---

### Task 2: Define shared data types

**Files:**
- Create: `data/types.ts`

- [ ] **Step 1: Write the types**

```typescript
export interface ExperienceRole {
  company: string
  title: string
  startDate: string // e.g. "Aug 2025"
  endDate: string // e.g. "Present"
  bullets: string[]
}

export interface Project {
  slug: string
  name: string
  company: string | null // null for personal projects
  oneLiner: string
  description: string
  techStack: string[]
  features: string[]
  liveUrl: string | null
  sourceUrl: string | null
  featured: boolean
}

export interface SkillCategory {
  label: string
  skills: string[]
}
```

There's no test for a pure type declaration file (no runtime behavior to assert) — types are checked by `tsc` in later steps.

- [ ] **Step 2: Commit**

```bash
git add data/types.ts
git commit -m "feat: add shared data types"
```

---

### Task 3: Add project data with a validating test

**Files:**
- Create: `data/projects.ts`
- Test: `data/projects.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// data/projects.test.ts
import { describe, it, expect } from 'vitest'
import { projects } from './projects'

describe('projects data', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has exactly 3 featured projects', () => {
    expect(projects.filter((p) => p.featured).length).toBe(3)
  })

  it('gives every featured project a live URL', () => {
    for (const project of projects.filter((p) => p.featured)) {
      expect(project.liveUrl).not.toBeNull()
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- projects.test.ts`
Expected: FAIL — `./projects` has no exported member `projects` (module doesn't exist yet)

- [ ] **Step 3: Write the data file**

```typescript
// data/projects.ts
import { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'stripe-subscription-platform',
    name: 'Stripe Subscription Platform',
    company: 'Cognitivo',
    oneLiner: 'Production-grade subscription billing with checkout, proration, and rollback-safe batch billing.',
    description:
      'Designed and built a production-grade Stripe subscription platform supporting checkout, webhook idempotency, per-seat proration, batch billing with transactional rollback, a usage-based free tier, automated billing workflows, and secure Terms of Service enforcement.',
    techStack: ['Node.js', 'TypeScript', 'Stripe', 'Express.js', 'MongoDB'],
    features: [
      'Checkout and webhook idempotency',
      'Per-seat proration',
      'Batch billing with transactional rollback',
      'Usage-based free tier',
      'Automated billing workflows',
      'Secure Terms of Service enforcement',
    ],
    liveUrl: 'https://app.prospo.ai',
    sourceUrl: null,
    featured: true,
  },
  {
    slug: 'developer-analytics-platform',
    name: 'Developer Analytics Platform',
    company: 'Cognitivo',
    oneLiner: 'AI-assisted commit analytics and repository insights across GitHub REST/GraphQL and OAuth.',
    description:
      'Architected and built a full-stack developer analytics platform using FastAPI, React, SQLite, GitHub REST/GraphQL APIs, OAuth, webhooks, and background synchronization, delivering AI-assisted commit analytics, real-time repository insights, and bi-directional Gantt-based project management.',
    techStack: ['FastAPI', 'React', 'SQLite', 'GitHub REST/GraphQL API', 'OAuth'],
    features: [
      'AI-assisted commit analytics',
      'Real-time repository insights',
      'Bi-directional Gantt-based project management',
      'Background synchronization via webhooks',
    ],
    liveUrl: 'https://app-devanalytics-dev.azurewebsites.net/',
    sourceUrl: null,
    featured: true,
  },
  {
    slug: 'marketing-website-cms',
    name: 'Marketing Website & Headless CMS',
    company: 'Cognitivo',
    oneLiner: 'Full-stack marketing site with a headless CMS driving blog, events, and job workflows.',
    description:
      'Architected and built a full-stack marketing website and headless CMS using Next.js (App Router, React 19), PayloadCMS, MongoDB, and Azure (Blob Storage, Microsoft Graph Email API), delivering a dynamic blog/events platform, CMS-driven job application and event registration workflows, and automated CI/CD deployment via Docker to Azure Web App.',
    techStack: ['Next.js', 'React 19', 'PayloadCMS', 'MongoDB', 'Azure Blob Storage', 'Docker'],
    features: [
      'Dynamic blog/events platform',
      'CMS-driven job application workflow',
      'Event registration workflow',
      'Automated CI/CD deployment to Azure Web App',
    ],
    liveUrl: 'https://cognitivo.com.au',
    sourceUrl: null,
    featured: true,
  },
  {
    slug: 'zetflix-movie-app',
    name: 'ZetFlix Movie App',
    company: null,
    oneLiner: 'Netflix-inspired movie and TV discovery app built on the TMDB API.',
    description:
      'Built a modern movie streaming application using React 18 with TypeScript, featuring comprehensive movie and TV show discovery with TMDB API integration, advanced search, genre filtering, and watchlist management with localStorage persistence.',
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'TMDB API'],
    features: [
      'Advanced search and genre filtering',
      'Watchlist management with localStorage persistence',
      'Infinite scroll pagination',
    ],
    liveUrl: 'https://zetflix-movies-app.vercel.app/',
    sourceUrl: 'https://github.com/webdeveloper-fresher32/Zetflix-Movies-App',
    featured: false,
  },
  {
    slug: 'letschat-app',
    name: 'LetsChat-App',
    company: null,
    oneLiner: 'Real-time chat app built on the MERN stack.',
    description: 'Real-time communication app with effortless messaging powered by the MERN stack.',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    features: ['Real-time messaging without delays'],
    liveUrl: 'https://letschat-app32.netlify.app/',
    sourceUrl: 'https://github.com/webdeveloper-fresher32/LetsChat-App',
    featured: false,
  },
  {
    slug: 'e-commerce-store',
    name: 'E-Commerce Store',
    company: null,
    oneLiner: 'Full-featured storefront with auth, cart, and category filtering.',
    description:
      'Built with Angular, Spring Boot, MongoDB, and Tailwind CSS. Implemented user authentication and authorization, add-to-cart, and category-based filtered product display.',
    techStack: ['Angular', 'Spring Boot', 'MongoDB', 'Tailwind CSS'],
    features: ['User authentication and authorization', 'Add-to-cart', 'Category-based filtering'],
    liveUrl: 'https://e-commerce-store-project.vercel.app/login',
    sourceUrl: 'https://github.com/webdeveloper-fresher32/E-Commerce-Store',
    featured: false,
  },
]
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- projects.test.ts`
Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
git add data/projects.ts data/projects.test.ts
git commit -m "feat: add project data"
```

---

### Task 4: Add experience and skills data

**Files:**
- Create: `data/experience.ts`, `data/skills.ts`

- [ ] **Step 1: Write experience data**

```typescript
// data/experience.ts
import { ExperienceRole } from './types'

export const experience: ExperienceRole[] = [
  {
    company: 'Cognitivo',
    title: 'Full-Stack Software Developer',
    startDate: 'Aug 2025',
    endDate: 'Present',
    bullets: [
      'Designed and built a production-grade Stripe Subscription Platform supporting checkout, webhook idempotency, per-seat proration, batch billing with transactional rollback, usage-based free tier, automated billing workflows, and secure Terms of Service enforcement.',
      'Architected an end-to-end AI Document & Meeting Intelligence Platform powering configurable document and PowerPoint generation through AI-driven templates, while orchestrating meeting transcription, LLM-powered speaker identification, AI-generated file notes, and dynamic Knowledge Graph synchronization for advisor-client intelligence.',
      'Built a cloud-native Enterprise Collaboration Platform featuring an AI-powered Email Suite, Azure Blob Storage and AWS S3 abstraction, IndexedDB caching, secure upload pipelines, resilient file management, and seamless cloud migration.',
      'Architected and built a full-stack Developer Analytics Platform using FastAPI, React, SQLite, GitHub REST/GraphQL APIs, OAuth, Webhooks, and background synchronization.',
      'Architected and built a full-stack Marketing Website & Headless CMS using Next.js (App Router, React 19), PayloadCMS, MongoDB, and Azure.',
    ],
  },
  {
    company: 'Northgaze Inc',
    title: 'SDE (Freelance)',
    startDate: 'Jan 2025',
    endDate: 'Aug 2025',
    bullets: [
      'Developed optimized context-aware reasoning applications using the LangChain framework, leveraging large language models for enhanced application intelligence.',
      'Implemented LangGraph to build robust, stateful agents with first-class streaming and human-in-the-loop support.',
      'Utilized LangSmith for debugging, testing, and monitoring applications in production.',
      'Used React Flow to design a seamless drag-and-drop interface for building a custom chat bot.',
      'Engaged with the open-source community to enhance LangChain\'s features and documentation.',
    ],
  },
  {
    company: 'Contenterra Software',
    title: 'Associate Software Developer',
    startDate: 'Sep 2024',
    endDate: 'June 2025',
    bullets: [
      'Collaborated on building a scalable, user-centric insurance platform using Next.js, TypeScript, and Material UI.',
      'Scaled NestJS microservices to support 10,000+ concurrent users and improved page load time by 40% through optimized validations and selective use of libraries like Redux Toolkit and Razorpay.',
      'Enhanced performance and UX by integrating DND-kit and Nivo Charts, and reduced dependency bloat.',
    ],
  },
  {
    company: 'Venkys IO',
    title: 'Associate Software Developer',
    startDate: 'March 2024',
    endDate: 'August 2024',
    bullets: [
      'Designed and implemented a fully functional Online IDE for Venkys.io.',
      'Built scalable solutions with Next.js, Node.js, Express (Express Generator), MongoDB, and TypeScript.',
      'Led workshops attended by 300+ students across 5 colleges.',
      'Published 200+ DSA solutions in Java, Python, and C++, driving a 15% traffic increase to the company platform.',
    ],
  },
]
```

- [ ] **Step 2: Write skills data**

```typescript
// data/skills.ts
import { SkillCategory } from './types'

export const skills: SkillCategory[] = [
  { label: 'Languages', skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'] },
  { label: 'Frameworks', skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Shadcn', 'Material UI'] },
  { label: 'Backend', skills: ['Node.js', 'Express.js'] },
  { label: 'Databases', skills: ['MongoDB', 'MySQL'] },
  { label: 'Cloud & DevOps', skills: ['Azure Blob Storage', 'AWS', 'Docker'] },
  { label: 'Tools', skills: ['VS Code', 'Git', 'GitHub', 'IntelliJ IDEA'] },
  { label: 'Core CS', skills: ['Data Structures & Algorithms', 'Low Level Design'] },
]
```

No test needed here — these are static content arrays with no derived logic to assert (unlike `projects.ts`, nothing reads `.featured` or `.slug` off them).

- [ ] **Step 3: Commit**

```bash
git add data/experience.ts data/skills.ts
git commit -m "feat: add experience and skills data"
```

---

### Task 5: `getProjectBySlug` helper

**Files:**
- Create: `lib/getProjectBySlug.ts`
- Test: `lib/getProjectBySlug.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// lib/getProjectBySlug.test.ts
import { describe, it, expect } from 'vitest'
import { getProjectBySlug } from './getProjectBySlug'

describe('getProjectBySlug', () => {
  it('returns the matching project', () => {
    const project = getProjectBySlug('stripe-subscription-platform')
    expect(project?.name).toBe('Stripe Subscription Platform')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- getProjectBySlug.test.ts`
Expected: FAIL — module `./getProjectBySlug` not found

- [ ] **Step 3: Write the implementation**

```typescript
// lib/getProjectBySlug.ts
import { projects } from '@/data/projects'
import { Project } from '@/data/types'

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- getProjectBySlug.test.ts`
Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
git add lib/getProjectBySlug.ts lib/getProjectBySlug.test.ts
git commit -m "feat: add getProjectBySlug helper"
```

---

### Task 6: `validateContactForm` helper

**Files:**
- Create: `lib/validateContactForm.ts`
- Test: `lib/validateContactForm.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// lib/validateContactForm.test.ts
import { describe, it, expect } from 'vitest'
import { validateContactForm } from './validateContactForm'

describe('validateContactForm', () => {
  it('accepts a valid submission', () => {
    const result = validateContactForm({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'I would like to talk about a role.',
    })
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('rejects a missing name', () => {
    const result = validateContactForm({ name: '', email: 'jane@example.com', message: 'Hello there' })
    expect(result.valid).toBe(false)
    expect(result.errors.name).toBe('Name is required')
  })

  it('rejects an invalid email', () => {
    const result = validateContactForm({ name: 'Jane', email: 'not-an-email', message: 'Hello there' })
    expect(result.valid).toBe(false)
    expect(result.errors.email).toBe('Enter a valid email address')
  })

  it('rejects a message shorter than 10 characters', () => {
    const result = validateContactForm({ name: 'Jane', email: 'jane@example.com', message: 'hi' })
    expect(result.valid).toBe(false)
    expect(result.errors.message).toBe('Message must be at least 10 characters')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- validateContactForm.test.ts`
Expected: FAIL — module `./validateContactForm` not found

- [ ] **Step 3: Write the implementation**

```typescript
// lib/validateContactForm.ts
export interface ContactFormInput {
  name: string
  email: string
  message: string
}

export interface ContactFormValidationResult {
  valid: boolean
  errors: Partial<Record<keyof ContactFormInput, string>>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(input: ContactFormInput): ContactFormValidationResult {
  const errors: ContactFormValidationResult['errors'] = {}

  if (!input.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!EMAIL_PATTERN.test(input.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (input.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- validateContactForm.test.ts`
Expected: `4 passed`

- [ ] **Step 5: Commit**

```bash
git add lib/validateContactForm.ts lib/validateContactForm.test.ts
git commit -m "feat: add validateContactForm helper"
```

---

### Task 7: `sendContactEmail` helper (Resend wrapper)

**Files:**
- Create: `lib/sendContactEmail.ts`
- Test: `lib/sendContactEmail.test.ts`

- [ ] **Step 1: Install Resend**

```bash
npm install resend
```

- [ ] **Step 2: Write the failing test**

```typescript
// lib/sendContactEmail.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

const sendMock = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}))

import { sendContactEmail } from './sendContactEmail'

describe('sendContactEmail', () => {
  beforeEach(() => {
    sendMock.mockReset()
    sendMock.mockResolvedValue({ data: { id: 'email_123' }, error: null })
    process.env.RESEND_API_KEY = 'test-key'
    process.env.CONTACT_EMAIL_TO = 'ganesh@example.com'
  })

  it('sends an email with the submitted fields', async () => {
    await sendContactEmail({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' })

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'ganesh@example.com',
        subject: expect.stringContaining('Jane Doe'),
        text: expect.stringContaining('Hello there'),
        replyTo: 'jane@example.com',
      })
    )
  })

  it('throws when Resend returns an error', async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: 'bad request' } })

    await expect(
      sendContactEmail({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' })
    ).rejects.toThrow('bad request')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- sendContactEmail.test.ts`
Expected: FAIL — module `./sendContactEmail` not found

- [ ] **Step 4: Write the implementation**

```typescript
// lib/sendContactEmail.ts
import { Resend } from 'resend'
import { ContactFormInput } from './validateContactForm'

export async function sendContactEmail(input: ContactFormInput): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = process.env.CONTACT_EMAIL_TO

  if (!to) {
    throw new Error('CONTACT_EMAIL_TO environment variable is not set')
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact Form <contact@resend.dev>',
    to,
    replyTo: input.email,
    subject: `New portfolio message from ${input.name}`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
  })

  if (error) {
    throw new Error(error.message)
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- sendContactEmail.test.ts`
Expected: `2 passed`

- [ ] **Step 6: Add environment variable example file**

Create `.env.local.example`:

```
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL_TO=your-real-email@example.com
```

- [ ] **Step 7: Commit**

```bash
git add lib/sendContactEmail.ts lib/sendContactEmail.test.ts .env.local.example package.json package-lock.json
git commit -m "feat: add sendContactEmail helper using Resend"
```

---

### Task 8: Global theme styles

**Files:**
- Modify: `app/globals.css`, `tailwind.config.ts`

- [ ] **Step 1: Set the theme tokens in Tailwind config**

Modify `tailwind.config.ts` to extend the theme:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0a0a0f',
        panel: '#111114',
        border: '#27272a',
        accent: '#6ee7b7',
        muted: '#9ca3af',
        subtle: '#71717a',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Set base body styles**

Modify `app/globals.css` (keep the existing `@tailwind` directives at the top, add below them):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0a0a0f;
  color: #e5e5e5;
}
```

- [ ] **Step 3: Verify visually**

Run: `npm run dev`, open `http://localhost:3000`
Expected: Page background is dark, no console errors. Stop the server after checking.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat: apply dark/technical theme tokens"
```

---

### Task 9: Nav component

**Files:**
- Create: `components/Nav.tsx`
- Test: `components/Nav.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// components/Nav.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from './Nav'

describe('Nav', () => {
  it('renders a link to every main page', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Nav.test.tsx`
Expected: FAIL — module `./Nav` not found

- [ ] **Step 3: Write the implementation**

```typescript
// components/Nav.tsx
import Link from 'next/link'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className="flex items-center justify-between border-b border-border px-6 py-4">
      <Link href="/" className="font-mono text-accent">
        ganesh.dev
      </Link>
      <div className="flex gap-6">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm text-muted hover:text-accent">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Nav.test.tsx`
Expected: `1 passed`

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx components/Nav.test.tsx
git commit -m "feat: add Nav component"
```

---

### Task 10: Footer component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Write the implementation**

No test — this is static markup with no conditional logic or data mapping to assert against.

```typescript
// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 text-sm text-subtle">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>&copy; {new Date().getFullYear()} Ganesh Pirikirala</span>
        <div className="flex gap-4">
          <a href="https://github.com/webdeveloper-fresher32" className="hover:text-accent">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/ganesh-p-b711a924a" className="hover:text-accent">
            LinkedIn
          </a>
          <a href="mailto:pirikiralaganesh1234@gmail.com" className="hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 11: Root layout wiring Nav + Footer

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the root layout**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ganesh Pirikirala — Full-Stack Software Engineer',
  description:
    'Portfolio of Ganesh Pirikirala, a full-stack software engineer building enterprise SaaS, AI platforms, and Stripe billing systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify visually**

Run: `npm run dev`, open `http://localhost:3000`
Expected: Nav bar at top with 4 links, footer at bottom with 3 links, both render without console errors. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire Nav and Footer into root layout"
```

---

### Task 12: SkillsGrid component

**Files:**
- Create: `components/SkillsGrid.tsx`
- Test: `components/SkillsGrid.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// components/SkillsGrid.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillsGrid from './SkillsGrid'
import { skills } from '@/data/skills'

describe('SkillsGrid', () => {
  it('renders a heading for every skill category', () => {
    render(<SkillsGrid />)
    for (const category of skills) {
      expect(screen.getByText(category.label)).toBeInTheDocument()
    }
  })

  it('renders every individual skill', () => {
    render(<SkillsGrid />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- SkillsGrid.test.tsx`
Expected: FAIL — module `./SkillsGrid` not found

- [ ] **Step 3: Write the implementation**

```typescript
// components/SkillsGrid.tsx
import { skills } from '@/data/skills'

export default function SkillsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((category) => (
        <div key={category.label} className="rounded-lg border border-border bg-panel p-4">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">{category.label}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span key={skill} className="rounded border border-border px-2 py-1 text-xs text-muted">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- SkillsGrid.test.tsx`
Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
git add components/SkillsGrid.tsx components/SkillsGrid.test.tsx
git commit -m "feat: add SkillsGrid component"
```

---

### Task 13: ProjectCard component

**Files:**
- Create: `components/ProjectCard.tsx`
- Test: `components/ProjectCard.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// components/ProjectCard.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

describe('ProjectCard', () => {
  const project = projects[0]

  it('renders the project name linking to its detail page', () => {
    render(<ProjectCard project={project} />)
    expect(screen.getByRole('link', { name: project.name })).toHaveAttribute(
      'href',
      `/projects/${project.slug}`
    )
  })

  it('renders a live demo link when liveUrl is set', () => {
    render(<ProjectCard project={project} />)
    expect(screen.getByRole('link', { name: 'Live Demo' })).toHaveAttribute('href', project.liveUrl!)
  })

  it('omits the live demo link when liveUrl is null', () => {
    render(<ProjectCard project={{ ...project, liveUrl: null }} />)
    expect(screen.queryByRole('link', { name: 'Live Demo' })).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ProjectCard.test.tsx`
Expected: FAIL — module `./ProjectCard` not found

- [ ] **Step 3: Write the implementation**

```typescript
// components/ProjectCard.tsx
import Link from 'next/link'
import { Project } from '@/data/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-border bg-panel p-5">
      <Link href={`/projects/${project.slug}`} className="text-lg font-semibold hover:text-accent">
        {project.name}
      </Link>
      <p className="mt-2 text-sm text-muted">{project.oneLiner}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="rounded border border-border px-2 py-0.5 text-xs text-subtle">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        {project.liveUrl && (
          <a href={project.liveUrl} className="text-accent hover:underline">
            Live Demo
          </a>
        )}
        {project.sourceUrl && (
          <a href={project.sourceUrl} className="text-accent hover:underline">
            Source Code
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ProjectCard.test.tsx`
Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
git add components/ProjectCard.tsx components/ProjectCard.test.tsx
git commit -m "feat: add ProjectCard component"
```

---

### Task 14: ExperienceEntry component

**Files:**
- Create: `components/ExperienceEntry.tsx`
- Test: `components/ExperienceEntry.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// components/ExperienceEntry.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ExperienceEntry from './ExperienceEntry'
import { experience } from '@/data/experience'

describe('ExperienceEntry', () => {
  const role = experience[0]

  it('renders the company, title, and date range', () => {
    render(<ExperienceEntry role={role} />)
    expect(screen.getByText(role.company)).toBeInTheDocument()
    expect(screen.getByText(role.title)).toBeInTheDocument()
    expect(screen.getByText(`${role.startDate} – ${role.endDate}`)).toBeInTheDocument()
  })

  it('renders every bullet', () => {
    render(<ExperienceEntry role={role} />)
    for (const bullet of role.bullets) {
      expect(screen.getByText(bullet)).toBeInTheDocument()
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ExperienceEntry.test.tsx`
Expected: FAIL — module `./ExperienceEntry` not found

- [ ] **Step 3: Write the implementation**

```typescript
// components/ExperienceEntry.tsx
import { ExperienceRole } from '@/data/types'

export default function ExperienceEntry({ role }: { role: ExperienceRole }) {
  return (
    <div className="border-b border-border pb-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">
          {role.title} <span className="text-muted">· {role.company}</span>
        </h3>
        <span className="font-mono text-xs text-subtle">
          {role.startDate} – {role.endDate}
        </span>
      </div>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ExperienceEntry.test.tsx`
Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
git add components/ExperienceEntry.tsx components/ExperienceEntry.test.tsx
git commit -m "feat: add ExperienceEntry component"
```

---

### Task 15: Home page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the page**

```typescript
// app/page.tsx
import Link from 'next/link'
import SkillsGrid from '@/components/SkillsGrid'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { experience } from '@/data/experience'

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)
  const currentRole = experience[0]

  return (
    <div className="mx-auto max-w-4xl space-y-16 px-6 py-16">
      <section>
        <p className="font-mono text-sm text-accent">$ whoami</p>
        <h1 className="mt-2 text-4xl font-bold">Ganesh Pirikirala</h1>
        <p className="mt-2 text-lg text-muted">Full-Stack Software Engineer</p>
        <p className="mt-4 max-w-2xl text-muted">
          Full-stack Software Engineer with 2.5+ years of experience building enterprise-grade SaaS
          applications using React, Next.js, TypeScript, Node.js, and MongoDB. Experienced in designing
          scalable backend systems, AI-powered workflows, Stripe subscription platforms, and multi-tenant
          architectures.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/projects" className="rounded bg-accent px-4 py-2 text-sm font-semibold text-base">
            View Projects
          </Link>
          <a
            href="/resume.pdf"
            className="rounded border border-border px-4 py-2 text-sm text-muted hover:text-accent"
          >
            Resume
          </a>
          <Link href="/contact" className="rounded border border-border px-4 py-2 text-sm text-muted hover:text-accent">
            Contact
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wide text-accent">Skills</h2>
        <SkillsGrid />
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wide text-accent">Featured Projects</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wide text-accent">Currently</h2>
        <p className="text-muted">
          {currentRole.title} at {currentRole.company} ({currentRole.startDate} – {currentRole.endDate}).{' '}
          <Link href="/experience" className="text-accent hover:underline">
            See full experience →
          </Link>
        </p>
      </section>
    </div>
  )
}
```

No new test file — this page composes already-tested components (`SkillsGrid`, `ProjectCard`) with static copy and has no conditional logic of its own beyond `.filter().slice()` on data already covered by `projects.test.ts` (3 featured projects exist). Correctness is confirmed by the manual check below.

- [ ] **Step 2: Verify visually**

Run: `npm run dev`, open `http://localhost:3000`
Expected: Hero, skills grid, 3 featured project cards, and current-role summary all render without console errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build home page"
```

---

### Task 16: Projects listing page

**Files:**
- Create: `app/projects/page.tsx`

- [ ] **Step 1: Write the page**

```typescript
// app/projects/page.tsx
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured)
  const sideProjects = projects.filter((p) => !p.featured)

  return (
    <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
      <section>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-muted">Case studies from my work at Cognitivo.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-muted">Side Projects</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {sideProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
```

No new test — reuses `ProjectCard`, filters already covered by `projects.test.ts`.

- [ ] **Step 2: Verify visually**

Run: `npm run dev`, open `http://localhost:3000/projects`
Expected: 3 featured cards, 3 side-project cards, all links present.

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: build projects listing page"
```

---

### Task 17: Project detail page

**Files:**
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Write the page**

```typescript
// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/getProjectBySlug'
import { projects } from '@/data/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      <div>
        <h1 className="text-3xl font-bold">{project.name}</h1>
        {project.company && <p className="mt-1 text-muted">{project.company}</p>}
      </div>

      <div className="flex h-56 items-center justify-center rounded-lg border border-border bg-panel">
        <span className="font-mono text-sm text-subtle">[ screenshot placeholder ]</span>
      </div>

      <p className="text-muted">{project.description}</p>

      <div>
        <h2 className="font-mono text-sm uppercase tracking-wide text-accent">Tech Stack</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="rounded border border-border px-2 py-1 text-xs text-muted">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-mono text-sm uppercase tracking-wide text-accent">Key Features</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        {project.liveUrl && (
          <a href={project.liveUrl} className="rounded bg-accent px-4 py-2 text-sm font-semibold text-base">
            View Live
          </a>
        )}
        {project.sourceUrl && (
          <a href={project.sourceUrl} className="rounded border border-border px-4 py-2 text-sm text-muted hover:text-accent">
            Source Code
          </a>
        )}
      </div>
    </div>
  )
}
```

No new test — `getProjectBySlug` (used for the not-found branch) is already unit tested; the JSX below it is static rendering of already-validated data.

- [ ] **Step 2: Verify visually**

Run: `npm run dev`, open `http://localhost:3000/projects/stripe-subscription-platform`
Expected: Full case study renders. Visit `http://localhost:3000/projects/does-not-exist` and confirm the Next.js 404 page renders.

- [ ] **Step 3: Commit**

```bash
git add app/projects/\[slug\]/page.tsx
git commit -m "feat: build project detail page"
```

---

### Task 18: Experience page

**Files:**
- Create: `app/experience/page.tsx`

- [ ] **Step 1: Write the page**

```typescript
// app/experience/page.tsx
import ExperienceEntry from '@/components/ExperienceEntry'
import { experience } from '@/data/experience'

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      <h1 className="text-3xl font-bold">Experience</h1>
      <div className="space-y-8">
        {experience.map((role) => (
          <ExperienceEntry key={`${role.company}-${role.startDate}`} role={role} />
        ))}
      </div>
    </div>
  )
}
```

No new test — reuses already-tested `ExperienceEntry`.

- [ ] **Step 2: Verify visually**

Run: `npm run dev`, open `http://localhost:3000/experience`
Expected: 4 role entries render in order, each with company, title, dates, and bullets.

- [ ] **Step 3: Commit**

```bash
git add app/experience/page.tsx
git commit -m "feat: build experience page"
```

---

### Task 19: ContactForm component

**Files:**
- Create: `components/ContactForm.tsx`
- Test: `components/ContactForm.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// components/ContactForm.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
  })

  it('shows a validation error and does not submit when the message is too short', async () => {
    render(<ContactForm />)
    await userEvent.type(screen.getByLabelText('Name'), 'Jane')
    await userEvent.type(screen.getByLabelText('Email'), 'jane@example.com')
    await userEvent.type(screen.getByLabelText('Message'), 'hi')
    await userEvent.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(await screen.findByText('Message must be at least 10 characters')).toBeInTheDocument()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('submits to /api/contact and shows a success message on valid input', async () => {
    render(<ContactForm />)
    await userEvent.type(screen.getByLabelText('Name'), 'Jane Doe')
    await userEvent.type(screen.getByLabelText('Email'), 'jane@example.com')
    await userEvent.type(screen.getByLabelText('Message'), 'I would like to talk about a role.')
    await userEvent.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(await screen.findByText('Message sent — thanks for reaching out!')).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' })
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ContactForm.test.tsx`
Expected: FAIL — module `./ContactForm` not found

- [ ] **Step 3: Write the implementation**

```typescript
// components/ContactForm.tsx
'use client'

import { useState } from 'react'
import { validateContactForm, ContactFormInput } from '@/lib/validateContactForm'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormInput>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({})
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = validateContactForm(form)
    setErrors(result.errors)

    if (!result.valid) {
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) {
        throw new Error('Request failed')
      }
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-muted">
          Name
        </label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full rounded border border-border bg-panel px-3 py-2 text-sm"
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-muted">
          Email
        </label>
        <input
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 w-full rounded border border-border bg-panel px-3 py-2 text-sm"
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          className="mt-1 w-full rounded border border-border bg-panel px-3 py-2 text-sm"
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded bg-accent px-4 py-2 text-sm font-semibold text-base disabled:opacity-50"
      >
        Send Message
      </button>

      {status === 'success' && (
        <p className="text-sm text-accent">Message sent — thanks for reaching out!</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400">Something went wrong. Please email me directly instead.</p>
      )}
    </form>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ContactForm.test.tsx`
Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
git add components/ContactForm.tsx components/ContactForm.test.tsx
git commit -m "feat: add ContactForm component"
```

---

### Task 20: Contact API route

**Files:**
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Write the route handler**

This wires together the already-tested `validateContactForm` and `sendContactEmail` helpers, so no new unit test is needed for this file — testing it further would mean re-testing Next.js's own request/response plumbing, not our logic.

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { validateContactForm } from '@/lib/validateContactForm'
import { sendContactEmail } from '@/lib/sendContactEmail'

export async function POST(request: Request) {
  const body = await request.json()
  const result = validateContactForm(body)

  if (!result.valid) {
    return NextResponse.json({ errors: result.errors }, { status: 400 })
  }

  try {
    await sendContactEmail(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 502 })
  }
}
```

- [ ] **Step 2: Manually verify with a real request (requires a Resend API key)**

Copy `.env.local.example` to `.env.local` and fill in a real `RESEND_API_KEY` and `CONTACT_EMAIL_TO`.

Run: `npm run dev`, then in another terminal:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Testing the contact form."}'
```

Expected: `{"ok":true}` and an email arrives at `CONTACT_EMAIL_TO`. If no Resend key is configured yet, expect a 502 — that's acceptable until the key is added; note it in the handoff.

- [ ] **Step 3: Commit**

```bash
git add app/api/contact/route.ts
git commit -m "feat: add contact API route"
```

---

### Task 21: Contact page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Write the page**

```typescript
// app/contact/page.tsx
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl space-y-8 px-6 py-16">
      <div>
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-2 text-muted">
          Reach out directly at{' '}
          <a href="mailto:pirikiralaganesh1234@gmail.com" className="text-accent hover:underline">
            pirikiralaganesh1234@gmail.com
          </a>{' '}
          or use the form below.
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <a href="https://www.linkedin.com/in/ganesh-p-b711a924a" className="text-accent hover:underline">
            LinkedIn
          </a>
          <a href="https://github.com/webdeveloper-fresher32" className="text-accent hover:underline">
            GitHub
          </a>
          <a href="tel:+917659869814" className="text-accent hover:underline">
            +91 76598 69814
          </a>
        </div>
      </div>
      <ContactForm />
    </div>
  )
}
```

No new test — composes already-tested `ContactForm` with static copy.

- [ ] **Step 2: Verify visually**

Run: `npm run dev`, open `http://localhost:3000/contact`
Expected: Contact links render, form renders, submitting an invalid form shows inline errors (from Task 19's tested behavior).

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: build contact page"
```

---

### Task 22: Resume download asset

**Files:**
- Create: `public/resume.pdf`

- [ ] **Step 1: Add a placeholder resume file**

Copy the actual resume PDF (the one this plan was built from) into `public/resume.pdf` so the "Resume" button on the home page (Task 15) resolves to a real file:

```bash
cp "/Users/ganeshpirikirala/Desktop/Ganesh_FullStack_developer_resume.pdf" /Users/ganeshpirikirala/Desktop/PortFolio/public/resume.pdf
```

If the file isn't at that exact path, locate it first with `find ~/Desktop -iname "*resume*.pdf"` and copy from wherever it is.

- [ ] **Step 2: Verify the link works**

Run: `npm run dev`, open `http://localhost:3000`, click the "Resume" button.
Expected: PDF opens/downloads correctly.

- [ ] **Step 3: Commit**

```bash
git add public/resume.pdf
git commit -m "chore: add downloadable resume PDF"
```

---

### Task 23: Full test suite, type check, and production build

**Files:** none created — verification only

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: All tests across all files pass (Nav, SkillsGrid, ProjectCard, ExperienceEntry, ContactForm, projects data, getProjectBySlug, validateContactForm, sendContactEmail).

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: Build completes successfully, all routes (`/`, `/projects`, `/projects/[slug]` x6, `/experience`, `/contact`) listed in the output.

- [ ] **Step 4: Commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve type/build issues found in verification pass"
```

(Skip this step if no fixes were needed.)

---

### Task 24: README and deployment notes

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write the README**

```markdown
# Ganesh Pirikirala — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Testing

\`\`\`bash
npm test
\`\`\`

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — API key from [resend.com](https://resend.com) for the contact form
- `CONTACT_EMAIL_TO` — the inbox that should receive contact form submissions

## Deployment

Deployed on [Vercel](https://vercel.com). Connect this repository in the Vercel dashboard and set the
same environment variables (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`) in the project's Environment Variables
settings.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup and deployment notes"
```

---

## Post-Plan Follow-Ups (not blocking, tracked from the spec's Open Items)

- Swap `public/resume.pdf` for an updated resume when available.
- Replace the `[ screenshot placeholder ]` block in `app/projects/[slug]/page.tsx` with real screenshots once available — the block is isolated to that one spot in Task 17 for an easy find-and-replace.
- Sign up for Resend, verify a sending domain, and set `RESEND_API_KEY` / `CONTACT_EMAIL_TO` in both `.env.local` and the Vercel project settings before the contact form works in production.
