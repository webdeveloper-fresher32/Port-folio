import { Resend } from 'resend'
import { ContactFormInput } from './validateContactForm'

export async function sendContactEmail(input: ContactFormInput): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = process.env.CONTACT_EMAIL_TO

  if (!to) {
    throw new Error('CONTACT_EMAIL_TO environment variable is not set')
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact Form <contact@resend.dev>',
    to,
    replyTo: input.email,
    subject: `New portfolio message from ${input.name}`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
  })

  if (error) {
    throw new Error(error.message)
  }
}
