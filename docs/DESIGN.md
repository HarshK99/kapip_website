# DESIGN.md — KAP IP

> This doc describes the **target** design. Where code is still catching up, see
> **Migration notes** at the bottom. It is not frozen — if something here reads
> as boring, templated, or timid, change it and update this file.

## Direction — precision as confidence

The reference object is the **front page of a granted patent**: a seal, a number, a
priority date, an abstract. Sparse, exact, authoritative — every element earns
its place and then commits fully. That is the feeling. Not "quiet and safe" —
*decisive*. Restraint governs **how many** elements appear; it does not mute the
few that remain. Those go big, tight, and high-contrast.

Three rules carry it:
1. **One decisive move per screen.** A massive headline, a single interaction, a
   full-bleed rule — one thing the eye lands on first, everything else in service.
2. **Type is the identity.** The site should be recognisable from a 200px-wide
   crop of a heading. Scale, weight, and tight tracking do the work that a logo
   or illustration would elsewhere.
3. **Negative space is structural, not leftover.** Big air between sections;
   generous margins; the content column deliberately narrow against the viewport.

If a change makes the site look like a template — a SaaS landing page, a law
firm, an "AI startup" — it is wrong, even if it's tidy.

## Anti-brief — never

Legal-cliché: navy + gold, serif-and-scales, gavels, columns, statue-of-justice,
stock handshakes, generic smiling-team photos.

Template tells (2024–25): multi-stop **gradient text**; **`01/02` section-index
kickers** dressed up as "editorial"; cream (`#F4F1EA`) + terracotta +
high-contrast serif; near-black + acid-green / vermilion; the "AI broadsheet"
(hairlines everywhere, zero hierarchy); glassmorphism; faux-3D;
blob / squiggle shapes; molecule / DNA imagery used as *tiled wallpaper behind
text* (an art-directed single-subject image is fine — see Imagery).

Craft failures: heavy shadows, mixed border weights, orphaned heading lines,
proportional (non-tabular) figures, custom cursors, scroll-jacking, layout
shift.

## Palette — named tokens (single source: `tailwind.config.ts`)

Ink + paper base. One accent, drawn from the *granted / registered* idea — a deep
green-teal that reads as **approved**, not festive. Neutrals carry only a whisper
of warmth — enough to not read clinical, not enough to read beige / aged.

| Token         | Hex       | Role |
|---------------|-----------|------|
| `ink`         | `#14171A` | body text, UI, most headings |
| `ink-strong`  | `#0A0C0E` | display-scale type only — keeps huge text from reading grey |
| `ink-soft`    | `#4A5158` | secondary text, captions, lead sentences |
| `paper`       | `#FCFBFA` | page background — near-white, a whisper warm; not cream, not stark |
| `surface`     | `#F4F3F1` | section bands — a clean light grey that reads as a *layer*, not aged paper |
| `accent-wash` | `#ECF2F0` | hover / active washes (folder open body, hovered rows) — the *only* sanctioned faint-accent fill; replaces ad-hoc `bg-accent/5` |
| `line`        | `#DBD9D3` | every hairline, 1px, one weight sitewide |
| `accent`      | `#0E5C4A` | links, active state, the mark |
| `accent-deep` | `#0A3F33` | hover / pressed, the dark footer + hero fills + one dark interior beat per long page |

**Discipline.** Accent means *meaning* (a link, the mark, the active thing, the
one CTA), never decoration. Backgrounds live in `paper` / `surface` except
scoped dark moments that flip text to `paper` tones — the **Home hero card**
(`bg-accent`), the **Footer** (`bg-accent-deep`), and **one dark interior beat**
on a long page (Home → `WhyKAP` on `bg-accent-deep`). Never a hex outside this
table in a component; never a gradient wash behind reading text.

### Brand ramp — the mark, and nothing else

A separate decorative palette that exists to seed the eventual logo. It is
**scoped to two places only**: the registration mark (`Mark tone="gradient"`)
and the Home hero's ambient edge glow — the teal→green bloom on the card
(`.hero-glow-bloom`); the running rim shimmer itself (`.hero-glow`) is white,
not ramp. It is **never** applied to text, never a background, never a section
fill. (Earlier revisions ran it as gradient-filled heading text sitewide, and
as a static hairline under the hero tagline — both removed; see Migration
notes.)

| Token          | Hex       |
|----------------|-----------|
| `brand-indigo` | `#1B2C74` |
| `brand-teal`   | `#14827A` |
| `brand-green`  | `#2E9E5B` |
| `brand-lime`   | `#AEC61C` |

```css
--brand-gradient: linear-gradient(120deg, #1B2C74 0%, #14827A 38%, #2E9E5B 68%, #AEC61C 100%);
```

Provisional until synced to the final logo. There are no `--brand-gradient-text*`
variables any more — delete them if found.

## Typography — two voices with clear jobs

