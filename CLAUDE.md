# CLAUDE.md - AI Assistant Navigation Guide

> **Comprehensive codebase documentation for AI assistants working on awurm.com**

## 🏗️ Project Architecture Overview

### High-Level Structure

```
awurm-web/                    # Next.js 14 (App Router) + React 18 portfolio site
├── app/                      # Next.js App Router (routes & layouts)
│   ├── layout.tsx           # Root layout with Navigation + metadata
│   ├── page.tsx             # Homepage (all sections in single page)
│   ├── globals.css          # Global styles (custom CSS + Tailwind)
│   ├── research/page.tsx    # Research papers page
│   ├── apps/page.tsx        # Applications showcase page
│   └── talks/page.tsx       # Speaking engagements page
├── components/              # Reusable React components
│   ├── Navigation.tsx       # Header navigation with scroll detection
│   └── InteractiveFeatures.tsx # Client-side interactions & animations
├── lib/                     # Utilities & data fetching
│   └── data.ts             # JSON data access functions + TypeScript interfaces
├── public/                  # Static assets
│   ├── data/               # JSON data files (research, apps, talks)
│   └── [images]            # Static images and assets
└── [config files]          # Next.js, Tailwind, TypeScript configs
```

### Technology Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript with strict configuration
- **Styling**: Custom CSS + Tailwind CSS (dual approach)
- **Hosting**: AWS Amplify with static export support
- **Data**: JSON files in `/public/data/` (no database)
- **Build**: Static site generation for optimal performance

---

## 🧩 Component Hierarchy & Patterns

### Core Components

#### `app/layout.tsx` - Root Layout

```typescript
// Provides: Navigation + <main> wrapper + metadata
export default function RootLayout({ children })
// Key: Sets global SEO metadata, wraps all pages
```

#### `components/Navigation.tsx` - Header Navigation

```typescript
// Features: Scroll-based active section detection, smooth scrolling
// Pattern: Client component with useEffect hooks
// Styling: Fixed header with backdrop-filter blur effect
```

#### `components/InteractiveFeatures.tsx` - Interactions Manager

```typescript
// Purpose: All client-side JavaScript functionality
// Features: Research filtering, counters, form validation, scroll animations
// Pattern: Effect-only component (returns null)
// Key: Manages DOM interactions after hydration
```

### Page Component Patterns

#### Homepage (`app/page.tsx`)

- **Pattern**: Single-page application with multiple sections
- **Structure**: Hero → Research → Applications → Speaking → About → Footer
- **State**: Minimal React state, mostly CSS-driven interactions
- **Data**: Hardcoded content with dynamic tech stack array

#### Sub-pages (`app/*/page.tsx`)

- **Pattern**: Server components using data fetching functions
- **Data**: JSON files via `lib/data.ts` functions
- **Styling**: Simpler layouts compared to homepage

---

## 🛣️ Route Structure

### Navigation Mapping

```
Homepage sections (single page):
├── #home → Hero section
├── #research → Research publications
├── #applications → Apps/software showcase
├── #speaking → Speaking engagements timeline
├── #about → About section
└── #contact → Footer contact info

Standalone pages:
├── /research → Dedicated research page
├── /apps → Dedicated applications page
└── /talks → Dedicated talks page
```

### Section IDs & CSS Classes

- **Pattern**: `#section-name` IDs + `.section` class for scroll detection
- **CSS**: `.section__title`, `.section__content` BEM-like naming
- **Navigation**: Smooth scroll behavior via Navigation component

---

## 📋 Key Files Reference

### Configuration Files

```
next.config.js              # Static export config for Amplify
tailwind.config.js          # Custom colors, fonts, animations
tsconfig.json               # TypeScript strict configuration
package.json                # Scripts: dev, build, lint, format
amplify.yml                 # AWS Amplify build configuration
```

### Critical Development Files

```
app/globals.css             # Main stylesheet (custom CSS architecture)
lib/data.ts                 # Data fetching + TypeScript interfaces
public/data/*.json          # Content data (research, apps, talks)
components/Navigation.tsx   # Site navigation logic
components/InteractiveFeatures.tsx # All JavaScript interactions
```

### Data Schema Files

