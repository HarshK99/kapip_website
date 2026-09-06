# IMAGE-PROMPTS.md — KAP IP

Generation prompts for every image slot on the site. Generate, drop the file at
the exact path below (same name, same extension), and `npm run build` compresses
it automatically (`scripts/optimize-images.mjs`). No component `src` changes
needed.

---

## House style — paste into every prompt

> **Style:** laboratory nocturne. A single scientific subject photographed in a
> dark room lit by one deep teal-green gel light. Near-black background bleeding
> to deep green-teal shadow. Shallow depth of field, fine 35mm grain, cinematic,
> editorial — a science-journal cover, not a stock photo. Vast empty negative
> space. Strictly monochromatic: only near-black `#14171A`, deep green-teal
> `#0E5C4A`, and dim brushed-silver highlights. Calm, exact, expensive.
>
> **Never:** text, letters, numbers, labels, callouts, UI, watermarks, logos,
> people, hands, rainbow / neon / candy colours, multicolour DNA, clip-art, 3D
> render that looks plastic, lens flare, scattered bokeh confetti, tilt-shift
> toys, busy compositions.

**Palette (for reference / colour-grading):**
`ink #14171A` · `ink-strong #0A0C0E` · `accent #0E5C4A` · `accent-deep #0A3F33`
· `paper #FCFBFA` · `line #DBD9D3`

**Aspect / crop:** generate a little larger than the target and at the target
aspect ratio. Keep the subject inside the "safe area" noted per slot — the rest
gets tinted or covered by text.

**Breadth over bio — read this before every prompt.** KAP's primary practice is
life sciences, but the site must not *look* life-sciences-only (client feedback:
the old DNA hero "shouts" bio). So:
- The **hero** and **everything above the fold** use **discipline-neutral**
  subjects — abstract structure, precision instruments, pure geometric form.
  Never DNA, protein, molecular models, cells.
- **Molecule / DNA / cell motifs appear in exactly one place:** the
  `life-sciences` tile of the domains strip (§ P3), where they're *supposed* to
  name a field. Nowhere else.
- Every other slot leans **neutral or mixed** (mechanical, geometric, optical,
  material, textural) — no single slot should read as one discipline.

There is **one image treatment**: the laboratory-nocturne photo below. (An
earlier "Variant B" line-art treatment is retired — do not generate line art.)

---

## Priority 1 — live slots (the site uses these today)

### 1. Home hero background
- **Path:** `public/images/hero/hero-bg.png` (also regenerate `.webp` or let the build make it)
- **Size:** 1920 × 1440 (4:3), landscape
- **Placement:** shows only on the **right ~38%** of a deep-green hero panel, heavily tinted, with a left-edge fade into solid colour. Mobile: a short full-width strip under the headline.
- **Safe area:** keep the subject in the **right two-thirds**; left third can be pure dark falloff.
- **Discipline-neutral — pick one of two.** Generate both, decide on the page.
  - **Prompt A — abstract lattice:** `A three-dimensional lattice of fine points and thin connecting lines — like a structural model or a constellation — rising through darkness. Deep teal-green light rakes across it from the right; the structure dissolves into pure black toward the left edge. Extreme shallow focus: one node crisp, everything else soft. Right-heavy composition, the left half almost pure black. [House style]`
  - **Prompt B — near-abstract light:** `Almost nothing — a single raking blade of deep teal-green light crossing a dark textured surface (brushed metal, or fine grain) at a low angle. Most of the frame falls to pure black. No identifiable object: only light, texture, depth. Right-heavy composition, the left half pure black. [House style]`
- **Negative (both):** `text, colour, people, DNA, double helix, molecule, protein, cell, gears, circuit board, bright blue, neon, clip-art`

### 2. About section motif
- **Path:** `public/images/about-section.png`
- **Size:** 1200 × 1600 (3:4), portrait
- **Placement:** inside a bordered card on a light page, beside body copy. A dark "plate".
- **Safe area:** subject centred, vertical flow top-to-bottom.
- **Prompt:** `A single precision object — a machined geometric solid, a lens element, or a sculptural form — photographed like a museum specimen under one teal-green light, near-black surround. Elegant, still, field-agnostic. Fine grain, shallow depth of field, vertical flow top-to-bottom. [House style]`
- **Negative:** `text, colour, cartoon, glossy plastic render, DNA, protein, molecule`

