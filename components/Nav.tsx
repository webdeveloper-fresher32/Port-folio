'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import VisitorCounter from './VisitorCounter'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
]

const MotionLink = motion.create(Link)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4">
      <motion.nav
        animate={{
          paddingTop: scrolled ? 8 : 14,
          paddingBottom: scrolled ? 8 : 14,
          boxShadow: scrolled ? '0 8px 24px rgba(0,0,0,0.35)' : '0 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex w-[90%] max-w-[100rem] items-center justify-between gap-6 rounded-full border border-border bg-panel/70 px-6 backdrop-blur-md"
      >
        <Link
          href="/"
          className="shrink-0 font-mono text-lg text-accent transition-transform hover:scale-105"
        >
          ganesh.dev
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-base transition-colors hover:text-accent ${
                  isActive ? 'text-accent' : 'text-muted'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </div>
        <VisitorCounter />
        <MotionLink
          href="/contact"
          animate={{
            boxShadow: [
              '0 0 0px rgba(110,231,183,0)',
              '0 0 16px rgba(110,231,183,0.5)',
              '0 0 0px rgba(110,231,183,0)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="group flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink"
        >
          Contact
          <span
            aria-hidden="true"
            className="inline-block -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
          >
            →
          </span>
        </MotionLink>
      </motion.nav>
    </div>
  )
}
