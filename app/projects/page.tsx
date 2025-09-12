'use client'

import { useEffect, useState } from 'react'

interface Project {
  name: string
  description: string
  technologies: string[]
  status: string
  url?: string
  githubUrl?: string
  screenshot?: string
}

const projects: Project[] = [
  {
    name: "Smart Capital Tracker",
    description: "Python scripts to parse 13F filings, analyze current holdings, and track net position changes. Orchestrated with GitHub Actions to automatically update when new filings are due. Features real-time portfolio tracking and visualization of institutional investor strategies.",
    technologies: ["Python", "Streamlit", "Pandas", "yfinance", "Plotly", "SEC API", "GitHub Actions"],
    status: "Open Source Project",
    url: "https://smart-capital-tracker.streamlit.app/",
    githubUrl: "https://github.com/ahwurm/13f-dashboard-hosted"
  },
  {
    name: "Nucleus AI Tool",
    description: "RAG application using OpenAI and Pinecone alongside over 20 years of ROI reports from Nucleus Research to provide answers to end-user inquiries",
    technologies: ["Python", "OpenAI", "Pinecone"],
    status: "Completed",
    url: "https://nucleusresearch.com/ai/",
    screenshot: "/app-screenshots/nucleus-ai-tool.png"
  },
  {
    name: "Wald Accumulator Model for Simple Anticipatory Decisions",
    description: "A computational model for timing choices in anticipatory response tasks, developed as part of research at the UF Cognition and Decision Modeling Lab. Implements hierarchical Bayesian modeling techniques to analyze decision-making processes.",
    technologies: [
      "R",
      "rstan",
      "MCMC Sampling",
      "Hierarchical Bayesian Modeling",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    status: "Research Project",
    url: "/research-papers/wurm-2021-timing-anticipatory-decisions.pdf",
    screenshot: "/research-figures/response-distributions.png"
  }
]

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleProjectClick = (project: Project) => {
    if (project.name === 'Nucleus AI Tool') {
      setSelectedProject(project.name)
      setShowModal(true)
    } else if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer')
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedProject(null)
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        closeModal()
      }
    }

    if (showModal) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [showModal])

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
                    {project.name === 'Smart Capital Tracker' ? (
                      <>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md hover:bg-white/10 transition-colors"
                          aria-label="View GitHub Repository"
                        >
                          <svg
                            className="w-6 h-6 text-accent"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                          </svg>
                        </a>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                        >
                          Streamlit App →
                        </a>
                      </>
                    ) : project.name === 'Nucleus AI Tool' ? (
                      <button
                        onClick={() => handleProjectClick(project)}
                        className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                      >
                        View Screenshots →
                      </button>
                    ) : (
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
                    )}
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

      {/* Screenshot Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg bg-primary-hover/95 backdrop-blur-sm border-4 border-accent/50">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white">
                  Nucleus AI Tool Screenshots
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white/70 hover:text-white transition-colors text-2xl"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="rounded-lg overflow-hidden border-2 border-accent/30">
                  <img
                    src="/app-screenshots/nucleus-ai-tool-1.png"
                    alt="Nucleus AI Tool Screenshot 1"
                    className="w-full"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border-2 border-accent/30">
                  <img
                    src="/app-screenshots/nucleus-ai-tool-2.png"
                    alt="Nucleus AI Tool Screenshot 2"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}