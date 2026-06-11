// Full-page screenshots: 6 pages x {desktop, mobile} x {light, dark}.
// Usage: npm run preview (port 4321) then `node scripts/shots.mjs`.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.env.SHOT_BASE ?? 'http://localhost:4321';
const outDir = process.env.SHOT_DIR ?? '/tmp/awurm-shots';
mkdirSync(outDir, { recursive: true });

const launch = async () => {
  try {
    return await chromium.launch();
  } catch {
    return await chromium.launch({ executablePath: '/usr/local/bin/chromium-browser' });
  }
};

const pages = [
  ['/', 'index'],
  ['/research/', 'research'],
  ['/research/?tab=industry', 'research-industry'],
  ['/speaking/', 'speaking'],
  ['/projects/', 'projects'],
  ['/about/', 'about'],
  ['/404.html', '404'],
];
const viewports = [
  [1440, 900, 'desktop'],
  [390, 844, 'mobile'],
];

const browser = await launch();
for (const theme of ['light', 'dark']) {
  for (const [w, h, vp] of viewports) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    await ctx.addInitScript((t) => localStorage.setItem('theme', t), theme);
    const page = await ctx.newPage();
    for (const [path, name] of pages) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `${outDir}/${name}-${vp}-${theme}.png`, fullPage: true });
    }
    await ctx.close();
  }
}
await browser.close();
console.log(`shots written to ${outDir}`);
