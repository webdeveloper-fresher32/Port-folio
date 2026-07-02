import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ExperienceEntry from './ExperienceEntry'
import { experience } from '@/data/experience'

describe('ExperienceEntry', () => {
  const role = experience[0]

  it('renders the company, title, and date range', () => {
    render(<ExperienceEntry role={role} />)
    expect(screen.getByText(role.company)).toBeInTheDocument()
    expect(screen.getByText(role.title)).toBeInTheDocument()
    expect(screen.getByText(`${role.startDate} – ${role.endDate}`)).toBeInTheDocument()
  })

  it('renders every bullet', () => {
    render(<ExperienceEntry role={role} />)
    for (const bullet of role.bullets) {
      expect(screen.getByText(bullet)).toBeInTheDocument()
    }
  })
})
