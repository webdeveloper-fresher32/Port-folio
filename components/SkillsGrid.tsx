import { skills } from '@/data/skills'
import { SKILL_ICONS } from '@/lib/skillIcons'

export default function SkillsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((category) => (
        <div key={category.label} className="rounded-lg border border-border bg-panel p-4">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">{category.label}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => {
              const Icon = SKILL_ICONS[skill]
              return (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 rounded border border-border px-2 py-1 text-xs text-muted"
                >
                  {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                  {skill}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
