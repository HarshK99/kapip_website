// Shrinks photographic assets in public/images in place before every build
// (wired as `prebuild`, so `npm run build` always runs this first) —
// output:'export' has no server-side image pipeline (images.unoptimized is
// true), so this is the only compression these files ever get.
//
// Same filename/extension in, same filename/extension out — components
// never need their `src` touched. The *first* time this script sees a
// file, it copies the untouched original into image-backups/ (mirroring
// the public/images/ path, but living outside public/ so it's never part
// of `out/`), then every run after that re-compresses FROM that pristine
// backup rather than from the already-compressed public copy — otherwise
// re-running this on every build would re-encode a lossy image against
// itself repeatedly and visibly degrade it over time.
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imagesDir = path.join(root, "public", "images");
const backupDir = path.join(root, "image-backups");

// Below this, a photo is already cheap enough that re-encoding it isn't
// worth the build-time cost (this is what skips tiny placeholder PNGs like
// the team photo).
const MIN_SIZE_BYTES = 80 * 1024;
// Hero-sized images never need to ship wider than this — anything bigger
// gets downscaled before re-encoding. withoutEnlargement means small
// images are never upscaled.
const MAX_WIDTH = 2000;
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function findRasterImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findRasterImages(fullPath)));
    } else if (RASTER_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function compress(buffer, ext) {
  const pipeline = sharp(buffer).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  if (ext === ".png") {
    // palette: true is lossy (imagequant-style quantization) but is the one
    // setting that meaningfully shrinks photographic PNGs — plain lossless
    // recompression barely moves the needle on a photo.
    return pipeline.png({ quality: 80, effort: 10, palette: true }).toBuffer();
  }
  return pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

async function processFile(publicPath) {
  const relativeToImages = path.relative(imagesDir, publicPath);
  const originalSize = statSync(publicPath).size;

  if (originalSize < MIN_SIZE_BYTES) {
    return null;
  }

  const backupPath = path.join(backupDir, relativeToImages);
  if (!existsSync(backupPath)) {
    mkdirSync(path.dirname(backupPath), { recursive: true });
    writeFileSync(backupPath, readFileSync(publicPath));
  }

  const ext = path.extname(publicPath).toLowerCase();
  const sourceBuffer = readFileSync(backupPath);

  let compressed;
  try {
    compressed = await compress(sourceBuffer, ext);
  } catch (error) {
    console.warn(`  skipped (compression failed): ${relativeToImages} — ${error.message}`);
    return null;
  }

  const currentSize = statSync(publicPath).size;
  if (compressed.length >= currentSize) {
    return { relativeToImages, originalSize, finalSize: currentSize, changed: false };
  }

  writeFileSync(publicPath, compressed);
  return { relativeToImages, originalSize, finalSize: compressed.length, changed: true };
}

async function main() {
  if (!existsSync(imagesDir)) {
    console.log("No public/images directory — nothing to optimize.");
    return;
  }

  const files = await findRasterImages(imagesDir);
  const results = [];
  for (const file of files) {
    const result = await processFile(file);
    if (result) results.push(result);
  }

  if (results.length === 0) {
    console.log("No images needed optimizing (all under the size threshold or already compressed).");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  for (const { relativeToImages, originalSize, finalSize, changed } of results) {
    totalBefore += originalSize;
    totalAfter += finalSize;
    const label = changed ? `${formatKb(originalSize)} -> ${formatKb(finalSize)}` : `${formatKb(finalSize)} (already optimal)`;
    console.log(`  ${relativeToImages}: ${label}`);
  }
  const savedPct = (100 * (1 - totalAfter / totalBefore)).toFixed(0);
  console.log(`Optimized ${results.length} image(s): ${formatKb(totalBefore)} -> ${formatKb(totalAfter)} (${savedPct}% smaller).`);
  console.log(`Originals preserved in ${path.relative(root, backupDir)}/`);
}

main();
