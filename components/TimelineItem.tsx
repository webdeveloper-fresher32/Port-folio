'use client'

import { motion } from 'framer-motion'
import ExperienceEntry from './ExperienceEntry'
import { ExperienceRole } from '@/data/types'

export default function TimelineItem({ role, isLast }: { role: ExperienceRole; isLast: boolean }) {
  return (
    <div className="group relative flex gap-6">
      <div className="flex flex-col items-center">
        <motion.div
          className="mt-2 h-4 w-4 shrink-0 rounded-full border-2"
          initial={{ scale: 0.6, backgroundColor: '#111114', borderColor: '#27272a' }}
          whileInView={{ scale: 1, backgroundColor: '#6ee7b7', borderColor: '#6ee7b7' }}
          whileHover={{ scale: 1.4 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.3 }}
        />
        {!isLast && (
          <div className="mt-1 w-px flex-1 bg-border transition-colors duration-500 group-hover:bg-accent" />
        )}
      </div>
      <div className="flex-1 pb-12">
        <ExperienceEntry role={role} />
      </div>
    </div>
  )
}