```typescript
// lib/data.ts exports:
interface ResearchPaper {
  title
  authors
  abstract
  year
  venue
  url
}
interface App {
  name
  description
  technologies
  status
  url
}
interface Talk {
  title
  event
  location
  date
  description
  slidesUrl
  videoUrl
}
```

---

## 🎨 Development Patterns

### CSS Architecture

**Dual Approach**: Custom CSS + Tailwind CSS

#### Custom CSS (`app/globals.css`)

```css
/* Pattern: BEM-like naming with double underscores */
.section__title              /* Main section titles */
.footer__content             /* Footer grid container */
.research__card              /* Research paper cards */
.application__card           /* App showcase cards */
.timeline__item              /* Speaking timeline items */

/* Custom CSS Variables */
:root {
  --color-primary: #0a1628 /* Dark blue theme color */ --color-accent: #d4af37
    /* Gold accent color */ --font-display: 'Playfair Display'
    /* Headings font */ --shadow-elegant: ... /* Sophisticated shadows */;
}
```

#### Tailwind Integration

```typescript
// tailwind.config.js extends with:
colors: { primary, accent, background, surface, text }
fontFamily: { display, body, mono }
boxShadow: { elegant, card, card-hover }
animation: { fade-in-up, bounce-slow, pulse-slow }
```

### Component Patterns

#### Client Components Pattern

```typescript
'use client' // Required for hooks/interactions
import { useEffect, useState } from 'react'

// Pattern: Hydration check for SSR compatibility
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null
```

#### Server Components Pattern

```typescript
// Default in App Router - for data fetching
import { getResearchData } from '@/lib/data'

export default async function Page() {
  const data = await getResearchData()  // Server-side data loading
  return <div>{/* render data */}</div>
}
```

### Interactive Features Pattern

```typescript
// All DOM interactions in InteractiveFeatures.tsx
useEffect(() => {
  // Initialize after hydration
  initializeResearchFiltering() // Filter buttons + card animations
  initializeApplicationCounters() // Scroll-triggered number animations
  initializeContactForm() // Form validation
  initializeMicroInteractions() // Button hover effects
  initializeScrollAnimations() // Intersection Observer patterns
}, [])
```

---

## 🔗 Integration Points

### Data Layer

```typescript
// lib/data.ts - JSON file access with fallbacks
export async function getResearchData(): Promise<ResearchPaper[]>
export async function getAppsData(): Promise<App[]>
export async function getTalksData(): Promise<Talk[]>

// Files: public/data/{research,apps,talks}.json
// Pattern: Server-side file reading with sample data fallbacks
```

### External Services

```
AWS Amplify:
├── Static site hosting with CDN
├── Custom domain (awurm.com)
├── Automatic builds from GitHub
└── Environment variables support

Build Pipeline:
├── GitHub Actions trigger
├── npm run build:static (with STATIC_EXPORT=true)
├── Static file generation in /out
└── Amplify deployment
```

### Asset Management

```
public/
├── data/                            # JSON content files
├── headshot.jpg                     # Profile image (About section)
├── *-title*.png                     # Presentation title slide previews
│   ├── bigquery-webinar-title.png       # (617 KB, optimized)
│   ├── dremio-presentation-title.png     # (173 KB, optimized)
│   ├── google-analytics-webinar-title.png # (628 KB, optimized)
│   ├── oracle-generative-ai-title.png   # (522 KB, optimized)
│   └── tray-ai-webinar-title.png        # (870 KB, optimized)
├── company-logos/                   # Vendor/product logos
│   ├── dremio-logo.webp
│   ├── google-cloud-logo.png
│   ├── vertex-ai-logo.png
│   ├── tray-io-logo.webp
│   └── oracle-logo.png
└── [other-assets]                   # Static images, documents

// Note: No next/image optimization in static export mode
// Images optimized with ImageMagick (quality 85, max 1280x720)
```

---

## 📝 File Naming Conventions

### Components

```
PascalCase for components:     Navigation.tsx, InteractiveFeatures.tsx
camelCase for functions:       getResearchData, initializeScrollAnimations
kebab-case for files:          globals.css, next.config.js
```

### CSS Classes

```
BEM-like with double underscores:
.section__title               # Block__element
.footer__content             # Block__element
.research__card              # Block__element
.timeline__item              # Block__element

Modifier pattern:
.nav__link.active            # State modifier
.filter-btn.active           # Component state
.header.scrolled             # Dynamic state
```

