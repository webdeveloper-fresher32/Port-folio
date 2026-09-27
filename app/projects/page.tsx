import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import FadeIn from '@/components/FadeIn'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects & System Architecture',
  description:
    'Featured projects and system architecture case studies by Ganesh Pirikirala, including SkillVault, Prospo CRM, AI Knowledge Assistant, Developer Analytics, and microservice API Gateways.',
}

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured)
  const sideProjects = projects.filter((p) => !p.featured)

  return (
    <div className="mx-auto w-[90%] max-w-[100rem] space-y-16 py-20">
      <section>
        <FadeIn>
          <h1 className="text-5xl font-bold">Projects & System Architecture</h1>
          <p className="mt-3 text-lg text-muted">
            Enterprise platforms, full-stack applications, and system design architectures.
          </p>
        </FadeIn>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-muted">Engineering & System Designs</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sideProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
