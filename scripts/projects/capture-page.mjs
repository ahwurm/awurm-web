// One-off page capture for project-section visuals. Full-page PNG to argv[3].
// Usage: node capture-page.mjs <url> <out.png> [waitMs]
import { chromium } from 'playwright';

const [, , URL, OUT, WAIT = '3500', WIDTH = '1440'] = process.argv;
if (!URL || !OUT) throw new Error('usage: capture-page.mjs <url> <out.png> [waitMs] [width]');

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
const page = await browser.newPage({ viewport: { width: Number(WIDTH), height: 1600 }, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(Number(WAIT));
console.log('final_url:', page.url());
console.log('title:', await page.title());
await page.screenshot({ path: OUT, fullPage: true });
console.log('screenshot:', OUT);
await browser.close();
