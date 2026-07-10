# KICKOFF-PROMPT.md — KAP IP

Two parts: **Setup (you, once)** then **Phases (Claude Code, one per session)**.

---

## SETUP — do this yourself before starting Claude Code

**1. Scaffold** (from your projects directory):
```bash
npx create-next-app@latest kap-ip \
  --typescript --tailwind --app --eslint \
  --src-dir=false --import-alias "@/*"
cd kap-ip
```

**2. Add deps:**
```bash
npm install framer-motion
```

**3. Paste the kit files into place:**
```
kap-ip/
├── CLAUDE.md            ← from kit (repo root)
├── docs/
│   ├── PRD.md           ← from kit
│   └── DESIGN.md        ← from kit
└── data/
    ├── site.ts          ← from kit
    └── services.ts      ← from kit
```
(`data/` and `docs/` sit at repo root, siblings of `app/`.)

**4. Init git + first commit:**
```bash
git init
git add -A
git commit -m "chore: scaffold + kit docs and data"
```

**5. Start Claude Code** in the repo and run Phase 0. One phase per session. After each phase Claude verifies `npm run build`, runs `npm run lint`, and commits.

---

## PHASES — paste each block into Claude Code, one session at a time

### PHASE 0 — CONFIGURE (not scaffold)
```
Read CLAUDE.md, docs/PRD.md, docs/DESIGN.md fully before touching anything. The project is already scaffolded (create-next-app) and data/ + docs/ are in place. Do NOT re-scaffold.

Configure only:
1. next.config.mjs: set output: 'export', images: { unoptimized: true }, trailingSlash: true. Static export target (Hostinger shared, no Node runtime).
2. tailwind.config.ts: implement the token system from DESIGN.md exactly — colors (ink, ink-soft, paper, surface, line, accent, accent-deep), fontFamily mapped to CSS vars (--font-display, --font-body, --font-mono), maxWidth.container (1120px), borderRadius.card (4px). No extra tokens.
3. Fonts via next/font/google, self-hosted at build: display Space Grotesk, body Newsreader, mono IBM Plex Mono. Wire CSS vars in app/layout.tsx. Set paper background + ink text + body font as defaults in globals.css. Strip create-next-app boilerplate styles.
4. lib/motion.ts: the restrained variants from DESIGN.md (section reveal, hover), with a reduced-motion-safe pattern. lib/utils.ts: a cn() class-merge helper only if needed.
5. Create the folder structure from CLAUDE.md (empty index or placeholder where useful): components/ui, components/sections, components/layout, lib, scripts, public/images.
6. scripts/placeholder-images.mjs: generates lightweight SVG placeholder images (or tiny sized PNGs) into public/images from data/services.ts (one per service, neutral, paper/surface/line tones, sized for their slots, small file size). Add an npm script "placeholders" to run it. Run it once.

Then verify: npm run build succeeds and produces out/. npm run lint passes. Commit: "chore(phase-0): configure export, tokens, fonts, motion, structure".
Do not build any pages yet.
```

### PHASE 1 — SHELL (layout, primitives, nav)
```
Read CLAUDE.md and docs/DESIGN.md. Build the shell only — no page content yet.

1. UI primitives in components/ui (one per file, typed props, variants via props):
   - Container (enforces max-w container + gutters)
   - Button (variant: primary | ghost; renders <a> or <button>)
   - SectionHeading (mono eyebrow + the Mark + heading; typed level)
   - Rule (hairline divider)
   - Mark (the registration-mark SVG signature from DESIGN.md; props size, tone; inline SVG, single source)
   - Badge (small mono label, e.g. sub-service count)
2. components/layout: Header (slim, Mark + wordmark, nav from site.ts, hairline-on-scroll, accessible mobile sheet menu grouping Services), Footer (contact block from site.ts helpers — WhatsApp/tel/email/address, nav repeat, faint ambient Mark).
3. Persistent mobile WhatsApp affordance (floating or in a sticky bar), using whatsappHref() from data/site.ts.
4. app/layout.tsx composes Header + {children} + Footer. Set global focus-visible ring (accent). Respect prefers-reduced-motion.

Rules: server components by default; "use client" only on the mobile menu toggle / motion leaves. All contact + nav data via data/site.ts helpers — nothing hardcoded. Colors/sizes only from tailwind tokens. Motion only from lib/motion.ts.

Verify build + lint. Commit: "feat(phase-1): shell — primitives, header, footer, nav".
```

