# DESIGN.md — KAP IP

Direction: **precise, modern-minimal.** The feeling is a well-drafted document — exact margins, confident type, nothing wasted. Trust comes from restraint and typography. Spend all boldness on one signature element; keep everything else quiet.

## Anti-brief (what this must never look like)
No navy + gold serif. No scales/gavel/columns iconography. No stock handshakes or generic team photos as filler. No heavy shadows, no gradient washes, no glassmorphism, no cursor effects. No cream (#F4F1EA) + terracotta. No 01/02/03 numbered markers unless the content is a genuine ordered process (the patent *Process* steps qualify; nothing else does). If a change makes it look like a template law firm, it's wrong.

## Palette — named tokens (single source: tailwind.config.ts)
A restrained, precise palette. Ink + paper base, one confident accent drawn from the "granted/registered" idea (a deep authoritative green-teal — reads as *approved*, not festive), plus a warm-neutral for surfaces so it never feels cold or clinical.

| Token            | Hex        | Role |
|------------------|------------|------|
| `ink`            | `#14171A`  | primary text, near-black with a cool cast |
| `ink-soft`       | `#4A5158`  | secondary text, captions |
| `paper`          | `#FBFAF7`  | page background, warm off-white (not cream, not stark white) |
| `surface`        | `#F1EFEA`  | cards, section bands |
| `line`           | `#DAD6CE`  | hairline rules, borders |
| `accent`         | `#0E5C4A`  | the "granted" green-teal — links, active, the mark |
| `accent-deep`    | `#0A3F33`  | hover/pressed, dense fills |

Usage discipline: accent is for meaning (links, the signature mark, the one CTA state), not for decoration. Backgrounds stay in the paper/surface range. Never introduce a hex outside this table in a component.

## Typography — deliberate pairing (not the default serif-display)
The register is *technical precision*, so lead with a **rounded, confident sans** and set body in a **humanist serif** for reading comfort on long service copy. This inverts the tired "serif headline / sans body" law-firm move and reads more like a modern practice.

- **Display / headings / nav:** a bold, rounded geometric sans — **`Poppins`** (static weights). Weights 500–700 — 500–600 for section headings and nav links, 700 (`tracking-tighter`) reserved for the Home hero headline, where the extra weight carries the page's one big statement. This is also the font used throughout the header (logo wordmark, nav links, Services dropdown, mobile sheet) — the header doesn't get its own typeface, it's the same `font-display` used everywhere else. *(Previously Space Grotesk — swapped to Poppins for a rounder, chunkier headline that matches the hero's reference look; nav links moved from the body serif to this font at the same time, for a consistent all-sans header.)*
- **Body:** a humanist serif with a low-contrast, screen-friendly cut — **`Newsreader`** or `Source Serif 4` (variable). Regular for body, medium for emphasis. This carries the "reads like a well-set document" feeling. Still used for paragraph copy on every page — the header/nav swap above doesn't touch this.
- **Utility / data / eyebrows:** a mono for labels, jurisdictions, small caps details — **`IBM Plex Mono`** or `Space Mono`, used sparingly at small sizes, letter-spaced, uppercase for eyebrows.

Load via `next/font/google` (self-hosted at build, static-safe). Expose as CSS vars: `--font-display`, `--font-body`, `--font-mono`; map in Tailwind `fontFamily`. Poppins ships only in static weights (no variable axis) — load exactly the weights used (`500`/`600`/`700`), not the full family, to keep the font payload small.

**Type scale** (rem, mobile → desktop clamps): display-xl `2.5→4.25`, display-l `2→3`, h2 `1.5→2`, h3 `1.25→1.5`, body `1.0625`, small `0.9375`, mono-eyebrow `0.75` (tracked `0.12em`, uppercase). Line-height: headings 1.05–1.15, body 1.6.

