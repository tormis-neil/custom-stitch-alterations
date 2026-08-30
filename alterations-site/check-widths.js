/**
 * Checks the page does not scroll sideways at common device widths,
 * and names the element responsible when it does.
 *
 *   npx playwright@latest install chromium   # first time only
 *   node check-widths.js
 */
const path = require('path');
const { chromium } = require('playwright');

const WIDTHS = [320, 360, 390, 414, 600, 768, 834, 1024, 1280, 1440, 1920];
const PAGES = ['index.html', 'thanks.html'];

(async () => {
  const browser = await chromium.launch();
  let failures = 0;

  for (const file of PAGES) {
    const url = 'file://' + path.resolve(__dirname, file);
    console.log('\n' + file);

    for (const width of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(400);

      const result = await page.evaluate((vw) => {
        const doc = document.documentElement;
        const culprits = [];
        if (doc.scrollWidth > doc.clientWidth) {
          document.querySelectorAll('*').forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
              const cls = el.className && el.className.toString().slice(0, 30);
              culprits.push(el.tagName.toLowerCase() + (cls ? '.' + cls : ''));
            }
          });
        }
        return { scroll: doc.scrollWidth, client: doc.clientWidth, culprits: culprits.slice(0, 4) };
      }, width);

      if (result.scroll > result.client) {
        failures++;
        console.log(`  ${String(width).padStart(5)}px  OVERFLOW by ${result.scroll - result.client}px  →  ${result.culprits.join(', ')}`);
      } else {
        console.log(`  ${String(width).padStart(5)}px  ok`);
      }
      await ctx.close();
    }
  }

  await browser.close();
  console.log(failures ? `\n${failures} width(s) overflow. Fix before deploying.` : '\nAll widths clean.');
  process.exit(failures ? 1 : 0);
})();
