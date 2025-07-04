import { getResearchData, getIndustryResearchData } from '@/lib/data'
import ResearchPageClient from './ResearchPageClient'

export default async function ResearchPage() {
  const academicResearch = await getResearchData()
  const industryResearch = await getIndustryResearchData()

  return (
    <ResearchPageClient
      academicResearch={academicResearch}
      industryResearch={industryResearch}
    />
  )
}
