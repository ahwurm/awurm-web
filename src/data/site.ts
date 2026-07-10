export const site = {
  url: 'https://awurm.com',
  name: 'Alexander H. Wurm',
  title: 'Alexander H. Wurm — builder & researcher',
  // Verbatim from the old app/layout.tsx metadata.
  description:
    'Curiosity-led builder and researcher — AI, data science, analytics, and decision modeling. Personal site of Alexander H. Wurm.',
  // icon = Icon.astro name; shared by the nav and each page's h1.
  nav: [
    { label: 'Research', href: '/research/', icon: 'flask' },
    { label: 'Speaking', href: '/speaking/', icon: 'mic' },
    { label: 'Projects', href: '/projects/', icon: 'box' },
    { label: 'Contact', href: '/contact/', icon: 'mail' },
  ],
  // PERSONAL-TODO: fill these to enable the contact form (EmailJS).
  // While any value is empty the form falls back to a prefilled mailto link.
  emailjs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
  },
};
