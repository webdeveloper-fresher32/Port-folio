import Link from 'next/link'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className="flex items-center justify-between border-b border-border px-10 py-5">
      <Link href="/" className="font-mono text-lg text-accent transition-transform hover:scale-105">
        ganesh.dev
      </Link>
      <div className="flex gap-8">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative text-base text-muted transition-colors hover:text-accent"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>
    </nav>
  )
}
