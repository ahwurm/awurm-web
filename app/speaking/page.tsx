import InteractiveFeatures from '@/components/InteractiveFeatures'

export default function SpeakingPage() {
  return (
    <section
      className="relative min-h-screen flex items-start justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-primary-active"
      id="speaking"
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
                id="grid-speaking"
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
              fill="url(#grid-speaking)"
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
              Speaking Engagements
            </h1>
          </div>
          {/* Speaking Engagements */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70">
              <div className="speaking__item">
                <div className="speaking__thumbnail flex-shrink-0 w-48 rounded-lg overflow-hidden border-2 border-accent/30">
                  <img
                    src="/dremio-presentation-title.png"
                    alt="Dremio Presentation Preview"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="speaking__content flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-white/60 font-medium">
                      June 24, 2025
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-white">
                    Unlock AI-Ready Data with the Intelligent Iceberg Lakehouse
                  </h2>
                  <p className="text-white/80 mb-3 leading-relaxed">
                    Exploring advanced data lakehouse architectures and AI
                    integration patterns for modern analytics workloads.
                  </p>
                  <div className="flex items-center justify-end">
                    <a
                      href="https://hello.dremio.com/webcast-unlock-ai-ready-data-with-the-intelligent-iceberg-lakehouse-reg.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                    >
                      View Details →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70">
              <div className="speaking__item">
                <div className="speaking__thumbnail flex-shrink-0 w-48 rounded-lg overflow-hidden border-2 border-accent/30">
                  <img
                    src="/google-analytics-webinar-title.png"
                    alt="Google Analytics Webinar Preview"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="speaking__content flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-white/60 font-medium">
                      June 19, 2025
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-white">
                    Nucleus Research: Unlock the Power of Unified Analytics and
                    Drive Customer Value with Google Cloud Analytics
                  </h2>
                  <p className="text-white/80 mb-3 leading-relaxed">
                    Demonstrating how unified analytics platforms can drive
                    customer value through advanced AI and machine learning
                    capabilities.
                  </p>
                  <div className="flex items-center justify-end">
                    <a
                      href="https://www.brighttalk.com/webcast/20069/643627?utm_source=brighttalk-portal&utm_medium=web&utm_campaign=channel-page&utm_content=featured"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                    >
                      View Details →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70">
              <div className="speaking__item">
                <div className="speaking__thumbnail flex-shrink-0 w-48 rounded-lg overflow-hidden border-2 border-accent/30">
                  <img
                    src="/oracle-generative-ai-title.png"
                    alt="Oracle Generative AI Presentation Preview"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="speaking__content flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-white/60 font-medium">
                      February 1, 2024
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-white">
                    Nucleus Generative AI: Transforming Enterprise Operations
                  </h2>
                  <p className="text-white/80 mb-3 leading-relaxed">
                    Presented insights on how generative AI is revolutionizing
                    enterprise operations and driving digital transformation
                    initiatives across industries.
                  </p>
                  <div className="flex items-center justify-end">
                    <a
                      href="/oracle-generative-ai-slides.pptx"
                      download="Nucleus Generative AI Presentation - Oracle Miami Event.pptx"
                      className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                    >
                      Download Slides →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70">
              <div className="speaking__item">
                <div className="speaking__thumbnail flex-shrink-0 w-48 rounded-lg overflow-hidden border-2 border-accent/30">
                  <img
                    src="/tray-ai-webinar-title.png"
                    alt="Tray.AI Webinar Preview"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="speaking__content flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-white/60 font-medium">
                      July 8, 2023
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-white">
                    The ROI of Tray.AI: Maximizing Automation Value
                  </h2>
                  <p className="text-white/80 mb-3 leading-relaxed">
                    Analyzing the return on investment and business value of
                    intelligent automation platforms in enterprise environments.
                  </p>
                  <div className="flex items-center justify-end">
                    <a
                      href="https://tray.ai/webinars/avid-modernized-it-integration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                    >
                      View Details →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70">
              <div className="speaking__item">
                <div className="speaking__thumbnail flex-shrink-0 w-48 rounded-lg overflow-hidden border-2 border-accent/30">
                  <img
                    src="/bigquery-webinar-title.png"
                    alt="BigQuery Webinar Preview"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="speaking__content flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-white/60 font-medium">
                      December 1, 2022
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-white">
                    BigQuery Data Analytics and AI Integration
                  </h2>
                  <p className="text-white/80 mb-3 leading-relaxed">
                    Exploring advanced BigQuery analytics capabilities and AI/ML
                    integration patterns for modern data-driven organizations.
                  </p>
                  <div className="flex items-center justify-end">
                    <a
                      href="https://cloudonair.withgoogle.com/events/empowering-the-data-driven-business-with-modern-analytics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium"
                    >
                      View Details →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
