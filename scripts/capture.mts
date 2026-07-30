/**
 * Capture every manifest screen from the ACTUAL running app and export each as a
 * self-contained Claude Design card (real rendered DOM + the app's own compiled
 * CSS), plus a verification screenshot. Nothing about the UI is reinterpreted —
 * we serialize exactly what the React components render at the real mobile viewport.
 */
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SCREEN_MANIFEST, { MOBILE_VIEWPORT } from '../src/screenManifest.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'design-export');
const CARDS = path.join(OUT, 'cards');
const SHOTS = path.join(OUT, 'shots');
const BASE = process.env.BASE_URL || 'http://localhost:3000';
const CHROME =
  process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function main() {
  await mkdir(CARDS, { recursive: true });
  await mkdir(SHOTS, { recursive: true });

  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  const context = await browser.newContext({
    viewport: { width: 900, height: 980 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const results: any[] = [];

  const only = process.env.CAPTURE_ONLY;
  const entries = only
    ? SCREEN_MANIFEST.filter((e) => e.id === only || e.screen === only)
    : SCREEN_MANIFEST;

  for (const entry of entries) {
    const qs = new URLSearchParams({ screen: entry.screen });
    if (entry.state) qs.set('state', entry.state);
    const url = `${BASE}/?${qs.toString()}`;

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForSelector('[data-device-frame]', { timeout: 15000 });
      // Let framer-motion entrance animations settle to their resting state.
      await page.waitForTimeout(800);
      // Best-effort: wait for any <img> inside the frame to finish loading.
      await page
        .evaluate(async () => {
          const frame = document.querySelector('[data-device-frame]');
          if (!frame) return;
          const imgs = Array.from(frame.querySelectorAll('img'));
          await Promise.all(
            imgs.map((img) =>
              img.complete
                ? Promise.resolve()
                : new Promise((res) => {
                    img.addEventListener('load', res, { once: true });
                    img.addEventListener('error', res, { once: true });
                    setTimeout(res, 2500);
                  })
            )
          );
        })
        .catch(() => {});

      const { deviceHTML, css, renderedScreen, imgCount } = await page.evaluate(() => {
        const css = Array.from(document.styleSheets)
          .map((sheet) => {
            try {
              return Array.from(sheet.cssRules)
                .map((r) => r.cssText)
                .join('\n');
            } catch {
              return '';
            }
          })
          .join('\n');
        const frame = document.querySelector('[data-device-frame]') as HTMLElement;
        const screenEl = document.querySelector('[data-device-screen]') as HTMLElement;
        return {
          deviceHTML: frame ? frame.outerHTML : '',
          css,
          renderedScreen: frame?.getAttribute('data-screen') || '',
          imgCount: frame ? frame.querySelectorAll('img').length : 0,
        };
      });

      // Verification screenshot of the exact device frame element.
      const frameEl = await page.$('[data-device-frame]');
      await frameEl?.screenshot({ path: path.join(SHOTS, `${entry.id}.png`) });

      // Build a self-contained Claude Design card: first line MUST be the @dsCard marker.
      const card = `<!-- @dsCard group="${esc(entry.group)}" name="${esc(entry.title)}" -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(entry.title)} — Gyan Vatika Pathshala</title>
<style>
/* Compiled styles captured live from the running app (Tailwind v4 + index.css) */
${css}
</style>
<style>
  html,body{margin:0;padding:0;background:#0b0f17;}
  .ds-stage{min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:28px 20px;box-sizing:border-box;}
</style>
</head>
<body>
<div class="ds-stage">
${deviceHTML}
</div>
</body>
</html>
`;
      await writeFile(path.join(CARDS, `${entry.id}.html`), card, 'utf8');

      const ok = renderedScreen === entry.screen && deviceHTML.length > 500;
      results.push({
        id: entry.id,
        screen: entry.screen,
        state: entry.state || null,
        renderedScreen,
        ok,
        htmlBytes: deviceHTML.length,
        imgCount,
      });
      console.log(
        `${ok ? '✓' : '✗'} ${entry.id.padEnd(26)} screen=${renderedScreen.padEnd(20)} html=${deviceHTML.length}B img=${imgCount}`
      );
    } catch (err: any) {
      results.push({ id: entry.id, screen: entry.screen, ok: false, error: String(err?.message || err) });
      console.log(`✗ ${entry.id.padEnd(26)} ERROR ${err?.message || err}`);
    }
  }

  await writeFile(
    path.join(OUT, 'capture-report.json'),
    JSON.stringify({ viewport: MOBILE_VIEWPORT, count: results.length, results }, null, 2),
    'utf8'
  );

  await browser.close();

  const okCount = results.filter((r) => r.ok).length;
  console.log(`\nCaptured ${okCount}/${results.length} screens OK.`);
  if (okCount < results.length) process.exitCode = 1;
}

main();
