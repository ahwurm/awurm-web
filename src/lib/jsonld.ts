import { profile } from '../data/profile';
import { site } from '../data/site';

// sameAs = LinkedIn + GitHub ONLY (no Google Scholar — the same-name scholar profile is a different person).
export const personJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  worksFor: { '@type': 'Organization', name: 'Nucleus Research' },
  url: site.url,
  sameAs: [profile.socials.linkedin, profile.socials.github],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Florida' },
});

export const profilePageJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personJsonLd(),
});
