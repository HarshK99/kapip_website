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

### Brand ramp (decorative/logo only — provisional)
A second, separate palette for the KAP brand mark and gradient moments only. It never substitutes for the functional `accent`/`accent-deep` pair above, and it never sits behind body text.

| Token          | Hex        | Role |
|----------------|------------|------|
| `brand-indigo` | `#1B2C74`  | gradient stop 0% |
| `brand-teal`   | `#14827A`  | gradient stop 38% |
| `brand-green`  | `#2E9E5B`  | gradient stop 68% |
| `brand-lime`   | `#AEC61C`  | gradient stop 100% |

```css
--brand-gradient: linear-gradient(120deg, #1B2C74 0%, #14827A 38%, #2E9E5B 68%, #AEC61C 100%);
```

**Rule:** the gradient appears in four places — the signature mark/logo, one hero accent moment, thin dividers/underlines, and `SectionHeading`'s big name text sitewide (every section's short label — "Why KAP", "About", "Patents", etc. — renders in gradient rather than flat `ink`; see Motion → Heading color below). Still never as a background wash behind body paragraphs or a full section fill — the gradient marks names and statements, not blocks of reading text. Base UI stays on the paper/ink + functional-accent system above; the brand ramp is a decorative accent layer on top of it, not a replacement for it.

