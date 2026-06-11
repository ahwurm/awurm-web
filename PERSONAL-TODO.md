# PERSONAL-TODO — needs Alex (or his personal-machine Claude)

Items the rebuild could not resolve from public sources. Work through and delete.

1. **EmailJS keys** — put `serviceId` / `templateId` / `publicKey` into `src/data/site.ts`
   to enable the contact form. If the EmailJS account is dead, pick a replacement
   (Formspree free tier, or keep the current prefilled-mailto fallback permanently).

2. **Two talk facts to confirm**
   - BigQuery webinar date: the site says **December 1, 2022** — correct?
     (`src/content/talks/2022-12-01-bigquery-analytics-ai.md`)
   - The old site's "The ROI of Tray.AI" (Jul 8, 2023) entry linked to what is actually
     the **Sep 30, 2024 AVID webinar** (now corrected). Was there ALSO a separate
     Jul 2023 Tray ROI webinar? If yes, supply title/date/link/title-card.

3. **Headshot** — the current `src/assets/photos/headshot.jpg` looks AI-upscaled.
   Provide a recent original-quality photo.

4. **Oracle slides** — export `public/oracle-generative-ai-slides.pptx` (13 MB) to PDF
   and link that instead (keep the pptx URL alive — it is frozen).

5. **New material since Jul 2025** — no public talks after Jul 2025 were found
   (Nucleus/PR/BrightTALK/YouTube/vendor/conference sweep). Supply any non-public or
   newer talks (title card + date + link each), newer Nucleus reports to add to
   `src/data/industry-research.json`, and a newer resume PDF if one exists.

6. **Google Scholar / ORCID** — provide a profile URL if one exists. Do NOT use
   scholar.google.com/citations?user=Ot75ADoAAAAJ — that is a physics professor with
   the same name.

7. **Vendor logo strip** — the old repo had 5 unused vendor logos (Dremio, Google
   Cloud, Oracle, Tray.io, Vertex AI), now deleted. Want a "presented for" logo strip
   on /speaking? Confirm usage rights first.

8. **Approve assembled copy** — review COPY-REVIEW.md (hero one-liner, speaking intro,
   speaker bio, new research summaries). Edit freely; everything else is verbatim from
   the old site or cited sources.
