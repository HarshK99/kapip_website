// Generates lightweight neutral PNG placeholders in public/images/team, one
// per person in data/team.ts. Stand-ins only — swapped for real photos on
// content handover; re-run via `npm run placeholder-team`.
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { deflateSync } from "node:zlib";
import { getPeople } from "../data/team.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "team");

const WIDTH = 480;
const HEIGHT = 600;

const SURFACE = [0xf1, 0xef, 0xea];
const LINE = [0xda, 0xd6, 0xce];

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

// Simple avatar silhouette (head circle + shoulder arc) in LINE tone over a
// SURFACE background — a generic "photo pending" placeholder, not a
// data-driven label like the service SVGs.
function buildPixels() {
  const pixels = Buffer.alloc(WIDTH * HEIGHT * 3);
  const cx = WIDTH / 2;
  const headCy = HEIGHT * 0.38;
  const headR = WIDTH * 0.16;
  const shoulderCy = HEIGHT * 1.05;
  const shoulderR = WIDTH * 0.42;

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const isBorder = x === 0 || y === 0 || x === WIDTH - 1 || y === HEIGHT - 1;
      const dHead = Math.hypot(x - cx, y - headCy);
      const dShoulder = Math.hypot(x - cx, y - shoulderCy);
      let color = SURFACE;
      if (isBorder) color = LINE;
      else if (dHead <= headR) color = LINE;
      else if (dShoulder <= shoulderR && y > HEIGHT * 0.62) color = LINE;
      const i = (y * WIDTH + x) * 3;
      pixels[i] = color[0];
      pixels[i + 1] = color[1];
      pixels[i + 2] = color[2];
    }
  }
  return pixels;
}

function buildPng() {
  const pixels = buildPixels();
  const raw = Buffer.alloc((WIDTH * 3 + 1) * HEIGHT);
  for (let y = 0; y < HEIGHT; y++) {
    raw[y * (WIDTH * 3 + 1)] = 0; // filter type: none
    pixels.copy(raw, y * (WIDTH * 3 + 1) + 1, y * WIDTH * 3, (y + 1) * WIDTH * 3);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(WIDTH, 0);
  ihdr.writeUInt32BE(HEIGHT, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const png = buildPng();
  const people = getPeople();
  for (const person of people) {
    const filePath = path.join(__dirname, "..", "public", person.image.replace(/^\//, ""));
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, png);
    console.log(`wrote ${path.relative(process.cwd(), filePath)}`);
  }
}

main();
