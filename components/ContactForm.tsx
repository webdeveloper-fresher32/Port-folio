'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-base text-muted">
          Name
        </label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-2 w-full rounded border border-border bg-panel px-4 py-3 text-base outline-none transition-colors focus:border-accent"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-base text-muted">
          Email
        </label>
        <input
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-2 w-full rounded border border-border bg-panel px-4 py-3 text-base outline-none transition-colors focus:border-accent"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="message" className="block text-base text-muted">
            Message
          </label>
          <span className="font-mono text-xs text-subtle">{form.message.length}/500</span>
        </div>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 500) })}
          rows={5}
          className="mt-2 w-full rounded border border-border bg-panel px-4 py-3 text-base outline-none transition-colors focus:border-accent"
        />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded bg-accent px-5 py-2.5 text-base font-semibold text-ink disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </motion.button>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-accent"
          >
            Message sent — thanks for reaching out!
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-400"
          >
            Something went wrong. Please email me directly instead.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
