'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MAX_PUPIL_OFFSET = 2.5
const SENSITIVITY = 15

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function HeroMascot({ className }: { className?: string }) {
  const headRef = useRef<HTMLDivElement>(null)
  const pupilX = useMotionValue(0)
  const pupilY = useMotionValue(0)
  const springPupilX = useSpring(pupilX, { stiffness: 500, damping: 30 })
  const springPupilY = useSpring(pupilY, { stiffness: 500, damping: 30 })

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const rect = headRef.current?.getBoundingClientRect()
      if (!rect) return
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      pupilX.set(clamp(dx / SENSITIVITY, -MAX_PUPIL_OFFSET, MAX_PUPIL_OFFSET))
      pupilY.set(clamp(dy / SENSITIVITY, -MAX_PUPIL_OFFSET, MAX_PUPIL_OFFSET))
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [pupilX, pupilY])

  return (
    <div className={className}>
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative mb-3 rounded-xl border border-border bg-panel px-4 py-2 text-sm font-medium text-accent shadow-lg"
        >
          Hello! 👋
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-panel" />
        </motion.div>

        <div className="relative flex flex-col items-center">
          <div className="h-3 w-0.5 bg-border" />
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="-mt-1 h-2 w-2 rounded-full bg-accent"
          />

          <div
            ref={headRef}
            className="mt-1 flex h-14 w-16 items-center justify-center rounded-xl border-2 border-border bg-panel"
          >
            <div className="flex h-8 w-11 items-center justify-center gap-2 rounded-md bg-ink">
              {[0, 1].map((eye) => (
                <div
                  key={eye}
                  className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-ink"
                >
                  <motion.span
                    style={{ x: springPupilX, y: springPupilY }}
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative -mt-1 h-14 w-16 rounded-lg border-2 border-border bg-panel">
            <div className="absolute left-1 top-3 h-1.5 w-8 rotate-[25deg] rounded-full bg-border" />
            <div className="absolute right-1 top-3 h-1.5 w-8 -rotate-[25deg] rounded-full bg-border" />
          </div>
        </div>
      </div>
    </div>
  )
}
