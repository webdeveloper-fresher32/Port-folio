'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
]

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
        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105 active:scale-95"
        >
          Contact
        </Link>
      </motion.nav>
    </div>
  )
}
