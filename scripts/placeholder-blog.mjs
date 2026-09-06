// Generates dark "laboratory nocturne" SVG placeholders in
// public/images/blog/ — one 16:9 cover per post in data/blog.ts, plus a wide
// index-banner.svg for the listing page's PageBanner. Stand-ins until real
// images land; real files swap in by filename with no code change.
// Re-run via `npm run placeholder-blog`.
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getPosts } from "../data/blog.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "blog");

const INK_STRONG = "#0A0C0E";
const ACCENT = "#0E5C4A";
const ACCENT_DEEP = "#0A3F33";

function buildSvg(label, seed, width, height) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="g" cx="${28 + (seed % 5) * 12}%" cy="32%" r="90%">
      <stop offset="0%" stop-color="${ACCENT_DEEP}"/>
      <stop offset="55%" stop-color="${INK_STRONG}"/>
      <stop offset="100%" stop-color="${INK_STRONG}"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <circle cx="${26 + (seed % 5) * 14}%" cy="34%" r="${Math.round(height * 0.14)}" fill="none" stroke="${ACCENT}" stroke-opacity="0.32" stroke-width="1.5"/>
  <text x="5%" y="92%" font-family="monospace" font-size="${Math.round(height * 0.028)}" letter-spacing="5" fill="${ACCENT}" fill-opacity="0.5">${label.toUpperCase()}</text>
</svg>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const posts = getPosts();
  await Promise.all(
    posts.map((post, i) => {
      const svg = buildSvg(post.slug, i, 1600, 900); // 16:9 card / hero
      const filePath = path.join(outDir, `${post.slug}.svg`);
      return writeFile(filePath, svg, "utf8").then(() =>
        console.log(`wrote ${path.relative(process.cwd(), filePath)}`)
      );
    })
  );

  const bannerPath = path.join(outDir, "index-banner.svg");
  await writeFile(bannerPath, buildSvg("IP BLOGS", 2, 1600, 500), "utf8");
  console.log(`wrote ${path.relative(process.cwd(), bannerPath)}`);
}

main();
