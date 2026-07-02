'use client'

import { useState } from 'react'
import { validateContactForm, ContactFormInput } from '@/lib/validateContactForm'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormInput>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({})
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = validateContactForm(form)
    setErrors(result.errors)

    if (!result.valid) {
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) {
        throw new Error('Request failed')
      }
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-muted">
          Name
        </label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full rounded border border-border bg-panel px-3 py-2 text-sm"
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-muted">
          Email
        </label>
        <input
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 w-full rounded border border-border bg-panel px-3 py-2 text-sm"
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          className="mt-1 w-full rounded border border-border bg-panel px-3 py-2 text-sm"
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded bg-accent px-4 py-2 text-sm font-semibold text-base disabled:opacity-50"
      >
        Send Message
      </button>

      {status === 'success' && (
        <p className="text-sm text-accent">Message sent — thanks for reaching out!</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400">Something went wrong. Please email me directly instead.</p>
      )}
    </form>
  )
}
