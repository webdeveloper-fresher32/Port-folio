import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FaEnvelope } from 'react-icons/fa6'
import ContactIconLink from './ContactIconLink'

describe('ContactIconLink', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
  })

  it('renders a link with the given href and accessible label', () => {
    render(
      <ContactIconLink
        icon={<FaEnvelope />}
        label="Email"
        value="jane@example.com"
        href="mailto:jane@example.com"
      />
    )
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:jane@example.com'
    )
  })

  it('copies the value and shows a confirmation when copyable', async () => {
    render(
      <ContactIconLink
        icon={<FaEnvelope />}
        label="Email"
        value="jane@example.com"
        href="mailto:jane@example.com"
        copyable
      />
    )
    await userEvent.click(screen.getByRole('link', { name: 'Email' }))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('jane@example.com')
    expect(await screen.findByText('Copied!')).toBeInTheDocument()
  })

  it('does not attempt to copy when not copyable', async () => {
    render(
      <ContactIconLink
        icon={<FaEnvelope />}
        label="LinkedIn"
        value="jane-doe"
        href="https://linkedin.com/in/jane-doe"
      />
    )
    await userEvent.click(screen.getByRole('link', { name: 'LinkedIn' }))

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument()
  })
})
