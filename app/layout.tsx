import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ganesh Pirikirala — Full-Stack Software Engineer',
  description:
    'Portfolio of Ganesh Pirikirala, a full-stack software engineer building enterprise SaaS, AI platforms, and Stripe billing systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
