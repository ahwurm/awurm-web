import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Alexander H. Wurm | Principal Analyst & Researcher',
  description:
    'Principal Analyst and Researcher specializing in AI, data science, analytics, and data management. Academic research in cognitive science and decision modeling at University of Florida.',
  keywords:
    'artificial intelligence, machine learning, data analytics, cognitive science, decision modeling, research, google cloud, vertex ai',
  authors: [{ name: 'Alexander H. Wurm' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
