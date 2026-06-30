// Ported verbatim from the old lib/data.ts (IndustryResearch interface only).
export interface IndustryResearch {
  title: string
  documentId: string
  // Canonical 8-type vocabulary, derived from the Obsidian vault (see
  // scripts/research/sync-labels.mjs). `| string` keeps any drift validating.
  type:
    | 'Research Note'
    | 'ROI Case Study'
    | 'Value Matrix'
    | 'Announcement'
    | 'Anatomy of a Decision'
    | 'ROI Guidebook'
    | 'Trends'
    | 'Benefit Case Study'
    | string
  year: number
  quarter?: string
  publishDate: string
  technologies: string[]
  vendors: string[]
  keyFindings?: string[]
  roiClaim?: string | null
  summary: string
  pdfUrl?: string
  nucleusUrl?: string
  primaryVendor?: string
  market?: string[]
}
