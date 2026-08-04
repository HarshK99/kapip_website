# PRD — KAP IP

## 1. Summary
Information-oriented static website for **KAP IP** — "Knowledge Assured Protection" (`site.brandLine`) — an intellectual property services firm. Purpose: explain who the firm is and what it does across four IP services, and make it easy to get in touch. Not a lead-gen funnel, not a blog (yet). Credibility and clarity are the whole job.

**Positioning:** primary practice is **life sciences** — pharma, chemistry, medicines, molecules — with genuine secondary breadth across electrical, mechanical, and AI. The site should read as "deep in life sciences, credible everywhere else it works," not life-sciences-only. This shapes imagery (see `docs/DESIGN.md` → Imagery) and copy emphasis without narrowing the actual service offering.

## 2. Audience & how it shapes the site
Three groups, deliberately different needs:
- **Foreign associates / other IP firms** — want proof of competence and jurisdictional reach: what you deliver, how fast, which jurisdictions, quality of drafting. Skims for substance.
- **Large corporates** — want reliability and process: scope, engagement model, seriousness.
- **Startups & individual inventors** — want plain-language reassurance: *what is this, do I need it, what happens next.*

**Resolution:** every service section is written in **two registers**. A short plain-language intro (`plainIntro`) that an inventor understands, then a precise **What we deliver / Scope / Process** block that satisfies associates and corporates. Copy stays authoritative throughout; the intro carries the accessibility. This is a data-schema requirement, not just a writing note (see §5).

## 3. Information architecture
Confirmed: **page per service, sub-services as sections within.**

```
/                         Home
/about                    The Firm
/services                 Services overview (hub → 4 services)
/services/patents         Patents      (7 subs: Search & Analytics, Drafting, Global Filing &
                                        Prosecution, Patent Intelligence Services, Patent Agent
                                        Exam Training, AI Document Review, Patent Opposition)
/services/trademarks      Trademarks   (subs TBD — schema ready, renders 0..n)
/services/copyrights      Copyrights   (subs TBD)
/services/designs         Designs / Industrial Designs (subs TBD)
/contact                  Contact
```

Service pages are generated from `data/services.ts` via `generateStaticParams` — one route file, four (or more) static pages. Adding a service = adding a data entry, no new route file.

**Future, not built now:** `/insights` (articles/resources). Nav is structured so it can slot in without rework. Do not build it.

**Nav:** Home · About · Services (with dropdown/expand to the 4 on desktop; grouped in mobile menu) · Contact. Persistent WhatsApp affordance on mobile.

