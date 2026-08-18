import { describe, it, expect } from 'vitest'
import { getProjectBySlug } from './getProjectBySlug'

describe('getProjectBySlug', () => {
  it('returns the matching project', () => {
    const project = getProjectBySlug('prospo-crm')
    expect(project?.name).toBe('Prospo CRM & Meeting Intelligence')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeUndefined()
  })
})
