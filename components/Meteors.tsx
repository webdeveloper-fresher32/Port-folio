'use client'

import { useEffect, useState } from 'react'

interface Meteor {
  left: number
  top: number
  delay: number
  duration: number
}

export default function Meteors({ count = 20 }: { count?: number }) {
  const [meteors, setMeteors] = useState<Meteor[]>([])

  useEffect(() => {
    setMeteors(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 5 + Math.random() * 5,
      }))
    )
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {meteors.map((meteor, index) => (
        <span
          key={index}
          className="absolute h-0.5 w-0.5 animate-meteor rounded-full bg-accent before:absolute before:top-1/2 before:h-px before:w-12 before:-translate-y-1/2 before:bg-gradient-to-r before:from-accent before:to-transparent"
          style={{
            left: `${meteor.left}%`,
            top: `${meteor.top}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
