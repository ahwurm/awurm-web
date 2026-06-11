import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      event: z.string(),
      format: z.enum(['webinar', 'conference']),
      location: z.string(),
      date: z.coerce.date(), // upcoming/past is DERIVED from this at build (lib/dates.ts isUpcoming) — never stored
      description: z.string(),
      image: image().optional(),
      featured: z.boolean().default(false),
      links: z
        .object({
          event: z.string().optional(),
          video: z.string().optional(),
          slides: z.string().optional(), // local path (e.g. the Oracle pptx in public/)
        })
        .default({}),
      needsVerification: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      technologies: z.array(z.string()),
      status: z.string(),
      url: z.string().optional(),
      githubUrl: z.string().optional(),
      paperUrl: z.string().optional(), // local path (frozen public/ PDF)
      screenshots: z.array(image()).default([]),
      order: z.number(),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  // Abstract lives in the markdown body.
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    kind: z.enum(['paper', 'preprint']),
    url: z.string(),
    pdfUrl: z.string().optional(), // local path (frozen public/ PDF)
    doi: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const industryResearch = defineCollection({
  // documentId is NOT unique in the dataset (e.g. v179, w102 appear twice) — derive ids from index.
  loader: file('./src/data/industry-research.json', {
    parser: (text) =>
      JSON.parse(text).map((entry: Record<string, unknown>, index: number) => ({
        id: `${index}-${entry.documentId}`,
        ...entry,
      })),
  }),
  schema: z.object({
    title: z.string(),
    documentId: z.string(),
    type: z.string(),
    year: z.number(),
    quarter: z.string().optional(),
    publishDate: z.string(),
    technologies: z.array(z.string()),
    vendors: z.array(z.string()),
    keyFindings: z.array(z.string()).optional(),
    roiClaim: z.string().nullable().optional(),
    summary: z.string(),
    pdfUrl: z.string().optional(), // dead links to never-published /references PDFs — kept, never rendered
    nucleusUrl: z.string().optional(), // overrides the slug-generated link (research-utils)
  }),
});

export const collections = { talks, projects, publications, industryResearch };
