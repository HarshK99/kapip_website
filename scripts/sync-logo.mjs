// public/images/logo.svg is the single source of truth for the logo — the
// Header and Footer already reference that path directly, so editing it in
// place (new colors, reshaped in Figma, whatever) updates them for free.
// The one spot that needs a physical copy is the Next.js app-icon
// convention file, which must live at app/icon.svg. Re-run this
// (`npm run sync-logo`) any time logo.svg changes so the favicon stays
// in sync without touching any component code.
import { copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SOURCE = path.join(root, "public", "images", "logo.svg");
const TARGETS = [path.join(root, "app", "icon.svg")];

function main() {
  if (!existsSync(SOURCE)) {
    console.error(`Missing source logo: ${path.relative(root, SOURCE)}`);
    process.exit(1);
  }

  for (const target of TARGETS) {
    copyFileSync(SOURCE, target);
    console.log(`synced ${path.relative(root, SOURCE)} -> ${path.relative(root, target)}`);
  }
}

main();
