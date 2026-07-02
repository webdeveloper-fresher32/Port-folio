import { describe, it, expect } from 'vitest'
import { getProjectBySlug } from './getProjectBySlug'

describe('getProjectBySlug', () => {
  it('returns the matching project', () => {
    const project = getProjectBySlug('stripe-subscription-platform')
    expect(project?.name).toBe('Stripe Subscription Platform')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeUndefined()
  })
})
