import {
  generateNucleusResearchUrl,
  hasValidNucleusLink,
  getResearchExternalLink,
  getNucleusResearchUrl,
} from '../research-utils'
import { type IndustryResearch } from '../data'

describe('Research Utilities', () => {
  describe('generateNucleusResearchUrl', () => {
    it('should generate URL from research title', () => {
      const research: IndustryResearch = {
        title: 'ROI case study - Actian at GEMA',
        documentId: 'z87',
        type: 'ROI Case Study',
        year: 2021,
        publishDate: '2021-01-01',
        technologies: ['Test'],
        vendors: ['Test Vendor'],
        summary: 'Test summary',
      }
      expect(generateNucleusResearchUrl(research)).toBe(
        'https://nucleusresearch.com/research/single/roi-case-study-actian-at-gema/'
      )
    })

    it('should handle special characters in titles', () => {
      const research: IndustryResearch = {
        title: 'Oracle & NetSuite: Cloud Solutions!',
        documentId: 'v133',
        type: 'Solution Analysis',
        year: 2021,
        publishDate: '2021-01-01',
        technologies: ['Test'],
        vendors: ['Test Vendor'],
        summary: 'Test summary',
      }
      expect(generateNucleusResearchUrl(research)).toBe(
        'https://nucleusresearch.com/research/single/oracle-netsuite-cloud-solutions/'
      )
    })

    it('should handle dollar signs and decimal numbers', () => {
      const research: IndustryResearch = {
        title:
          "Domo's AI and Data Products Platform returns $6.93 per dollar invested",
        documentId: 'z11',
        type: 'ROI Analysis',
        year: 2025,
        publishDate: '2025-01-01',
        technologies: ['Test'],
        vendors: ['Test Vendor'],
        summary: 'Test summary',
      }
      expect(generateNucleusResearchUrl(research)).toBe(
        'https://nucleusresearch.com/research/single/domos-ai-and-data-products-platform-returns-6.93-per-dollar-invested/'
      )
    })

    it('should handle numbers with X multiplier', () => {
      const research: IndustryResearch = {
        title: 'SAP Datasphere powers 1.3X faster data access',
        documentId: 'x64',
        type: 'Performance Analysis',
        year: 2023,
        publishDate: '2023-01-01',
        technologies: ['Test'],
        vendors: ['Test Vendor'],
        summary: 'Test summary',
      }
      expect(generateNucleusResearchUrl(research)).toBe(
        'https://nucleusresearch.com/research/single/sap-datasphere-powers-1.3x-faster-data-access/'
      )
    })
  })

  describe('hasValidNucleusLink', () => {
    it('should always return true now', () => {
      const research: IndustryResearch = {
        title: 'Test Research',
        documentId: 'v101',
        type: 'ROI Case Study',
        year: 2021,
        publishDate: '2021-01-01',
        technologies: ['Test'],
        vendors: ['Test Vendor'],
        summary: 'Test summary',
      }
      expect(hasValidNucleusLink(research)).toBe(true)
    })

    it('should return true even for empty documentId', () => {
      const research: IndustryResearch = {
        title: 'Test Research',
        documentId: '',
        type: 'ROI Case Study',
        year: 2021,
        publishDate: '2021-01-01',
        technologies: ['Test'],
        vendors: ['Test Vendor'],
        summary: 'Test summary',
      }
      expect(hasValidNucleusLink(research)).toBe(true)
    })
  })

  describe('getResearchExternalLink', () => {
    it('should prioritize nucleusUrl over generated URL', () => {
      const research: IndustryResearch = {
        title: 'Test Research',
        documentId: 'v101',
        type: 'ROI Case Study',
        year: 2021,
        publishDate: '2021-01-01',
        technologies: ['Test'],
        vendors: ['Test Vendor'],
        summary: 'Test summary',
        nucleusUrl: 'https://custom-url.com',
      }
      expect(getResearchExternalLink(research)).toBe('https://custom-url.com')
    })

    it('should generate URL from title when nucleusUrl is not available', () => {
      const research: IndustryResearch = {
        title: 'ROI case study - Actian at GEMA',
        documentId: 'z87',
        type: 'ROI Case Study',
        year: 2021,
        publishDate: '2021-01-01',
        technologies: ['Test'],
        vendors: ['Test Vendor'],
        summary: 'Test summary',
      }
      expect(getResearchExternalLink(research)).toBe(
        'https://nucleusresearch.com/research/single/roi-case-study-actian-at-gema/'
      )
    })

    it('should always return a valid Nucleus Research URL', () => {
      const research: IndustryResearch = {
        title: 'Test Research',
        documentId: '',
        type: 'ROI Case Study',
        year: 2021,
        publishDate: '2021-01-01',
        technologies: ['Test'],
        vendors: ['Test Vendor'],
        summary: 'Test summary',
      }
      const url = getResearchExternalLink(research)
      expect(url).toContain('https://nucleusresearch.com/research/single/')
      expect(url).toContain('test-research')
    })
  })
})
