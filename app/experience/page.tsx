import TimelineItem from '@/components/TimelineItem'
import FadeIn from '@/components/FadeIn'
import { experience } from '@/data/experience'

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-[85%] max-w-6xl space-y-12 py-20">
      <FadeIn>
        <h1 className="text-5xl font-bold">Experience</h1>
      </FadeIn>
      <div>
        {experience.map((role, index) => (
          <TimelineItem
            key={`${role.company}-${role.startDate}`}
            role={role}
            isLast={index === experience.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
