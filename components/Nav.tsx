import Link from 'next/link'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className="flex items-center justify-between border-b border-border px-6 py-4">
      <Link href="/" className="font-mono text-accent">
        ganesh.dev
      </Link>
      <div className="flex gap-6">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm text-muted hover:text-accent">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
