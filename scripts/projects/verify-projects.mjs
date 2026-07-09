// Verify the redesigned projects page in a real browser: dark, light, mobile.
import { chromium } from 'playwright';

const OUT = process.argv[2];
const URL = `${process.argv[3] || 'http://localhost:4323'}/projects/`;
if (!OUT) throw new Error('usage: verify-projects.mjs <out-dir>');

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
// Theme is localStorage-driven (site defaults dark; system pref ignored by design).
const shots = [
  { name: 'dark', viewport: { width: 1320, height: 1000 }, theme: 'dark', dsf: 1 },
  { name: 'light', viewport: { width: 1320, height: 1000 }, theme: 'light', dsf: 1 },
  { name: 'mobile', viewport: { width: 390, height: 844 }, theme: 'dark', dsf: 2 },
];
for (const s of shots) {
  const page = await browser.newPage({ viewport: s.viewport, deviceScaleFactor: s.dsf });
  await page.addInitScript((t) => localStorage.setItem('theme', t), s.theme);
  await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
  // Scroll through so lazy images load before the full-page shot.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/projects-${s.name}.png`, fullPage: true });
  console.log('shot:', s.name, page.url());
  await page.close();
}
await browser.close();