### Promotion path (why subs are explorer items, not pages, for now)
Each sub-service carries a `slug` and self-contained content in the data. Rendered today as an item in a sidebar + detail explorer within its parent service page (`SubServiceExplorer.tsx` — sidebar nav on the left, selected sub-service's content on the right). When real copy makes a sub-service substantial enough to rank on its own, it can be promoted to `/services/patents/search-analytics` by adding a nested route that reads the same sub-service object — **zero data restructure**. Build for this; don't build it yet.

## 4. Pages — what each must contain
Keep every page composed of section components. No page holds raw markup.

**Home** — Hero (firm thesis in one line, primary CTA to Contact, secondary to Services) · short "what we do" strip linking the 4 services · a credibility/why-KAP block (3–4 points: precision, jurisdictional reach, responsiveness — dummy for now) · **Numbers/stats strip** (3–4 metrics from `data/stats.ts` — patents filed, clients served, years of experience, one more; count up on scroll-into-view per `DESIGN.md`; **dummy values — must be verified truthful before launch**) · **Team section** (single founder card — image + name + role + bio — from `data/team.ts`'s `people[]`; Home-only, see below) · CTA band. Reduced text density in favor of these structured visual blocks, per `DESIGN.md` → Visual/interactive shift.

**About / The Firm** — who the firm is, approach/philosophy, what makes the work precise (dummy). Keeps its existing narrative `about.team` paragraph (prose, not a card) — the founder **card** lives on Home only, sourced from `data/team.ts`, not duplicated here. No stock team photos as filler for the narrative sections.

**Services (hub)** — one line of framing + four `ServiceCard`s (title, one-line summary, sub-service count, link). This page is a directory, not an essay.

**Service page (×4, templated)** — service hero (name, `plainIntro`, precise one-liner) · when a service has more than one sub-service, a **sub-service sidebar + detail explorer** (`SubServiceExplorer.tsx`): sidebar nav lists every sub-service, selecting one shows its plain intro, What we deliver (each item its own name + full paragraph), optional Scope bullets, and Process (numbered, only if present) · CTA to Contact. Trademarks/Copyrights/Designs render with 0 subs cleanly (show service-level content only, explorer omitted) until subs are added.

**Contact** — contact form (Web3Forms) · direct affordances: WhatsApp, `tel:`, email (all from `data/site.ts`) · **offices list** — renders every entry in `site.offices[]` (Registered Office, Guwahati, real; Bangalore Office, dummy), each with its own formatted address via `formattedAddress(office)` · office hours if provided. Form fields: name, email, phone (optional), subject/service interest (select from services list), message. Client-side validation, success + error states written in the interface's voice.

## 5. Data model (the contract — keep stable)
Defined in `data/services.ts` and `data/site.ts`; typed; accessed only through exported helpers.

```ts
// data/services.ts
type DeliverItem = {
  name: string;            // e.g. "Freedom to Operate"
  description: string;     // full paragraph, shown in the explorer's detail pane
};

type SubService = {
  slug: string;            // stable, e.g. "search-analytics"
  name: string;            // "Patent Search & Analytics"
  plainIntro: string;      // 1–2 sentences an inventor understands
  precise: string;         // one authoritative line for associates/corporates
  deliver: DeliverItem[];  // "What we deliver" — name + full description each
  scope?: string[];        // optional scope points (still plain bullets)
  process?: string[];      // optional ordered process steps
};

type Service = {
  slug: string;            // "patents" | "trademarks" | "copyrights" | "designs"
  name: string;
  order: number;
  summary: string;         // one line for the hub card
  plainIntro: string;      // service-level plain intro
  precise: string;         // service-level authoritative line
  overview?: string[];     // optional service-level body points
  subServices: SubService[]; // 0..n
};

// Access layer (components call these, never the array directly):
getServices(): Service[]            // sorted by order
getService(slug): Service | undefined
getServiceSlugs(): string[]         // for generateStaticParams
```

```ts
// data/site.ts — single source for all contact + org info
type Office = {
  label: string;           // "Registered Office" | "Bangalore Office" | ...
  line1: string; line2?: string; city: string; state: string; pincode: string; country: string;
};

type Site = {
  name: "KAP IP";
  tagline: string;
  brandLine: string;       // "Knowledge Assured Protection"
  phone: string;           // E.164 for tel:  e.g. "+91XXXXXXXXXX"
  whatsapp: string;        // digits only for wa.me
  email: string;
  offices: Office[];       // Registered Office first, then any additional offices
  hours?: string;
  web3formsKey: string;    // access key, public by design
  nav: { label: string; href: string }[];
  socials: { linkedin: string; twitter: string }; // DUMMY profile URLs — footer social icons
  developer?: string;      // studio credit in the footer's bottom bar
};

// Access: formattedAddress(office: Office) — call per office, not site-wide.
```

```ts
// data/team.ts — people[] shown as cards (Home page team section only)
type Person = { name: string; role: string; image: string; bio: string; };
getPeople(): Person[]
getFounder(): Person | undefined   // people[0]
```

```ts
// data/stats.ts — Home page numbers/stats strip
type Stat = { value: number; label: string; suffix?: string; };
getStats(): Stat[]
// DUMMY values — MUST be real and truthful before launch (see §6, §8 acceptance).
```

**Values are DUMMY until replaced field-by-field on content handover** (e.g. phone `+910000000000`, office address placeholders) — real content arrives per-field, not all at once, and gets poured straight into these same shapes. The types are frozen; only values change.

## 6. Content Checklist (hand this back with the real `.md`)
Fields below are dummy until checked off. When real content arrives, it maps 1:1 into the shapes above.

- [ ] `site.ts`: firm tagline, phone, WhatsApp number, email, Registered Office full address, **Bangalore office full address**, hours, Web3Forms access key, LinkedIn/Twitter profile URLs (`socials`)
- [x] `site.ts`: brand line — "Knowledge Assured Protection" (`brandLine`)
- [ ] Home: hero line, 3–4 "why KAP" points, CTA copy
- [ ] `data/stats.ts`: 3–4 real, **truthful** metrics (patents filed, clients served, years, one more) — dummy numbers must not ship to production
- [ ] `data/team.ts`: founder name, role, real bio, real photo (currently a generated dummy PNG at `public/images/team/founder.png`)
- [ ] About: firm story, approach, (optional) additional principals `people[]` (About's narrative `about.team` paragraph, not the Home card)
- [ ] Real logo hex values — sync `docs/DESIGN.md`'s provisional brand ramp (`brand-indigo/teal/green/lime`) to the final logo once delivered
- [ ] Patents: service-level `plainIntro`/`precise`/`overview` (still dummy)
- [x] Patents sub-services: real content received for all 7 (`data/patent_subservices.txt`) — Search & Analytics, Drafting, Global Filing & Prosecution, Patent Intelligence Services, Patent Agent Exam Training, AI Document Review all have real `plainIntro`/`precise`/`deliver[]`; **Patent Opposition Services is still a DUMMY placeholder** (source content cut off before its description — replace when received)
- [ ] Trademarks / Copyrights / Designs: service-level content now; sub-services when defined
- [ ] Any real imagery (until then, placeholder script output stands in)
- [ ] Confirm forbidden-terms list for `leak-check` (likely empty for this site)

## 7. Non-goals (v1)
No blog/CMS, no client portal, no search, no i18n, no calendar/booking, no analytics beyond a lightweight script if requested later, no animations beyond the restrained set in DESIGN.md. **Stats are now in-scope** (Home numbers/stats strip, §4) — this reverses the earlier "no stat-counter theatrics" position; the change is a restrained, once-triggered count-up per `DESIGN.md`, not a dashboard.

## 8. Acceptance
- `npm run build` produces `out/` with all 8 pages statically rendered.
- Lighthouse mobile: performance and accessibility strong; no oversized images.
- No hardcoded copy or contact info in components (all via data layer).
- Adding a service or sub-service requires only a data edit.
- Nav, WhatsApp, tel, email all resolve from `site.ts`.
