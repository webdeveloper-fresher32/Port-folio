import Link from 'next/link'
import Image from 'next/image'
import SkillsGrid from '@/components/SkillsGrid'
import ProjectCard from '@/components/ProjectCard'
import FadeIn from '@/components/FadeIn'
import { projects } from '@/data/projects'
import { experience } from '@/data/experience'

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)
  const currentRole = experience[0]

  return (
    <div className="mx-auto w-[80%] max-w-6xl space-y-16 py-16">
      <FadeIn>
        <section className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
          <div className="md:max-w-2xl">
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
              <Link
                href="/projects"
                className="rounded bg-accent px-4 py-2 text-sm font-semibold text-base transition-transform hover:scale-105 active:scale-95"
              >
                View Projects
              </Link>
              <a
                href="/resume.pdf"
                className="rounded border border-border px-4 py-2 text-sm text-muted transition-all hover:scale-105 hover:text-accent active:scale-95"
              >
                Resume
              </a>
              <Link
                href="/contact"
                className="rounded border border-border px-4 py-2 text-sm text-muted transition-all hover:scale-105 hover:text-accent active:scale-95"
              >
                Contact
              </Link>
            </div>
          </div>
          <Image
            src="/profile.png"
            alt="Ganesh Pirikirala"
            width={200}
            height={200}
            priority
            className="h-44 w-44 shrink-0 rounded-full border-2 border-border object-cover md:h-52 md:w-52"
          />
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section>
          <h2 className="mb-4 font-mono text-sm uppercase tracking-wide text-accent">Skills</h2>
          <SkillsGrid />
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section>
          <h2 className="mb-4 font-mono text-sm uppercase tracking-wide text-accent">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.2}>
        <section>
          <h2 className="mb-4 font-mono text-sm uppercase tracking-wide text-accent">Currently</h2>
          <p className="text-muted">
            {currentRole.title} at {currentRole.company} ({currentRole.startDate} – {currentRole.endDate}).{' '}
            <Link href="/experience" className="text-accent hover:underline">
              See full experience →
            </Link>
          </p>
        </section>
      </FadeIn>
    </div>
  )
}
