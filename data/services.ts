// data/services.ts
// Services content + access layer. Components call the exported helpers,
// NEVER the `services` array directly, and never hardcode service copy.
//
// All prose below is DUMMY placeholder written in the two-register pattern:
//   plainIntro -> for inventors/startups (plain language)
//   precise    -> for associates/corporates (authoritative one-liner)
// Replace values on content handover. Keep the SHAPES stable so the swap is mechanical.
//
// Sub-services render as SECTIONS within their parent service page today.
// Each carries a stable `slug` so it can be promoted to its own route later
// with zero data restructure.

export type SubService = {
  slug: string; // stable, e.g. "search-analytics"
  name: string;
  plainIntro: string; // 1–2 sentences an inventor understands
  precise: string; // one authoritative line
  deliver: string[]; // "What we deliver"
  scope?: string[]; // optional
  process?: string[]; // optional, ORDERED (renders numbered)
};

export type Service = {
  slug: string;
  name: string;
  order: number;
  summary: string; // one line for the hub card
  plainIntro: string;
  precise: string;
  overview?: string[]; // optional service-level body points
  subServices: SubService[]; // 0..n
};

// ---- CONTENT (DUMMY) ----
const services: Service[] = [
  {
    slug: "patents",
    name: "Patents",
    order: 1,
    summary: "Search, drafting, and worldwide filing for your inventions.", // DUMMY
    plainIntro:
      "A patent gives you the right to stop others from copying your invention. We help you find out if your idea is patentable, write the application, and secure protection in the countries that matter to you.", // DUMMY
    precise:
      "End-to-end patent practice: prior-art search and analytics, specification drafting, and global filing and prosecution.", // DUMMY
    overview: [
      "Prior-art searches and patentability opinions.", // DUMMY
      "Precise specification and claim drafting.", // DUMMY
      "Coordinated filing and prosecution across jurisdictions.", // DUMMY
    ],
    subServices: [
      {
        slug: "search-analytics",
        name: "Patent Search & Analytics",
        plainIntro:
          "Before you spend on filing, we check what already exists so you know where your idea stands.", // DUMMY
        precise:
          "Prior-art, freedom-to-operate, and landscape searches with clear, decision-ready analysis.", // DUMMY
        deliver: [
          "Prior-art and novelty searches", // DUMMY
          "Freedom-to-operate assessments", // DUMMY
          "Patent landscape and whitespace analysis", // DUMMY
        ],
        scope: [
          "Search strategy tuned to your technology area", // DUMMY
          "Readable reports, not raw database dumps", // DUMMY
        ],
      },
      {
        slug: "drafting",
        name: "Patent Drafting",
        plainIntro:
          "The wording of a patent decides how strong it is. We draft it carefully so your protection is broad and defensible.", // DUMMY
        precise:
          "Specification and claim drafting focused on breadth, clarity, and enforceability.", // DUMMY
        deliver: [
          "Complete specifications and claim sets", // DUMMY
          "Drawings coordination", // DUMMY
          "Provisional and complete applications", // DUMMY
        ],
        scope: [
          "Drafting aligned to target jurisdictions", // DUMMY
          "Inventor review built into the process", // DUMMY
        ],
      },
      {
        slug: "global-filing-prosecution",
        name: "Global Patent Filing & Prosecution",
        plainIntro:
          "We handle the paperwork and back-and-forth with patent offices around the world so you don't have to.", // DUMMY
        precise:
          "Coordinated national, PCT, and convention filings with end-to-end prosecution management.", // DUMMY
        deliver: [
          "National, PCT, and convention route filings", // DUMMY
          "Office-action responses and prosecution", // DUMMY
          "Foreign associate coordination", // DUMMY
        ],
        process: [
          "Filing strategy and route selection", // DUMMY (ordered — renders numbered)
          "Preparation and submission", // DUMMY
          "Prosecution and office-action handling", // DUMMY
          "Grant and post-grant management", // DUMMY
        ],
      },
    ],
  },
  {
    slug: "trademarks",
    name: "Trademarks",
    order: 2,
    summary: "Protect the names, logos, and marks that identify your brand.", // DUMMY
    plainIntro:
      "A trademark protects your brand name and logo so others can't trade off your reputation. We help you search, register, and defend your marks.", // DUMMY
    precise:
      "Trademark clearance, registration, and enforcement across relevant classes and jurisdictions.", // DUMMY
    overview: [
      "Availability searches and clearance", // DUMMY
      "Application, prosecution, and renewals", // DUMMY
      "Opposition and enforcement support", // DUMMY
    ],
    subServices: [], // sub-services TBD — page renders service-level content cleanly
  },
  {
    slug: "copyrights",
    name: "Copyrights",
    order: 3,
    summary: "Secure your creative and original works.", // DUMMY
    plainIntro:
      "Copyright protects original work — writing, art, software, and more. We help you register and manage those rights.", // DUMMY
    precise:
      "Copyright registration, assignment, and advisory for creative and software works.", // DUMMY
    overview: [
      "Registration and documentation", // DUMMY
      "Assignments and licensing support", // DUMMY
      "Advisory on scope and enforcement", // DUMMY
    ],
    subServices: [], // TBD
  },
  {
    slug: "designs",
    name: "Designs",
    order: 4,
    summary: "Protect the look and shape of your products.", // DUMMY
    plainIntro:
      "An industrial design registration protects how your product looks — its shape, pattern, or ornamentation. We help you secure it.", // DUMMY
    precise:
      "Industrial design searches, registration, and portfolio management.", // DUMMY
    overview: [
      "Design searches and clearance", // DUMMY
      "Registration and prosecution", // DUMMY
      "Portfolio and renewal management", // DUMMY
    ],
    subServices: [], // TBD
  },
];

// ---- ACCESS LAYER (import these, not the array) ----
export const getServices = (): Service[] =>
  [...services].sort((a, b) => a.order - b.order);

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const getServiceSlugs = (): string[] => services.map((s) => s.slug);

export const getSubService = (
  serviceSlug: string,
  subSlug: string
): SubService | undefined =>
  getService(serviceSlug)?.subServices.find((s) => s.slug === subSlug);
