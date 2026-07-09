// One-off: capture the Smart Capital Tracker dashboard from its live Streamlit app.
// Streamlit Community Cloud bounces anonymous visitors through /-/auth to mint a
// guest session (a real browser resolves it; bare curl loops). Cold-started apps
// may show a "wake" button first. Inspection-first: writes to the path in argv[2].
import { chromium } from 'playwright';

const URL = 'https://smart-capital-tracker.streamlit.app/';
const OUT = process.argv[2] || '/tmp/sct.png';

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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
page.setDefaultTimeout(90000);

await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForLoadState('networkidle', { timeout: 90000 }).catch(() => {});

// Cold-start: click the wake button if present, then wait for reboot.
const wake = page.getByText(/get this app back up|wake/i).first();
if (await wake.isVisible().catch(() => false)) {
  console.log('cold-start detected — clicking wake');
  await wake.click().catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 150000 }).catch(() => {});
}

await page.waitForSelector('[data-testid="stApp"]', { timeout: 60000 }).catch(() => {});
await page.waitForTimeout(7000); // let Plotly/altair charts draw

console.log('final_url:', page.url());
console.log('title:', await page.title());
console.log('body_head:', JSON.stringify((await page.locator('body').innerText().catch(() => '')).slice(0, 500)));

await page.screenshot({ path: OUT, fullPage: true });
console.log('screenshot:', OUT);
await browser.close();
