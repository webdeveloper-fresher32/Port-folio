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
      "Engaged with the open-source community to enhance LangChain's features and documentation.",
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
