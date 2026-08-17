import { ExperienceRole } from './types'

export const experience: ExperienceRole[] = [
  {
    company: 'Cognitivo',
    title: 'Full-Stack Software Developer',
    startDate: 'Aug 2025',
    endDate: 'Present',
    bullets: [
      'Built an end-to-end AI meeting-intelligence pipeline (scheduling → transcription → speaker ID → AI summarization → knowledge graph updates) processing meetings in parallel async jobs with full versioning/audit trail.',
      'Designed a bidirectional sync system between dynamic, ontology-driven forms and a persistent per-client knowledge graph, with a traceable graph visualization linking facts back to source transcripts.',
      'Built a no-code, role-governed template engine (markdown + AI-prompt driven) powering both document and auto-generated PowerPoint output, with full versioning and diffing.',
      'Built a full in-app email client with two AI-assist modes and a knowledge-graph-aware inline query feature.',
      'Designed and implemented a Stripe-based subscription billing system from scratch: prorated per-seat billing, batch billing with atomic rollback, webhook idempotency, and a usage-based free tier.',
      'Architected a full-stack GitHub analytics dashboard using FastAPI, React, SQLite, GitHub REST/GraphQL APIs, OAuth, and webhooks.',
      'Contributed to a multi-cloud (Azure/AWS) app portal migration, building unified storage abstractions and usage dashboards.',
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
