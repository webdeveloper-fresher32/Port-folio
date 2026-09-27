import { ExperienceRole } from './types'

export const experience: ExperienceRole[] = [
  {
    company: 'Cognitivo',
    title: 'Full-Stack Software Developer',
    startDate: 'Aug 2025',
    endDate: 'July 2026',
    bullets: [
      'Architected SaaS platforms with Stripe subscription billing, webhook idempotency, and per-seat proration, using Azure Blob Storage and AWS S3 for secure cloud file management, and built cloud-native full-stack applications with Next.js, React, Node.js, FastAPI, MongoDB, SQLite, PayloadCMS, and Docker on Azure, integrating GitHub REST/GraphQL APIs, OAuth, and Microsoft Graph through CI/CD pipelines.',
      'Engineered AI-powered document and meeting intelligence platforms with a Python (FastAPI) service handling voice-recording transcription and speaker identification, combined with LLM-driven document/PPT generation and Knowledge Graph synchronization to surface relevant extracted meeting data for enterprise collaboration.',
    ],
    systemDesigns: [
      {
        title: 'Multi-tenant Organisation Backend & Storage Sync',
        image: '/system-designs/org-profile.png',
        description: 'Complete architecture for tenant management with seamless Azure Blob and Microsoft SharePoint storage synchronization.',
      },
      {
        title: 'Stripe Subscription Billing System',
        image: '/system-designs/stripe-billing.png',
        description: 'End-to-end payment flow including checkout, proration, event-driven webhooks, and invoice management.',
      },
      {
        title: 'Email Signature & Microsoft 365 Integration',
        image: '/system-designs/email-signature.png',
        description: 'Secure email signature injection system using ReactQuill, MongoDB, and Microsoft 365 connectors.',
      },
      {
        title: 'Manage Template Engine',
        image: '/system-designs/manage-template.png',
        description: 'Role-governed no-code template engine powering Markdown, DocuSeal signatures, and PowerPoint generation.',
      },
      {
        title: 'Full-Stack Developer Analytics Platform',
        image: '/system-designs/developer-analytics.png',
        description: 'Frontend-first incremental migration of an analytics dashboard using React, FastAPI, SQLite, and GitHub APIs with full wire-contract parity.',
      },
    ],
  },
  {
    company: 'Contenterra Software',
    title: 'Associate software developer',
    startDate: 'July 2024',
    endDate: 'June 2025',
    bullets: [
      'Built a scalable insurance platform with Next.js, TypeScript, and Material UI, delivering responsive, accessible UI across devices.',
      'Scaled NestJS microservices with optimized validations and selective use of Redux Toolkit and Razorpay, supporting 10,000+ concurrent users and cutting page load time by 40%.',
      'Integrated DND-kit and Nivo Charts following dependency-reduction best practices, improving UI/UX interactions.',
    ],
  },
  {
    company: 'Northgaze Inc',
    title: 'SDE (Freelance)',
    startDate: 'Jan 2025',
    endDate: 'Aug 2025',
    bullets: [
      'Built context-aware AI reasoning applications with LangChain and LangGraph, using LangSmith for debugging, testing, and production monitoring, delivering stateful streaming agents with human-in-the-loop control.',
      'Built a drag-and-drop chatbot builder with React Flow enabling users to visually design conversational workflows, and contributed feature enhancements and documentation to the LangChain open-source ecosystem.',
    ],
  },
  {
    company: 'Venkys IO',
    title: 'Associate Software Developer',
    startDate: 'Jan 2024',
    endDate: 'June 2024',
    bullets: [
      'Designed a scalable Online IDE for Venkys.io using Next.js, Node.js, Express, MongoDB, and TypeScript, improving user productivity and platform engagement.',
      'Delivered Angular and Spring Boot technical workshops to 300+ students across 5 colleges, covering REST APIs, dependency injection, and database integration.',
      'Published 200+ DSA solutions in Java, Python, and C++, growing community engagement and platform traffic.',
    ],
  },
]
