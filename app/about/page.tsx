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
          
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Resume */}
            <div className="lg:w-[44.444%]">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70 p-6">
                {/* Resume Content */}
                <div className="space-y-6 text-white">
                  {/* Header */}
                  <div className="text-center pb-4 border-b border-accent/30">
                    <h2 className="text-2xl font-bold mb-1">Alexander H. Wurm</h2>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-3">Professional Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold">Nucleus Research</h4>
                          <span className="text-sm text-white/70">Jun 2021 - Present</span>
                        </div>
                        <p className="text-sm text-white/80 mb-1">Research Analyst → Senior Analyst → Principal Analyst | Miami, FL</p>
                        <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                          <li>Oversee a team of research analysts covering data management, analytics, data science, and emerging AI markets</li>
                          <li>Presented research findings for Google, Oracle, Databricks, Teradata, Dremio, and more in live sessions and webinars</li>
                          <li>Quoted in press releases and publications such as TechTarget, Silicon Angle, SHRM, and The Financial Post</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold">UF Cognitive Modeling Laboratory</h4>
                          <span className="text-sm text-white/70">Jan 2020 - May 2021</span>
                        </div>
                        <p className="text-sm text-white/80 mb-1">Research Assistant | Gainesville, FL</p>
                        <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                          <li>Developed experimental designs using JavaScript, CSS and HTML</li>
                          <li>Used hierarchical Bayesian regression in RStudio to model individual's response times and map latent variables involved in human decision making</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-3">Education</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">B.A. Economics</h4>
                        <p className="text-sm text-white/80">University of Florida | 2017 - 2021</p>
                        <p className="text-sm text-white/70">Dean&apos;s List</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">B.S. Behavioral Cognitive Neuroscience</h4>
                        <p className="text-sm text-white/80">University of Florida | 2017 - 2021</p>
                        <p className="text-sm text-white/70">Summa Cum Laude</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-3">AI, Analytics, and Modeling Skills</h3>
                    <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                      <li>Proficient with emerging AI development tools including Claude Code, LangChain, and vector databases like Pinecone</li>
                      <li>Data engineering and data science experience with Python, R and SQL</li>
                      <li>Proficient in Bayesian Regression, Hierarchical Bayesian, XGBoost methods</li>
                    </ul>
                  </div>

                  {/* Download Link */}
                  <div className="pt-4 text-center">
                    <a
                      href="/AW_Resume2025_web.pdf"
                      download="Alexander_Wurm_Resume.pdf"
                      className="inline-block bg-accent text-primary px-6 py-2 rounded-md hover:bg-accent-hover transition-colors font-medium text-sm"
                    >
                      Download Full Resume →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Bio Content */}
            <div className="lg:w-[55.556%]">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-accent/50 hover:border-accent/70 overflow-hidden">
                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Mobile: Images side by side */}
                  <div className="flex lg:hidden justify-center gap-4 mb-6">
                    <img
                      src="/spacex-photo.jpg"
                      alt="SpaceX Visit"
                      className="rounded-lg border-2 border-accent/50 shadow-lg w-[120px] h-[120px] object-cover"
                    />
                    <img
                      src="/cdm-lab-logo.png"
                      alt="Cognition & Decision Modeling Laboratory"
                      className="rounded-lg border-2 border-accent/50 shadow-lg w-[120px] h-[120px] object-contain"
                    />
                  </div>

                  {/* First Paragraph with SpaceX Photo (desktop layout) */}
                  <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
                    <div className="hidden lg:block flex-shrink-0 order-1 lg:order-none">
                      <img
                        src="/spacex-photo.jpg"
                        alt="SpaceX Visit"
                        className="rounded-lg border-2 border-accent/50 shadow-lg"
                        style={{ width: '200px' }}
                      />
                    </div>
                    <div className="flex-1 order-2 lg:order-none">
                      <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 border-2 border-accent/40 shadow-lg">
                        <p className="text-lg text-white leading-relaxed">
                          Alexander H. Wurm is a Principal Analyst at Nucleus
                          Research, where he leads coverage of analytics and data management
                          technologies. With expertise spanning cognitive science,
                          decision modeling, and enterprise analytics platforms, he
                          bridges the gap between academic research and practical
                          business solutions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second Paragraph with C&DM Logo (desktop layout) */}
                  <div className="flex flex-col lg:flex-row items-start gap-6">
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
                    <div className="hidden lg:block flex-shrink-0">
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