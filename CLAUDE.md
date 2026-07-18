# CLAUDE.md — KAP IP

Working rules for Claude Code on this project. Read this first, every session. Do not deviate without asking.

## What this is
Static marketing/information site for **KAP IP**, an intellectual property services firm (patents, trademarks, copyrights, industrial designs). No app logic, no auth, no database. Content lives in typed data files and swaps out when real copy arrives.

## Stack
Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion. Content in typed TS data files under `data/`. No DB.

## Hosting: STATIC EXPORT (Hostinger shared)
`next.config.mjs` uses `output: 'export'`. There is **no Node runtime at deploy**. This means:
- ❌ No API routes, no route handlers, no server actions, no middleware, no ISR/revalidate, no `next/image` optimization loader.
- ✅ `next/image` only with `unoptimized: true`, or plain `<img>`. All images are pre-sized static assets.
- ✅ Forms go through **Web3Forms** (client-side POST to their endpoint). No backend.
- ✅ Everything renders at build time. Dynamic routes must use `generateStaticParams`.
If you ever reach for a server-only feature, STOP and flag it — propose a static-safe alternative instead.

## India context (non-negotiable)
- Mobile-first, assume slower networks. Performance and image weight always matter.
- Contact affordances everywhere relevant: WhatsApp (`https://wa.me/<number>`) + `tel:` + email. These come from `data/site.ts`, never hardcoded in components.

## Coding standards — enforced every phase
**Modular & DRY.** Any UI used more than once → a component (`Button`, `SectionHeading`, `ServiceCard`, `Container`, `Badge`). Any logic used more than once → a helper in `lib/`. Never copy-paste variants of the same block.

**No inline UI soup.** Pages compose sections; a page file reads like a table of contents: `<Hero/>`, `<ServicesOverview/>`, `<CTA/>`. Raw markup lives inside components, not pages.

**Single source of truth.**
- Design tokens come only from `tailwind.config.ts`. No hex codes, no magic px in components.
- Motion variants come only from `lib/motion.ts`.
- Content comes only through the data-access layer (`data/services.ts`, `data/site.ts`). Components never import raw JSON or hardcode copy.

**Components.** One per file, PascalCase, typed props (never `any`), sensible defaults. Variants via props (`<Button variant="primary|ghost">`), not duplicated components.

**Structure.**
```
app/                     routes only; pages compose sections
components/ui/           primitives (Button, Container, Badge, SectionHeading, Rule)
components/sections/     page blocks (Hero, ServicesOverview, ServiceDetail, CTA, ContactBlock)
components/layout/       Header, Footer, Nav
lib/                     motion.ts, utils.ts, helpers
data/                    site.ts, services.ts (content + typed access layer)
public/images/           static assets (generated placeholders, later real photos)
scripts/                 placeholder generation, leak-check
docs/                    PRD.md, DESIGN.md
```

**Server components by default.** `"use client"` only where interaction demands it (form, mobile nav toggle, motion wrappers), pushed to the smallest leaf component. A whole page is never a client component.

**Naming matches the docs.** The vocabulary is fixed: a top-level offering is a **service** (Patents, Trademarks, Copyrights, Designs); a nested offering is a **sub-service** (e.g. Patent Search & Analytics). Never "category"/"collection"/"practice area" interchangeably. Code vocabulary = doc vocabulary.

**Right-sized abstraction.** Extract on the 2nd use, not speculatively. No premature config systems. This is a small site.

**Every phase ends clean.** No dead code, no unused imports, no commented-out blocks. `npm run lint` passes. Commit after each phase.

## Running dev/build — ask first, every time
Do not run `npm run dev` or `npm run build` on your own initiative — not to "verify," not to preview a change, not out of habit from earlier in the session. Ask before each one, every time, even mid-task. `npm run lint` is fine to run freely since it's just static analysis. If you want visual confirmation of a change, describe what you did and ask the user whether they'd like you to start the dev server or take screenshots — don't just do it.

## Content is dummy for now
All copy and contact details in `data/` are clearly-labelled placeholders. The schema is the contract; real content arrives as an `.md` file and gets poured into the same typed shapes. Do not restructure the data layer to fit prettier copy — keep the schema stable so the swap stays mechanical. See `docs/PRD.md` → Content Checklist.

## Data privacy (lightweight here)
No sensitive internal data expected. Still: `data/services.ts` exposes only public-facing fields. If any internal field ever appears (internal pricing, client names, matter numbers), it must not reach a component or the built `out/`. A `scripts/leak-check.mjs` grep runs in the deploy-prep phase against a forbidden-terms list.

## Design north star
Precise, modern-minimal. Trust through restraint and typography, not ornament. One signature element only (the registration/allowance mark — see `docs/DESIGN.md`). Restrained motion. Avoid every legal-firm cliché: navy+gold serif, scales/gavel, stock handshakes, heavy shadows, gradient overload. If a change makes the site look more generic, it's wrong.

## Phase discipline
One phase per session. Each phase: do the work → `npm run lint` → ask before running `npm run build` → commit only if asked. Phases: 0 Configure · 1 Shell · 2 Home · 3 Services (core feature) · 4 Content pages (About, Contact) · 5 Polish · 6 Deploy prep. Full prompts in `KICKOFF-PROMPT.md`.
