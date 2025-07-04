import fs from 'fs'
import path from 'path'

export interface ResearchPaper {
  title: string
  authors: string
  abstract: string
  year: number
  venue: string
  url?: string
  pdfUrl?: string
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  status: string
  url?: string
  screenshot?: string
}

export interface Talk {
  title: string
  event: string
  location: string
  date: string
  description: string
  slidesUrl?: string
  videoUrl?: string
}

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
}

export async function getResearchData(): Promise<ResearchPaper[]> {
  try {
    const filePath = path.join(process.cwd(), 'public/data/research.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Return sample data if file doesn't exist
    return [
      {
        title: 'Sample Research Paper',
        authors: 'Author Name',
        abstract: 'This is a sample abstract for demonstration purposes.',
        year: 2024,
        venue: 'Conference Name',
        url: '#',
      },
    ]
  }
}

export async function getProjectsData(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), 'public/data/projects.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Return sample data if file doesn't exist
    return [
      {
        name: 'Sample Project',
        description: 'A sample project for demonstration purposes.',
        technologies: ['React', 'TypeScript', 'Next.js'],
        status: 'In Development',
        url: '#',
      },
    ]
  }
}

export async function getTalksData(): Promise<Talk[]> {
  try {
    const filePath = path.join(process.cwd(), 'public/data/talks.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Return sample data if file doesn't exist
    return [
      {
        title: 'Sample Talk',
        event: 'Conference Name',
        location: 'City, Country',
        date: '2024',
        description: 'A sample talk description for demonstration purposes.',
        slidesUrl: '#',
        videoUrl: '#',
      },
    ]
  }
}

export async function getIndustryResearchData(): Promise<IndustryResearch[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      'public/data/industry-research.json'
    )
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Return sample data if file doesn't exist
    return [
      {
        title: 'Sample Industry Research',
        documentId: 'sample-001',
        type: 'Research Report',
        year: 2024,
        publishDate: '2024-01-01',
        technologies: ['Analytics', 'Data Management'],
        vendors: ['Sample Vendor'],
        summary:
          'A sample industry research document for demonstration purposes.',
        pdfUrl: '#',
      },
    ]
  }
}
