export const site = {
  url: 'https://awurm.com',
  name: 'Alexander H. Wurm',
  title: 'Alexander H. Wurm | Principal Analyst & Researcher',
  // Verbatim from the old app/layout.tsx metadata.
  description:
    'Principal Analyst and Researcher specializing in AI, data science, analytics, and data management. Academic research in cognitive science and decision modeling at University of Florida.',
  nav: [
    { label: 'Research', href: '/research/' },
    { label: 'Speaking', href: '/speaking/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'About', href: '/about/' },
  ],
  // PERSONAL-TODO: fill these to enable the contact form (EmailJS).
  // While any value is empty the form falls back to a prefilled mailto link.
  emailjs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
  },
};
