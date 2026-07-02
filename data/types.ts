export interface ExperienceRole {
  company: string
  title: string
  startDate: string // e.g. "Aug 2025"
  endDate: string // e.g. "Present"
  bullets: string[]
}

export interface Project {
  slug: string
  name: string
  company: string | null // null for personal projects
  oneLiner: string
  description: string
  techStack: string[]
  features: string[]
  liveUrl: string | null
  sourceUrl: string | null
  featured: boolean
}

export interface SkillCategory {
  label: string
  skills: string[]
}
