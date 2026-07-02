'use client'

import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactIconLink({
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
    <div className="relative">
      <motion.a
        href={href}
        onClick={handleClick}
        title={label}
        aria-label={label}
        whileHover={{ scale: 1.15, borderColor: '#6ee7b7', color: '#6ee7b7' }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-xl text-muted transition-colors"
      >
        {icon}
      </motion.a>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-accent px-2 py-0.5 text-xs font-semibold text-ink"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
