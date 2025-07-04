import InteractiveFeatures from '@/components/InteractiveFeatures'

export default function AboutPage() {
  return (
    <section
      className="relative min-h-screen flex items-start justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-primary-active"
      id="about"
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
                id="grid-about"
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
              fill="url(#grid-about)"
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
              About
            </h1>
          </div>
          {/* Bio Widget with UF Background */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70 overflow-hidden">
            {/* UF Banner Background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: "url('/uf-banner.jpg')" }}
            ></div>

            {/* Content */}
            <div className="relative z-10 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold mb-4 text-white">
                  Alexander H. Wurm
                </h2>
              </div>

              {/* First Paragraph with SpaceX Photo */}
              <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
                <div className="flex-1">
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 border-2 border-accent/40 shadow-lg">
                    <p className="text-lg text-white leading-relaxed">
                      Alexander H. Wurm is a Principal Analyst at Nucleus
                      Research, where he covers analytics and data management
                      technologies. With expertise spanning cognitive science,
                      decision modeling, and enterprise analytics platforms, he
                      bridges the gap between academic research and practical
                      business solutions.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="/spacex-photo.jpg"
                    alt="SpaceX Visit"
                    className="rounded-lg border-2 border-accent/50 shadow-lg"
                    style={{ width: '200px' }}
                  />
                </div>
              </div>

              {/* Second Paragraph with C&DM Logo */}
              <div className="flex flex-col lg:flex-row-reverse items-start gap-6">
                <div className="flex-1">
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 border-2 border-accent/40 shadow-lg">
                    <p className="text-lg text-white leading-relaxed">
                      Alexander previously conducted research at the University
                      of Florida&apos;s Cognition and Decision Modeling Lab,
                      where he published work on timing in anticipatory
                      decisions and developed computational models for
                      understanding human decision-making processes.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="/cdm-lab-logo.png"
                    alt="Cognition & Decision Modeling Laboratory"
                    className="rounded-lg border-2 border-accent/50 shadow-lg"
                    style={{ width: '200px' }}
                  />
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
