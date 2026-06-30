// Re-label src/data/industry-research.json from the canonical Obsidian vault
// (research/). The vault is the source of truth for the three LABEL dimensions —
// research type, vendor, market — keyed by documentId == filename prefix.
// Narrative fields (summary, roiClaim, publishDate, quarter, year, technologies)
// stay as-is. Also: dedupe exact-duplicate rows, drop the one draft, add the one
// missing published note. Re-runnable. Usage: node scripts/research/sync-labels.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const VAULT = join(root, 'research');
const JSON_PATH = join(root, 'src/data/industry-research.json');

const TYPE_DISPLAY = {
  'research-note': 'Research Note',
  'roi-case-study': 'ROI Case Study',
  'value-matrix': 'Value Matrix',
  announcement: 'Announcement',
  'anatomy-of-a-decision': 'Anatomy of a Decision',
  guidebook: 'ROI Guidebook',
  trends: 'Trends',
  'benefit-case-study': 'Benefit Case Study',
};

// Vault vendor slug -> display name, for slugs the existing JSON doesn't already
// carry or normalizes differently (display is used only for the logo alt-text).
const VENDOR_OVERRIDE = {
  mondaycom: 'Monday.com', 'tray-io': 'Tray.io', 'tray-ai': 'Tray.ai',
  'cch-tagetik': 'CCH Tagetik', 'o9-solutions': 'o9 Solutions',
  openai: 'OpenAI', mulesoft: 'MuleSoft', tibco: 'TIBCO', dotdata: 'dotData',
  gooddata: 'GoodData', snaplogic: 'SnapLogic', jitterbit: 'Jitterbit',
  looker: 'Looker', metabase: 'Metabase', talend: 'Talend', workato: 'Workato',
  zapier: 'Zapier', sigma: 'Sigma', tellius: 'Tellius', omni: 'Omni', n8n: 'n8n',
  celigo: 'Celigo', confluent: 'Confluent', insightsoftware: 'insightsoftware',
  deepl: 'DeepL', dremio: 'Dremio',
};

// The 4 orphans (not in the vault) keep their narrative but their old type label
// is normalized into the canonical 8-vocab so the filter stays clean.
const OLD_TYPE_REMAP = { 'ROI Study': 'ROI Case Study' };

