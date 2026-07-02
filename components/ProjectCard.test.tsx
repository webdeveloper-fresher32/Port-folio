import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

describe('ProjectCard', () => {
  const project = projects[0]

  it('renders the project name linking to its detail page', () => {
    render(<ProjectCard project={project} />)
    expect(screen.getByRole('link', { name: project.name })).toHaveAttribute(
      'href',
      `/projects/${project.slug}`
    )
  })

  it('renders a live demo link when liveUrl is set', () => {
    render(<ProjectCard project={project} />)
    expect(screen.getByRole('link', { name: 'Live Demo' })).toHaveAttribute('href', project.liveUrl!)
  })

  it('omits the live demo link when liveUrl is null', () => {
    render(<ProjectCard project={{ ...project, liveUrl: null }} />)
    expect(screen.queryByRole('link', { name: 'Live Demo' })).not.toBeInTheDocument()
  })
})
