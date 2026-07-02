import type { Metadata } from 'next'
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa6'
import ContactForm from '@/components/ContactForm'
import ContactIconLink from '@/components/ContactIconLink'
import FadeIn from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Ganesh Pirikirala for full-stack engineering roles, freelance projects, or collaboration.',
}

const CONTACT_METHODS = [
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'pirikiralaganesh1234@gmail.com',
    href: 'mailto:pirikiralaganesh1234@gmail.com',
    copyable: true,
  },
  {
    icon: <FaPhone />,
    label: 'Phone',
    value: '+91 76598 69814',
    href: 'tel:+917659869814',
    copyable: true,
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'ganesh-p-b711a924a',
    href: 'https://www.linkedin.com/in/ganesh-p-b711a924a',
    copyable: false,
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: 'webdeveloper-fresher32',
    href: 'https://github.com/webdeveloper-fresher32',
    copyable: false,
  },
]

export default function ContactPage() {
  return (
    <div className="mx-auto w-[90%] max-w-xl space-y-10 py-24">
      <FadeIn>
        <div className="text-center">
          <h1 className="text-5xl font-bold">Let&apos;s Talk</h1>
          <p className="mt-3 text-lg text-muted">
            Have a role, project, or idea in mind? Send a message below — I&apos;ll get back to you
            soon.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <ContactForm />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="flex justify-center gap-4">
          {CONTACT_METHODS.map((method) => (
            <ContactIconLink key={method.label} {...method} />
          ))}
        </div>
      </FadeIn>
    </div>
  )
}
