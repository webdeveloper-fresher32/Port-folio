import { describe, it, expect } from 'vitest'
import { projects } from './projects'

describe('projects data', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has at least 3 featured projects', () => {
    expect(projects.filter((p) => p.featured).length).toBeGreaterThanOrEqual(3)
  })
 
  it('gives public featured projects a live URL', () => {
    for (const project of projects.filter((p) => p.featured && p.slug !== 'ai-factory-portal')) {
      expect(project.liveUrl).not.toBeNull()
    }
  })
})
