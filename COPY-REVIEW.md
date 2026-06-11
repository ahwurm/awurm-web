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