// Outbound nucleusresearch.com links where the title-slug 404s (verified live).
const NUCLEUS_OVERRIDE = {
  x213: 'https://nucleusresearch.com/research/single/data-integration-return-3-03-for-every-dollar-spent/',
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const prettify = (s) => s.split('-').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');

// --- parse the vault ---
// Read vendor/market/type/status from the authored frontmatter block, NOT the
// `tags:` mirror: the tags are alphabetized (losing order), but the `vendor:`
// block lists the PRIMARY vendor first (e.g. v131 vendor: [salesforce, mulesoft]
// vs tags [mulesoft, salesforce]). CRLF-normalized so block parsing is clean.
const fmList = (fm, key) => {
  let m = fm.match(new RegExp(`^${key}:[ \\t]*\\[([^\\]]*)\\]`, 'm')); // flow: key: [a, b]
  if (m) return m[1].split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
  m = fm.match(new RegExp(`^${key}:[ \\t]*\\n((?:[ \\t]*-[ \\t]*.+\\n?)+)`, 'm')); // block list
  if (m)
    return m[1]
      .split('\n')
      .map((l) => l.replace(/^[ \t]*-[ \t]*/, '').trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  m = fm.match(new RegExp(`^${key}:[ \\t]*(\\S.*)$`, 'm')); // scalar
  return m ? [m[1].trim().replace(/^["']|["']$/g, '')] : [];
};

const notes = {};
for (const fn of readdirSync(VAULT)) {
  if (!fn.endsWith('.md')) continue;
  const id = fn.split(' - ')[0].trim().toLowerCase();
  const raw = readFileSync(join(VAULT, fn), 'utf8').replace(/\r\n/g, '\n');
  const fm = raw.split(/^---\s*$/m)[1] || '';
  notes[id] = {
    type: fmList(fm, 'type')[0],
    vendor: fmList(fm, 'vendor'), // authored order — primary vendor first
    market: fmList(fm, 'market'),
    analyst: new Set([...raw.matchAll(/analyst\/([a-z0-9.\-]+)/g)].map((m) => m[1])),
    status: (fmList(fm, 'status')[0] || '?').toLowerCase(),
  };
}

const data = JSON.parse(readFileSync(JSON_PATH, 'utf8'));

// seed vendor slug -> display from the existing good Title-Case names
const seed = {};
for (const e of data)
  for (const v of e.vendors || []) {
    const s = slugify(v);
    if (s && v.toLowerCase() !== 'multiple' && !(s in seed)) seed[s] = v;
  }
const vdisplay = (slug) => VENDOR_OVERRIDE[slug] ?? seed[slug] ?? prettify(slug);
const vendorsFrom = (vl) =>
  vl.length === 1 && vl[0] === 'general' ? [] : vl.filter((v) => v !== 'general').map(vdisplay);
const primaryFrom = (vl, typeSlug) => {
  if (vl.length === 1 && vl[0] === 'general') return 'own';
  if (typeSlug === 'value-matrix') return 'own'; // Nucleus market report -> own.png badge
  return vl[0] ?? 'own'; // vault's authored primary vendor (first in the vendor: block)
};

// --- transform ---
let relabelled = 0,
  deduped = 0;
const orphans = [],
  dropped = [];
const seenIds = new Set();
const out = [];
for (const e of data) {
  const id = e.documentId.trim().toLowerCase();
  if (id === '26057') {
    dropped.push('26057 (draft)');
    continue;
  }
  // documentId is unique per real report here; the only repeats (v179, w102) are
  // the same report entered twice — collapse to the first occurrence.
  if (seenIds.has(id)) {
    deduped++;
    continue;
  }
  seenIds.add(id);

  const n = notes[id];
  const entry = { ...e };
  if (n) {
    entry.type = TYPE_DISPLAY[n.type] ?? e.type;
    entry.market = n.market;
    entry.vendors = vendorsFrom(n.vendor);
    entry.primaryVendor = primaryFrom(n.vendor, n.type);
    relabelled++;
  } else {
    entry.type = OLD_TYPE_REMAP[e.type] ?? e.type; // not in vault — normalize label only
    orphans.push(id);
  }
  if (NUCLEUS_OVERRIDE[id]) entry.nucleusUrl = NUCLEUS_OVERRIDE[id];
  out.push(entry);
}

// --- add the published successor 26082 (verified: April 29 2026 / Q2) ---
out.push({
  title: 'Databricks compute cost savings exceed the lakehouse market average',
  documentId: '26082',
  type: 'Research Note',
  year: 2026,
  quarter: 'Q2',
  publishDate: '2026-04-29',
  technologies: ['Lakehouse', 'Analytics', 'Cloud'],
  vendors: ['Databricks'],
  roiClaim: null,
  summary:
    'Nucleus reviewed data from multiple lakehouse deployments and found that 85.1 percent of Databricks customers reduced infrastructure and compute costs by a greater extent than the lakehouse market average.',
  primaryVendor: 'databricks',
  market: ['analytics'],
});

writeFileSync(JSON_PATH, JSON.stringify(out, null, 2) + '\n');

console.log(`entries: ${data.length} in -> ${out.length} out`);
console.log(`relabelled from vault: ${relabelled}`);
console.log(`deduped exact rows:    ${deduped}`);
console.log(`dropped:               ${dropped.join(', ')}`);
console.log(`added:                 26082`);
console.log(`orphans kept (not in vault): ${orphans.join(', ') || '(none)'}`);
const fell = new Set();
for (const id in notes)
  if (notes[id].analyst.has('alexander-wurm'))
    for (const v of notes[id].vendor)
      if (v !== 'general' && !(v in VENDOR_OVERRIDE) && !(v in seed)) fell.add(v);
if (fell.size) console.log(`vendor display via prettify fallback: ${[...fell].sort().join(', ')}`);
