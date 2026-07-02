import { describe, it, expect, vi, beforeEach } from 'vitest'

const sendMock = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } }
  }),
}))

import { sendContactEmail } from './sendContactEmail'

describe('sendContactEmail', () => {
  beforeEach(() => {
    sendMock.mockReset()
    sendMock.mockResolvedValue({ data: { id: 'email_123' }, error: null })
    process.env.RESEND_API_KEY = 'test-key'
    process.env.CONTACT_EMAIL_TO = 'ganesh@example.com'
  })

  it('sends an email with the submitted fields', async () => {
    await sendContactEmail({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' })

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'ganesh@example.com',
        subject: expect.stringContaining('Jane Doe'),
        text: expect.stringContaining('Hello there'),
        replyTo: 'jane@example.com',
      })
    )
  })

  it('throws when Resend returns an error', async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: 'bad request' } })

    await expect(
      sendContactEmail({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' })
    ).rejects.toThrow('bad request')
  })
})
