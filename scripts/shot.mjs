// Dev-only screenshot helper for eyeballing UI changes against the local dev
// server. Not part of the build.
//
//   node scripts/shot.mjs [route] [--w 1280] [--h 900] [--full] [--sel "<css>"] [--name foo]
//
// `route` is a path WITHOUT a leading slash (Git Bash mangles a bare "/").
// Omit it for the home page.
//
// Examples:
//   node scripts/shot.mjs                        → .shots/home-1280.png
//   node scripts/shot.mjs about --full           → full-page /about
//   node scripts/shot.mjs services/patents       → /services/patents
//   node scripts/shot.mjs "" --sel "section:nth-of-type(4)"
//   node scripts/shot.mjs "" --w 390 --name home-mobile
//
// Screenshots land in .shots/ (gitignored). Assumes the dev server is already
// running on http://localhost:3000 (BASE_URL env overrides).

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const route = (args[0] && !args[0].startsWith("--") ? args[0] : "").replace(/^\/+/, "");
const path = "/" + route;
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? def : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

const base = process.env.BASE_URL ?? "http://localhost:3000";
const width = Number(flag("w", 1280));
const height = Number(flag("h", 900));
const full = has("full");
const sel = flag("sel", null);
const name =
  flag("name", null) ??
  `${path.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "home"}-${width}`;

const outDir = resolve(process.cwd(), ".shots");
mkdirSync(outDir, { recursive: true });
const out = resolve(outDir, `${name}.png`);

const browser = await chromium.launch();
try {
  // `reducedMotion: reduce` makes every shot deterministic — PageIntro returns
  // null, scroll-reveals render at their final state, no animation timing races.
  // Pass --motion to see the real animated state instead.
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: has("motion") ? "no-preference" : "reduce",
  });
  await page.goto(base + path, { waitUntil: "networkidle", timeout: 30_000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(has("motion") ? 1800 : 1200); // settle (dev hydration is slow)

  // --scroll <px> [--delay <ms>] — jump the window and shoot after `delay`
  // (default 150ms). Use with --motion to catch scroll-reveals mid-animation.
  const scrollY = flag("scroll", null);
  if (scrollY != null) {
    await page.evaluate((y) => window.scrollTo(0, Number(y)), scrollY);
    await page.waitForTimeout(Number(flag("delay", 150)));
  }

  if (sel) {
    const el = page.locator(sel).first();
    if (scrollY == null) await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(scrollY == null ? 300 : 0);
    await el.screenshot({ path: out });
  } else if (full) {
    // Scroll-reveals use `whileInView` + `once` — walk the page (one
    // scrollTo per step so IO callbacks flush between them) so every section
    // fires before capturing, otherwise unrevealed ones shoot blank.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += 400) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(140);
    }
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.screenshot({ path: out, fullPage: true });
  } else {
    await page.screenshot({ path: out });
  }
  console.log(out);
} finally {
  await browser.close();
}
