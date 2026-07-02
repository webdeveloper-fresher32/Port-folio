import { describe, it, expect } from 'vitest'
import { projects } from './projects'

describe('projects data', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has exactly 3 featured projects', () => {
    expect(projects.filter((p) => p.featured).length).toBe(3)
  })

  it('gives every featured project a live URL', () => {
    for (const project of projects.filter((p) => p.featured)) {
      expect(project.liveUrl).not.toBeNull()
    }
  })
})
