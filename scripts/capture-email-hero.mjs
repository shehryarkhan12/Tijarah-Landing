/**
 * Captures email-hero-frame.html frame-by-frame with Puppeteer and
 * encodes the frames into ../email-hero.gif — the animated hero for the
 * launch-waitlist welcome email.
 *
 * Usage:
 *   cd scripts && npm install   (once — pulls puppeteer/Chromium)
 *   npm run capture:email-hero
 *
 * Output: ../email-hero.gif (600x300, loops forever). Host at
 * https://tijarah.pk/email-hero.gif — referenced by both welcome-email
 * templates (Tijarah-Infra lambda + Tijarah-BE).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { PNG } from 'pngjs';
import gifencPkg from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifencPkg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WIDTH = 600;
const HEIGHT = 300;
const FRAMES = 40;
const FRAME_DELAY_MS = 80; // per-frame delay baked into the GIF
const SETTLE_MS = 1600; // let CSS animations + particles start

const FRAME_PAGE = path.join(__dirname, 'email-hero-frame.html');
const OUT_PATH = path.join(__dirname, '..', 'email-hero.gif');

const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--no-first-run',
  ],
});
const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
await page.goto('file://' + FRAME_PAGE, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, SETTLE_MS));

const gif = GIFEncoder();

for (let i = 0; i < FRAMES; i++) {
  const shot = await page.screenshot({
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  });
  const png = PNG.sync.read(shot);
  const palette = quantize(png.data, 256);
  const index = applyPalette(png.data, palette);
  gif.writeFrame(index, WIDTH, HEIGHT, { palette, delay: FRAME_DELAY_MS });
  process.stdout.write(`\rframe ${i + 1}/${FRAMES}`);
}

gif.finish();
await browser.close();

fs.writeFileSync(OUT_PATH, gif.bytes());
const kb = (fs.statSync(OUT_PATH).size / 1024).toFixed(0);
console.log(`\n${OUT_PATH} — ${kb} KB, ${FRAMES} frames @ ${FRAME_DELAY_MS}ms`);
