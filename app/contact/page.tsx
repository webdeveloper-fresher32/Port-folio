import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa6'
import ContactForm from '@/components/ContactForm'
import ContactInfoCard from '@/components/ContactInfoCard'
import FadeIn from '@/components/FadeIn'

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
    <div className="mx-auto w-[85%] max-w-6xl space-y-12 py-20">
      <FadeIn>
        <div>
          <h1 className="text-5xl font-bold">Let&apos;s Talk</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Have a role, project, or idea in mind? Reach out directly below, or click a card to copy
            it instantly.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <FadeIn delay={0.05}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CONTACT_METHODS.map((method) => (
              <ContactInfoCard key={method.label} {...method} />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  )
}
