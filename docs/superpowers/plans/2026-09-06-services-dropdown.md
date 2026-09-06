# Services Dropdown Implementation Plan

> **For agentic workers:** Implement this plan task-by-task and track each checkbox. Do not alter unrelated navigation or page content.

**Goal:** Make the desktop “Services” navigation label link directly to `/services`, remove “All services” from the dropdown, and restyle the four service links as individually bordered rows inspired by the supplied reference image.

**Architecture:** Keep the existing service data source and dropdown state inside `Header.tsx`. Split the visible desktop control into a real Next.js link for “Services” and a small adjacent disclosure button for opening the submenu with keyboard or touch; hovering the combined wrapper continues to open it. Add four restrained line icons to the shared icon file and render them only as supporting visuals, never as separate controls.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, TypeScript, Tailwind CSS 4, local inline SVG icons.

**Spec:** User request from 2026-09-06 and reference image supplied in chat.

## Global Constraints

- Do not add subtext under service names.
- Do not add a new icon package; use lightweight inline SVG icons matching the existing 1.5px line style.
- Use existing color tokens only: `paper` (`#FCFBFA`) for the dropdown, `line` (`#DBD9D3`) for borders, `accent-wash` (`#ECF2F0`) for hover/focus, and `accent` (`#0E5C4A`) for the active service.
- Keep the dropdown compact, with a maximum 4px corner radius in line with the project design rules.
- Preserve the existing 150ms close delay so the pointer can move from the top-level link into the dropdown without it disappearing.
- Preserve the current mobile menu unless testing reveals a regression; this request targets the desktop hover dropdown.
- Keep all links usable by keyboard and retain visible focus states, Escape-to-close, outside-click closing, and active-page indication.

---

### Task 1: Add service icons

**Files:**

- Modify: `components/ui/icons.tsx`

**Interfaces:**

- Produces: `PatentIcon`, `TrademarkIcon`, `CopyrightIcon`, and `DesignIcon`, each accepting `SVGProps<SVGSVGElement>`.

- [ ] Add four 20–24px, `currentColor`, decorative SVG components using the existing 1.5px stroke style.
- [ ] Use recognizable subjects: a patent document/seal, a trademark tag or mark, a copyright circle, and a drafting/shape icon for industrial designs.
- [ ] Set `aria-hidden="true"` because the adjacent text already names each destination.
- [ ] Run `npm run lint` from the project root and confirm the icon file has no TypeScript or accessibility errors.

### Task 2: Make “Services” the hub link and simplify the dropdown

**Files:**

- Modify: `components/layout/Header.tsx` around the desktop Services navigation block.

**Interfaces:**

- Consumes: `getServices()`, the four service icon components, `isNavActive()`, and the existing open/close state functions.
- Produces: a `/services` top-level link, an adjacent disclosure button, and a dropdown containing only `/services/[slug]` links.

- [ ] Replace the current top-level Services button with a `Link` whose `href` comes from the existing navigation item (`/services`).
- [ ] Keep hover opening on the shared wrapper so moving over “Services” reveals the menu without requiring a click.
- [ ] Add a small adjacent caret button with `aria-expanded`, `aria-haspopup="true"`, and an explicit label such as “Toggle services menu”; this preserves keyboard and touch access while allowing the word “Services” itself to navigate.
- [ ] Remove the separate “All services” row from the bottom of the dropdown.
- [ ] Keep the Services label active for both `/services` and every `/services/...` route.
- [ ] Keep each service name sourced from `getServices()` and each destination in the existing `/services/${service.slug}` form.
- [ ] Map each known slug to its matching icon and keep a safe no-icon fallback so future services do not break the menu.
- [ ] Close the dropdown after a service link is selected, on Escape, on outside click, and after the existing delayed mouse leave.

### Task 3: Restyle the desktop dropdown to match the reference

**Files:**

- Modify: `components/layout/Header.tsx` in the dropdown panel and service-link classes.

**Interfaces:**

- Consumes: the existing Tailwind tokens in `tailwind.config.ts`; no token changes required.

- [ ] Change the panel background from `surface` to `paper` and give the panel enough padding to show separation between rows.
- [ ] Make every service link its own bordered item rather than using one shared outer list treatment.
- [ ] Use a one-column stack with a small, consistent gap; place the service name on the left and its icon on the right, matching the reference image.
- [ ] Use `border-line`, `rounded-card`, Poppins service labels, and generous horizontal/vertical padding while keeping the menu compact enough for the four items.
- [ ] Apply `accent-wash` on hover and keyboard focus, and use the same wash plus `text-accent` for the current service.
- [ ] Use a subtle color transition only; do not add shadows, gradients, subtext, oversized radius, or decorative motion.
- [ ] Give the dropdown an appropriate width so “Trademarks” and “Copyrights” remain on one line and the icon column aligns.

### Task 4: Verify behavior and appearance

**Files:**

- No source files created; screenshots may be written to the existing gitignored `.shots/` folder.

- [ ] Run `npm run lint` from `D:\FounderMode\Websites\kapip_website` and confirm it passes.
- [ ] Run `npm run build` and confirm all static service routes still build.
- [ ] Start the local site and capture a desktop screenshot with the Services dropdown open at approximately 1280px width.
- [ ] Compare the screenshot with the reference: separate bordered items, no subtext, right-aligned icons, and a visibly changed near-white dropdown background.
- [ ] Click the word “Services” and confirm it opens `/services` rather than merely toggling the menu.
- [ ] Hover Services and confirm the dropdown opens; move into the menu and confirm it stays open.
- [ ] Use Tab and the caret button to open the menu, then verify all four service links are reachable and have visible focus.
- [ ] Press Escape and click outside the dropdown to confirm both close it.
- [ ] Check `/services`, `/services/patents`, and one other service route to confirm active states are correct.
- [ ] Check a mobile width near 390px and confirm the existing mobile navigation still works and has not inherited the desktop card styling.

## Acceptance checklist

- [ ] “Services” links directly to `/services`.
- [ ] “All services” no longer appears inside the desktop dropdown.
- [ ] The dropdown contains exactly the four service destinations supplied by `getServices()`.
- [ ] Every item has its own thin border and no subtext.
- [ ] Each current service has a relevant, restrained icon; unknown future services render safely without one.
- [ ] The dropdown uses the changed `paper` background and the approved `accent-wash` interaction color.
- [ ] Hover, keyboard, touch/click, active-route, Escape, and outside-click behavior are verified.
- [ ] Lint and production build pass.