Families are fixed. What changed is the **treatment**: bigger, tighter, more
assertive. The old "tracked, not tight" instruction produced loose, weak
headings — inverted below.

- **`Poppins`** — *the navigation voice.* Header wordmark, nav, buttons,
  UI labels, section-name headings. Weights 500 / 600 / 700. On display sizes
  always **700 with tight negative tracking** (`-0.02em` to `-0.03em`), never
  opened up.
- **`Spectral`** (400 / 600 / 700) — *the assertion voice.* A screen-first serif
  (Production Type) with low stroke contrast and a calm, sturdy display cut —
  confident without drama, and deliberately not the high-contrast display serif
  that reads as a template tell. Used in exactly two places: the Home hero
  headline **and** one oversized **Statement** per page (a single claim,
  `display-2xl`, e.g. *"Fewer filings. Stronger claims."*), both at weight 700.
  It does not creep into section headings — that's Poppins's job. Two voices,
  two jobs; the contrast between them *is* the type system.
  *(Was Fraunces through Phase 5b — retired for Spectral; see Migration notes.)*
- **`IBM Plex Sans`** (400 / 500 / 600) — all reading copy. Humanist screen
  sans with drafting heritage. Prose capped ~68ch, `lead` ~46ch.
- **The eyebrow / label voice is Poppins** — not a separate family. Eyebrows,
  jurisdiction / docket codes, figure numbers, stat captions, "Scope" /
  "Process" markers all set `font-display font-medium text-eyebrow uppercase
  tracking-[0.12em]` (Poppins 500, the `eyebrow` size token carries the
  tracking). No monospace anywhere on the site — an earlier `IBM Plex Mono`
  "data voice" was removed (it read as a template tell; see Migration notes).

Load via `next/font/google` (self-hosted, static-safe). CSS vars `--font-display`,
`--font-body`, `--font-hero-serif`; each Tailwind family gets a real fallback
stack with matched metrics (no layout shift on swap). Three families only —
Poppins, IBM Plex Sans, Spectral.

**Type scale** (rem, mobile → desktop clamp):

| Token         | Clamp            | Line-height | Tracking | Use |
|---------------|------------------|-------------|----------|-----|
| `display-2xl` | `3 → 6`          | `0.98`      | `-0.03em`| `SectionHeading` h1 (interior page titles) |
| `display-hero`| `1.75 → 5.5`     | `1.0`       | `-0.03em`| Home hero H1 only — steeper low end so `brandLine` keeps its two authored lines on mobile |
| `display-xl`  | `2.5 → 4.25`     | `1.0`       | `-0.025em`| section names, the figures |
| `display-statement` | `2 → 4.25` | `1.05`     | `-0.02em`| Statement block only — steep ramp (~68px at 1440); short claim holds one centred line on the widened measure, longer sentences take an authored `\n` |
| `display-l`   | `2 → 3`          | `1.05`      | `-0.02em`| sub-headings, service names |
| `lead`        | `1.125 → 1.375`  | `1.4`       | `0`      | supporting sentence under a heading |
| `h3`          | `1.25 → 1.5`     | `1.15`      | `-0.01em`| deliver-item names, column heads |
| `body`        | `1.0625`         | `1.6`       | `0`      | prose |
| `small`       | `0.9375`         | `1.55`     | `0`      | captions, tab labels |
| `eyebrow`     | `0.75`           | `1`         | `0.12em` | Poppins 500 labels (uppercase) |

Every heading gets `text-wrap: balance` (no orphan lines). Every figure, date,
and number gets `font-variant-numeric: tabular-nums`.

### Section header

Just the name and (optionally) a lead sentence. **Nothing above the name, no
rule under it, no mark, no number.** `SectionHeading` is `heading` + `lead`.

- **Section name** is the largest thing in the section — `display-xl` (h2) /
  `display-2xl` (h1) / `display-l` (h3), Poppins 700, tight. A short word
  ("Patents", "Approach") set this big *is* the design.
- Lead is `text-lead text-ink-soft`, capped ~46ch, directly beneath.
- Content follows as its own block (full width — not forced into a column).
- No "01/02" section numbers — tried and removed; they read as templated even
  when framed as "wayfinding". Ordered *process* (patent Process steps) still
  numbers, because there order is real information.
- The old `mark → big name → rule → lead` centre stack is retired.

## Signature elements

