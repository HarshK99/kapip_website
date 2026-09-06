// Generates dark "laboratory nocturne" SVG placeholders in
// public/images/services/, one per service in data/services.ts — stand-ins
// until the real generated images land (see docs/IMAGE-PROMPTS.md § P2).
// Re-run via `npm run placeholders`.
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getServices } from "../data/services.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "services");

const WIDTH = 1600;
const HEIGHT = 900; // 16:9

const INK_STRONG = "#0A0C0E";
const ACCENT = "#0E5C4A";
const ACCENT_DEEP = "#0A3F33";

function buildSvg(label, seed) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="g" cx="${30 + seed * 12}%" cy="35%" r="85%">
      <stop offset="0%" stop-color="${ACCENT_DEEP}"/>
      <stop offset="55%" stop-color="${INK_STRONG}"/>
      <stop offset="100%" stop-color="${INK_STRONG}"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g)"/>
  <circle cx="${28 + seed * 14}%" cy="34%" r="90" fill="none" stroke="${ACCENT}" stroke-opacity="0.35" stroke-width="1.5"/>
  <text x="6%" y="90%" font-family="monospace" font-size="24" letter-spacing="5" fill="${ACCENT}" fill-opacity="0.5">${label.toUpperCase()}</text>
</svg>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const services = getServices();
  services.forEach(async (service, i) => {
    const svg = buildSvg(service.name, i);
    const filePath = path.join(outDir, `${service.slug}.svg`);
    await writeFile(filePath, svg, "utf8");
    console.log(`wrote ${path.relative(process.cwd(), filePath)}`);
  });
}

main();
