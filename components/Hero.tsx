'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigateToPage = (path: string) => {
    router.push(path)
  }

  if (!mounted) return null

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-primary-active pt-24 sm:pt-20 md:pt-24"
      id="home"
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
                id="grid"
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
              fill="url(#grid)"
              className="text-white"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center space-y-8 animate-fade-in-up">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
                <span
                  className="block opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: '0.2s',
                    animationFillMode: 'forwards',
                  }}
                >
                  Alexander H. Wurm
                </span>
              </h1>

              <div className="space-y-2">
                <p
                  className="text-xl sm:text-2xl md:text-3xl text-accent font-semibold opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: '0.4s',
                    animationFillMode: 'forwards',
                  }}
                >
                  Principal Analyst & Researcher
                </p>
                <p
                  className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: '0.6s',
                    animationFillMode: 'forwards',
                  }}
                >
                  Advancing decision science through computational modeling and
                  enterprise technology research
                </p>
              </div>
            </div>

            {/* Spacing placeholder to maintain layout */}
            <div className="h-1"></div>

            {/* Call-to-Action Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => navigateToPage('/research')}
                className="group relative overflow-hidden bg-accent hover:bg-accent-hover text-primary font-semibold px-8 py-4 rounded-lg transition-all duration-elegant transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
              >
                <span className="relative z-10">Explore Research</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-elegant origin-left" />
              </button>

              <button
                onClick={() => navigateToPage('/projects')}
                className="group relative overflow-hidden bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg border-2 border-white/30 hover:border-white/50 transition-all duration-elegant transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              >
                <span className="relative z-10">View Projects</span>
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className="flex-shrink-0 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <div className="relative">
              <div className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px] rounded-lg overflow-hidden border-4 border-accent/50 shadow-2xl">
                <img
                  src="/headshot.jpg"
                  alt="Alexander H. Wurm"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-hover/20 rounded-full blur-3xl" />
    </section>
  )
}
