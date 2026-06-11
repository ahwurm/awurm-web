# awurm.com

Personal site of Alexander H. Wurm — Principal Analyst at Nucleus Research.
Static site built with [Astro 5](https://astro.build) + Tailwind 4, deployed to
GitHub Pages.

## Develop

```bash
npm install
npm run dev        # localhost:4321
npm run build      # static build → dist/
npm run preview    # serve dist/
npm test           # vitest (research-utils)
npm run og         # regenerate OG cards (needs chromium)
```

Node ≥ 22 required.

## Structure

```
src/
  content/        # markdown collections: talks/ projects/ publications/
  data/           # industry-research.json · profile.ts (all bio copy) · site.ts (meta/nav/emailjs)
  components/     # Astro components (no framework islands — 4 small vanilla scripts)
  pages/          # index, research, speaking, projects, about, 404, redirect stubs
  lib/            # research-utils (+ tests), dates, jsonld
  assets/         # images, optimized at build via astro:assets
public/           # URL-frozen files (PDFs, pptx), favicons, og/, robots, llms.txt
scripts/og/       # OG card generator (playwright)
```

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds and deploys to GitHub Pages
(custom domain configured in repo Pages settings). All other branches/PRs run
`ci.yml` (build + tests) without deploying.

See `CLAUDE.md` for content-maintenance recipes and `PERSONAL-TODO.md` for open items.
