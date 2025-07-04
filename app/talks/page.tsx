import { getTalksData } from '@/lib/data'

export default async function TalksPage() {
  const talks = await getTalksData()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Speaking Engagements
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Conferences, workshops, and presentations.
        </p>
      </div>

      <div className="grid gap-6">
        {talks.map((talk, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">{talk.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {talk.event} • {talk.location}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {talk.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{talk.date}</span>
              <div className="flex gap-4">
                {talk.slidesUrl && (
                  <a
                    href={talk.slidesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Slides →
                  </a>
                )}
                {talk.videoUrl && (
                  <a
                    href={talk.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Video →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
