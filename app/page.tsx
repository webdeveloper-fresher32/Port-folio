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
    <div className="mx-auto w-[90%] max-w-[100rem] space-y-20 py-20">
      <FadeIn>
        <section className="flex flex-col items-center gap-12 md:flex-row md:justify-between">
          <div className="md:max-w-3xl">
            <p className="font-mono text-base text-accent">$ whoami</p>
            <h1 className="mt-3 text-6xl font-bold">Ganesh Pirikirala</h1>
            <p className="mt-3 text-2xl text-muted">Full-Stack Software Engineer</p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
              Full-stack Software Engineer with 2.5+ years of experience building enterprise-grade SaaS
              applications using React, Next.js, TypeScript, Node.js, and MongoDB. Experienced in designing
              scalable backend systems, AI-powered workflows, Stripe subscription platforms, and multi-tenant
              architectures.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/projects"
                className="rounded bg-accent px-6 py-3 text-base font-semibold text-ink transition-transform hover:scale-105 active:scale-95"
              >
                View Projects
              </Link>
              <a
                href="/resume.pdf"
                className="rounded border border-border px-6 py-3 text-base text-muted transition-all hover:scale-105 hover:text-accent active:scale-95"
              >
                Resume
              </a>
              <Link
                href="/contact"
                className="rounded border border-border px-6 py-3 text-base text-muted transition-all hover:scale-105 hover:text-accent active:scale-95"
              >
                Contact
              </Link>
            </div>
          </div>
          <Image
            src="/profile.png"
            alt="Ganesh Pirikirala"
            width={240}
            height={240}
            priority
            className="h-52 w-52 shrink-0 rounded-full border-2 border-border object-cover md:h-64 md:w-64"
          />
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section>
          <h2 className="mb-6 font-mono text-base uppercase tracking-wide text-accent">Skills</h2>
          <SkillsGrid />
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section>
          <h2 className="mb-6 font-mono text-base uppercase tracking-wide text-accent">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.2}>
        <section>
          <h2 className="mb-6 font-mono text-base uppercase tracking-wide text-accent">Currently</h2>
          <p className="text-lg text-muted">
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
