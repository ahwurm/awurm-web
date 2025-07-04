'use client'

import Link from 'next/link'
import { type IndustryResearch } from '@/lib/data'
import { getNucleusResearchUrl } from '@/lib/research-utils'
import ExternalLinkIcon from '@/components/ExternalLinkIcon'

interface Props {
  industryResearch: IndustryResearch[]
}

export default function IndustryResearchWidget({ industryResearch }: Props) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ROI Case Study':
        return 'bg-green-100 text-green-800'
      case 'Technology Value Matrix':
        return 'bg-blue-100 text-blue-800'
      case 'Predictions':
        return 'bg-purple-100 text-purple-800'
      case 'Hot Companies':
        return 'bg-orange-100 text-orange-800'
      case 'ROI Guidebook':
        return 'bg-emerald-100 text-emerald-800'
      case 'Partnership Announcement':
        return 'bg-cyan-100 text-cyan-800'
      case 'M&A Analysis':
        return 'bg-red-100 text-red-800'
      case 'Solution Analysis':
        return 'bg-indigo-100 text-indigo-800'
      case 'Benefit Case Study':
        return 'bg-teal-100 text-teal-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <article className="industry-research__widget card">
      <div className="industry-research__header">
        <h3 className="industry-research__title">Industry Research</h3>
        <p className="industry-research__subtitle">
          {industryResearch.length} Reports from Nucleus Research
        </p>
      </div>

      <div className="industry-research__content">
        <div className="industry-research__scroll-container">
          {industryResearch.map((research, index) => {
            const nucleusUrl = getNucleusResearchUrl(research)

            return (
              <div key={index} className="industry-research__item">
                <div className="industry-research__item-header">
                  <span
                    className={`industry-research__type-badge ${getTypeColor(research.type)}`}
                  >
                    {research.type}
                  </span>
                  <span className="industry-research__year">
                    {research.year}
                  </span>
                </div>

                <h4 className="industry-research__item-title">
                  {research.title}
                </h4>

                <div className="industry-research__vendors">
                  {research.vendors.slice(0, 3).map((vendor, i) => (
                    <span key={i} className="industry-research__vendor-tag">
                      {vendor}
                    </span>
                  ))}
                  {research.vendors.length > 3 && (
                    <span className="industry-research__vendor-more">
                      +{research.vendors.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <div className="industry-research__item-actions">
                  <a
                    href={nucleusUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="industry-research__read-button"
                  >
                    <span>Read Research</span>
                    <ExternalLinkIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="industry-research__footer">
        <Link href="/research?tab=industry" className="btn btn--secondary">
          View All Research
        </Link>
      </div>
    </article>
  )
}