## Signature element — the "registration mark"
The one thing this site is remembered by. IP work culminates in a *grant/registration* — the moment a right is recognized. Render that as a **precise geometric glyph**: a fine-line square bracket/corner-crop framing a small filled check or seal notch, in `accent`. Think a registration corner-mark on a drawing sheet, not a badge.

Uses (sparingly — this is the *one* accessory we keep):
- As the logo lockup mark beside "KAP IP".
- As the eyebrow marker before section headings on service pages (replaces bullets/numbers).
- In the Home hero, inside a small bordered badge (`border-line`, `rounded-card`) paired with a short mono label — the one place the mark gets its own contained "chip" treatment, and where it plays out its draw-on-load moment.
- One large, faint version as ambient texture behind the Home hero or footer — low opacity, `line`/`surface` tones, never loud.

Draw it as an inline SVG component `components/ui/Mark.tsx` (typed `size`, `tone` props), single source — path data is exported as `MARK_PATHS` so the animated hero variant reuses the same paths rather than redefining them. Never rasterize it; never duplicate the paths.

Secondary structural device: **hairline rules** (`line`, 1px) that behave like document margins — full-bleed section dividers, and a thin rule under eyebrows. Precision through alignment, not shadows. Zero-to-small border radius (`4px` max on cards, badges, and buttons); the mark and rules carry the identity, corners stay quiet — no pill shapes, no fully-rounded chips.

**Directional CTA icon:** `Button` (`components/ui/Button.tsx`) takes an optional `icon` prop that appends a small trailing glyph (a diagonal arrow in a `rounded-card` outline, `currentColor`) for CTAs that lead somewhere consequential — the header's elevated Contact button, the Home hero's primary CTA. Not applied to every button; it marks the one or two most important actions per page.

## Layout
- **Container:** max-width ~`1120px`, generous gutters (mobile 20px, desktop 40px). `Container` component enforces it — no ad-hoc widths.
- **Whitespace is the material.** Big vertical rhythm between sections (mobile `4rem`, desktop `7–8rem`). Let content breathe; density is the enemy of premium here.
- **Grid:** service hub = 2-up (mobile 1-up) card grid. Sub-services (when a service has more than one) render as a **sticky sidebar + scrollspy explorer** — `components/ui/ScrollspyExplorer.tsx`, a generic primitive (not service-specific; reusable for any set of named sections), wrapped by `components/sections/SubServiceExplorer.tsx` for this domain. All sub-services' content sits stacked in one scrollable column; a narrow nav (`border-l-2` accent tick on the active item) stays `sticky` alongside it. The two are wired both ways: scrolling the content updates which nav item is highlighted (`IntersectionObserver`, watching a thin band near the top of the viewport), and clicking a nav item jumps to that section — deliberately an **instant jump** (`scrollIntoView({ behavior: "auto" })`), not a smooth animated scroll, so reaching the last item never means visually gliding past everything in between. Each section shows its eyebrow+mark+name, plain intro, "what we deliver" items (each its own name + full paragraph — `DeliverItem`, not a plain bullet), optional Scope bullets, and Process (numbered, only if present). On mobile the nav becomes a sticky horizontally-scrollable row above the content instead of a side column. Comfortable measure (~68ch max) still applies to prose within each section.
- **Header:** slim, `paper` with hairline bottom rule on scroll; mark + wordmark left, plain-text nav (Home/About/Services) right, then the Contact item elevated out of the plain nav into a filled `accent` `Button` with the directional icon — one clearly-weighted action, not four equal links. Mobile: mark + wordmark, hamburger; sheet menu groups Services and repeats the same elevated Contact button at the bottom.
- **Home hero:** single full-bleed background image (`object-cover`, faint `paper` gradient wash over the text-bearing side for contrast, never a dark scrim), content stacked as badge → headline → one-line intro → short rule → CTA row. The badge is the mark-in-a-chip described above; the headline is the one place display weight goes to 700. No carousel, no floating/overlapping CTA card, no rounded "browser frame" around the section — those rely on shadow/large-radius devices this system doesn't use.
- **Footer:** quiet — contact block (WhatsApp/tel/email/address from `site.ts`), nav repeat, faint ambient mark.

