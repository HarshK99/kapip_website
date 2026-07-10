// Generates lightweight neutral SVG placeholders in public/images, one per
// service in data/services.ts. Stand-ins only — swapped for real imagery on
// content handover; re-run via `npm run placeholders`.
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getServices } from "../data/services.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");

const WIDTH = 1200;
const HEIGHT = 800;

const PAPER = "#FBFAF7";
const SURFACE = "#F1EFEA";
const LINE = "#DAD6CE";
const INK_SOFT = "#4A5158";

function buildSvg(label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${SURFACE}"/>
  <rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}" fill="none" stroke="${LINE}"/>
  <rect x="40" y="40" width="${WIDTH - 80}" height="${HEIGHT - 80}" fill="${PAPER}"/>
  <path d="M 72 72 L 72 108 M 72 72 L 108 72" stroke="${LINE}" stroke-width="2" fill="none"/>
  <path d="M ${WIDTH - 72} ${HEIGHT - 72} L ${WIDTH - 72} ${HEIGHT - 108} M ${WIDTH - 72} ${HEIGHT - 72} L ${WIDTH - 108} ${HEIGHT - 72}" stroke="${LINE}" stroke-width="2" fill="none"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="28" letter-spacing="4" fill="${INK_SOFT}">${label.toUpperCase()}</text>
</svg>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const services = getServices();
  for (const service of services) {
    const svg = buildSvg(service.name);
    const filePath = path.join(outDir, `${service.slug}.svg`);
    await writeFile(filePath, svg, "utf8");
    console.log(`wrote ${path.relative(process.cwd(), filePath)}`);
  }
}

main();
