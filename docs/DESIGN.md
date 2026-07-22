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

Usage discipline: accent is for meaning (links, the signature mark, the one CTA state), not for decoration. Backgrounds stay in the paper/surface range, with two deliberate, scoped exceptions: the Home hero card (`bg-accent`) and the Footer (`bg-accent-deep`) — both matched to the header's Contact button color for brand continuity, both flip their text to `paper`-based tones for contrast, and neither is a decorative gradient wash across the page. Everywhere else, backgrounds stay in the paper/surface range and accent stays reserved for meaning. Never introduce a hex outside this table in a component.

## Typography — sans-first, with one deliberate serif exception
The register is *technical precision*, delivered through a bold display sans for statements and a neutral, screen-optimized sans for reading — plus one scoped serif accent on the single most important line on the site. The earlier "grotesque display / humanist serif" pairing (Space Grotesk + Newsreader) was fully retired in favor of an all-sans system; the serif below is a separate, later, narrowly-scoped reintroduction, not a return to that pairing.

- **Display / headings / nav:** a bold, rounded geometric sans — **`Poppins`** (static weights). Weights 500–700 — 500–600 for section headings and nav links, 700 (`tracking-tighter`) for anywhere the extra weight carries a statement. This is also the font used throughout the header (logo wordmark, nav links, Services dropdown, mobile sheet) — the header doesn't get its own typeface, it's the same `font-display` used everywhere else.
- **Home hero headline — the one serif exception:** **`Fraunces`** (`font-serif`, weight 700), used *only* for the Home hero's H1 (`site.tagline`). Chosen over a heavier/more traditional serif specifically to avoid the "navy + gold law-firm serif" cliché the anti-brief warns against. Loaded as the full variable font (not a pinned static weight) with its `opsz`/`SOFT`/`WONK` axes included, then dialed via inline `font-variation-settings: "opsz" 144, "SOFT" 0, "WONK" 0` for a sharper, higher-contrast display cut rather than Fraunces's softer default text setting — set on the component (`ScrollColorHeading`'s `style` prop), not globally, so it stays scoped to this one heading. Every other heading on the site, including other pages' `h1`s (Services hub, service pages, Contact), stays on `font-display`. If this ever needs to spread further, extend deliberately — don't let "the hero font" quietly become "the heading font."
- **Body:** **`Inter`** — chosen specifically because it's built for UI/screen reading at small sizes, unlike Poppins's geometric letterforms which get harder to scan at paragraph length. Regular for body, medium for emphasis. Used for all paragraph copy, descriptions, and summaries site-wide. *(Previously Newsreader, a humanist serif — replaced because the serif read poorly against the rest of the redesign's all-sans direction; no component references "Newsreader" by name, everything uses the `font-body` variable, so this was a layout.tsx-only change.)*
- **Utility / data / eyebrows:** a mono for labels, jurisdictions, small caps details — **`IBM Plex Mono`** or `Space Mono`, used sparingly at small sizes, letter-spaced, uppercase for eyebrows.

Load via `next/font/google` (self-hosted at build, static-safe). Expose as CSS vars: `--font-display`, `--font-body`, `--font-mono`, `--font-hero-serif`; map in Tailwind `fontFamily` (the serif reuses Tailwind's own `serif` key rather than a custom one). Poppins ships only in static weights (no variable axis) — load exactly the weights used (`500`/`600`/`700`), not the full family, to keep the font payload small. Fraunces is the one exception: loaded as a full variable font (with `axes: ["opsz", "SOFT", "WONK"]`) specifically so its optical-size/softness/wonkiness can be tuned via `font-variation-settings`, per above.

**Type scale** (rem, mobile → desktop clamps): display-xl `2.5→4.25`, display-l `2→3`, h2 `1.5→2`, h3 `1.25→1.5`, body `1.0625`, small `0.9375`, mono-eyebrow `0.75` (tracked `0.12em`, uppercase). Line-height: headings 1.05–1.15, body 1.6.

## Signature element — the "registration mark"
The one thing this site is remembered by. IP work culminates in a *grant/registration* — the moment a right is recognized. Render that as a **precise geometric glyph**: a fine-line square bracket/corner-crop framing a small filled check or seal notch, in `accent`. Think a registration corner-mark on a drawing sheet, not a badge.

Uses (sparingly — this is the *one* accessory we keep):
- As the logo lockup mark beside "KAP IP".
- As the eyebrow marker before section headings on service pages (replaces bullets/numbers).
- One large, faint version as ambient texture behind the Home hero or footer — low opacity, `line`/`surface` tones, never loud.

Draw it as an inline SVG component `components/ui/Mark.tsx` (typed `size`, `tone` props), single source. Never rasterize it; never duplicate the paths.

Secondary structural device: **hairline rules** (`line`, 1px) that behave like document margins — full-bleed section dividers, and a thin rule under eyebrows. Precision through alignment, not shadows. Zero-to-small border radius (`4px` max on cards, badges, and buttons); the mark and rules carry the identity, corners stay quiet — no pill shapes, no fully-rounded chips.

**Directional CTA icon:** `Button` (`components/ui/Button.tsx`) takes an optional `icon` prop that appends a small trailing glyph (a diagonal arrow in a `rounded-card` outline, `currentColor`) for CTAs that lead somewhere consequential — the header's elevated Contact button, the Home hero's primary CTA. Not applied to every button; it marks the one or two most important actions per page.

## Layout
- **Container:** max-width ~`1120px`, generous gutters (mobile 20px, desktop 40px). `Container` component enforces it — no ad-hoc widths.
- **Whitespace is the material.** Big vertical rhythm between sections (mobile `4rem`, desktop `7–8rem`). Let content breathe; density is the enemy of premium here.
- **Grid:** service hub = 2-up (mobile 1-up) card grid. Sub-services (when a service has more than one) render as a **sticky sidebar + scrollspy explorer** — `components/ui/ScrollspyExplorer.tsx`, a generic primitive (not service-specific; reusable for any set of named sections), wrapped by `components/sections/SubServiceExplorer.tsx` for this domain. All sub-services' content sits stacked in one scrollable column; a narrow nav (`border-l-2` accent tick on the active item) stays `sticky` alongside it. The two are wired both ways: scrolling the content updates which nav item is highlighted (`IntersectionObserver`, watching a thin band near the top of the viewport), and clicking a nav item jumps to that section — deliberately an **instant jump** (`scrollIntoView({ behavior: "auto" })`), not a smooth animated scroll, so reaching the last item never means visually gliding past everything in between. Each section shows its eyebrow+mark+name, plain intro, "what we deliver" items (each its own name + full paragraph — `DeliverItem`, not a plain bullet), optional Scope bullets, and Process (numbered, only if present). On mobile the nav becomes a sticky horizontally-scrollable row above the content instead of a side column. Comfortable measure (~68ch max) still applies to prose within each section.
- **Header:** slim, `paper` with hairline bottom rule on scroll; mark + wordmark left, plain-text nav (Home/About/Services) right, then the Contact item elevated out of the plain nav into a filled `accent` `Button` with the directional icon — one clearly-weighted action, not four equal links. Mobile: mark + wordmark, hamburger; sheet menu groups Services and repeats the same elevated Contact button at the bottom.
- **Home hero:** a rounded card (`rounded-hero`, 28px — the one deliberate exception to the 4px cap), flush against the header (no gap — the card touches the header's bottom edge directly) with a small fixed side gutter (not the shared `Container`, which would cap it at 1120px and leave large empty margins on wide screens), `bg-accent`. The hero photo is confined to the right ~45–55% only (hidden on mobile), never full-bleed — a dark-teal tint plus a left-edge gradient (solid `accent` fading to transparent) seats it into the panel so there's no hard seam between photo and color. Content sits on the left in `paper` tones: headline (bold 700, the one place display weight goes there) → one-line intro → short rule → CTA row, primary CTA inverted to a `paper` button so it doesn't disappear into the matching-color panel. No badge/eyebrow above the headline (removed — kept the hero to its essential content), no carousel, no floating/overlapping CTA card poking past the card's edge, no rounded "browser frame" wrapping the whole page — those rely on shadow/large-radius devices this system doesn't use beyond this one card.
- **Footer:** the one place the site goes dark — `bg-accent-deep`, all text flipped to `paper`-based tones (`paper` for headings/links, `paper/50–80` for secondary text, matching the same override pattern used on the Hero's accent panel). Three columns: brand (mark + name + tagline + social icons — LinkedIn/Twitter/WhatsApp, `components/ui/icons.tsx`, DUMMY profile URLs from `site.socials` until real ones exist), contact (each item gets a `mono-eyebrow` label — Phone/WhatsApp/Email/Address/Hours — over its value, not a bare list), nav repeat. Below that, a quiet bottom bar (`border-t border-paper/15`) with the copyright line and a "Developed by {site.developer}" credit. Faint ambient mark still sits bottom-right, now rendering light-on-dark instead of light-on-paper.

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

## Motion (lib/motion.ts, plus one dedicated scroll-linked primitive)
Restrained — but perceptible. The site should feel *composed*, not animated, and not so quick it reads as a flicker.
- **Heading color wipe:** every heading (`components/ui/ScrollColorHeading.tsx`) starts in a muted tone (`ink-soft` on paper/surface backgrounds, `paper/40` on the Home hero's accent panel) and sweeps left-to-right to its full color (`ink` / `paper`) as it's scrolled through the viewport — a `background-clip: text` gradient whose stop position is driven continuously by scroll offset (`framer-motion`'s `useScroll` + `useTransform` + `useMotionTemplate`, not `getSectionReveal`), so it tracks scrolling back up too, not just a one-shot reveal. Wired into `SectionHeading` (covering most headings sitewide) plus the hand-rolled ones (Home hero, About hero, credibility/expertise h3s, sub-service deliver-item names) — never re-implemented per call site. Small mono-eyebrow-styled labels that happen to use an `h2`/`h3` tag for outline purposes (sub-service names, "What we deliver"/"Scope"/"Process" labels) are excluded — visually they're labels, not headings. Skipped entirely under `prefers-reduced-motion` (renders the final color statically).
- Section reveal on scroll: opacity 0→1 + `y` 24px→0, `600ms`, ease-out, `once: true`, triggers ~40px before fully in view. One variant (`getSectionReveal`), reused everywhere — no section is left un-animated, including hero-style top sections.
- Grids of cards/columns/steps (service cards, credibility columns, process steps, values) nest a `getStaggerContainer` wrapper so items enter in sequence (`staggerChildren: 0.12s`) rather than as one flat block.
- Header hairline + subtle bg on scroll past hero.
- Hover: links and cards get a `line`→`accent` rule/underline transition and a 1–2px lift at most — no scale bounce, no shadow bloom.
- **Home hero wipe reveal:** the hero uses a different entrance than every other section — a left-to-right "curtain" reveal (`getWipeReveal`, `clip-path: inset()` animated from fully-clipped to fully-shown) instead of the usual up-fade, since the request was specifically for the green panel and its text to sweep in from the left rather than rise from below. The whole card (panel + photo) wipes in first (~0.5s), then the headline, intro, rule, and CTA row sweep in after it in their own staggered sequence (delays 0.5s→0.9s) — same staggering as before, just swept instead of faded. This is the one section that doesn't use `getSectionReveal`; everywhere else keeps the fade-up. *(There was previously a mark-draw-on-load moment in a hero badge; both the badge and the draw animation were removed — `getMarkDraw` no longer exists in `lib/motion.ts`.)*
- `prefers-reduced-motion`: all reveals render instantly at their final state, no stagger delay. Read via `useSafeReducedMotion` (`lib/motion.ts`) — built on `useSyncExternalStore`, not Framer Motion's own `useReducedMotion`, to avoid a hydration mismatch between server and a reduced-motion client.

## Quality floor (build to it, don't announce it)
Responsive to 360px. Visible keyboard focus (accent ring). Reduced motion respected. Real contrast (ink on paper passes AA). Images sized and lazy. Tap targets ≥44px. Mono eyebrows are decorative-but-labelled — real heading text stays in the heading element.

## Token → Tailwind mapping
`tailwind.config.ts` extends: `colors` (table above), `fontFamily` (display/body/mono → CSS vars), `fontSize` (the type scale above: `display-xl`, `display-l`, `h2`, `h3`, `body`, `small`, `mono-eyebrow`, each with its own line-height/tracking), `maxWidth.container`, `borderRadius.card: 4px`. No component may reference a color/size not defined here.
