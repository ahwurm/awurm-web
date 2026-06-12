# Copy Review — every newly assembled sentence

This rebuild invents nothing about Alex. Copy is either verbatim from the old site
(commit fc94972) or verbatim/near-verbatim from the verified sources in the rebuild
plan. The sentences below are the ONLY new assemblies — each is built strictly from
existing verified facts. Approve or edit before merge (PERSONAL-TODO #8).

## First-person conversions (pronoun edits only)

1. **Hero one-liner** (`profile.oneLiner`)
   - New: "I advance decision science through computational modeling and enterprise technology research."
   - Source: old hero tagline (components/Hero.tsx): "Advancing decision science through computational modeling and enterprise technology research"

2. **About bio ¶1** (`profile.bio[0]`)
   - New: "I am a Principal Analyst at Nucleus Research, where I lead coverage of analytics and data management technologies. With expertise spanning cognitive science, decision modeling, and enterprise analytics platforms, I bridge the gap between academic research and practical business solutions."
   - Source: app/about/page.tsx ¶1, third person → first person.

3. **About bio ¶2** (`profile.bio[1]`)
   - New: "I previously conducted research at the University of Florida's Cognition and Decision Modeling Lab, where I published work on timing in anticipatory decisions and developed computational models for understanding human decision-making processes."
   - Source: app/about/page.tsx ¶2, third person → first person.

## Assembled sentences (new arrangements of verified facts)

4. **Speaking intro** (`profile.speakingIntro`)
   - New: "I present research findings for Google, Oracle, Databricks, Teradata, Dremio, and more in live sessions and webinars."
   - Source: resume bullet (app/about/page.tsx): "Presented research findings for Google, Oracle, Databricks, Teradata, Dremio, and more in live sessions and webinars" — tense + person change only.

5. **Speaker bio card** (`profile.speakerBio`, third person, copy-button text)
   - New: "Alexander H. Wurm is a Principal Analyst at Nucleus Research, where he leads coverage of analytics and data management technologies. He has presented research findings for Google, Oracle, Databricks, Teradata, Dremio, and more in live sessions and webinars. He holds a B.A. in Economics and a B.S. in Behavioral Cognitive Neuroscience from the University of Florida."
   - Sources: sentence 1 = about ¶1 verbatim; sentence 2 = resume bullet; sentence 3 = education entries (app/about/page.tsx).

## Industry research entries (new JSON entries — summaries from listed sources)

6. **iPaaS Technology Value Matrix 2025** — the dataset ALREADY contained this report
   (z58) — same trap as the Teradata guidebook (#12), so the planned "new entry" was
   merged into z58 instead of appended. Summary sentence 2 assembled from
   boomi.com/blog/alex-wurm-on-nucleus-value-matrix-2025/ ("customers eagerly want
   iPaaS products to be AI-driven… the differentiators are those AI tools, the
   co-pilot experiences, the agentic experiences"). publishDate corrected
   2025-02-15 → **2025-04-15** per the report page
   (nucleusresearch.com/research/single/ipaas-technology-value-matrix-2025/, doc Z58).

7. **Embedded Analytics Technology Value Matrix 2025** — house template + Leaders list
   verbatim from PR Newswire 302596584 (Oct 28, 2025). documentId **z175** per the
   report page (nucleusresearch.com/research/single/embedded-analytics-technology-value-matrix-2025/).

8. **ROI case study: Boomi at a regional bank** — exact Nucleus title, documentId
   **z204**, and link verified at
   nucleusresearch.com/research/single/roi-case-study-boomi-at-a-regional-bank/
   (Dec 3, 2025). Summary near-verbatim from
   boomi.com/blog/nucleus-research-alex-wurm-boomi-roi-case-study/ ("a regional bank
   saw a 97% ROI with a payback period of 9.9 months after deploying the Boomi
   Enterprise Platform to automate core operations, including loan processing,
   customer onboarding, and account maintenance").

9. **Oracle AI Database drives 87 percent faster data refresh** (26074) — summary
   condensed from the report's public abstract at
   nucleusresearch.com/research/single/oracle-ai-database-drives-87-percent-faster-data-refresh/.

10. **Databricks compute cost savings exceed the lakehouse market average** (26082) —
    summary near-verbatim from the report's public abstract ("Nucleus reviewed data from
    multiple lakehouse deployments and found that 85.1 percent of Databricks customers
    reduced infrastructure and compute costs by a greater extent than the lakehouse
    market average").

11. **BI and Analytics Technology Value Matrix 2026** (26096, May 26 2026) — house
    template + Leaders list verbatim from the report page
    (nucleusresearch.com/research/single/bi-and-analytics-technology-value-matrix-2026/).

12. **Teradata z71 update (existing entry, not new)** — `roiClaim` "427% ROI with an
    11-month payback" and summary assembled from
    teradata.com/press-releases/2025/strong-financial-returns-and-accelerated-ai
    ("average ROI of 427% over three years, with an average annual benefit of
    $7.9 million and a payback period of just 11 months… customers across healthcare,
    insurance, and telecommunications"). The plan listed this as a 7th new entry; the
    guidebook already existed in the dataset as z71, so the verified figures were
    merged into it instead of appending a duplicate title. publishDate corrected
    2025-02-22 → **2025-05-19** per the report page
    (nucleusresearch.com/research/single/roi-guidebook-teradata-vantagecloud/).

## Talk metadata corrections (verified)

13. **AVID webinar** — description verbatim from tray.ai/webinars/avid-modernized-it-integration
    meta description: "Learn how AVID modernized IT operations with Tray — saving 2,000
    hours and delivering faster project outcomes, validated by Nucleus Research."
    Replaces the old site's mislabeled "The ROI of Tray.AI" entry (see needsVerification).

14. **Teradata talk event field** — old talks.json said event "Teradata Conference";
    the Teradata press release calls it an "on-demand webinar" → event renamed
    "Teradata Webinar", format webinar, link swapped from the dead cvent registration
    to the recording (teradata.com/insights/webinars/roi-conversation).

15. **PsyArXiv preprint author line** — "Konstantina Sokratous, Guy Hawkins, Alexander
    Wurm, Peter Kvam" — author order per OSF record; name forms match the existing
    CogSci citation on the old site.

## Reskin microcopy (Evidence Accumulator pass, 2026-06-10)

UI chrome strings only — none state a new fact about Alex. The figure captions
describe the drift-diffusion model itself (true statements of DDM mechanics),
not biography. Approve or edit before merge.

16. **Hero readout line** (typed under the name when the live trial commits;
    template, real measured values):
    `decision: alexander_h_wurm · rt = <elapsed ms> ms · trials = <n>`
    Static fallback (no-JS / reduced motion, matches the pre-drawn figure):
    `decision: alexander_h_wurm · rt = 487 ms · trials = 1`

17. **Hero figure caption**:
    `fig. 1 — evidence accumulation to boundary; first passage determines response.`

18. **Hero figure a11y**: re-run button aria-label `Re-run trial`; SVG alt
    "Completed drift-diffusion trial: four evidence traces accumulate over
    time; the winning trace crosses the decision boundary a = 1.2 at 487 ms."

19. **Research sparkline**: label `notes / quarter`; axis labels `2021` /
    `2026·q2` (derived from the data); SVG alt "Industry notes per quarter,
    2021 to 2026; peak N per quarter; current quarter q2 2026." (computed)

20. **Research sample-size annotation** (live count under filters):
    `n = 164` → with filters e.g. `n = 43 · year = 2024 · type = roi study`

21. **"Let the model decide" button**: `let the model decide →`
    Screen-reader result announcement: `decision: #163 · rt = 832 ms` (template,
    real values; reduced-motion variant omits rt).

22. **404 page**: kicker `error · 404`; figure caption
    `fig. 0 — no decision reached. boundary not crossed.`; SVG alt
    "Drift-diffusion trial with three evidence traces that wander but never
    reach the decision boundary a = 1.2."

23. **Footer**: `local time — <live ET clock> ET` (no-JS fallback = build
    timestamp) · `© 2026 · built static · no trackers` (all true: static Astro
    build, zero analytics/trackers) · `llms.txt` link label.

24. **Plate captions** (featured talks, templated from existing talk data):
    `plate <n> — <event lowercased>, <mon yyyy>` e.g.
    `plate 1 — teradata webinar, jul 2025`.

25. **Publication kind markers**: `[peer-reviewed]` / `[preprint]` replace the
    "Peer-reviewed" / "Pre-print" pills (same meaning, marginalia form).

26. **Speaking year group headings**: `//2025` (mono prefix form of the year).

27. **Case restyling only** (no wording change, lowercased/monospaced via CSS):
    nav labels, button labels, link labels ("read research ↗", "abstract",
    "view screenshots", "github ↗", etc.), research tab labels, type/status
    tags. The underlying strings in data files are unchanged.

28. **OG cards**: serif name + mono page label (lowercased existing labels);
    figure annotations `a = 1.2`, `rt = 487 ms`, `evidence → boundary`.

## v3 editorial reskin (2026-06-11)

16. **Hero kicker** — "AI · Data · Decision Science" — descriptive triad of verified
    coverage/work domains (Nucleus team page; CDM Lab publications), not a job title.
17. **Hero one-liner (revised for AI-dev positioning, per Alex's direction)** —
    "I build AI tools — RAG apps, decision models, open-source software — and cover
    the data & AI platform market as a Principal Analyst at Nucleus Research."
    Sources: Nucleus AI Tool RAG app (nucleusresearch.com/ai), Wald accumulator model,
    Smart Capital Tracker (github.com/ahwurm/13f-dashboard-hosted), Nucleus team page.
18. Link labels recased (sentence case), no factual changes.

## v4 dev-native reskin (2026-06-11)

19. **Terminal hero session** — `whoami` prints: "Alexander H. Wurm — AI · data ·
    decision science" / "Principal Analyst @ Nucleus Research. I build AI tools."
    Same verified facts as the hero one-liner (items 16-17). All other terminal
    strings (help text, easter eggs, 404 session) are UI microcopy, no biographical claims.
20. **Hero kicker** — "// ai · data · decision science" (item 16 restyled).

## v5 image-pass microcopy (2026-06-11)

16. Home about-teaser section sub: "The person behind the prompt." — playful UI copy
    (shell-prompt pun), not a biographical claim.
17. Frame labels are filename-style UI chrome (e.g. `~/talks/2025-07-15-title.png`,
    `~/photos/starbase.jpg`) — decorative paths, not real asset paths.
18. Research-figure pairing: response-distributions.png shown with the CogSci 2021
    paper; accumulator-model.png with the PsyArXiv preprint. Both figures are from
    the old site's research assets for this same research line — CONFIRM pairing
    (PERSONAL-TODO #9).

## v6 additions (2026-06-11)

19. LocalHarness project entry — description verbatim from github.com/ahwurm/localharness
    repo description + localharness.dev meta description.
20. LocalShift project entry — description verbatim from localharness.dev/localshift meta
    description + repo description ("Part of the Local__ family").

## v8 batch (2026-06-11 evening, per Alex's live notes)
21. DeepL talk description — condensed from deepl.com event page copy (80–90% cost-cut claim is the page's own headline figure).
22. Qlik talk description — condensed from pages.qlik.com event meta (70% savings figure is the page's own).
23. Publication merge per Alex: preprint entry retitled to the CogSci paper title, kicker label "Annual Proceedings of the Cognitive Science Society" (his wording), preprint DOI + local PDF.
24. Two house reports added from his vault + report pages (Top Ten Predictions 2026, Hot Companies 2026) — summaries from page meta descriptions.
25. DeepL title-card image is GENERATED (site-styled slide; the page's own og:image is a generic DeepL logo). Qlik card is the event's real og:image.
26. Vault reconciliation (his /tmp/research.7z, declared source of truth): 20 type fixes, 60 primaryVendor fixes, market[] taxonomy added to 191 entries, Databricks id 26082→26057, x24 restored.
