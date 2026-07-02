import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/getProjectBySlug'
import { projects } from '@/data/projects'
import FadeIn from '@/components/FadeIn'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.name,
    description: project.oneLiner,
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="mx-auto w-[85%] max-w-5xl space-y-10 py-20">
      <FadeIn>
        <div>
          <h1 className="text-5xl font-bold">{project.name}</h1>
          {project.company && <p className="mt-2 text-lg text-muted">{project.company}</p>}
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-panel">
          <span className="font-mono text-base text-subtle">[ screenshot placeholder ]</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-lg text-muted">{project.description}</p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div>
          <h2 className="font-mono text-base uppercase tracking-wide text-accent">Tech Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="rounded border border-border px-3 py-1.5 text-sm text-muted">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div>
          <h2 className="font-mono text-base uppercase tracking-wide text-accent">Key Features</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-muted">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </FadeIn>

      <div className="flex gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="rounded bg-accent px-6 py-3 text-base font-semibold text-ink transition-transform hover:scale-105 active:scale-95"
          >
            View Live
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            className="rounded border border-border px-6 py-3 text-base text-muted transition-all hover:scale-105 hover:text-accent active:scale-95"
          >
            Source Code
          </a>
        )}
      </div>
    </div>
  )
}
