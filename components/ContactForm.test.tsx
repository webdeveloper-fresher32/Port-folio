import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
  })

  it('shows a validation error and does not submit when the message is too short', async () => {
    render(<ContactForm />)
    await userEvent.type(screen.getByLabelText('Name'), 'Jane')
    await userEvent.type(screen.getByLabelText('Email'), 'jane@example.com')
    await userEvent.type(screen.getByLabelText('Message'), 'hi')
    await userEvent.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(await screen.findByText('Message must be at least 10 characters')).toBeInTheDocument()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('submits to /api/contact and shows a success message on valid input', async () => {
    render(<ContactForm />)
    await userEvent.type(screen.getByLabelText('Name'), 'Jane Doe')
    await userEvent.type(screen.getByLabelText('Email'), 'jane@example.com')
    await userEvent.type(screen.getByLabelText('Message'), 'I would like to talk about a role.')
    await userEvent.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(await screen.findByText('Message sent — thanks for reaching out!')).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' })
    )
  })
})
