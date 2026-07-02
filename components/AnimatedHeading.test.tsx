import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnimatedHeading from './AnimatedHeading'

describe('AnimatedHeading', () => {
  it('exposes the full text as the heading\'s accessible name', () => {
    render(<AnimatedHeading text="Experience" />)
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument()
  })

  it('hides the per-letter spans from assistive tech', () => {
    const { container } = render(<AnimatedHeading text="Hi" />)
    const letterSpans = container.querySelectorAll('span[aria-hidden="true"]')
    expect(letterSpans).toHaveLength(2)
  })
})
