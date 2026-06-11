/**
 * ALL copy/facts about Alex live here. Sources:
 *  - old site (git fc94972): app/about/page.tsx, components/Hero.tsx, app/contact/page.tsx
 *  - verified updates listed in the rebuild plan (with source URLs)
 * Newly assembled sentences are logged in COPY-REVIEW.md at the repo root.
 */
export const profile = {
  name: 'Alexander H. Wurm',
  title: 'Principal Analyst',
  // Old hero subtitle, verbatim.
  role: 'Principal Analyst & Researcher',
  // Old hero tagline, verbatim.
  tagline: 'Advancing decision science through computational modeling and enterprise technology research',
  // ASSEMBLED: old tagline converted to a first-person sentence (COPY-REVIEW #1).
  oneLiner: 'I build AI tools — RAG apps, decision models, open-source software — and cover the data & AI platform market as a Principal Analyst at Nucleus Research.',
  email: 'ahwurm1@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/alexander-w-374705132/',
    github: 'https://github.com/ahwurm',
  },
  resumeUrl: '/AW_Resume2025_web.pdf',

  // Old about-page paragraphs converted to first person (pronoun edits only — COPY-REVIEW #2, #3).
  bio: [
    'I am a Principal Analyst at Nucleus Research, where I lead coverage of analytics and data management technologies. With expertise spanning cognitive science, decision modeling, and enterprise analytics platforms, I bridge the gap between academic research and practical business solutions.',
    "I previously conducted research at the University of Florida's Cognition and Decision Modeling Lab, where I published work on timing in anticipatory decisions and developed computational models for understanding human decision-making processes.",
  ],

  // Verbatim from the old about-page resume column.
  experience: [
    {
      org: 'Nucleus Research',
      role: 'Research Analyst → Senior Analyst → Principal Analyst',
      location: 'Miami, FL',
      period: 'Jun 2021 – Present',
      bullets: [
        'Oversee a team of research analysts covering data management, analytics, data science, and emerging AI markets',
        'Presented research findings for Google, Oracle, Databricks, Teradata, Dremio, and more in live sessions and webinars',
        'Quoted in press releases and publications such as TechTarget, Silicon Angle, SHRM, and The Financial Post',
      ],
    },
    {
      org: 'UF Cognitive Modeling Laboratory',
      role: 'Research Assistant',
      location: 'Gainesville, FL',
      period: 'Jan 2020 – May 2021',
      bullets: [
        'Developed experimental designs using JavaScript, CSS and HTML',
        "Used hierarchical Bayesian regression in RStudio to model individual's response times and map latent variables involved in human decision making",
      ],
    },
  ],

  // Verbatim from the old about-page resume column (honors as written).
  education: [
    {
      degree: 'B.A. Economics',
      school: 'University of Florida',
      period: '2017 – 2021',
      honors: "Dean's List",
    },
    {
      degree: 'B.S. Behavioral Cognitive Neuroscience',
      school: 'University of Florida',
      period: '2017 – 2021',
      honors: 'Summa Cum Laude',
    },
  ],

  // Verbatim from the old about-page resume column.
  skillsHeading: 'AI, Analytics, and Modeling Skills',
  skills: [
    'Proficient with emerging AI development tools including Claude Code, LangChain, and vector databases like Pinecone',
    'Data engineering and data science experience with Python, R and SQL',
    'Proficient in Bayesian Regression, Hierarchical Bayesian, XGBoost methods',
  ],

  // ASSEMBLED: third-person speaker bio from existing verified sentences (COPY-REVIEW #5).
  speakerBio:
    'Alexander H. Wurm is a Principal Analyst at Nucleus Research, where he leads coverage of analytics and data management technologies. He holds a B.A. in Economics and a B.S. in Behavioral Cognitive Neuroscience from the University of Florida.',

  // Old contact-page subhead, verbatim.
  contactBlurb: "Let's connect and explore opportunities in analytics, research, and enterprise technology",

  // "Quoted in" press links (verified 2026-06-10, links only — no quotes reproduced).
  press: [
    {
      outlet: 'SiliconANGLE',
      url: 'https://siliconangle.com/2024/04/25/strong-cloud-growth-boosts-microsoft-earnings-stock-price/',
    },
    {
      outlet: 'TechTarget',
      url: 'https://www.techtarget.com/searchcloudcomputing/feature/The-future-of-hybrid-cloud-What-to-expect',
    },
    {
      outlet: 'Boomi (2023)',
      url: 'https://boomi.com/blog/5-minutes-with-alexander-wurm-nucleus-research/',
    },
    {
      outlet: 'Boomi (2025)',
      url: 'https://boomi.com/blog/alex-wurm-on-nucleus-value-matrix-2025/',
    },
    {
      outlet: 'Boomi (Dec 2025)',
      url: 'https://boomi.com/blog/nucleus-research-alex-wurm-boomi-roi-case-study/',
    },
  ],
};
