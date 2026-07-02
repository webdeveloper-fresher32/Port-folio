export default function Footer() {
  return (
    <footer className="border-t border-border px-10 py-8 text-base text-subtle">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>&copy; {new Date().getFullYear()} Ganesh Pirikirala</span>
        <div className="flex gap-4">
          <a href="https://github.com/webdeveloper-fresher32" className="hover:text-accent">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/ganesh-p-b711a924a" className="hover:text-accent">
            LinkedIn
          </a>
          <a href="mailto:pirikiralaganesh1234@gmail.com" className="hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
