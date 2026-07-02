import ExperienceEntry from '@/components/ExperienceEntry'
import FadeIn from '@/components/FadeIn'
import { experience } from '@/data/experience'

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-[85%] max-w-6xl space-y-10 py-20">
      <FadeIn>
        <h1 className="text-5xl font-bold">Experience</h1>
      </FadeIn>
      <div className="space-y-10">
        {experience.map((role) => (
          <ExperienceEntry key={`${role.company}-${role.startDate}`} role={role} />
        ))}
      </div>
    </div>
  )
}
