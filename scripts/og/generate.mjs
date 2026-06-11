// Per-page OG cards (1200x630), instrument-style: navy lab-notebook grid,
// a completed drift-diffusion trial (points from scripts/hero-fig.mjs), serif
// name, mono metadata. Regenerate after changing page set or branding: npm run og
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const font = (pkg, file) => `file://${root}/node_modules/@fontsource-variable/${pkg}/files/${file}`;

const cards = [
  { name: 'home', label: 'principal analyst & researcher' },
  { name: 'research', label: 'research' },
  { name: 'speaking', label: 'speaking' },
  { name: 'projects', label: 'projects' },
  { name: 'about', label: 'about' },
];

// Completed trial (same data as the hero's static figure, viewBox 0 0 560 350)
const WINNER =
  '46.0,281.6 51.5,271.2 57.0,276.2 62.5,254.3 68.0,256.4 73.5,231.7 79.0,212.5 84.5,228.5 90.0,218.0 95.4,232.2 100.9,225.6 106.4,227.6 111.9,224.4 117.4,237.8 122.9,232.7 128.4,205.3 133.9,198.3 139.4,199.9 144.9,208.0 150.4,212.8 155.9,217.2 161.4,212.2 166.9,220.5 172.4,212.4 177.9,203.6 183.3,206.9 188.8,214.3 194.3,208.5 199.8,192.6 205.3,210.8 210.8,223.3 216.3,219.7 221.8,231.7 227.3,231.2 232.8,245.5 238.3,247.4 243.8,269.4 249.3,269.4 254.8,266.1 260.3,281.8 265.8,291.6 271.3,269.3 276.7,255.9 282.2,254.8 287.7,254.7 293.2,249.9 298.7,239.5 304.2,220.5 309.7,194.1 315.2,192.7 320.7,199.6 326.2,193.2 331.7,167.6 337.2,193.6 342.7,187.8 348.2,188.4 353.7,189.3 359.2,198.5 364.7,171.6 370.1,165.8 375.6,158.8 381.1,169.1 386.6,165.3 392.1,154.8 397.6,138.7 403.1,112.7 408.6,119.1 414.1,103.6 419.6,99.0 425.1,93.4 430.6,86.7 436.1,84.9 441.6,88.5 447.1,79.7 452.6,63.5';
const LOSER0 =
  '46.0,281.6 51.5,277.5 57.0,266.9 62.5,257.5 68.0,253.9 73.5,245.1 79.0,245.1 84.5,242.7 90.0,262.9 95.4,263.5 100.9,265.0 106.4,257.1 111.9,257.6 117.4,267.6 122.9,255.5 128.4,273.3 133.9,256.3 139.4,269.3 144.9,274.6 150.4,263.2 155.9,241.1 161.4,239.3 166.9,240.4 172.4,224.8 177.9,236.7 183.3,231.7 188.8,235.4 194.3,229.9 199.8,198.1 205.3,180.9 210.8,191.0 216.3,195.7 221.8,205.9 227.3,201.5 232.8,231.3 238.3,217.8 243.8,237.3 249.3,247.3 254.8,242.8 260.3,253.7 265.8,263.2 271.3,247.3 276.7,269.8 282.2,265.2 287.7,271.6 293.2,279.6 298.7,260.1 304.2,263.2 309.7,256.9 315.2,239.4 320.7,227.9 326.2,232.4 331.7,230.3 337.2,216.9 342.7,210.7 348.2,209.5 353.7,199.0 359.2,210.8 364.7,213.4 370.1,226.8 375.6,228.9 381.1,219.3 386.6,218.0 392.1,215.3 397.6,204.1 403.1,218.7 408.6,218.7 414.1,203.7 419.6,198.0 425.1,204.0 430.6,192.5 436.1,197.9 441.6,210.3 447.1,205.0 452.6,219.4';
