import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TimelineItem from './TimelineItem'
import { experience } from '@/data/experience'

describe('TimelineItem', () => {
  const role = experience[0]

  it('renders the underlying experience content', () => {
    render(<TimelineItem role={role} isLast={false} />)
    expect(screen.getByText(role.title, { exact: false })).toBeInTheDocument()
  })

  it('renders a connecting line when not the last item', () => {
    const { container } = render(<TimelineItem role={role} isLast={false} />)
    expect(container.querySelector('.bg-border')).toBeInTheDocument()
  })

  it('omits the connecting line for the last item', () => {
    const { container } = render(<TimelineItem role={role} isLast />)
    expect(container.querySelector('.bg-border')).not.toBeInTheDocument()
  })
})
