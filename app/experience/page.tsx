import ExperienceEntry from '@/components/ExperienceEntry'
import FadeIn from '@/components/FadeIn'
import { experience } from '@/data/experience'

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-[80%] max-w-4xl space-y-8 py-16">
      <FadeIn>
        <h1 className="text-3xl font-bold">Experience</h1>
      </FadeIn>
      <div className="space-y-8">
        {experience.map((role) => (
          <ExperienceEntry key={`${role.company}-${role.startDate}`} role={role} />
        ))}
      </div>
    </div>
  )
}
