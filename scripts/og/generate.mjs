// Per-page OG cards (1200x630). Adapted from localharness.dev's og generator.
// Regenerate after changing page set or branding: npm run og
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const font = (pkg, file) => `file://${root}/node_modules/@fontsource-variable/${pkg}/files/${file}`;

const cards = [
  { name: 'home', label: 'Principal Analyst & Researcher' },
  { name: 'research', label: 'Research' },
  { name: 'speaking', label: 'Speaking' },
  { name: 'projects', label: 'Projects' },
  { name: 'about', label: 'About' },
];

const html = (c) => `<!doctype html>
<html><head><style>
  @font-face {
    font-family: 'Source Serif 4';
    src: url('${font('source-serif-4', 'source-serif-4-latin-wght-normal.woff2')}') format('woff2-variations');
    font-weight: 200 900;
  }
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('${font('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')}') format('woff2-variations');
    font-weight: 100 800;
  }
  * { margin: 0; }
  body {
    width: 1200px; height: 630px;
    background: #061120;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 96px; box-sizing: border-box;
    font-family: 'Source Serif 4', serif;
    position: relative; overflow: hidden;
    border-bottom: 10px solid #ceae48;
  }
  .name { font-weight: 600; font-size: 88px; letter-spacing: -0.02em; color: #efede5; }
  .label { margin-top: 22px; font-size: 42px; font-weight: 400; color: #ceae48; }
  .domain { position: absolute; bottom: 56px; left: 96px; font-family: 'JetBrains Mono', monospace; font-size: 26px; color: #9aa2ae; }
</style></head>
<body>
  <div class="name">Alexander H. Wurm</div>
  <div class="label">${c.label}</div>
  <div class="domain">awurm.com</div>
</body></html>`;

mkdirSync(`${root}/public/og`, { recursive: true });

const launch = async () => {
  try {
    return await chromium.launch();
  } catch {
    return await chromium.launch({ executablePath: '/usr/local/bin/chromium-browser' });
  }
};

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  await page.setContent(html(c), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  await page.screenshot({ path: `${root}/public/og/${c.name}.png` });
  console.log(`og: ${c.name}.png`);
}
await browser.close();
