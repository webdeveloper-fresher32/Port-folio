import { skills } from '@/data/skills'

export default function SkillsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((category) => (
        <div key={category.label} className="rounded-lg border border-border bg-panel p-4">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">{category.label}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span key={skill} className="rounded border border-border px-2 py-1 text-xs text-muted">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
