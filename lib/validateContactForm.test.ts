import { describe, it, expect } from 'vitest'
import { validateContactForm } from './validateContactForm'

describe('validateContactForm', () => {
  it('accepts a valid submission', () => {
    const result = validateContactForm({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'I would like to talk about a role.',
    })
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('rejects a missing name', () => {
    const result = validateContactForm({ name: '', email: 'jane@example.com', message: 'Hello there' })
    expect(result.valid).toBe(false)
    expect(result.errors.name).toBe('Name is required')
  })

  it('rejects an invalid email', () => {
    const result = validateContactForm({ name: 'Jane', email: 'not-an-email', message: 'Hello there' })
    expect(result.valid).toBe(false)
    expect(result.errors.email).toBe('Enter a valid email address')
  })

  it('rejects a message shorter than 10 characters', () => {
    const result = validateContactForm({ name: 'Jane', email: 'jane@example.com', message: 'hi' })
    expect(result.valid).toBe(false)
    expect(result.errors.message).toBe('Message must be at least 10 characters')
  })
})
