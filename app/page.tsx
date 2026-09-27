import Link from 'next/link'
import Image from 'next/image'
import SkillsGrid from '@/components/SkillsGrid'
import ProjectCard from '@/components/ProjectCard'
import FadeIn from '@/components/FadeIn'
import HeroMascot from '@/components/HeroMascot'
import MorphingText from '@/components/MorphingText'
import Meteors from '@/components/Meteors'
import { projects } from '@/data/projects'

const ROLES = [
  'Full-Stack Software Engineer',
  'Java 17 & Spring Boot Architect',
  'Next.js & React Systems Developer',
  'AI & Enterprise Platform Builder',
]

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <div className="mx-auto w-[90%] max-w-[100rem] space-y-20 py-20">
      <FadeIn>
        <section className="relative flex flex-col items-center gap-12 overflow-hidden md:flex-row md:justify-between">
          <Meteors />
          <div className="md:max-w-3xl">
            <p className="font-mono text-base text-accent">$ whoami</p>
            <h1 className="mt-3 text-6xl font-bold">Ganesh Pirikirala</h1>
            <p className="mt-3 text-2xl text-muted">
              <MorphingText texts={ROLES} />
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
              Full-Stack Software Engineer with nearly 3 years of experience building scalable SaaS and AI-powered
              applications using React.js, Next.js, Node.js, Python (FastAPI), Spring Boot, and MongoDB, with a strong
              foundation in distributed systems, microservices, REST API design, LLM-powered pipelines, and system design (HLD/LLD).
              Experienced across AWS, Azure, Docker, Redis, Stripe, and CI/CD pipelines, using generative AI tooling (Claude Code)
              to ship production software.
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
          <HeroMascot className="hidden lg:flex" />
          <Image
            src="/profile.png"
            alt="Ganesh Pirikirala"
            width={240}
            height={240}
            priority
            className="h-60 w-60 shrink-0 rounded-full border-2 border-border object-cover md:h-80 md:w-80 mr-10"
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
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-mono text-base uppercase tracking-wide text-accent">Featured Architecture & Projects</h2>
            <Link href="/projects" className="text-sm font-mono text-subtle hover:text-accent">
              View all ({projects.length}) &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
