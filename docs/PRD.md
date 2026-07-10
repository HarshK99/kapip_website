# PRD — KAP IP

## 1. Summary
Information-oriented static website for **KAP IP**, an intellectual property services firm. Purpose: explain who the firm is and what it does across four IP services, and make it easy to get in touch. Not a lead-gen funnel, not a blog (yet). Credibility and clarity are the whole job.

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
/services/patents         Patents      (subs: Search & Analytics, Drafting, Global Filing & Prosecution)
/services/trademarks      Trademarks   (subs TBD — schema ready, renders 0..n)
/services/copyrights      Copyrights   (subs TBD)
/services/designs         Designs / Industrial Designs (subs TBD)
/contact                  Contact
```

Service pages are generated from `data/services.ts` via `generateStaticParams` — one route file, four (or more) static pages. Adding a service = adding a data entry, no new route file.

**Future, not built now:** `/insights` (articles/resources). Nav is structured so it can slot in without rework. Do not build it.

**Nav:** Home · About · Services (with dropdown/expand to the 4 on desktop; grouped in mobile menu) · Contact. Persistent WhatsApp affordance on mobile.

### Promotion path (why subs are sections, not pages, for now)
Each sub-service carries a `slug` and self-contained content in the data. Rendered today as a section inside its parent service page. When real copy makes a sub-service substantial enough to rank on its own, it can be promoted to `/services/patents/search-analytics` by adding a nested route that reads the same sub-service object — **zero data restructure**. Build for this; don't build it yet.

## 4. Pages — what each must contain
Keep every page composed of section components. No page holds raw markup.

**Home** — Hero (firm thesis in one line, primary CTA to Contact, secondary to Services) · short "what we do" strip linking the 4 services · a credibility/why-KAP block (3–4 points: precision, jurisdictional reach, responsiveness — dummy for now) · CTA band. No stat-counter theatrics, no logo-cloud of fake clients.

**About / The Firm** — who the firm is, approach/philosophy, what makes the work precise (dummy). Optional principals block (schema supports `people[]`, may be empty/omitted). No stock team photos as filler.

**Services (hub)** — one line of framing + four `ServiceCard`s (title, one-line summary, sub-service count, link). This page is a directory, not an essay.

**Service page (×4, templated)** — service hero (name, `plainIntro`, precise one-liner) · **sub-service sections** looped from data, each with plain intro + What we deliver / Scope / Process · a "how we engage" or process note if present · CTA to Contact. Trademarks/Copyrights/Designs render with 0 subs cleanly (show service-level content only) until subs are added.

**Contact** — contact form (Web3Forms) · direct affordances: WhatsApp, `tel:`, email, address (all from `data/site.ts`) · office hours if provided. Form fields: name, email, phone (optional), subject/service interest (select from services list), message. Client-side validation, success + error states written in the interface's voice.

## 5. Data model (the contract — keep stable)
Defined in `data/services.ts` and `data/site.ts`; typed; accessed only through exported helpers.

```ts
// data/services.ts
type SubService = {
  slug: string;            // stable, e.g. "search-analytics"
  name: string;            // "Patent Search & Analytics"
  plainIntro: string;      // 1–2 sentences an inventor understands
  precise: string;         // one authoritative line for associates/corporates
  deliver: string[];       // "What we deliver" bullets
  scope?: string[];        // optional scope points
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
type Site = {
  name: "KAP IP";
  tagline: string;
  phone: string;           // E.164 for tel:  e.g. "+91XXXXXXXXXX"
  whatsapp: string;        // digits only for wa.me
  email: string;
  address: { line1: string; line2?: string; city: string; state: string; pincode: string; };
  hours?: string;
  web3formsKey: string;    // access key, public by design
  nav: { label: string; href: string }[];
};
```

**All values ship as clearly-labelled DUMMY** (e.g. phone `+910000000000`, address placeholders). The types are frozen; only values change on content handover.

## 6. Content Checklist (hand this back with the real `.md`)
Every field below is dummy and must be replaced. When the real content `.md` arrives, it maps 1:1 into the shapes above.

- [ ] `site.ts`: firm tagline, phone, WhatsApp number, email, full address, hours, Web3Forms access key
- [ ] Home: hero line, 3–4 "why KAP" points, CTA copy
- [ ] About: firm story, approach, (optional) principals `people[]`
- [ ] Patents: service `plainIntro`/`precise`/`overview`; for each of the 3 subs → `plainIntro`, `precise`, `deliver[]`, `scope[]?`, `process[]?`
- [ ] Trademarks / Copyrights / Designs: service-level content now; sub-services when defined
- [ ] Any real imagery (until then, placeholder script output stands in)
- [ ] Confirm forbidden-terms list for `leak-check` (likely empty for this site)

## 7. Non-goals (v1)
No blog/CMS, no client portal, no search, no i18n, no calendar/booking, no analytics beyond a lightweight script if requested later, no animations beyond the restrained set in DESIGN.md.

## 8. Acceptance
- `npm run build` produces `out/` with all 8 pages statically rendered.
- Lighthouse mobile: performance and accessibility strong; no oversized images.
- No hardcoded copy or contact info in components (all via data layer).
- Adding a service or sub-service requires only a data edit.
- Nav, WhatsApp, tel, email all resolve from `site.ts`.