**Three gradient variables — full, text-safe-on-paper, text-safe-on-accent.** Measured WCAG contrast of each stop against `paper` (`FBFAF7`): `brand-indigo` 12.13:1, `brand-teal` 4.47:1, `brand-green` 3.27:1, `brand-lime` **1.85:1** — lime fails even the large-text 3:1 AA floor by a wide margin, and green only just clears it. Against the dark `accent` panel (the Home hero), the roles invert: a dark stop like `brand-indigo` is now the one with poor contrast (dark-on-dark), while `brand-lime` (light-on-dark) reads clearly. So there are three CSS vars, not one:
- `--brand-gradient` (all 4 stops, unchanged) — for **non-text** uses only: the mark/logo, thin dividers/underlines, the hero accent moment. Contrast rules for text don't apply to these; a divider or a small mark glyph isn't a legibility risk the way a heading is.
- `--brand-gradient-text: linear-gradient(120deg, #1B2C74 0%, #14827A 45%, #2E9E5B 100%)` — indigo→teal→green, lime dropped — for gradient-filled text sitting on `paper`/`surface` (`SectionHeading`'s name text). Every remaining stop clears 3:1 against `paper` at the large/bold sizes headings render at.
- `--brand-gradient-text-on-accent: linear-gradient(120deg, #14827A 0%, #2E9E5B 50%, #AEC61C 100%)` — teal→green→lime, **indigo** dropped instead — for gradient-filled text sitting on the dark `accent` panel (the Home hero's H1). `ScrollColorHeading`'s `brandGradientVar` prop selects which of these two text variants a given `tone="brand"` heading uses; default is the paper-safe one.

Do not reuse the plain 4-stop `--brand-gradient` for any text fill, and do not use the paper-safe text variant against a dark background (or vice versa) — check which background a gradient heading actually sits on before picking the variable.

**Note:** these hex values are provisional — sync to the final logo's exact colors once delivered, and re-run the contrast check above if they change.

## Typography — sans-first, with one deliberate serif exception
The register is *technical precision*, delivered through a bold display sans for statements and a neutral, screen-optimized sans for reading — plus one scoped serif accent on the single most important line on the site. The earlier "grotesque display / humanist serif" pairing (Space Grotesk + Newsreader) was fully retired in favor of an all-sans system; the serif below is a separate, later, narrowly-scoped reintroduction, not a return to that pairing.

- **Display / headings / nav:** a bold, rounded geometric sans — **`Poppins`** (static weights). Weights 500–700 — 500–600 for section headings and nav links, 700 (`tracking-tighter`) for anywhere the extra weight carries a statement. This is also the font used throughout the header (logo wordmark, nav links, Services dropdown, mobile sheet) — the header doesn't get its own typeface, it's the same `font-display` used everywhere else.
- **Home hero headline — the one serif exception:** **`Fraunces`** (`font-serif`, weight 700), used *only* for the Home hero's H1 (`site.tagline`). Chosen over a heavier/more traditional serif specifically to avoid the "navy + gold law-firm serif" cliché the anti-brief warns against. Loaded as the full variable font (not a pinned static weight) with its `opsz`/`SOFT`/`WONK` axes included, then dialed via inline `font-variation-settings: "opsz" 144, "SOFT" 0, "WONK" 0` for a sharper, higher-contrast display cut rather than Fraunces's softer default text setting — set on the component (`ScrollColorHeading`'s `style` prop), not globally, so it stays scoped to this one heading. Every other heading on the site, including other pages' `h1`s (Services hub, service pages, Contact), stays on `font-display`. If this ever needs to spread further, extend deliberately — don't let "the hero font" quietly become "the heading font."
- **Body:** **`Inter`** — chosen specifically because it's built for UI/screen reading at small sizes, unlike Poppins's geometric letterforms which get harder to scan at paragraph length. Regular for body, medium for emphasis. Used for all paragraph copy, descriptions, and summaries site-wide. *(Previously Newsreader, a humanist serif — replaced because the serif read poorly against the rest of the redesign's all-sans direction; no component references "Newsreader" by name, everything uses the `font-body` variable, so this was a layout.tsx-only change.)*
- **Utility / data / eyebrows:** a mono for labels, jurisdictions, small caps details — **`IBM Plex Mono`** or `Space Mono`, used sparingly at small sizes, letter-spaced, uppercase for eyebrows.

Load via `next/font/google` (self-hosted at build, static-safe). Expose as CSS vars: `--font-display`, `--font-body`, `--font-mono`, `--font-hero-serif`; map in Tailwind `fontFamily` (the serif reuses Tailwind's own `serif` key rather than a custom one). Poppins ships only in static weights (no variable axis) — load exactly the weights used (`500`/`600`/`700`), not the full family, to keep the font payload small. Fraunces is the one exception: loaded as a full variable font (with `axes: ["opsz", "SOFT", "WONK"]`) specifically so its optical-size/softness/wonkiness can be tuned via `font-variation-settings`, per above.

**Type scale** (rem, mobile → desktop clamps): display-xl `2.5→4.25`, display-l `2→3`, `lead` `1.125→1.25`, h2 `1.5→2`, h3 `1.25→1.5`, body `1.0625`, small `0.9375`, mono-eyebrow `0.75` (tracked `0.12em`, uppercase). Line-height: headings 1.05–1.15, `lead` 1.4, body 1.6.

### Site-wide type hierarchy inversion
Previous drafts led with a full descriptive sentence as the biggest thing on the page, with the section's short recognizable label ("Why KAP", "About", "Contact") reduced to a small mono eyebrow above it. Inverted: **that short label *is* the largest element in its section** — set in `display-xl`/`display-l`, `font-display` 600–700, with added `letter-spacing` (tracked, not tight) so a short word still commands the space, paired inline with the mark (not a separate tiny kicker row above it — the label itself is both the eyebrow-content and the display element now). The **descriptive sentence drops to a supporting `lead`** (`1.125–1.25rem`, `font-body`, `ink-soft`) directly beneath it — still readable, no longer competing for size.

Stack, top to bottom: mark + name (big, tracked) → thin rule → lead sentence (small, supporting, optional).

Any heading previously split into "tiny mono eyebrow" + "full descriptive sentence as the big heading" inverts: the eyebrow's short label becomes the (single) big `heading`, the old sentence becomes the optional `lead`. This applies to `SectionHeading` (`components/ui/SectionHeading.tsx`) sitewide — it takes `heading`/`lead` props only, no separate `eyebrow` prop — and to the hand-rolled Home/About heroes (point below).

## Signature element — the "registration mark"
The one thing this site is remembered by. IP work culminates in a *grant/registration* — the moment a right is recognized. Render that as a **precise geometric glyph**: a fine-line square bracket/corner-crop framing a small filled check or seal notch. Think a registration corner-mark on a drawing sheet, not a badge.

**Fill — brand gradient exception.** The mark is the one shape allowed to carry `--brand-gradient` (see palette above) instead of flat `accent` — it's the seed the eventual logo will be built from. Every other use of the mark (eyebrow markers, ambient background texture) stays on the quiet `accent`/`line`/`surface` tones below; only the primary logo-lockup instance takes the gradient fill. Provisional until synced to the final logo.

Uses (sparingly — this is the *one* accessory we keep):
- As the logo lockup mark beside "KAP IP" — gradient-filled (see above).
- As the eyebrow marker before section headings on service pages (replaces bullets/numbers) — flat `accent`, not the gradient.
- One large, faint version as ambient texture behind the Home hero or footer — low opacity, `line`/`surface` tones, never loud, never gradient.

Draw it as an inline SVG component `components/ui/Mark.tsx` (typed `size`, `tone` props), single source. Never rasterize it; never duplicate the paths.

Secondary structural device: **hairline rules** (`line`, 1px) that behave like document margins — full-bleed section dividers, and a thin rule under eyebrows. Precision through alignment, not shadows. Zero-to-small border radius (`4px` max on cards, badges, and buttons); the mark and rules carry the identity, corners stay quiet — no pill shapes, no fully-rounded chips.

**Directional CTA icon:** `Button` (`components/ui/Button.tsx`) takes an optional `icon` prop that appends a small trailing glyph (a diagonal arrow in a `rounded-card` outline, `currentColor`) for CTAs that lead somewhere consequential — the header's elevated Contact button, the Home hero's primary CTA. Not applied to every button; it marks the one or two most important actions per page.

## Layout
- **Container:** max-width ~`1120px`, generous gutters (mobile 20px, desktop 40px). `Container` component enforces it — no ad-hoc widths.
- **Whitespace is the material.** Big vertical rhythm between sections (mobile `4rem`, desktop `7–8rem`). Let content breathe; density is the enemy of premium here.
- **Grid:** service hub (`/services`, the directory page) = 2-up (mobile 1-up) plain card grid — stays a scannable directory, no node/motion treatment there (PRD: "a directory, not an essay").
- **Home services node explorer:** the Home page's "What we do" section (`components/sections/ServicesOverview.tsx`) replaces the plain card grid with a **4-node square layout** on `md+` screens — mobile/tablet falls back to the existing stacked `ServiceCard` grid, since a corner-node layout doesn't survive small screens. Four nodes sit at the corners of a square; one is **active** (much larger — up to 18rem (`lg:h-72`/`lg:w-72`) vs. the quiet nodes' 6rem, with a soft `accent`-tinted glow (`shadow-accent/60`, wide/soft blur, no hard edge) around its border — shows the service's `name` + `summary` as subtext + an "Explore" button to `/services/[slug]`), the other three are **quiet** (small — name only, no subtext or button, no glow). Patents is the default active node on load (`services[0]` by `order`). Hovering or focusing any quiet node instantly swaps it to active. When nothing is hovered/focused, the active node **auto-advances** through all four on a timer (~4–5s), looping. Auto-advance pauses for as long as any node is hovered/focused and resumes from where it left off once the pointer/focus leaves — gate the interval on `:hover`/`:focus-within` in code, never announce it with on-page copy ("hover to pause" etc.) — the behavior should be self-evident, not explained. Under `prefers-reduced-motion`, auto-advance is disabled entirely: Patents stays active until a node is explicitly hovered/focused, so nothing moves on its own for a user who hasn't opted into motion — this doubles as the accessibility fallback (WCAG 2.2.2 Pause/Stop/Hide) without a visible pause button. Sub-services (when a service has more than one) render as a **sticky sidebar + scrollspy explorer** — `components/ui/ScrollspyExplorer.tsx`, a generic primitive (not service-specific; reusable for any set of named sections), wrapped by `components/sections/SubServiceExplorer.tsx` for this domain. All sub-services' content sits stacked in one scrollable column; a narrow nav (`border-l-2` accent tick on the active item) stays `sticky` alongside it. The two are wired both ways: scrolling the content updates which nav item is highlighted (`IntersectionObserver`, watching a thin band near the top of the viewport), and clicking a nav item jumps to that section — deliberately an **instant jump** (`scrollIntoView({ behavior: "auto" })`), not a smooth animated scroll, so reaching the last item never means visually gliding past everything in between. Each section shows its eyebrow+mark+name, plain intro, "what we deliver" items (each its own name + full paragraph — `DeliverItem`, not a plain bullet), optional Scope bullets, and Process (numbered, only if present). On mobile the nav becomes a sticky horizontally-scrollable row above the content instead of a side column. Comfortable measure (~68ch max) still applies to prose within each section.
- **Header:** slim, `paper` with hairline bottom rule on scroll; mark + wordmark left, plain-text nav (Home/About/Services) right, then the Contact item elevated out of the plain nav into a filled `accent` `Button` with the directional icon — one clearly-weighted action, not four equal links. Mobile: mark + wordmark, hamburger; sheet menu groups Services and repeats the same elevated Contact button at the bottom.
- **Home hero:** a rounded card (`rounded-hero`, 28px — the one deliberate exception to the 4px cap), flush against the header (no gap — the card touches the header's bottom edge directly) with a small fixed side gutter (not the shared `Container`, which would cap it at 1120px and leave large empty margins on wide screens), `bg-accent`. The hero photo is confined to the right ~45–55% only (hidden on mobile), never full-bleed — a dark-teal tint plus a left-edge gradient (solid `accent` fading to transparent) seats it into the panel so there's no hard seam between photo and color. Content sits on the left in `paper` tones, using the site-wide **big-name / small-lead** structure above: headline (`site.brandLine`, the display name, bold 700, `letter-spacing` opened up, tighter `line-height` than the default display clamp so a short tracked word doesn't read loose, the one place display weight goes there) → smaller supporting `lead` sentence (`site.tagline`) → short **gradient** rule (`--brand-gradient`, the one hero accent moment) → CTA row, primary CTA inverted to a `paper` button so it doesn't disappear into the matching-color panel. More vertical breathing room between headline and lead than the previous cramped draft ("clumsy" heading — fixed by the tracking/line-height/spacing changes above, not by a different font). No carousel, no floating/overlapping CTA card poking past the card's edge, no rounded "browser frame" wrapping the whole page — those rely on shadow/large-radius devices this system doesn't use beyond this one card.
- **About hero:** same big-name/small-lead structure as the Home hero, on the plain `paper` background (not the accent card treatment) — uses `SectionHeading` directly: mark + big display name ("The Firm" — not the full `about.lead` sentence) → `about.lead` demoted to the smaller supporting `lead` line beneath it. No accent card, no photo panel — this hero stays quiet, consistent with the rest of the About page.
- **Footer:** the one place the site goes dark — `bg-accent-deep`, all text flipped to `paper`-based tones (`paper` for headings/links, `paper/50–80` for secondary text, matching the same override pattern used on the Hero's accent panel). Three columns: brand (mark + name + tagline + social icons — LinkedIn/Twitter/WhatsApp, `components/ui/icons.tsx`, DUMMY profile URLs from `site.socials` until real ones exist), contact (each item gets a `mono-eyebrow` label — Phone/WhatsApp/Email/Address/Hours — over its value, not a bare list), nav repeat. Below that, a quiet bottom bar (`border-t border-paper/15`) with the copyright line and a "Developed by {site.developer}" credit. Faint ambient mark still sits bottom-right, now rendering light-on-dark instead of light-on-paper.

### ASCII wireframe — service page (the core template)
```
┌────────────────────────────────────────────┐
│ MARK  KAP IP                     nav  ☰      │  ← slim header, hairline on scroll
├────────────────────────────────────────────┤
│ ▪ PATENTS                                    │  ← mark + big display name
│ Global patent protection, drafted precisely  │  ← lead, smaller
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

## Imagery
**Direction:** life-sciences-forward motifs (molecules, DNA strands, protein structures, periodic-table fragments) as the dominant visual language — this reflects KAP's primary practice. But the site must never read as life-sciences-only: the domains grid (all 10 fields from `about.ts`, including electrical, mechanical, and AI) sits prominently near the hero so breadth is established immediately, and service pages (Trademarks, Copyrights, Designs, and the non-life-sciences corners of Patents) use neutral or mixed motifs rather than forcing a molecule into every panel. Life sciences is the primary visual language, not the only one.

**Format target:** lightweight SVG/vector for iconographic and motif work (scales cleanly, tiny payload); well-compressed WebP/AVIF for anything photographic. Mobile-first — no asset justifies a perf hit on a slow connection.

**Current state:** real imagery arrives later (client-provided PNGs). Until then, dummy placeholder PNGs stand in — generated via `scripts/placeholder-team-photos.mjs` (`npm run placeholder-team`) for people, `scripts/placeholder-images.mjs` (`npm run placeholders`) for service motifs. Same rule as the rest of the data layer: placeholders keep the real shape (file paths, aspect ratios) so the swap to real assets is mechanical.

## Motion (lib/motion.ts, plus one dedicated scroll-linked primitive)
Restrained — but perceptible. The site should feel *composed*, not animated, and not so quick it reads as a flicker.
- **Heading color wipe:** every heading (`components/ui/ScrollColorHeading.tsx`) starts in a muted tone (`ink-soft` on paper/surface backgrounds, `paper/40` on the Home hero's accent panel) and sweeps left-to-right to its full color (`ink` / `paper`) as it's scrolled through the viewport — a `background-clip: text` gradient whose stop position is driven continuously by scroll offset (`framer-motion`'s `useScroll` + `useTransform` + `useMotionTemplate`, not `getSectionReveal`), so it tracks scrolling back up too, not just a one-shot reveal. Wired into `SectionHeading` (covering most headings sitewide, including sub-service names in the explorer — these are real big headings now, not small mono labels) plus the hand-rolled ones (Home hero, credibility/expertise h3s, sub-service deliver-item names). Never re-implemented per call site. Small mono-eyebrow-styled labels that exist purely for outline purposes ("What we deliver"/"Scope"/"Process" labels) stay excluded — visually they're labels, not headings. Skipped entirely under `prefers-reduced-motion` (renders the final color statically).
- Section reveal on scroll: opacity 0→1 + `y` 24px→0, `600ms`, ease-out, `once: true`, triggers ~40px before fully in view. One variant (`getSectionReveal`), reused everywhere — no section is left un-animated, including hero-style top sections.
- Grids of cards/columns/steps (service cards, credibility columns, process steps, values) nest a `getStaggerContainer` wrapper so items enter in sequence (`staggerChildren: 0.12s`) rather than as one flat block.
- Header hairline + subtle bg on scroll past hero.
- Hover: links and cards get a `line`→`accent` rule/underline transition and a 1–2px lift at most — no scale bounce, no shadow bloom.
- **Home hero wipe reveal:** the hero uses a different entrance than every other section — a left-to-right "curtain" reveal (`getWipeReveal`, `clip-path: inset()` animated from fully-clipped to fully-shown) instead of the usual up-fade, since the request was specifically for the green panel and its text to sweep in from the left rather than rise from below. The whole card (panel + photo) wipes in first (~0.5s), then the headline, intro, rule, and CTA row sweep in after it in their own staggered sequence (delays 0.5s→0.9s) — same staggering as before, just swept instead of faded. This is the one section that doesn't use `getSectionReveal`; everywhere else keeps the fade-up. *(There was previously a mark-draw-on-load moment in a hero badge; both the badge and the draw animation were removed — `getMarkDraw` no longer exists in `lib/motion.ts`.)*
- `prefers-reduced-motion`: all reveals render instantly at their final state, no stagger delay. Read via `useSafeReducedMotion` (`lib/motion.ts`) — built on `useSyncExternalStore`, not Framer Motion's own `useReducedMotion`, to avoid a hydration mismatch between server and a reduced-motion client.

### Visual/interactive shift — less text, more structured blocks
Direction going forward: reduce copy density in favor of structured visual blocks (stat tiles, domain grid, team card) and a small, restrained set of interactions layered on top of the existing motion primitives above — not a departure from them.
- **Hero motif assembles on load:** the life-sciences motif (molecule/DNA form) in the hero builds itself in on first paint — a bounded, one-shot entrance, not a looping animation.
- **Stat count-up on scroll-into-view:** the numbers/stats strip (`data/stats.ts`) counts up from 0 to its value once, triggered the same way as `getSectionReveal` (`viewport={{ once: true }}`), not on every scroll pass.
- **Hover states on cards/domains:** the existing `line`→`accent` rule/underline + 1–2px lift pattern (see Hover, above) extends to the stat tiles, domain-grid items, and the team card — no new hover language, same restrained one.
- All of the above are reduced-motion-safe via the same `useSafeReducedMotion` gate — count-ups render at their final value instantly, the hero motif renders fully assembled, hover lift/underline still work (hover isn't motion-sickness-triggering, stays on).

**Guardrails:** no heavy video backgrounds, no scroll-jacking (native scroll stays native), all imagery lazy-loaded below the fold, perf budget from the Quality floor below is non-negotiable. Interactions exist to serve clarity — draw the eye to what matters — never spectacle for its own sake.

**Auto-advancing content is allowed, narrowly.** The Home services node explorer (above) is the one place content changes on its own without the user acting first. It's permitted specifically because it ships with real pause control — hover/focus pauses it, `prefers-reduced-motion` stops it outright — not because the general anti-carousel stance (Home hero: "no carousel") has softened. Don't reach for auto-advance elsewhere without the same pause/stop guarantees, and never label the pause behavior in on-page copy — it should just work when the user's attention lands on it.

### Heading color
`SectionHeading`'s big name text renders in `--brand-gradient-text` (`ScrollColorHeading`'s `tone="brand"`) instead of flat `ink` — see Palette → Three gradient variables above for the contrast reasoning (lime dropped; the 3 remaining stops clear AA at heading sizes). This replaces the old scroll-linked color-wipe for these headings specifically: a static gradient fill reads more like a signature than an animated one would, and it avoids re-deriving a moving 2-color wipe into a 3-stop gradient.

The **Home hero's H1** also uses `tone="brand"` now (the hero being the one designated "hero accent moment" the brand ramp is scoped to) — but with `brandGradientVar="--brand-gradient-text-on-accent"`, the dark-background variant, since it sits on `bg-accent` rather than `paper`. The wipe-on-scroll behavior (`tone="ink"`/`"paper"`) stays exactly as before for every other heading that isn't going through `SectionHeading` and isn't the hero H1 (deliver-item names, credibility/expertise h3s) — those are secondary text, not a section's name or the one hero statement, and stay quiet.

## Quality floor (build to it, don't announce it)
Responsive to 360px. Visible keyboard focus (accent ring). Reduced motion respected. Real contrast (ink on paper passes AA). Images sized and lazy. Tap targets ≥44px. Mono eyebrows are decorative-but-labelled — real heading text stays in the heading element.

## Token → Tailwind mapping
`tailwind.config.ts` extends: `colors` (table above, functional palette only — the brand ramp is documentation-only until a component needs it), `fontFamily` (display/body/mono → CSS vars), `fontSize` (the type scale above: `display-xl`, `display-l`, `lead`, `h2`, `h3`, `body`, `small`, `mono-eyebrow`, each with its own line-height/tracking), `maxWidth.container`, `borderRadius.card: 4px`. No component may reference a color/size not defined here.
