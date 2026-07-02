'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/skills'
import { SKILL_ICONS, SKILL_COLORS } from '@/lib/skillIcons'

export default function SkillsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((category, index) => (
        <motion.div
          key={category.label}
          className="rounded-lg border border-border bg-panel p-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">{category.label}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => {
              const Icon = SKILL_ICONS[skill]
              const color = SKILL_COLORS[skill]
              return (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.08, borderColor: color ?? '#6ee7b7' }}
                  className="flex items-center gap-1.5 rounded border border-border px-2 py-1 text-xs text-muted"
                >
                  {Icon && <Icon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />}
                  {skill}
                </motion.span>
              )
            })}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