### Directory Structure

```
app/                         # Next.js App Router convention
components/                  # React components (shared)
lib/                        # Utilities and data functions
public/                     # Static assets (Next.js convention)
public/data/                # JSON data files
```

---

## ⚡ Quick Reference

### Common Tasks & Locations

#### Adding New Content

```
Research papers → public/data/research.json
Applications → public/data/apps.json
Speaking events → public/data/talks.json + presentation title slides
Homepage content → app/page.tsx (hardcoded sections)

Content Replacement Status (Latest Update):
✅ Real headshot (coolPic) in About section
✅ Real research paper (CogSci 2021) - timing in anticipatory decisions
✅ Real Wald accumulator application
✅ Complete speaking timeline with presentation previews:
   - Oracle Generative AI (Feb 1, 2024) - Past event
   - Dremio Lakehouse (June 24, 2025) - Upcoming
   - Google Cloud Analytics (June 19, 2025) - Upcoming
   - BigQuery Webinar (TBD 2025) - Upcoming
   - Tray.AI ROI (TBD 2025) - Upcoming
```

#### Styling Changes

```
Global styles → app/globals.css
Color scheme → tailwind.config.js + :root variables
Component styles → Find .component__ classes in globals.css
Interactive effects → components/InteractiveFeatures.tsx
```

#### Navigation & Routes

```
Header navigation → components/Navigation.tsx
Section scrolling → Look for .section class and #section-id
Page routing → app/*/page.tsx files
Footer links → app/page.tsx footer section
```

#### Interactive Features

```
Research filtering → InteractiveFeatures.tsx: initializeResearchFiltering()
Counter animations → InteractiveFeatures.tsx: initializeApplicationCounters()
Form validation → InteractiveFeatures.tsx: initializeContactForm()
Scroll effects → InteractiveFeatures.tsx: initializeScrollAnimations()
Hover effects → InteractiveFeatures.tsx: initializeMicroInteractions()
```

### Development Commands

```bash
npm run dev              # Start development server
npm run build            # Production build
npm run build:static     # Static export for Amplify
npm run lint             # ESLint checking
npm run format           # Prettier formatting
npm run format:check     # Check formatting
```

### Key Development Notes

1. **Hydration**: Client components use mounted state check
2. **Static Export**: No server features in production build
3. **CSS**: Custom CSS for complex layouts, Tailwind for utilities
4. **Data**: JSON files, no database or external APIs
5. **Interactions**: All JavaScript in InteractiveFeatures.tsx
6. **SEO**: Metadata defined in layout.tsx and individual pages
7. **Performance**: Static generation with optimized CSS and JS
8. **Content Status**: Real content integrated (research, headshot, presentations)
9. **Assets**: Presentation slides optimized with ImageMagick for web performance
10. **Timeline**: Speaking engagements with actual presentation title slide previews

---

## 🔍 Finding Specific Features

| Feature                | Location                                  | Pattern                                              |
| ---------------------- | ----------------------------------------- | ---------------------------------------------------- |
| Header navigation      | `components/Navigation.tsx`               | Scroll detection + smooth scrolling                  |
| Research filtering     | `InteractiveFeatures.tsx`                 | DOM manipulation with filter buttons                 |
| Timeline animations    | `globals.css` + `InteractiveFeatures.tsx` | CSS animations + Intersection Observer               |
| Timeline preview cards | `app/page.tsx` + `globals.css`            | Presentation title slide previews with hover effects |
| Footer layout          | `app/page.tsx` + `globals.css`            | Grid layout with responsive breakpoints              |
| Hero section           | `app/page.tsx`                            | Gradient background + typography                     |
| Card layouts           | `globals.css`                             | `.research__card`, `.application__card` classes      |
| Data fetching          | `lib/data.ts`                             | Server-side JSON file reading                        |
| Form validation        | `InteractiveFeatures.tsx`                 | Real-time validation with error display              |
| Counter animations     | `InteractiveFeatures.tsx`                 | Scroll-triggered number counting                     |
| Tech stack display     | `app/page.tsx`                            | Dynamic array mapping to badges                      |
| Presentation slides    | `public/*-title*.png`                     | Extracted PowerPoint title slides (optimized)        |

---

_This documentation is designed to help AI assistants quickly navigate and understand the awurm.com codebase structure, patterns, and conventions._
