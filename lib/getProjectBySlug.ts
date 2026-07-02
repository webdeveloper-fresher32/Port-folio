import { projects } from '@/data/projects'
import { Project } from '@/data/types'

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
