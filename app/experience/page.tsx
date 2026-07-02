import ExperienceEntry from '@/components/ExperienceEntry'
import { experience } from '@/data/experience'

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
      <h1 className="text-3xl font-bold">Experience</h1>
      <div className="space-y-8">
        {experience.map((role) => (
          <ExperienceEntry key={`${role.company}-${role.startDate}`} role={role} />
        ))}
      </div>
    </div>
  )
}
