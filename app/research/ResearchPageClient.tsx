'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { type ResearchPaper, type IndustryResearch } from '@/lib/data'
import { getNucleusResearchUrl } from '@/lib/research-utils'
import ExternalLinkIcon from '@/components/ExternalLinkIcon'
import InteractiveFeatures from '@/components/InteractiveFeatures'

type ResearchType = 'academic' | 'industry'

interface Props {
  academicResearch: ResearchPaper[]
  industryResearch: IndustryResearch[]
}

export default function ResearchPageClient({
  academicResearch,
  industryResearch,
}: Props) {
  const [activeType, setActiveType] = useState<ResearchType>('academic')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Check URL parameters whenever the URL changes
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get('tab')
    if (tab === 'industry') {
      setActiveType('industry')
    } else {
      setActiveType('academic')
    }
  }, [pathname]) // This will trigger when the URL changes

  useEffect(() => {
    // Also listen for popstate events (browser back/forward)
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const tab = urlParams.get('tab')
      if (tab === 'industry') {
        setActiveType('industry')
      } else {
        setActiveType('academic')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const industryYears = Array.from(
    new Set(industryResearch.map((r) => r.year))
  ).sort((a, b) => b - a)
  const filteredIndustryResearch = selectedYear
    ? industryResearch.filter((r) => r.year === selectedYear)
    : industryResearch

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ROI Case Study':
        return 'bg-green-100 text-green-800'
      case 'Technology Value Matrix':
        return 'bg-blue-100 text-blue-800'
      case 'Predictions':
        return 'bg-purple-100 text-purple-800'
      case 'Hot Companies':
        return 'bg-orange-100 text-orange-800'
      case 'ROI Guidebook':
        return 'bg-emerald-100 text-emerald-800'
      case 'Partnership Announcement':
        return 'bg-cyan-100 text-cyan-800'
      case 'M&A Analysis':
        return 'bg-red-100 text-red-800'
      case 'Solution Analysis':
        return 'bg-indigo-100 text-indigo-800'
      case 'Benefit Case Study':
        return 'bg-teal-100 text-teal-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section
      className="relative min-h-screen flex items-start justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-primary-active"
      id="research"
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
                id="grid-research"
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
              fill="url(#grid-research)"
              className="text-white"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-32 pb-12">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Research
            </h1>
          </div>

          {/* Research Controls - Responsive Single Line */}
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
              {/* Year Filter Dropdown - Left aligned with content on desktop */}
              <div className="order-2 sm:order-1 sm:self-start">
                <select
                  value={selectedYear || ''}
                  onChange={(e) =>
                    setSelectedYear(
                      e.target.value === '' ? null : parseInt(e.target.value)
                    )
                  }
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                >
                  <option value="" className="bg-primary text-white">
                    All Years
                  </option>
                  {activeType === 'academic' ? (
                    <option value="2021" className="bg-primary text-white">
                      2021 (1)
                    </option>
                  ) : (
                    industryYears.map((year) => (
                      <option
                        key={year}
                        value={year}
                        className="bg-primary text-white"
                      >
                        {year} (
                        {industryResearch.filter((r) => r.year === year).length}
                        )
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Research Type Tabs - Center on desktop, top on mobile */}
              <div className="order-1 sm:order-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 shadow-md">
                  <button
                    onClick={() => setActiveType('academic')}
                    className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeType === 'academic'
                        ? 'bg-accent text-primary shadow-sm'
                        : 'text-white/70 hover:text-accent'
                    }`}
                  >
                    Academic
                  </button>
                  <button
                    onClick={() => setActiveType('industry')}
                    className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeType === 'industry'
                        ? 'bg-accent text-primary shadow-sm'
                        : 'text-white/70 hover:text-accent'
                    }`}
                  >
                    Industry ({industryResearch.length})
                  </button>
                </div>
              </div>

              {/* Spacer to balance layout on desktop */}
              <div className="hidden sm:block order-3 w-[120px]"></div>
            </div>
          </div>

          {/* Academic Research Section */}
          {activeType === 'academic' && (
            <div className="space-y-6">
              {(selectedYear === null
                ? academicResearch
                : academicResearch.filter((r) => r.year === selectedYear)
              ).map((paper, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70"
                >
                  <h2 className="text-2xl font-semibold mb-2 text-white">
                    {paper.title}
                  </h2>
                  <p className="text-white/70 mb-3">{paper.authors}</p>
                  <p className="text-white/80 mb-4 leading-relaxed">
                    {paper.abstract}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60 font-medium">
                      {paper.year} • {paper.venue}
                    </span>
                    <div className="flex gap-3">
                      {paper.url && (
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                        >
                          Read Paper →
                        </a>
                      )}
                      {paper.pdfUrl && (
                        <a
                          href={paper.pdfUrl}
                          download="wurm-2021-timing-anticipatory-decisions.pdf"
                          className="bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition-colors font-medium"
                        >
                          Download PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Industry Research Section */}
          {activeType === 'industry' && (
            <div className="space-y-6">
              {filteredIndustryResearch.map((research, index) => {
                const nucleusUrl = getNucleusResearchUrl(research)

                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(research.type)}`}
                      >
                        {research.type}
                      </span>
                      <span className="text-sm text-white/60 font-medium">
                        {research.year}
                      </span>
                    </div>

                    <h2 className="text-2xl font-semibold mb-2 text-white">
                      {research.title}
                    </h2>

                    <p className="text-white/80 mb-4 leading-relaxed">
                      {research.summary}
                    </p>

                    {research.roiClaim && (
                      <div className="bg-green-500/20 border border-green-400/30 rounded-md p-2 mb-3">
                        <p className="text-sm font-medium text-green-300">
                          {research.roiClaim}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60 font-medium">
                        {research.type} • {research.year}
                      </span>
                      <div className="flex gap-3">
                        <a
                          href={nucleusUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                        >
                          Read Research →
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-hover/20 rounded-full blur-3xl" />

      {/* Interactive Features Component */}
      <InteractiveFeatures />
    </section>
  )
}