const LOSER1 =
  '46.0,281.6 51.5,287.0 57.0,271.6 62.5,255.7 68.0,245.1 73.5,232.7 79.0,217.6 84.5,215.0 90.0,203.4 95.4,197.4 100.9,201.0 106.4,195.3 111.9,182.4 117.4,211.3 122.9,193.7 128.4,191.0 133.9,201.7 139.4,201.6 144.9,210.6 150.4,221.4 155.9,217.4 161.4,222.8 166.9,230.9 172.4,230.5 177.9,225.7 183.3,225.0 188.8,228.8 194.3,234.2 199.8,247.9 205.3,258.1 210.8,251.6 216.3,222.2 221.8,242.0 227.3,239.6 232.8,243.9 238.3,239.7 243.8,231.8 249.3,245.9 254.8,244.5 260.3,253.3 265.8,242.3 271.3,245.6 276.7,243.4 282.2,242.6 287.7,236.2 293.2,246.2 298.7,225.2 304.2,228.4 309.7,225.9 315.2,223.8 320.7,220.2 326.2,211.6 331.7,218.3 337.2,195.9 342.7,196.5 348.2,184.7 353.7,182.1 359.2,209.3 364.7,204.2 370.1,213.2 375.6,213.5 381.1,225.8 386.6,219.6 392.1,238.3 397.6,257.6 403.1,249.3 408.6,238.9 414.1,248.8 419.6,244.7 425.1,251.5 430.6,235.3 436.1,234.0 441.6,224.4 447.1,215.5 452.6,212.0';

const figure = `
<svg viewBox="0 0 560 350" width="640" height="400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 46 26 V 281.6 H 546" stroke="#8e98a8" stroke-opacity="0.8" stroke-width="1.2"/>
  <line x1="46" y1="65.6" x2="546" y2="65.6" stroke="#8e98a8" stroke-dasharray="6 5" stroke-width="1.2"/>
  <text x="56" y="55" fill="#9aa2ae" font-size="14" letter-spacing="1">a = 1.2</text>
  <text x="46" y="304" fill="#9aa2ae" font-size="14" letter-spacing="1">evidence → boundary</text>
  <polyline points="${LOSER0}" stroke="#efede5" stroke-opacity="0.3" stroke-width="1.6" stroke-linejoin="round"/>
  <polyline points="${LOSER1}" stroke="#efede5" stroke-opacity="0.2" stroke-width="1.6" stroke-linejoin="round"/>
  <polyline points="${WINNER}" stroke="#d4af37" stroke-width="2.4" stroke-linejoin="round"/>
  <line x1="451.8" y1="57" x2="451.8" y2="74" stroke="#d4af37" stroke-width="2.4"/>
  <circle cx="451.8" cy="65.6" r="3.6" fill="#d4af37"/>
  <text x="440" y="48" text-anchor="end" fill="#d4af37" font-size="14" letter-spacing="1">rt = 487 ms</text>
</svg>`;

const html = (c) => `<!doctype html>
<html><head><style>
  @font-face {
    font-family: 'Source Serif 4';
    src: url('${font('source-serif-4', 'source-serif-4-latin-opsz-normal.woff2')}') format('woff2-variations');
    font-weight: 200 900;
  }
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('${font('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')}') format('woff2-variations');
    font-weight: 100 800;
  }
  * { margin: 0; }
  svg text { font-family: 'JetBrains Mono', monospace; }
  body {
    width: 1200px; height: 630px;
    background-color: #061120;
    background-image:
      linear-gradient(to right, rgba(235,237,229,0.085) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(235,237,229,0.085) 1px, transparent 1px),
      linear-gradient(to right, rgba(235,237,229,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(235,237,229,0.04) 1px, transparent 1px);
    background-size: 150px 150px, 150px 150px, 30px 30px, 30px 30px;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 90px 76px; box-sizing: border-box;
    font-family: 'Source Serif 4', serif;
    font-optical-sizing: auto;
    position: relative; overflow: hidden;
  }
  .fig { position: absolute; right: 4px; top: 0; }
  .rule { width: 220px; height: 3px; background: #efede5; margin-bottom: 30px; }
  .name { font-weight: 600; font-size: 82px; letter-spacing: -0.015em; color: #efede5; position: relative; }
  .label { margin-top: 18px; font-family: 'JetBrains Mono', monospace; font-size: 30px; font-weight: 500; letter-spacing: 0.08em; color: #d4af37; }
  .domain { position: absolute; top: 56px; left: 90px; font-family: 'JetBrains Mono', monospace; font-size: 24px; letter-spacing: 0.08em; color: #9aa2ae; }
</style></head>
<body>
  <div class="fig">${figure}</div>
  <div class="domain">awurm.com</div>
  <div class="rule"></div>
  <div class="name">Alexander H. Wurm</div>
  <div class="label">${c.label}</div>
</body></html>`;

mkdirSync(`${root}/public/og`, { recursive: true });

const launch = async () => {
  try {
    return await chromium.launch();
  } catch {
    try {
      return await chromium.launch({
        executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium_headless_shell-1217/chrome-linux/headless_shell`,
      });
    } catch {
      return await chromium.launch({ executablePath: '/usr/local/bin/chromium-browser' });
    }
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
