import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const SITE_URL = 'https://port-folio-khaki-theta.vercel.app'
const TITLE = 'Ganesh Pirikirala — Full-Stack Software Engineer'
const DESCRIPTION =
  'Portfolio of Ganesh Pirikirala, a full-stack software engineer building enterprise SaaS, AI platforms, and Stripe billing systems with React, Next.js, TypeScript, and Node.js.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — Ganesh Pirikirala',
  },
  description: DESCRIPTION,
  keywords: [
    'Ganesh Pirikirala',
    'Full-Stack Software Engineer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Node.js',
    'Stripe billing',
    'SaaS engineer',
    'AI platform engineer',
  ],
  authors: [{ name: 'Ganesh Pirikirala', url: SITE_URL }],
  creator: 'Ganesh Pirikirala',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Ganesh Pirikirala',
    images: [{ url: '/profile.png', width: 240, height: 240, alt: 'Ganesh Pirikirala' }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/profile.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ganesh Pirikirala',
              url: SITE_URL,
              image: `${SITE_URL}/profile.png`,
              jobTitle: 'Full-Stack Software Engineer',
              email: 'mailto:pirikiralaganesh1234@gmail.com',
              sameAs: [
                'https://github.com/webdeveloper-fresher32',
                'https://www.linkedin.com/in/ganesh-p-b711a924a',
              ],
            }),
          }}
        />
        <Nav />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
