'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/data/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="rounded-lg border border-border bg-panel p-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, borderColor: '#6ee7b7' }}
      transition={{ duration: 0.25 }}
    >
      <Link href={`/projects/${project.slug}`} className="text-lg font-semibold hover:text-accent">
        {project.name}
      </Link>
      <p className="mt-2 text-sm text-muted">{project.oneLiner}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="rounded border border-border px-2 py-0.5 text-xs text-subtle">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        {project.liveUrl && (
          <a href={project.liveUrl} className="text-accent hover:underline">
            Live Demo
          </a>
        )}
        {project.sourceUrl && (
          <a href={project.sourceUrl} className="text-accent hover:underline">
            Source Code
          </a>
        )}
      </div>
    </motion.div>
  )
}
