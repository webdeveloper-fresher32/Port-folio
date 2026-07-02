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
