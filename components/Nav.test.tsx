import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from './Nav'

describe('Nav', () => {
  it('renders a link to every main page', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })
})
