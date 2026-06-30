// Favicon set, dev-native v1: JetBrains Mono "AW" in terminal green on a charcoal
// squircle — a tiny sibling of the OG cards (scripts/og). Regenerate after a
// rebrand: npm run favicon. Emits favicon.svg (served, system-mono fallback) plus
// rasters rendered with the real JetBrains Mono webfont (favicon.ico 16/32/48,
// apple-touch-icon.png 180 square-opaque, icon.png 512 rounded).
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const pub = `${root}/public`;
const font = (file) => `file://${root}/node_modules/@fontsource-variable/jetbrains-mono/files/${file}`;

const BG = '#14171c'; // charcoal (matches OG cards)
const GREEN = '#7fce9f'; // terminal green (matches OG cards)
const TEXT = 'AW';
const MONO = "'JetBrains Mono Variable', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";

// Served SVG: live text so it stays ~300 bytes; system monospace fallback is fine
// for two bold caps. ls = -0.04em * 30px = -1.2 user units; central baseline centers it.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="AW">
  <rect width="64" height="64" rx="14" fill="${BG}"/>
  <text x="32" y="34" font-family="${MONO}" font-size="30" font-weight="700" letter-spacing="-1.2" fill="${GREEN}" text-anchor="middle" dominant-baseline="central">${TEXT}</text>
</svg>
`;

// HTML render (real JetBrains Mono) for the rasters. rounded => transparent corners;
// square => full-bleed opaque (Apple masks apple-touch itself, so no rounding there).
const html = (S, { square = false } = {}) => `<!doctype html><html><head><style>
  @font-face { font-family:'JBM'; src:url('${font('jetbrains-mono-latin-wght-normal.woff2')}') format('woff2-variations'); font-weight:100 800; }
  *{margin:0;box-sizing:border-box} html,body{background:transparent}
  body{width:${S}px;height:${S}px;display:flex;align-items:center;justify-content:center}
  .tile{width:${S}px;height:${S}px;border-radius:${square ? 0 : Math.round(S * 0.22)}px;background:${BG};
        display:flex;align-items:center;justify-content:center}
  .t{font-family:'JBM',monospace;font-weight:700;color:${GREEN};
     font-size:${Math.round(S * 0.46)}px;letter-spacing:-0.04em;line-height:1}
</style></head><body><div class="tile"><span class="t">${TEXT}</span></div></body></html>`;

const launch = async () => {
  try { return await chromium.launch(); }
  catch { return await chromium.launch({ executablePath: '/usr/local/bin/chromium-browser' }); }
};

const shot = async (browser, S, opts = {}) => {
  const page = await browser.newPage({ viewport: { width: S, height: S } });
  await page.setContent(html(S, opts), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  const buf = await page.screenshot({ omitBackground: !opts.square });
  await page.close();
  return buf;
};

// Assemble a PNG-encoded .ico (ICONDIR + N entries + PNG payloads).
const buildIco = (imgs) => {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4);
  const dir = Buffer.alloc(16 * imgs.length);
  let offset = 6 + dir.length;
  imgs.forEach(({ size, buf }, i) => {
    const e = i * 16;
    dir[e] = size >= 256 ? 0 : size; dir[e + 1] = size >= 256 ? 0 : size;
    dir.writeUInt16LE(1, e + 4); dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(buf.length, e + 8); dir.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([head, dir, ...imgs.map((x) => x.buf)]);
};

mkdirSync(pub, { recursive: true });
writeFileSync(`${pub}/favicon.svg`, svg);
console.log('favicon: favicon.svg');

const browser = await launch();
const ico = [];
for (const size of [16, 32, 48]) ico.push({ size, buf: await shot(browser, size) });
writeFileSync(`${pub}/favicon.ico`, buildIco(ico));
console.log('favicon: favicon.ico (16/32/48)');

writeFileSync(`${pub}/apple-touch-icon.png`, await shot(browser, 180, { square: true }));
console.log('favicon: apple-touch-icon.png (180, square)');

writeFileSync(`${pub}/icon.png`, await shot(browser, 512));
console.log('favicon: icon.png (512)');

await browser.close();
