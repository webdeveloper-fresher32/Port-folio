import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FaEnvelope } from 'react-icons/fa6'
import ContactInfoCard from './ContactInfoCard'

describe('ContactInfoCard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
  })

  it('renders the label and value with the given link', () => {
    render(
      <ContactInfoCard
        icon={<FaEnvelope />}
        label="Email"
        value="jane@example.com"
        href="mailto:jane@example.com"
      />
    )
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', 'mailto:jane@example.com')
  })

  it('copies the value and shows a confirmation when copyable', async () => {
    render(
      <ContactInfoCard
        icon={<FaEnvelope />}
        label="Email"
        value="jane@example.com"
        href="mailto:jane@example.com"
        copyable
      />
    )
    await userEvent.click(screen.getByRole('link'))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('jane@example.com')
    expect(await screen.findByText('Copied!')).toBeInTheDocument()
  })

  it('does not attempt to copy when not copyable', async () => {
    render(
      <ContactInfoCard
        icon={<FaEnvelope />}
        label="LinkedIn"
        value="jane-doe"
        href="https://linkedin.com/in/jane-doe"
      />
    )
    await userEvent.click(screen.getByRole('link'))

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument()
  })
})
