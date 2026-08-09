# Commands

Reference for the scripts in `package.json`. Run from the project root.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Next.js dev server. |
| `npm run build` | Static export build (`output: 'export'`) — produces `out/`. |
| `npm run start` | Serves the production build (`next start`) — not used for deploy (Hostinger serves `out/` as static files), useful for a local prod check. |
| `npm run lint` | ESLint, static analysis only. Safe to run anytime. |
| `npm run sync-logo` | Copies `public/images/logo.svg` (the single source of truth for the logo) to `app/icon.svg`, the file Next.js expects for the favicon. Run this any time `logo.svg` is edited/re-exported (new colors, reshaped, etc.) — the Header and Footer already read `public/images/logo.svg` directly, so they pick up changes automatically without this command. Only the favicon copy needs it. |
| `npm run placeholders` | Regenerates the dummy service-motif SVGs in `public/images/` from `data/services.ts`. |
| `npm run placeholder-team` | Regenerates the dummy team-photo placeholders. |
