# KAP IP image generation log

- Source: `IMAGE-PROMPTS.md`
- Generated: 2026-09-06
- Workflow: built-in image generation, followed by aspect-preserving centre crop/resize to the requested dimensions. PNG outputs were saved as PNG; WebP outputs were converted losslessly from the generated PNG sources.
- Prompt handling: every entry prompt below was passed verbatim. The exact house-style block, the entry's negative prompt, and its stated placement/safe-area/dimension instructions were appended where applicable.
- Original source Markdown: unchanged.

## Generation records

### 1. Home hero background — Prompt A: abstract lattice

- Output: `public/images/hero/hero-bg-a.png`
- Prompt/variant: `A three-dimensional lattice of fine points and thin connecting lines — like a structural model or a constellation — rising through darkness. Deep teal-green light rakes across it from the right; the structure dissolves into pure black toward the left edge. Extreme shallow focus: one node crisp, everything else soft. Right-heavy composition, the left half almost pure black. [House style]`
- Status: generated; saved as PNG at 1920 × 1440.
- Limitation/deviation: the source entry gives one output filename for two variants. A variant suffix was added to avoid overwriting.

### 1. Home hero background — Prompt B: near-abstract light

- Output: `public/images/hero/hero-bg-b.png`
- Prompt/variant: `Almost nothing — a single raking blade of deep teal-green light crossing a dark textured surface (brushed metal, or fine grain) at a low angle. Most of the frame falls to pure black. No identifiable object: only light, texture, depth. Right-heavy composition, the left half pure black. [House style]`
- Status: generated; saved as PNG at 1920 × 1440.
- Limitation/deviation: the source entry gives one output filename for two variants. A variant suffix was added to avoid overwriting. The optional hero WebP was not created because the source says the build may create it.

### 2. About section motif

- Output: `public/images/about-section.png`
- Prompt/variant: `A single precision object — a machined geometric solid, a lens element, or a sculptural form — photographed like a museum specimen under one teal-green light, near-black surround. Elegant, still, field-agnostic. Fine grain, shallow depth of field, vertical flow top-to-bottom. [House style]`
- Status: generated; saved as PNG at 1200 × 1600.
- Limitation/deviation: none found.

### 3. Talk-to-us band

- Output: `public/images/talk-to-us/talk-to-us-bg.webp`
- Prompt/variant: `A wide, quiet field of fine geometric structure — a lattice or grid of nodes and struts — receding into fog and darkness, a few points catching deep teal-green light, most lost to black. Calm, deep, atmospheric — like looking across a dark workshop at night. Strong horizontal negative space. [House style]`
- Status: generated; saved as lossless WebP at 2400 × 800.
- Limitation/deviation: the built-in generator returned a 2:1 source; it was centre-cropped to the requested 3:1 ratio. The existing SVG was not overwritten. The component source still needs switching from `.svg` to `.webp`.

### 4. Interior page banner

- Output: `public/images/page-banner.png`
- Prompt/variant: `A fragment of a fine engraved grid or ruled measuring scale etched into dark brushed metal, shot at a raking angle so the lines catch a thin teal-green highlight and fall into shadow. Precise, industrial, abstract — no readable symbols. Top-weighted composition. [House style]`
- Status: generated; saved as PNG at 2400 × 900.
- Limitation/deviation: none found.

### 4b. Why KAP supporting image

- Output: `public/images/why-kap.webp`
- Prompt/variant: `A single precision instrument — a machinist's caliper, or a lens element, or a ruled measuring edge — lit from one side with deep teal-green, most of it falling into black. Exactness as an object. Vertical composition, the instrument reading top-to-bottom. [House style]`
- Status: generated; saved as lossless WebP at 900 × 1200.
- Limitation/deviation: the generated caliper has faint physical scale marks, despite the negative instruction `text`. The existing SVG was not overwritten. The component source still needs switching from `.svg` to `.webp`.

### 5. Founder / team portrait

