// Per-page OG cards (1200x630), v4 dev-native: a terminal window on charcoal,
// `whoami` session with the page as the cd target. Regenerate after changing
// page set or branding: npm run og
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const font = (pkg, file) => `file://${root}/node_modules/@fontsource-variable/${pkg}/files/${file}`;

const cards = [
  { name: 'home', cmd: 'whoami', out: true },
  { name: 'research', cmd: 'cd /research', out: true },
  { name: 'speaking', cmd: 'cd /speaking', out: true },
  { name: 'projects', cmd: 'cd /projects', out: true },
  { name: 'about', cmd: 'cd /about', out: true },
];

const INK = '#e9ebec';
const DIM = '#9aa3ab';
const GREEN = '#7fce9f';
const BG = '#14171c';
const SURFACE = '#1b1f25';
const EDGE = '#343a42';

const html = (c) => `<!doctype html>
<html><head><style>
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('${font('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')}') format('woff2-variations');
    font-weight: 100 800;
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; background: ${BG};
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
  }
  .term {
    width: 1010px; background: ${SURFACE};
    border: 2px solid ${EDGE}; border-radius: 14px; overflow: hidden;
  }
  .bar {
    display: flex; align-items: center; gap: 12px;
    padding: 20px 30px; border-bottom: 2px solid ${EDGE};
    color: ${DIM}; font-size: 22px; letter-spacing: 0.04em;
  }
  .dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid ${EDGE}; }
  .dot.g { background: ${GREEN}; border-color: ${GREEN}; }
  .body { padding: 40px 48px 48px; line-height: 1.55; }
  .p { color: ${GREEN}; }
  .cmd { color: ${INK}; font-weight: 600; font-size: 34px; }
  .line { font-size: 34px; margin-top: 6px; }
  .name { color: ${INK}; font-weight: 700; font-size: 74px; letter-spacing: -0.03em; margin: 18px 0 6px; }
  .meta { color: ${GREEN}; font-size: 32px; letter-spacing: 0.02em; }
  .sub { color: ${DIM}; font-size: 28px; margin-top: 10px; }
  .cursor { display: inline-block; width: 20px; height: 40px; background: ${GREEN}; vertical-align: -6px; margin-left: 4px; }
</style></head>
<body>
  <div class="term">
    <div class="bar">
      <span class="dot"></span><span class="dot"></span><span class="dot g"></span>
      <span style="margin-left:10px">alex@awurm:~</span>
      <span style="margin-left:auto">awurm.com</span>
    </div>
    <div class="body">
      <div class="line"><span class="p">$</span> <span class="cmd">${c.cmd}</span></div>
      <div class="name">Alexander H. Wurm</div>
      <div class="meta">AI · data · decision science</div>
      <div class="sub">Principal Analyst @ Nucleus Research. I build AI tools.</div>
      <div class="line" style="margin-top:22px"><span class="p">$</span><span class="cursor"></span></div>
    </div>
  </div>
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
