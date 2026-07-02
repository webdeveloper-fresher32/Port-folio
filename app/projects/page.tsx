import ProjectCard from '@/components/ProjectCard'
import FadeIn from '@/components/FadeIn'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured)
  const sideProjects = projects.filter((p) => !p.featured)

  return (
    <div className="mx-auto w-[90%] max-w-[100rem] space-y-16 py-20">
      <section>
        <FadeIn>
          <h1 className="text-5xl font-bold">Projects</h1>
          <p className="mt-3 text-lg text-muted">Case studies from my work at Cognitivo.</p>
        </FadeIn>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-muted">Side Projects</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {sideProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