### ASCII wireframe — service page (the core template)
```
┌────────────────────────────────────────────┐
│ MARK  KAP IP                     nav  ☰      │  ← slim header, hairline on scroll
├────────────────────────────────────────────┤
│ ▪ PATENTS                                    │  ← mono eyebrow + mark
│ Global patent protection, drafted precisely  │  ← display, tight
│ [plainIntro — humanist serif, ~68ch]         │
│ • overview bullet   • overview bullet        │
├────────────────────────────────────────────┤
│ Search & Analytics │ ▪ SEARCH & ANALYTICS    │  ← ScrollspyExplorer: nav is
│▎Drafting  (sticky) │ [plainIntro]            │    `sticky`, stays put while
│ Global Filing …    │                         │    the right column scrolls
│ Patent Intelligence│ Patentability Search     │    through ALL sub-services'
│ Exam Training      │ [full paragraph]         │    content stacked in order.
│ AI Document Review │                          │    Scrolling highlights the
│ Opposition         │ Freedom to Operate       │    nav item in view (▎ = tick);
│                     │ [full paragraph]         │    clicking a nav item jumps
│                     │                          │    straight there (instant,
│                     │ ▪ DRAFTING (next, on     │    not smooth-scrolled) —
│                     │   scroll) …              │    reaching the last item
│                     │ ── Process (if ordered) ─│    never means scrolling past
│                     │   01 …  02 …  03 …        │    everything above it.
├────────────────────────────────────────────┤
│ [ CTA band: Talk to us → Contact ]           │
├────────────────────────────────────────────┤
│ footer: contact · nav · faint mark           │
└────────────────────────────────────────────┘
```
Services with zero sub-services (Trademarks, Copyrights, Designs today) skip the explorer entirely — the page is just the service intro + CTA.

## Motion (lib/motion.ts only)
Restrained — but perceptible. The site should feel *composed*, not animated, and not so quick it reads as a flicker.
- Section reveal on scroll: opacity 0→1 + `y` 24px→0, `600ms`, ease-out, `once: true`, triggers ~40px before fully in view. One variant (`getSectionReveal`), reused everywhere — no section is left un-animated, including hero-style top sections.
- Grids of cards/columns/steps (service cards, credibility columns, process steps, values) nest a `getStaggerContainer` wrapper so items enter in sequence (`staggerChildren: 0.12s`) rather than as one flat block.
- Header hairline + subtle bg on scroll past hero.
- Hover: links and cards get a `line`→`accent` rule/underline transition and a 1–2px lift at most — no scale bounce, no shadow bloom.
- The Home hero's one orchestrated moment: the badge's registration mark draws its corner-strokes then the check settles (~0.8s total), while the headline, intro, rule, and CTA row fade up in their own staggered sequence right after — the *only* place multiple elements choreograph together like this.
- `prefers-reduced-motion`: all reveals render instantly at their final state, mark draws instantly, no stagger delay. Read via `useSafeReducedMotion` (`lib/motion.ts`) — built on `useSyncExternalStore`, not Framer Motion's own `useReducedMotion`, to avoid a hydration mismatch between server and a reduced-motion client.

## Quality floor (build to it, don't announce it)
Responsive to 360px. Visible keyboard focus (accent ring). Reduced motion respected. Real contrast (ink on paper passes AA). Images sized and lazy. Tap targets ≥44px. Mono eyebrows are decorative-but-labelled — real heading text stays in the heading element.

## Token → Tailwind mapping
`tailwind.config.ts` extends: `colors` (table above), `fontFamily` (display/body/mono → CSS vars), `fontSize` (the type scale above: `display-xl`, `display-l`, `h2`, `h3`, `body`, `small`, `mono-eyebrow`, each with its own line-height/tracking), `maxWidth.container`, `borderRadius.card: 4px`. No component may reference a color/size not defined here.
