# CLAUDE.md — awurm.com

Astro 5 + Tailwind 4 static site → GitHub Pages. **Push to `main` = instant live
deploy to awurm.com.** Work on branches; `ci.yml` builds + tests every non-main push
and PR without deploying.

## Hard rules

- **Never invent content about Alex.** Every fact/sentence comes from him or a
  verifiable source. New connective copy goes through review (see COPY-REVIEW.md
  pattern). Unverifiable items → PERSONAL-TODO.md.
- **URL-frozen, byte-identical in `public/`** (linked externally — never move/rename):
  `/research-papers/wurm-2021-timing-anticipatory-decisions.pdf`,
  `/AW_Resume2025_web.pdf`, `/oracle-generative-ai-slides.pptx`, plus `.nojekyll`.
- Old-site URLs `/contact/ /talks/ /apps/ /applications/` are meta-refresh redirect
  stubs (`src/pages/*.astro` via `RedirectStub`) — keep them, keep them out of the
  sitemap (filter in `astro.config.mjs`).

## Commands

`npm run dev` · `npm run build` · `npm run preview` · `npm test` (vitest) ·
`npm run og` (regenerate OG cards; uses playwright, falls back to
`/usr/local/bin/chromium-browser`).

## Architecture

- **Pages** (`src/pages/`): index, research (dual-tab), speaking, projects, about
  (+#contact), 404, 4 redirect stubs. All static; zero framework islands.
- **Interactivity = 4 vanilla scripts**: research filters (research.astro), theme
  toggle (ThemeToggle), contact form (ContactForm), speaker-bio copy (SpeakerBio).
  `<details>` handles abstracts/screenshots JS-free.
- **Content collections** (`src/content.config.ts`):
  - `talks`, `projects`, `publications` — markdown in `src/content/`.
  - `industryResearch` — `file()` loader over `src/data/industry-research.json`;
    ids derived as `${index}-${documentId}` because documentId is NOT unique.
- **Data**: `src/data/profile.ts` holds ALL copy/facts about Alex (bio, experience,
  education, speaker bio, socials, press). `src/data/site.ts` holds site meta, nav,
  EmailJS keys (empty ⇒ form falls back to prefilled mailto).
- **Libs**: `research-utils.ts` (ported verbatim from old site + vitest tests)
  slug-generates nucleusresearch.com links from titles; `nucleusUrl` field overrides.
  `dates.ts` derives upcoming/past — talk status is never stored.
- **URL contract**: `/research/?tab=industry` (+ optional `&year=` `&type=`) deep-links
  the industry tab — preserve it; external links depend on it.

## Theming

All tokens in `src/styles/global.css` `@theme` (light defaults, OKLCH).
**Dark values are duplicated in TWO blocks that must stay in sync:**
`[data-theme="dark"]` and the `@media (prefers-color-scheme: dark)` no-JS fallback.
Change one ⇒ change both. Pre-paint inline script in `Base.astro` sets
`data-theme` from localStorage/system; ThemeToggle persists the choice.

## Maintenance recipes

- **Add a talk**: md file in `src/content/talks/` (`YYYY-MM-DD-slug.md`), title-card
  PNG in `src/assets/talks/`, frontmatter per `content.config.ts` (no status field —
  derived from `date`). Upcoming section appears automatically when a date is future.
- **Add industry research**: append to `src/data/industry-research.json` following the
  existing field conventions (Value Matrix entries are type "Research Note"). The link
  is slug-generated from the title — verify it resolves, else set `nucleusUrl`.
  `pdfUrl` is a dead legacy field: keep, never render. `roiClaim` only with a source.
- **Add a publication/project**: md file in `src/content/publications|projects/`;
  abstract goes in the publication body.
- **Update resume**: replace `public/AW_Resume2025_web.pdf` in place (URL frozen).
- **Rebrand/OG**: edit `scripts/og/generate.mjs`, run `npm run og`, commit the PNGs.
- **Enable the contact form**: fill `site.ts` → `emailjs` (PERSONAL-TODO #1).