### 3. Talk-to-us band
- **Path:** `public/images/talk-to-us/talk-to-us-bg.svg` → replace with `talk-to-us-bg.webp` *(tell me and I'll switch the `src` extension)*
- **Size:** 2400 × 800 (3:1), wide letterbox
- **Placement:** a full-width strip above a ruled CTA row. Fully visible, gets a soft dark gradient from the bottom.
- **Safe area:** horizontal composition, subject can drift left or right of centre, lots of headroom.
- **Prompt:** `A wide, quiet field of fine geometric structure — a lattice or grid of nodes and struts — receding into fog and darkness, a few points catching deep teal-green light, most lost to black. Calm, deep, atmospheric — like looking across a dark workshop at night. Strong horizontal negative space. [House style]`
- **Negative:** `text, colour, busy, crowded, bright, molecule, DNA, cell`

### 4. Interior page banner (Contact today; reusable)
- **Path:** `public/images/page-banner.png`
- **Size:** 2400 × 900 (8:3), wide
- **Placement:** short banner, a heavy near-black→transparent gradient covers the lower half for the title.
- **Safe area:** put interest in the **top half**; lower half will be dark.
- **Prompt:** `A fragment of a fine engraved grid or ruled measuring scale etched into dark brushed metal, shot at a raking angle so the lines catch a thin teal-green highlight and fall into shadow. Precise, industrial, abstract — no readable symbols. Top-weighted composition. [House style]`
- **Negative:** `readable letters or numbers, periodic table, colour, glow, sci-fi UI`

### 4b. "Why KAP" supporting image
- **Path:** `public/images/why-kap.svg` → replace with `why-kap.webp`
- **Size:** 900 × 1200 (3:4), portrait
- **Placement:** a tall image beside the three "why us" points (right column, `md+`; hidden on mobile).
- **Prompt:** `A single precision instrument — a machinist's caliper, or a lens element, or a ruled measuring edge — lit from one side with deep teal-green, most of it falling into black. Exactness as an object. Vertical composition, the instrument reading top-to-bottom. [House style]`
- **Negative:** `text, colour, hands, cartoon, cluttered`

### 5. Founder / team portrait *(placeholder until a real photo)*
- **Path:** `public/images/team/founder.png`
- **Size:** 900 × 900 (1:1)
- **Placement:** small rounded portrait on the About page Leadership card.
- **Prompt:** `Editorial headshot of a professional in their 40s, three-quarter turn, calm neutral expression, plain deep-charcoal background, soft single-source light, desaturated near-monochrome grade with a faint green-teal cast. Shoulders-up, sharp eyes, magazine-quality. No smile-for-the-camera.`
- **Negative:** `stock-photo smile, white background, harsh flash, busy background, teeth, thumbs-up`
- *(Swap for the real founder photo when it arrives — same crop, same grade.)*

---

## Priority 2 — service cards (the Home "What we do" grid — **live**)

Generate all four at **1600 × 900 (16:9)**, landscape. Paths:
`public/images/services/patents.webp`, `.../trademarks.webp`,
`.../copyrights.webp`, `.../designs.webp` (dark SVG placeholders sit there now;
drop the real files and tell me if the extension isn't `.webp` so I fix the
`src`).

**Card treatment:** full-bleed, `object-cover`, inside a 14px-rounded card, all
cards the **same height** (~256px). The grid is a **pinwheel** — Patents and
Designs sit in **narrow** slots (their sides get cropped), Trademarks and
Copyrights in **wide** slots. So for every image: **subject dead-centre
horizontally, fairly compact (not spread wide), in the upper two-thirds** — the
bottom third goes dark under a name pill (bottom-left) + circular arrow button
(bottom-right). The four must read as a **set**: identical distance, light
angle, and grade. A dark subject on a slightly lighter dark ground works best
(cards butt against each other).

- **Patents** — `An exploded technical assembly — gears, a lattice, a fine coil — floating apart in dark space, one teal-green light picking out the edges. Precision engineering as still life. [House style]`
- **Trademarks** — `A cluster of abstract geometric marks — a circle, a bracket, a notch — machined from dark metal, one catching teal-green light. Identity reduced to pure form. [House style]`
- **Copyrights** — `Layered translucent sheets — like pages, or a waveform, or lines of a score — stacked and lit edge-on with deep teal-green, receding into black. Creative work as strata. [House style]`
- **Designs** — `The silhouette of a single well-formed industrial object (undefined, sculptural) turning in darkness, its contour traced by a thin teal-green highlight. Form and ornament, nothing else. [House style]`
- **Negative (all):** `text, colour, brand logos, literal light bulb, literal copyright symbol`

---

## Priority 3 — domain / breadth strip (IN SCOPE — this is what carries "not bio-only")

With the hero now discipline-neutral, **this strip does the work of showing
breadth** near the top of the site. Small, uniform: **800 × 800 (1:1)**,
`public/images/domains/<name>.png`. Same nocturne photo treatment as everything
else — keep framing, distance, light angle and grade **identical** across all
five so they read as one set. The `life-sciences` tile is the one sanctioned
place a molecule/cell motif appears.

- `life-sciences` — `a single cell mid-division, one teal-green light, near-black surround`
- `chemistry` — `three molecular bonds meeting at a node, teal-green light on black`
- `electrical` — `a few clean circuit traces converging on one contact, teal-green light on black`
- `mechanical` — `two interlocking gear teeth, teal-green light on black`
- `ai` — `a small sparse node graph, three connections lit, teal-green light on black`
- **All:** `[House style]`, subject centred, identical margin and shallow focus, no text.

---

## Priority 4 — Statement-block texture (optional)

- **Path:** `public/images/texture/structure-field.webp`
- **Size:** 2800 × 1200, very wide
- **Placement:** ultra-faint, behind one oversized quote per page, at ~6% opacity.
- **Prompt:** `An almost-invisible wash of fine geometric structure — lattice, grid, or grain — barely emerging from near-black, no focal point, pure texture. [House style]`
- **Negative:** `contrast, detail, focal point, colour, molecule, DNA`

---

## After generating

1. Drop each file at its exact path (create `public/images/domains/` and
   `public/images/texture/` if used).
2. `npm run build` runs `optimize-images.mjs` — it backs up the original to
   `image-backups/` once, then compresses. Don't pre-compress.
3. Anything that changes extension (`.svg` → `.webp`): flag it here and the
   component `src` gets updated.
