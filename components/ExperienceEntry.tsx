'use client'

import { motion } from 'framer-motion'
import { ExperienceRole } from '@/data/types'

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
}

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
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            {role.title}
          </motion.span>{' '}
          <span aria-hidden="true" className="text-muted">·</span>{' '}
          <span className="text-muted">{role.company}</span>
        </h3>
        <span className="font-mono text-base text-subtle">
          {role.startDate} – {role.endDate}
        </span>
      </div>
      <motion.ul
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-5 list-disc space-y-4 pl-5 text-lg leading-relaxed text-muted"
      >
        {role.bullets.map((bullet) => (
          <motion.li key={bullet} variants={itemVariants} transition={{ duration: 0.4 }}>
            {bullet}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
