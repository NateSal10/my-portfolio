// Regenerates the project preview images in public/projects/ from the case study covers.
// Usage: start the dev server (npm run dev -- --port 5173), then run
//   node scripts/capture-project-thumbs.cjs
// Needs Playwright with Chromium available (npm i -D playwright && npx playwright install chromium).
const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');

const IDS = ['compliance-copilot', 'homesphere-erm', 'trading-simulator', 'zero-day-response', 'pentest', 'windows-monitoring', 'student-data-system'];
const OUT = path.join(__dirname, '..', 'public', 'projects');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 820, height: 1000 }, deviceScaleFactor: 2, colorScheme: 'light' });
  for (const id of IDS) {
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.click(`#project-${id}`);
    await page.waitForTimeout(900);
    await page.addStyleTag({ content: '.cs-cover > div { border-radius: 0 !important; }' });
    const png = await (await page.$('.cs-cover > div')).screenshot();
    // Trim 3px (6 device px) from every edge: the element's outer pixel row is anti-aliased
    // and shows up as a seam when the image is letterboxed against its own background color.
    const { width, height } = await sharp(png).metadata();
    await sharp(png).extract({ left: 6, top: 6, width: width - 12, height: height - 12 })
      .resize({ width: 1200 }).webp({ quality: 82 }).toFile(path.join(OUT, `${id}.webp`));
    console.log('saved', id);
  }
  await browser.close();
})();
