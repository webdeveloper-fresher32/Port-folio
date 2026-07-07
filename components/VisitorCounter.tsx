'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FiEye } from 'react-icons/fi'

const VISITED_KEY = 'ganesh-dev-visited'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem(VISITED_KEY)

    if (alreadyVisited) {
      fetch('/api/visits')
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch(() => setCount(null))
      return
    }

    sessionStorage.setItem(VISITED_KEY, '1')
    fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pathname }),
    })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => setCount(null))
  }, [pathname])

  if (count === null) return null

  return (
    <div
      className="flex shrink-0 items-center gap-1.5 text-sm text-muted"
      title={`${count} visitor${count === 1 ? '' : 's'}`}
    >
      <FiEye className="h-4 w-4" aria-hidden="true" />
      <span className="font-mono">{count.toLocaleString()}</span>
    </div>
  )
}
