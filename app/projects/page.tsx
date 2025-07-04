import { getProjectsData } from '@/lib/data'

export default async function ProjectsPage() {
  const projects = await getProjectsData()

  return (
    <section
      className="relative min-h-screen flex items-start justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-primary-active"
      id="projects"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary-hover/80 to-accent/20" />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-pulse-slow" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/40 rounded-full animate-bounce-slow" />
          <div
            className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent/20 rounded-full animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-accent/35 rounded-full animate-bounce-slow"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-accent/25 rounded-full animate-pulse-slow"
            style={{ animationDelay: '3s' }}
          />
        </div>

        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid-projects"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#grid-projects)"
              className="text-white"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-32 pb-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Projects
            </h1>
          </div>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70"
              >
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  {project.name}
                </h2>
                <p className="text-white/80 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-end">
                  <div className="flex gap-3">
                    <a
                      href={project.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={
                        project.name ===
                        'Wald Accumulator Model for Simple Anticipatory Decisions'
                          ? 'wurm-2021-timing-anticipatory-decisions.pdf'
                          : undefined
                      }
                      className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                    >
                      {project.name ===
                      'Wald Accumulator Model for Simple Anticipatory Decisions'
                        ? 'Download Paper'
                        : 'View Project'}{' '}
                      →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-hover/20 rounded-full blur-3xl" />
    </section>
  )
}
