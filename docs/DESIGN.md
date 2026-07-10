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
The register is *technical precision*, so lead with a **grotesque display** face and set body in a **humanist serif** for reading comfort on long service copy. This inverts the tired "serif headline / sans body" law-firm move and reads more like a modern practice.

- **Display / headings:** a tight, confident grotesque — `Söhne`, `Neue Haas Grotesk`, or free stand-in **`Space Grotesk`** (variable). Weights 500–600. Tight tracking on large sizes.
- **Body:** a humanist serif with a low-contrast, screen-friendly cut — **`Newsreader`** or `Source Serif 4` (variable). Regular for body, medium for emphasis. This carries the "reads like a well-set document" feeling.
- **Utility / data / eyebrows:** a mono for labels, jurisdictions, small caps details — **`IBM Plex Mono`** or `Space Mono`, used sparingly at small sizes, letter-spaced, uppercase for eyebrows.

Load via `next/font/google` (self-hosted at build, static-safe). Expose as CSS vars: `--font-display`, `--font-body`, `--font-mono`; map in Tailwind `fontFamily`.

**Type scale** (rem, mobile → desktop clamps): display-xl `2.5→4.25`, display-l `2→3`, h2 `1.5→2`, h3 `1.25→1.5`, body `1.0625`, small `0.9375`, mono-eyebrow `0.75` (tracked `0.12em`, uppercase). Line-height: headings 1.05–1.15, body 1.6.

## Signature element — the "registration mark"
The one thing this site is remembered by. IP work culminates in a *grant/registration* — the moment a right is recognized. Render that as a **precise geometric glyph**: a fine-line square bracket/corner-crop framing a small filled check or seal notch, in `accent`. Think a registration corner-mark on a drawing sheet, not a badge.

Uses (sparingly — this is the *one* accessory we keep):
- As the logo lockup mark beside "KAP IP".
- As the eyebrow marker before section headings on service pages (replaces bullets/numbers).
- One large, faint version as ambient texture behind the Home hero or footer — low opacity, `line`/`surface` tones, never loud.

Draw it as an inline SVG component `components/ui/Mark.tsx` (typed `size`, `tone` props), single source. Never rasterize it; never duplicate the paths.

Secondary structural device: **hairline rules** (`line`, 1px) that behave like document margins — full-bleed section dividers, and a thin rule under eyebrows. Precision through alignment, not shadows. Zero-to-small border radius (`4px` max on cards); the mark and rules carry the identity, corners stay quiet.

## Layout
- **Container:** max-width ~`1120px`, generous gutters (mobile 20px, desktop 40px). `Container` component enforces it — no ad-hoc widths.
- **Whitespace is the material.** Big vertical rhythm between sections (mobile `4rem`, desktop `7–8rem`). Let content breathe; density is the enemy of premium here.
- **Grid:** service hub = 2-up (mobile 1-up) card grid. Sub-service sections = a document-like single column with a mono eyebrow + the mark, rule above, comfortable measure (~68ch max on body).
- **Header:** slim, `paper` with hairline bottom rule on scroll; mark + wordmark left, nav right. Mobile: mark + wordmark, hamburger; sheet menu groups Services.
- **Footer:** quiet — contact block (WhatsApp/tel/email/address from `site.ts`), nav repeat, faint ambient mark.

### ASCII wireframe — service page (the core template)
```
┌────────────────────────────────────────────┐
│ MARK  KAP IP                     nav  ☰      │  ← slim header, hairline on scroll
├────────────────────────────────────────────┤
│ ▪ PATENTS                                    │  ← mono eyebrow + mark
│ Global patent protection, drafted precisely  │  ← display, tight
│ [plainIntro — humanist serif, ~68ch]         │
│                                              │
│ ──────────────────────────────────────────  │  ← hairline rule
│ ▪ SEARCH & ANALYTICS                         │  sub-service section
│ [plainIntro]                                 │
│   What we deliver        Scope               │  two quiet columns on desktop
│   • …                    • …                 │
│ ── Process (only if ordered) ──              │
│   01 …  02 …  03 …                            │  ← numbers allowed ONLY here
│ ──────────────────────────────────────────  │
│ ▪ DRAFTING            … (repeat)             │
│ ──────────────────────────────────────────  │
│ ▪ GLOBAL FILING & PROSECUTION … (repeat)     │
│                                              │
│ [ CTA band: Talk to us → Contact ]           │
├────────────────────────────────────────────┤
│ footer: contact · nav · faint mark           │
└────────────────────────────────────────────┘
```

## Motion (lib/motion.ts only)
Restrained. The site should feel *composed*, not animated.
- Section reveal on scroll: opacity 0→1 + `y` 12px→0, `250–350ms`, ease-out, `once: true`. One variant, reused.
- Header hairline + subtle bg on scroll past hero.
- Hover: links and cards get a `line`→`accent` rule/underline transition and a 1–2px lift at most — no scale bounce, no shadow bloom.
- Optional single orchestrated moment: the registration mark on the Home hero draws its corner-strokes then the check settles, once on load (~600ms, respects reduced motion). This is the *only* "look at me" motion.
- `prefers-reduced-motion`: all reveals become instant, mark draws instantly. Wrap in a `useReducedMotion` guard.

## Quality floor (build to it, don't announce it)
Responsive to 360px. Visible keyboard focus (accent ring). Reduced motion respected. Real contrast (ink on paper passes AA). Images sized and lazy. Tap targets ≥44px. Mono eyebrows are decorative-but-labelled — real heading text stays in the heading element.

## Token → Tailwind mapping (Phase 0)
`tailwind.config.ts` extends: `colors` (table above), `fontFamily` (display/body/mono → CSS vars), `maxWidth.container`, `borderRadius.card: 4px`. No component may reference a color/size not defined here.
