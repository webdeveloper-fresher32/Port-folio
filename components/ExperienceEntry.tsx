'use client'

import { motion } from 'framer-motion'
import { ExperienceRole } from '@/data/types'

export default function ExperienceEntry({ role }: { role: ExperienceRole }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-3xl font-semibold">
          {role.title} <span aria-hidden="true" className="text-muted">·</span>{' '}
          <span className="text-muted">{role.company}</span>
        </h3>
        <span className="font-mono text-base text-subtle">
          {role.startDate} – {role.endDate}
        </span>
      </div>
      <ul className="mt-5 list-disc space-y-4 pl-5 text-lg leading-relaxed text-muted">
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </motion.div>
  )
}
