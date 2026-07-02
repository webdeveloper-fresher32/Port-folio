import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="border-t border-border px-10 py-8 text-base text-subtle">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>&copy; {new Date().getFullYear()} Ganesh Pirikirala</span>
        <div className="flex gap-5 text-xl">
          <a
            href="https://github.com/webdeveloper-fresher32"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ganesh-p-b711a924a"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:pirikiralaganesh1234@gmail.com"
            aria-label="Email"
            className="transition-colors hover:text-accent"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  )
}
