import ContactForm from '@/components/ContactForm'
import FadeIn from '@/components/FadeIn'

export default function ContactPage() {
  return (
    <div className="mx-auto w-[80%] max-w-2xl space-y-8 py-16">
      <FadeIn>
        <div>
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="mt-2 text-muted">
            Reach out directly at{' '}
            <a href="mailto:pirikiralaganesh1234@gmail.com" className="text-accent hover:underline">
              pirikiralaganesh1234@gmail.com
            </a>{' '}
            or use the form below.
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <a href="https://www.linkedin.com/in/ganesh-p-b711a924a" className="text-accent hover:underline">
              LinkedIn
            </a>
            <a href="https://github.com/webdeveloper-fresher32" className="text-accent hover:underline">
              GitHub
            </a>
            <a href="tel:+917659869814" className="text-accent hover:underline">
              +91 76598 69814
            </a>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <ContactForm />
      </FadeIn>
    </div>
  )
}
