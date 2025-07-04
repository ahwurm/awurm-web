export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-accent text-primary font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-hover"
    >
      Skip to main content
    </a>
  )
}