- Output: `public/images/team/founder.png`
- Prompt/variant: `Editorial headshot of a professional in their 40s, three-quarter turn, calm neutral expression, plain deep-charcoal background, soft single-source light, desaturated near-monochrome grade with a faint green-teal cast. Shoulders-up, sharp eyes, magazine-quality. No smile-for-the-camera.`
- Status: generated; saved as PNG at 900 × 900.
- Limitation/deviation: synthetic placeholder portrait, as requested; it must not be treated as the real founder.

### Patents service card

- Output: `public/images/services/patents.webp`
- Prompt/variant: `An exploded technical assembly — gears, a lattice, a fine coil — floating apart in dark space, one teal-green light picking out the edges. Precision engineering as still life. [House style]`
- Status: generated; saved as lossless WebP at 1600 × 900.
- Limitation/deviation: none found.

### Trademarks service card

- Output: `public/images/services/trademarks.webp`
- Prompt/variant: `A cluster of abstract geometric marks — a circle, a bracket, a notch — machined from dark metal, one catching teal-green light. Identity reduced to pure form. [House style]`
- Status: generated; saved as lossless WebP at 1600 × 900.
- Limitation/deviation: the abstract forms may be read as letter-like, although no literal text was requested or added.

### Copyrights service card

- Output: `public/images/services/copyrights.webp`
- Prompt/variant: `Layered translucent sheets — like pages, or a waveform, or lines of a score — stacked and lit edge-on with deep teal-green, receding into black. Creative work as strata. [House style]`
- Status: generated; saved as lossless WebP at 1600 × 900.
- Limitation/deviation: none found.

### Designs service card

- Output: `public/images/services/designs.webp`
- Prompt/variant: `The silhouette of a single well-formed industrial object (undefined, sculptural) turning in darkness, its contour traced by a thin teal-green highlight. Form and ornament, nothing else. [House style]`
- Status: generated; saved as lossless WebP at 1600 × 900.
- Limitation/deviation: none found.

### Life sciences domain tile

- Output: `public/images/domains/life-sciences.png`
- Prompt/variant: `a single cell mid-division, one teal-green light, near-black surround`
- Status: generated; saved as PNG at 800 × 800.
- Limitation/deviation: none found.

### Chemistry domain tile

- Output: `public/images/domains/chemistry.png`
- Prompt/variant: `three molecular bonds meeting at a node, teal-green light on black`
- Status: generated; saved as PNG at 800 × 800.
- Limitation/deviation: the source document says molecule motifs should appear only in the life-sciences tile, but this exact chemistry prompt explicitly requests molecular bonds. The exact entry prompt was followed.

### Electrical domain tile

- Output: `public/images/domains/electrical.png`
- Prompt/variant: `a few clean circuit traces converging on one contact, teal-green light on black`
- Status: generated; saved as PNG at 800 × 800.
- Limitation/deviation: none found.

### Mechanical domain tile

- Output: `public/images/domains/mechanical.png`
- Prompt/variant: `two interlocking gear teeth, teal-green light on black`
- Status: generated; saved as PNG at 800 × 800.
- Limitation/deviation: none found.

### AI domain tile

- Output: `public/images/domains/ai.png`
- Prompt/variant: `a small sparse node graph, three connections lit, teal-green light on black`
- Status: generated; saved as PNG at 800 × 800.
- Limitation/deviation: the generated graph has four outward connections rather than the requested three.

### Statement-block texture

- Output: `public/images/texture/structure-field.webp`
- Prompt/variant: `An almost-invisible wash of fine geometric structure — lattice, grid, or grain — barely emerging from near-black, no focal point, pure texture. [House style]`
- Status: generated; saved as lossless WebP at 2800 × 1200.
- Limitation/deviation: none found.

## Follow-up required

- Choose a hero variant and either rename it to `hero-bg.png` or update the component source.
- Switch the talk-to-us component source from `talk-to-us-bg.svg` to `talk-to-us-bg.webp`.
- Switch the Why KAP component source from `why-kap.svg` to `why-kap.webp`.
- `npm run build` has not been run; therefore the project's image optimization and backup step has not run.