### PHASE 2 — HOME
```
Read docs/PRD.md (Home section) and docs/DESIGN.md. Build the Home page by composing section components; app/page.tsx must read like a table of contents.

Sections in components/sections:
- Hero: firm thesis (site.tagline), primary CTA → /contact, secondary → /services, faint ambient Mark, the one orchestrated Mark draw-on-load moment (reduced-motion safe).
- ServicesOverview: framing line + link to each of the 4 services (from getServices()), using ServiceCard-style treatment.
- WhyKAP: 3–4 credibility points (dummy, from a small local const or add to data if cleaner) — precision / reach / responsiveness. No fake stats, no logo cloud.
- CTA band → /contact.

Section reveals use lib/motion.ts (once, subtle). Pull all copy/links from the data layer where it exists. Verify build + lint. Commit: "feat(phase-2): home".
```

### PHASE 3 — SERVICES (core feature: hub + templated service pages)
```
Read docs/PRD.md (IA + data model) and docs/DESIGN.md (service page wireframe). This is the core feature.

1. app/services/page.tsx — the hub: framing line + 2-up ServiceCard grid (mobile 1-up) from getServices(). Each card: name, summary, sub-service count Badge (only if >0), link to the service page. ServiceCard is a component in components/sections or ui.
2. app/services/[slug]/page.tsx — the templated service page:
   - generateStaticParams from getServiceSlugs(); getService(params.slug), 404 via notFound() if missing.
   - Compose a ServiceDetail section: service hero (name, plainIntro, precise, overview[] if present), then loop subServices into SubServiceSection blocks.
   - SubServiceSection: mono eyebrow + Mark + name, plainIntro, then "What we deliver" (deliver[]) and "Scope" (scope[]) as two quiet columns on desktop / stacked on mobile, and "Process" (process[]) ONLY if present, rendered as the numbered ordered list (the only place numbers are allowed).
   - Services with 0 sub-services (Trademarks/Copyrights/Designs) must render cleanly with just service-level content.
   - CTA band → /contact at the bottom.

Follow the DESIGN.md wireframe exactly (rules between sections, ~68ch measure, mono eyebrows replacing bullets). Everything from the data layer; no hardcoded service copy. Verify build produces static pages for all service slugs. Lint. Commit: "feat(phase-3): services hub + templated service pages".
```

### PHASE 4 — CONTENT PAGES (About, Contact)
```
Read docs/PRD.md (About, Contact) and docs/DESIGN.md.

1. app/about/page.tsx — composed sections: firm intro, approach/why-precise (dummy), optional principals block (support a people[] shape but render nothing if empty). No stock-photo filler.
2. app/contact/page.tsx:
   - ContactBlock section: WhatsApp / tel / email / address / hours, all via data/site.ts helpers.
   - ContactForm ("use client", smallest leaf): fields name, email, phone (optional), service interest (select populated from getServices()), message. Client-side validation. Submits to Web3Forms using site.web3formsKey (POST to https://api.web3forms.com/submit). Success + error states written in the interface's voice (see DESIGN.md writing notes). No backend, no server action.

Verify build + lint. Commit: "feat(phase-4): about + contact with web3forms".
```

### PHASE 5 — POLISH
```
Read docs/DESIGN.md. Polish pass, no new features.
- Responsive audit down to 360px; fix any overflow, tap targets ≥44px.
- Verify motion is restrained and reduced-motion works everywhere; remove any stray/scattered animation.
- Accessibility: keyboard nav, visible focus rings, alt text on placeholders, heading order, color contrast AA.
- Image weight: confirm placeholders are small and lazy; no oversized assets.
- Remove dead code, unused imports, commented blocks. Tighten spacing rhythm per DESIGN.md.
Verify build + lint clean. Commit: "polish(phase-5): responsive, a11y, motion, weight".
```

### PHASE 6 — DEPLOY PREP
```
Read CLAUDE.md (hosting + privacy).
1. Confirm output: 'export' produces a complete out/ with all pages (/, /about, /services, /services/{patents,trademarks,copyrights,designs}, /contact). trailingSlash suits Hostinger.
2. scripts/leak-check.mjs: grep the built out/ for a forbidden-terms list (empty/confirm for this site) and any leftover "DUMMY"/"REPLACE_WITH" markers — fail loudly if real content wasn't swapped in when it should be. Wire as an npm script and note it in README.
3. Add a short README section: how to run placeholders, how to swap dummy content (edit data/site.ts + data/services.ts from the content .md), how to build, and what to upload to Hostinger (contents of out/).
4. Final npm run build + npm run lint. Commit: "chore(phase-6): deploy prep, leak-check, readme".
```

---

## Content handover (later)
When the real content `.md` arrives: fill `data/site.ts` and `data/services.ts` against the shapes (see PRD Content Checklist), drop real images into `public/images` (matched to the placeholder slots / AI-image prompts if generated), then run `npm run build` and the leak-check. No component changes needed.
