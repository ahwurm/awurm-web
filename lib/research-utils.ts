import { type IndustryResearch } from './data'

/**
 * Converts a research title to a URL slug
 * @param title - The research title
 * @returns A URL-friendly slug
 */
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\$/g, '') // Remove dollar signs
    .replace(/[^\w\s.-]/g, '') // Keep letters, numbers, spaces, periods, and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
    .trim()
}

/**
 * Generates Nucleus Research URL based on research data
 * @param research - The IndustryResearch object
 * @returns The full URL to the research document on nucleusresearch.com
 */
export function generateNucleusResearchUrl(research: IndustryResearch): string {
  const slug = titleToSlug(research.title)
  return `https://nucleusresearch.com/research/single/${slug}/`
}

/**
 * Checks if a research item has a valid Nucleus Research link
 * @param research - The IndustryResearch object
 * @returns boolean indicating if the item has a valid link (always true now)
 */
export function hasValidNucleusLink(research: IndustryResearch): boolean {
  return true // All research items now have Nucleus Research links
}

/**
 * Gets the Nucleus Research URL for a research item
 * @param research - The IndustryResearch object
 * @returns The Nucleus Research URL
 */
export function getNucleusResearchUrl(research: IndustryResearch): string {
  // Priority: 1. Custom nucleusUrl, 2. Generated from title
  if (research.nucleusUrl) {
    return research.nucleusUrl
  }

  return generateNucleusResearchUrl(research)
}

/**
 * Gets the external link for a research item (now always Nucleus Research)
 * @param research - The IndustryResearch object
 * @returns The Nucleus Research URL
 */
export function getResearchExternalLink(research: IndustryResearch): string {
  return getNucleusResearchUrl(research)
}
