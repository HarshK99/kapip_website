/**
 * FTP deploy for KAP IP.
 *
 * Static export only (`next.config.ts` → output: 'export'), so this just syncs the
 * built `out/` directory to Hostinger over FTPS. There is no Node runtime on the server.
 *
 * Usage:  npm run deploy      (runs `next build` first, then this)
 *         node deploy.js      (deploy whatever is already in `out/`)
 *
 * Credentials come from `.env` (git-ignored) — see `.env.example`:
 *   FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_SECURE=true
 * Get them from hPanel → Files → FTP Accounts (FTP_HOST is the server IP/host, not the domain).
 */
const fs = require('fs');
const { deployStatic } = require('ftp-deploy-static');

// Load .env.local first (Next.js convention), then fall back to .env.
if (fs.existsSync('.env.local')) {
  require('dotenv').config({ path: '.env.local' });
} else {
  require('dotenv').config();
}

async function main() {
  await deployStatic({
    sourceDir: 'out',
    // 'sync': upload new/changed files, delete stale ones, leave the rest in place.
    mode: 'sync',
    // Paths on the server (relative to the FTP account root) that must never be
    // touched by the sync — anything the site needs that isn't produced by the build.
    protectedItems: [
      '.well-known',
      'cgi-bin',
    ],
  });
}

main().catch((err) => {
  console.error('Deployment failed:', err.message || err);
  process.exit(1);
});
