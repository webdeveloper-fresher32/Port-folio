import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillsGrid from './SkillsGrid'
import { skills } from '@/data/skills'

describe('SkillsGrid', () => {
  it('renders a heading for every skill category', () => {
    render(<SkillsGrid />)
    for (const category of skills) {
      expect(screen.getByText(category.label)).toBeInTheDocument()
    }
  })

  it('renders every individual skill', () => {
    render(<SkillsGrid />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })
})
