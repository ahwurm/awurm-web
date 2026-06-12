// Ported verbatim from the old lib/data.ts (IndustryResearch interface only).
export interface IndustryResearch {
  title: string
  documentId: string
  type:
    | 'ROI Case Study'
    | 'Technology Value Matrix'
    | 'Predictions'
    | 'Hot Companies'
    | 'Research Report'
    | 'Benefit Case Study'
    | 'ROI Guidebook'
    | 'Partnership Announcement'
    | 'M&A Analysis'
    | 'Solution Analysis'
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
