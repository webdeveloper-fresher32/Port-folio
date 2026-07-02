import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured)
  const sideProjects = projects.filter((p) => !p.featured)

  return (
    <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
      <section>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-muted">Case studies from my work at Cognitivo.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-muted">Side Projects</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {sideProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