**1. The registration mark.** IP work culminates in a *grant* — the moment a
right is recognised. A precise geometric glyph: a fine-line corner-crop framing a
small check / seal-notch. A drawing-sheet registration corner, not a badge.
`components/ui/Mark.tsx`, inline SVG, single source, never rasterised.
- Logo lockup beside "KAP IP" (header) — gradient-filled (the one text-adjacent
  gradient use, and it's a glyph, not type).
- One faint instance behind the footer — the only ambient use.
- **Not** in section headers (it read as debris at small size next to giant
  type) and **not** as a watermark behind content.

No underline / rule under section names, and no number above them — the tight
display type carries the header on its own. (Both an animated "ruled underline"
and a mono `01/02` index were tried and cut — clutter, and the numbers read as
templated.)

**2. Directional CTA glyph.** `Button icon` appends a diagonal arrow in a 4px
outline for the one or two consequential actions per page (header Contact, hero
CTA, media card). Not on every button.

Radius: `4px` max on interactive elements; the hero card is the one `28px`
exception. No pills, no fully-round chips. Corners stay quiet — the mark carries
the identity.

## Layout

- **Container** — `max-w-container` (~1120px), gutters 20px mobile / 40px
  desktop. `Container` enforces it; no ad-hoc widths.
- **Prose is deliberately narrow** — capped ~68ch, never full container width.
  Structured blocks (media grid, figures grid, def-list) use the full width;
  reading copy does not.
- **Vertical rhythm** — `6rem` mobile / `9–10rem` desktop between sections. More
  air than feels comfortable at first; density is the enemy.
- **One full-bleed moment per page** — either the Statement block on a `surface`
  band that bleeds past the container, or a single edge-to-edge hairline. Used
  once, deliberately.
- **Section rhythm** — sections default to `paper` + `border-b border-line`. A
  long page gets **two tonal breaks, non-adjacent**: one `bg-surface` beat and
  one dark `bg-accent-deep` beat (text flipped to `paper` tones). The fill is
  the divider — drop the `border-b` on the section above a tonal change and on
  the tinted/dark section itself; keep hairlines only between two `paper`
  sections. Home → `Stats` (`surface`), `WhyKAP` (`accent-deep`). About →
  `AboutApproach` (`surface`). Hero (`bg-accent`) and footer (`bg-accent-deep`)
  are the framing fills. Same-tone beats never sit adjacent.

### Statement block (new)

Once per page. A single sentence, `display-statement` Spectral, `ink-strong`,
**centred**, generous air around it (`py-16 md:py-24` — a distinct beat, not the
oversized well it used to be), optionally on the full-bleed `surface` band. It is
the editorial pull-quote — it interrupts the scroll and states the firm's
position in its own voice. Home: a claim about the work. About: the mission line.
Service pages: the `precise` one-liner.

A two-part claim may take `dimLead` (Home: "Fewer filings. Stronger claims.") —
the first sentence drops to `ink-soft` so the payoff sentence carries the weight.
Stays on **one line** (word split, no `\n`); one tonal step only, the rest stays
`ink-strong`.

Centre-aligned is the one deliberate exception to the site's left-set headings —
it reads as a pull-quote, not a section head. The measure is widened to
`max-w-[82rem]` (past the 1120 container) and the type ramp is steep (~68px at
1440) so a **short** claim ("Fewer filings. Stronger claims.") holds one line on
desktop at a real display size. A longer sentence carries an **authored `\n`**
(`Statement` detects it and switches `RevealText` to `split="line"`), so it
clip-rises as two balanced lines rather than wrapping unevenly. Below ~900px
viewport, and on mobile, a short claim may take two lines — acceptable.

### Home hero — type-first

`bg-accent` card, `rounded-hero` (28px), flush under the header, small fixed side
gutter (not `Container`). **Type dominates:** `site.brandLine` set in Spectral at
`display-hero`, `paper`, tight, as **two authored lines** (split on `\n` in the
data) — and never more than two: the column width is tuned to hold them, don't
narrow it. The headline column runs near-full width (`md:w-[94%] lg:w-[90%]`)
and is allowed to overlap the left edge of the photo. The right side carries a
lightly-tinted (`bg-accent-deep/30`), **discipline-neutral** photo in the right
~46% with a left-edge scrim (`w-[52%]`, `from-accent via-accent/70`) so the
overlap zone still reads as panel — never a full-bleed photo, and never a
life-sciences motif (DNA / molecule / protein):
the hero is the one spot the whole site would read as bio-only. Subject is
abstract structure or a precision object — see `docs/IMAGE-PROMPTS.md § 1`.
`object-position` is biased right (`object-[58%_50%]`) so the denser part of the
image sits inside the visible panel rather than cropped off.

Below the headline, one moderate gap (`mt-10 lg:mt-14`), then the `lead`
sentence (`site.tagline`) + CTA as **one tight left-set unit** (`gap-7`,
`max-w-[34rem]` holds the tagline to ~2 lines — widen the measure, never edit
the shared string). Primary CTA inverted to a `paper` button. The group stays
together on purpose: a type-first hero is legitimately left-weighted, and
scattering the elements to force symmetry just reads as unorganised. The
counterweight is the imagery — hence the light `/30` tint (see above), not a
flung CTA. No hairline rule, no carousel, no floating card, no browser-frame
wrapper.

The H1's two authored lines **clip-rise** on load (and on client-nav remount) —
CSS-only (`.hero-headline-line`, `@keyframes hero-line-rise`), a short base
delay so the PageIntro overlay clears first, static under
`prefers-reduced-motion`. The type is in the DOM and painted throughout; the
animation only transforms it, so the hero is still a static server component
that paints instantly. This is the hero's share of the sitewide text reveal
(§ Motion) — the one entrance it's allowed.

One subordinate accent, under the type and never competing with it: an
**ambient edge glow** in two parts (both in `globals.css`), reduced-motion-safe.

- `.hero-glow` — the **running shimmer**. A rim masked to a ~4px border ring: a
  constant near-`paper` hairline outline plus one bright arc with a **pure-white
  hotspot core** and only thin cool/warm fringes (a light running the edge, not
  a chromatic sweep — the earlier pale brand-ramp version read as invisible on
  the card). Rounds the perimeter on a ~7s loop (a rotating `conic-gradient` via
  `@property --hero-glow-angle`); a `-138deg` offset parks the arc at the
  top-left corner at `t=0` so it's in view on first paint. The animated band is
  a thin masked ring, so per-frame repaint is negligible; under
  `prefers-reduced-motion` the arc is dropped and only the hairline stays.
- `.hero-glow-bloom` — a **static** soft `box-shadow` on the card in teal→green
  (hues near the card's own, so it reads as the card glowing, not a foreign
  colour), blooming a few px onto the `paper` page. Static → zero per-frame
  cost; it carries the "glow" while the rim carries the motion. It and the rim
  together are the hero's one brand-ramp moment (see § Brand ramp).

### Section blocks — ruled, not carded

Content composes as `SectionHeading` + a hairline-ruled block. Never a grid of
bordered cards (cards read as templated SaaS).

- **By the numbers** (`Stats.tsx`) — a hairline grid of figures: `border` on the
  wrapper, `border-b border-r` per cell, no per-tile fill. Figure in
  `display-xl` `accent`, tabular; caption in the `text-eyebrow` label style. Each
  figure **counts up once** on scroll-into-view (`useCountUp`; reduced motion →
  final value immediately). Sits directly under the hero on Home — proof first —
  on a `bg-surface` fill (the page's `surface` beat).
- **Why KAP** (`WhyKAP.tsx`) — the Home page's one dark beat: a nocturne panel
  (`bg-accent-deep`) between the dark hero card and the dark footer. Two columns
  on `md+`: the three points as a ruled list (term `display-l` Poppins 700,
  description `body` below it) on the left, one tall `rounded-media` supporting
  image (3:4, nocturne) on the right. Type and rules flip to `paper` tones
  (`SectionHeading tone="onDark"`, rules `border-paper/15`). Cuts the text
  density and gives the section a visual anchor. Image hidden below `md`.
- **Expertise** (`AboutExpertise.tsx`) — practice areas as two ruled indexes,
  asymmetric split, each item a hairline-divided row. No chips. (`Badge` removed.)
- **Talk to us** (`TalkToUs.tsx`) — Home CTA band: a single `rounded-media` image
  panel, kept short (`min-h` ~260/300px) — heading + one line of copy on the
  **left**, a lone inverted `bg-paper` CTA on the **right**, vertically centred
  over a left-anchored `ink-strong` scrim. Stacks on mobile. The on-image idiom
  of `MediaCard` + the hero CTA, not the shared `CTA`'s ruled row. One primary
  CTA only, no overlapping card, no checklist.

### Home services media grid

The "What we do" section is a **2×2 grid of image cards** (`MediaCard`), one per
service. Each card: a full-bleed laboratory-nocturne image, `rounded-media`
(14px — a deliberate exception to the 4px cap, between it and the 28px hero), the
service **name** in a solid `ink-strong` tag bottom-left, and a filled circular
**arrow button** bottom-right (`ink-strong` → `accent` on hover). The
`summary` is hidden by default and **fades up on hover / focus** over a
deepening bottom scrim — name only at rest, name + line on interaction.

- **The whole card is the link** to `/services/[slug]`; the arrow is a visual
  affordance, not a separate target.
- No auto-advance, no carousel — all four are visible at once. The image lifts
  ~4% on hover (`motion-reduce` disables it); the scrim + subtitle reveal is a
  300ms fade, hover-safe under reduced motion.
- 1-up below `sm`, 2-up above.
- Radius exceptions this introduces: `rounded-media` on the card, and
  `rounded-full` on the name tag + arrow button (an icon button and an
  image-overlay tag — the "no pills" rule holds for standalone UI chips, not
  these two on-image elements).
- `ServiceCard` (the ruled text card) survives only on the `/services` hub — a
  plain 2-up directory, "a directory, not an essay".
- Images: `public/images/services/<slug>.<ext>` — dark placeholders now
  (`npm run placeholders`), real set per `docs/IMAGE-PROMPTS.md § P2`.

### Sub-service explorer

Services with >1 sub-service use a sticky sidebar + scrollspy
(`ScrollspyExplorer.tsx`, generic; wrapped by `SubServiceExplorer.tsx`). All
sub-services stacked in one scroll column; a sticky nav (`border-l-2` accent
tick on the active item) alongside. Scrolling updates the tick
(`IntersectionObserver`); clicking a nav item is an **instant jump**
(`scrollIntoView({ behavior: "auto" })`), never smooth-scrolled. Each section:
eyebrow + mark + name, plain intro, "what we deliver" items (name + full
paragraph each), optional Scope, Process (numbered, only if present). Mobile: nav
becomes a sticky horizontal-scroll row above the content.

### Header

Slim, `paper`, hairline bottom rule on scroll. Mark + wordmark left; plain-text
nav (Home / About / Services) right; Contact lifted out into a filled `accent`
`Button` with the directional glyph — one weighted action, not four equal links.
Mobile: mark + wordmark + hamburger; sheet groups Services and repeats the
Contact button at the bottom.

### Footer

The one dark surface — `bg-accent-deep`, text flipped to `paper` tones. Three
columns: brand (mark + name + tagline + LinkedIn/Twitter/WhatsApp icons),
contact (each item an eyebrow label over its value), nav repeat. Quiet
bottom bar (`border-t border-paper/15`) with copyright + "Developed by
{site.developer}". The one faint ambient mark sits bottom-right, light-on-dark.

### ASCII wireframe — service page (core template)

```
┌──────────────────────────────────────────────┐
│ ◹ KAP IP                    Home About  ▸ [Contact] │  slim header
├──────────────────────────────────────────────┤
│ PATENTS                                       │  name huge (display-2xl)
│ Global patent protection, drafted precisely.  │  lead
│ [ plainIntro, ~68ch ]                          │
├──────────────────────────────────────────────┤
│ Fewer filings.                                │  ← Statement block
│ Stronger claims.                              │     display-2xl Spectral
├──────────────────────────────────────────────┤
│ Search & Analytics │ SEARCH & ANALYTICS        │  scrollspy: sticky nav L,
│▎Drafting           │ [ plainIntro ]            │  content scrolls through
│ Global Filing …    │ Patentability Search      │  all sub-services in order
│ …                  │ [ full paragraph ]        │
├──────────────────────────────────────────────┤
│ [ CTA band → Contact ]                         │
├──────────────────────────────────────────────┤
│ footer (dark): contact · nav · faint mark      │
└──────────────────────────────────────────────┘
```

Services with no sub-services skip the scrollspy — intro + Statement + CTA.

## Imagery — laboratory nocturne

**Direction.** One art-directed set, never stock science or wallpaper. One
subject per image, photographed in near-darkness under a single deep green-teal
light, strictly monochromatic (`ink` / `accent` / dim silver), vast negative
space. A science-journal cover, not a clip-art molecule. Full per-slot prompts
live in **`docs/IMAGE-PROMPTS.md`** — that file is the source of truth for what
gets generated.

**Discipline-neutral by default.** KAP's primary practice is life sciences, but
the site must not *look* life-sciences-only (client feedback on the old DNA
hero). So the hero and everything above the fold use neutral subjects — abstract
structure, precision instruments, pure form. Molecule / DNA / cell motifs appear
in exactly **one** place: the `life-sciences` tile of the domain strip, where
they name a field on purpose. Non-life-sciences service pages use neutral /
mechanical motifs.

**Breadth is shown, not implied.** With the hero neutral, the uniform **domain
strip** (life-sciences · chemistry · electrical · mechanical · AI, same nocturne
photo treatment) near the top of the site is what carries "we work across
fields" — it's in scope, not optional. The ruled domains index backs it up in
text.

There is **one image treatment** — the nocturne photo. (An earlier `paper`-side
line-art treatment is retired.)

**Photography of people** (when real): editorial, desaturated near-monochrome
with a faint green-teal cast, plain dark background, single-source light — never
handshakes, never smiling-team stock, never a white studio sweep.

**Format** — inline SVG for the mark only (tiny, scales clean); compressed
WebP/AVIF for photos; every image space reserved to prevent shift; below-fold
lazy. Mobile-first — no asset justifies a perf hit on a slow network.

**Current state** — placeholder PNGs stand in (`npm run placeholders`,
`npm run placeholder-team`), keeping real file paths / aspect ratios so the swap
is mechanical.

## Motion (`lib/motion.ts`)

Composed, not animated. One choreographed moment per page; everything else is a
whisper. All of it gated by `useSafeReducedMotion` (`useSyncExternalStore`-based,
no hydration mismatch).

- **Section reveal** — `opacity 0→1`, `y 24px→0`, `0.55s`, `easeOut`, `once`,
  fires when the element is ~12% into the viewport. `motion.section` with
  `initial="hidden" whileInView="visible" variants={getSectionReveal(...)}`,
  everywhere. Under `prefers-reduced-motion` it degrades to an **opacity-only
  fade** (no `y`) — arrival without movement. **Gotcha (fixed):**
- **Text reveal** — the one choreographed *type* moment per screen. Words (or
  authored lines) **clip-rise** from behind their own baseline inside an
  `overflow-hidden` wrapper: `y 120%→0`, `0.5s`, stagger `0.06s`,
  transform-only. Scoped to **`SectionHeading`'s name, the per-page
  `Statement`, and `PageBanner`'s interior-page title** (Contact, IP Blogs —
  `split="line"`, so the short title rises as one unit) — sub-heads, leads and
  body stay on the plain section/stagger fade, so the reveal stays a signature,
  not a tic. `RevealText`
  (`getTextRevealContainer` / `getTextRevealPiece`); the tag keeps `aria-label`
  and the pieces are `aria-hidden`. Deliberately vertical — never the retired
  horizontal curtain-wipe. Under `prefers-reduced-motion` it collapses to one
  opacity fade of the whole heading. The **Home hero H1** does the same move
  but **CSS-only** (`.hero-headline-line`, `@keyframes hero-line-rise`) so the
  hero stays a static server component that paints instantly.
  `PageTransition`'s `<AnimatePresence initial={false}>` propagated
  `PresenceContext.initial = false` into every nested `motion` and silently
  killed all these reveals; the page body is now wrapped in
  `<PresenceContext.Provider value={null}>`. If reveals ever go dead again,
  check that wrapper first.
- **Services media grid** — hover reveals the `summary` over a deepening scrim;
  the image lifts ~4%. Static grid, nothing auto-advances (see Layout).
- **Hover — on everything interactive.** Links: a colour shift to `accent` (an
  optional underline may wipe in, but no rule under section headings). Cards /
  rows / index items: `line→accent` border + `1px` lift + text to `ink`; media
  cards deepen their scrim and reveal the subtitle. `cursor-pointer` on every
  clickable. No scale-bounce, no shadow bloom, no custom cursors.
- **Reveal values** — `y 24→0`, opacity `0→1`, `0.55s`, `easeOut`, `once`;
  stagger `0.1s`. Under `prefers-reduced-motion` the reveal becomes an
  **opacity-only fade** (no `y`) — motion-sensitive users still see content
  arrive, they just don't see it move. The figures count-up and any parallax
  are the only things fully suppressed.
- **Stagger** — grids of ≤ 4 stagger children at `0.1s`.
- **Retired:** the scroll-linked per-heading colour-wipe; the hero curtain-wipe
  (`getWipeReveal` / `Reveal.tsx` — hero uses the standard staggered load
  reveal now).

**Guardrails** — no video backgrounds, no scroll-jacking (native scroll stays
native), below-fold imagery lazy, the perf budget in the Quality floor is
non-negotiable. Motion serves clarity — draws the eye to the one decisive move —
never spectacle.

## Quality & craft floor (build to it, don't announce it)

- Responsive to 360px. No horizontal scroll on the body; wide content scrolls in
  its own container.
- Visible keyboard focus — `accent`, 2px, offset 2px — on every interactive
  element. Never removed.
- `prefers-reduced-motion` fully respected — reveals render final, scrub renders
  final, hover (not motion-sickness-triggering) stays.
- Contrast: `ink`/`ink-strong` on `paper` clears AA comfortably; `ink-soft` on
  `paper` clears AA for body; `accent` on `paper` clears AA.
- Tap targets ≥ 44px. Touch feedback within 100ms.
- One hairline weight (`line`, 1px) sitewide — never mix border weights.
- `text-wrap: balance` on headings; tabular numerals on all figures/dates;
  widow/orphan control on lead paragraphs.
- Zero layout shift — reserve every image box; matched fallback font metrics.
- Optical alignment: the mark centres on adjacent cap-height, not bounding box.

## Token → Tailwind mapping

`tailwind.config.ts` extends:
- `colors` — the functional table above (incl. `ink-strong`, `accent-wash`). The
  brand ramp stays documentation-only until `Mark` needs it.
- `fontFamily` — `display` / `body` / `serif` → CSS vars, each with a real
  fallback stack. (No `mono` — the eyebrow/label voice is `display`.)
- `fontSize` — the scale table above: `display-2xl`, `display-hero`, `display-xl`,
  `display-l`, `lead`, `h3`, `body`, `small`, `eyebrow`, each with its
  line-height + tracking.
  (`h2` token retired — section names use `display-xl`, sub-heads `display-l`.)
- `maxWidth.container`, `borderRadius.card: 4px`, `borderRadius.hero: 28px`.

No component references a colour or size not defined here.

## Migration notes — where code is behind this doc

**Phase 1 ✅** — tokens: `display-2xl`, `ink-strong`, `accent-wash`; display
tracking/line-height retuned; `text-wrap: balance` on `h1–h3`.

**Phase 2 ✅** — gradient headings killed: `--brand-gradient-text*` deleted,
`ScrollColorHeading` deleted, every heading flat (`ink-strong` for display
scale, `ink` for sub-heads); `Rule` deleted (unused after the underline was
cut); palette refreshed (`paper` `#FCFBFA`, `surface` `#F4F3F1`, `line`
`#DBD9D3`) away from the beige cast.

**Phase 3 ✅** — `SectionHeading` is now just `heading` + `lead`: name →
`display-xl` (h2) / `display-2xl` (h1) / `display-l` (h3), Poppins 700; **mark
removed** (kept in header logo + footer); no underline; **no `01/02` index** (it
was added then removed — read as templated). `h2` token retired; `text-h2` →
`display-l` / `display-xl` (AboutApproach values, PageBanner).
`SubServiceExplorer` names dropped to `h3` size.

**Phase 3b ✅ — "What we do" media grid.** Folder stack replaced by a
**pinwheel** `MediaCard` grid — all cards the same (reduced) height, but a
narrow / wide / wide / narrow column rhythm (`sm:grid-cols-5`, col-spans
2/3/3/2). Each card: image + `paper` name pill + circular arrow button +
hover-reveal subtitle. `FolderStack.tsx` + `NodeExplorer.tsx` deleted.
`borderRadius.media: 14px` added. Placeholders generated; real set pending
(`IMAGE-PROMPTS.md § P2`).

**Phase 4 ✅ (Home + About) — Statement, Stats, Hero.**
- `Stats` ✅ — figures at `display-xl`, `useCountUp` restored; section moved
  **above** AboutPreview on Home (proof first).
- `Statement` ✅ — `components/ui/Statement.tsx`, Fraunces `display-2xl`,
  `banded` opt-in surface. On Home (after WhyKAP, paper) + About (after
  Approach). DUMMY copy — swap for real one-liners. **Service pages: not yet**
  (need a short per-service line).
- Hero ✅ — type-first: `brandLine` in Fraunces `display-xl`→`display-2xl`,
  photo → right 35% desktop / short strip mobile, tagline `text-lead
  text-paper/75` (was `paper/30`, invisible), one `--brand-gradient` hairline.
  `getWipeReveal` + `Reveal.tsx` deleted. **No entrance animation** — plain
  server component, paints instantly (SSR-safe for slow networks); PageIntro is
  the load moment.

**Phase 5 ✅ (mechanism) — Motion.**
- **The scroll-reveal was dead site-wide** — `PageTransition`'s
  `<AnimatePresence initial={false}>` suppressed `initial="hidden"` on every
  nested `motion` via `PresenceContext`. Fixed by wrapping the page body in
  `<PresenceContext.Provider value={null}>`. Reveals now fire (verified by
  computed-opacity diff).
- Values: `getSectionReveal` `y:24 / 0.55s`; reduced-motion → opacity-only fade;
  `getStaggerContainer` `0.1`. `useCountUp` restored. `getWipeReveal` removed.
- **Remaining:** hover audit (`line→accent` + lift on cards/rows/media,
  `cursor-pointer` everywhere); the pinned hero scrub is dropped (hero is static
  now).
- `WhyKAP` gained a supporting image column (§ Section blocks) — less text.

**Phase 5b ✅ — Home tonal breaks + hero sheen.**
- `Stats` → `bg-surface` (the page's `surface` beat); `WhyKAP` → `bg-accent-deep`
  nocturne panel, type/rules flipped to `paper` tones via new
  `SectionHeading tone="onDark"`. `ServicesOverview` drops its `border-b` (the
  paper→dark change is the divider). Rhythm: hero-card → surface → paper → paper
  → dark → paper → paper → footer.
- Hero `.hero-glow` — CSS-only ambient edge glow: masked ~3px ring, a constant
  near-`paper` hairline + a bright chromatic arc (short brand-ramp sweep, lifted
  toward `paper` with a near-white hotspot core) rotating the perimeter (~7s
  `conic-gradient` via `@property`); a `-138deg` offset parks it at the top-left
  corner at `t=0` so the sweep shows on first paint. Under reduced motion the arc
  drops and only the hairline stays. Hero stays a server component. (Replaced the
  earlier monochrome `.hero-sheen` — it read as invisible against the card.)
- `SectionHeading` size/tone classes moved off `cn`/`tailwind-merge` onto plain
  `clsx` — twMerge doesn't know the custom `display-*` / `ink-*` tokens and was
  collapsing `text-display-xl` + `text-ink-strong`, dropping the font size.

**Phase 5c ✅ — text reveal.** `RevealText` (`components/ui/RevealText.tsx`) +
`getTextRevealContainer` / `getTextRevealPiece` (`lib/motion.ts`): word-level
clip-rise (`y 120%→0`, `0.5s`, stagger `0.06s`, transform-only) wired into
`SectionHeading`'s name and `Statement` (its child is now a `string`). The Home
hero H1 gets the same move **CSS-only** (`.hero-headline-line` /
`@keyframes hero-line-rise` in `globals.css`) so the hero stays a static server
component. Reduced motion → one opacity fade of the heading / static hero.
Sub-heads (`h3`), leads, body and eyebrows are deliberately left on the plain
section/stagger fade.

**Phase 5d ✅ — Contact / Blogs motion parity.** These two pages take their title
from `PageBanner`, not `SectionHeading`, so they'd been sitting outside the text
reveal. `PageBanner`'s title now runs through `RevealText` (`split="line"`);
`PageBanner` stays a server component (the `RevealText` client leaf, same as
`SectionHeading`). On Contact, the detail column (`ContactBlock`) and the form
fields (`ContactForm` — previously motionless) now stagger in via
`getStaggerContainer` + `getSectionReveal` children, subordinate to the banner
reveal. Known: on a hard load the banner sits under the ~1.15s PageIntro overlay,
so its reveal is only seen on client-side navigation into the page.

**Phase 5e ✅ — hero rebalance.** The composition read left-heavy with a dead
green void on the right: the photo was boxed to 35%, tinted `/55`, and scrim'd
across 60% of that box, so only a ~12% sliver of cropped image showed. Fixes:
photo → right ~46%, tint → `/30`, scrim → `w-[52%]` `via-accent/70`,
`object-position` biased right (`object-[58%_50%]`) so the node cluster lands in
the panel. The tagline moved to `max-w-[34rem]` (3 lines → 2 — measure only,
`site.tagline` is shared with `<meta>` + footer). Tagline + CTA stay **one tight
left-set unit** (`mt-10 lg:mt-14` below the headline, `gap-7` within): a brief
experiment flinging the CTA to the bottom-right corner (`md:justify-end`) read
as three disconnected fragments — reverted. Left-weight is inherent to a
type-first hero; the lighter image tint is the counterweight. The static
`--brand-gradient` hairline under the tagline was **removed** — at 1px on the
card it never read, and the brand ramp is now scoped to the mark + the hero
glow only. Headline column width unchanged (`lg:w-[90%]`) — it must stay 2
lines.

**Phase 5f ✅ — hero glow intensity.** The `.hero-glow` rim still read as
near-invisible (a pale brand-ramp arc on a mid-dark card = pure luminance
contrast). Reworked to a **white hotspot** rim (4px ring, thin cool/warm
fringes only, brighter `/0.3` constant hairline) plus a new `.hero-glow-bloom`
— a static teal→green `box-shadow` on the card blooming onto the `paper` page.
The rim carries the motion, the bloom carries the "glow"; the bloom is static
so it adds no per-frame cost (India / low-end target). `prefers-reduced-motion`
still drops the rim arc; the bloom (not motion) stays.

**Phase 6 — Imagery + craft.** Swap placeholders for the laboratory-nocturne set
(`docs/IMAGE-PROMPTS.md`) as the user supplies files; wire service-page +
domain-strip motifs; ambient `Mark` footer-only; `tabular-nums` on all
figures/dates; drop-caps via `::first-letter`; widow control; final `lint` +
build.

## Changelog

- Space Grotesk + Newsreader → all-sans → Poppins + Inter → Poppins (nav) +
  Fraunces (assertion) + IBM Plex Sans (body) + IBM Plex Mono (data) →
  **Fraunces → Spectral for the assertion voice** (hero H1 + Statement); the
  `opsz`/`SOFT`/`WONK` variable-axis dial is gone (Spectral has named weights,
  700 for both).
- **IBM Plex Mono removed entirely** — no monospace on the site. The eyebrow /
  label voice is now Poppins 500 (`font-display font-medium text-eyebrow
  uppercase tracking-[0.12em]`). Three families: Poppins, IBM Plex Sans, Spectral.
- Hero H1 → own `display-hero` ramp + two authored lines (`\n` in `brandLine`) +
  near-full-width column overlapping the photo, so the headline holds 2 lines at
  full size instead of wrapping to 4.
- Statement block → own `display-statement` ramp + centred + widened
  `max-w-[82rem]` measure, so a short claim holds one line at a real display
  size (~68px at 1440); long sentences take an authored `\n` (→ `RevealText
  split="line"`).
- Corner-node "what we do" explorer → folder stack → **2×2 media-card grid**.
- Stat tiles → **ruled figures grid** (then count-up removed).
- Chip clouds → **ruled indexes**.
- Gradient heading text + scroll colour-wipe → **flat headings**, no rule under
  them.
- Warm-beige `surface`/`paper` → cleaner near-neutral palette.
- "Quiet restraint" → **precision as confidence**; big tight display headings;
  one Statement per page.
- DNA hero + optional `paper`-side line-art treatment → **discipline-neutral
  nocturne photos**, one treatment only; molecule/DNA confined to the
  `life-sciences` domain tile; domain strip promoted to in-scope to carry breadth
  (client: the hero read as life-sciences-only).
