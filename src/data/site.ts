export const site = {
  url: 'https://awurm.com',
  name: 'Alexander H. Wurm',
  title: 'Alexander H. Wurm — builder & researcher',
  // Verbatim from the old app/layout.tsx metadata.
  description:
    'Curiosity-led builder and researcher — AI, data science, analytics, and decision modeling. Personal site of Alexander H. Wurm.',
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
