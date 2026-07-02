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
