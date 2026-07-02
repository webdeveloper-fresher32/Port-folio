import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import MorphingText from './MorphingText'

describe('MorphingText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the first text initially', () => {
    render(<MorphingText texts={['One', 'Two', 'Three']} interval={1000} />)
    expect(screen.getByText('One')).toBeInTheDocument()
  })

  it('cycles to the next text after the interval elapses', () => {
    render(<MorphingText texts={['One', 'Two', 'Three']} interval={1000} />)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('wraps back to the first text after cycling through all of them', () => {
    render(<MorphingText texts={['One', 'Two']} interval={1000} />)
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.getByText('One')).toBeInTheDocument()
  })
})
