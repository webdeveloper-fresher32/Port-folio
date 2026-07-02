'use client'

import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactInfoCard({
  icon,
  label,
  value,
  href,
  copyable = false,
}: {
  icon: ReactNode
  label: string
  value: string
  href: string
  copyable?: boolean
}) {
  const [copied, setCopied] = useState(false)

  async function handleClick(e: React.MouseEvent) {
    if (!copyable) return
    e.preventDefault()
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      whileHover={{ y: -3, borderColor: '#6ee7b7' }}
      className="relative flex items-center gap-4 rounded-lg border border-border bg-panel p-5"
    >
      <span className="shrink-0 text-2xl text-accent" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-wide text-subtle">{label}</p>
        <p className="truncate text-base text-muted">{value}</p>
      </div>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-3 right-3 rounded bg-accent px-2 py-0.5 text-xs font-semibold text-ink"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  )
}
