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
