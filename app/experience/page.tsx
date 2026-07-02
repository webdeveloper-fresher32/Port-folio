import type { Metadata } from 'next'
import TimelineItem from '@/components/TimelineItem'
import AnimatedHeading from '@/components/AnimatedHeading'
import { experience } from '@/data/experience'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    "Ganesh Pirikirala's professional experience across Cognitivo, Northgaze Inc, Contenterra Software, and Venkys IO, building full-stack SaaS, AI, and billing platforms.",
}

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-[85%] max-w-6xl space-y-12 py-20">
      <AnimatedHeading text="Experience" className="text-5xl font-bold" />
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
