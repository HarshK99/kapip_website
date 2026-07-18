// data/services.ts
// Services content + access layer. Components call the exported helpers,
// NEVER the `services` array directly, and never hardcode service copy.
//
// Patents' sub-services carry REAL content (from the client's
// patent_subservices.txt handover) as of this revision. Trademarks,
// Copyrights, and Designs are still DUMMY placeholders written in the
// two-register pattern:
//   plainIntro -> for inventors/startups (plain language)
//   precise    -> for associates/corporates (authoritative one-liner)
// Replace remaining DUMMY values on content handover. Keep the SHAPES
// stable so the swap stays mechanical.
//
// Sub-services render in a sidebar + detail explorer within their parent
// service page today. Each carries a stable `slug` so it can be promoted
// to its own route later with zero data restructure.

export type DeliverItem = {
  name: string;
  description: string;
};

export type SubService = {
  slug: string; // stable, e.g. "search-analytics"
  name: string;
  plainIntro: string; // 1–2 sentences an inventor understands
  precise: string; // one authoritative line
  deliver: DeliverItem[]; // "What we deliver" — name + full description
  scope?: string[]; // optional, short bullets
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

// ---- CONTENT ----
const services: Service[] = [
  {
    slug: "patents",
    name: "Patents",
    order: 1,
    summary: "Search, drafting, and worldwide filing for your inventions.", // DUMMY
    plainIntro:
      "A patent gives you the right to stop others from copying your invention. We help you find out if your idea is patentable, write the application, and secure protection in the countries that matter to you.", // DUMMY
    precise:
      "End-to-end patent practice: prior-art search and analytics, specification drafting, global filing and prosecution, and the strategic and training services around them.", // DUMMY
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
          "Before you spend on filing, we check what already exists — and what's already protected — so you know exactly where your idea stands.",
        precise:
          "Prior-art, freedom-to-operate, patent-landscape, and validity searches with clear, decision-ready analysis.",
        deliver: [
          {
            name: "Patentability Search",
            description:
              "We determine whether an invention meets the patentability requirements of novelty, inventive step, and industrial applicability, analyzing prior art such as patents, scientific literature, and technical publications to identify existing technologies that may affect its patentability and uniqueness.",
          },
          {
            name: "Freedom to Operate",
            description:
              "We assess whether a product, process, or service can be developed, manufactured, used, or commercialized without infringing the valid patent rights of third parties — identifying relevant patents and applications in the target jurisdictions and analyzing their claims for infringement risk.",
          },
          {
            name: "State-of-the-Art Study",
            description:
              "We map the current technological landscape, track emerging trends, and identify key players and existing solutions in a field, drawing on a comprehensive review of patents, scientific literature, technical publications, and industrial practice.",
          },
          {
            name: "Patent Landscape Analysis",
            description:
              "A comprehensive study of existing patents within a specific technology domain, highlighting white space and competitive activity.",
          },
          {
            name: "Invalidity and Validity Searches",
            description:
              "We conduct a comprehensive prior-art analysis to evaluate the strength and enforceability of a patent — a validity search checks whether a granted patent meets the requirements of novelty, inventive step, and patentability, while an invalidity search identifies prior art that may challenge or invalidate its claims. Used in litigation, opposition proceedings, licensing negotiations, and strategic IP management.",
          },
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
          "The wording of a patent decides how strong it is. We draft it carefully, at every stage, so your protection is broad and defensible.",
        precise: "Provisional and complete specification drafting focused on breadth, clarity, and enforceability.",
        deliver: [
          {
            name: "Provisional Specification",
            description:
              "Drafted to secure an early priority date for an invention before the complete specification is filed — this establishes ownership of the invention while giving you time for further research, development, and refinement.",
          },
          {
            name: "Complete Specification",
            description:
              "A detailed patent document fully describing the invention, including claims that define the scope of protection, drawings where required, and an abstract — filed within 12 months of the provisional application.",
          },
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
          "We handle the paperwork and back-and-forth with patent offices around the world so you don't have to.",
        precise: "Coordinated national, PCT, and convention filings with end-to-end prosecution management.",
        deliver: [
          {
            name: "National, PCT & Convention Filings",
            description:
              "Submission of patent applications and related requests to the Indian Patent Office, the PCT system, and other national and regional patent offices.",
          },
          {
            name: "Patent Prosecution",
            description:
              "Preparation of precise, strategic replies to objections raised in examination reports, supported by examiner interviews to clarify technical and legal issues, strategic claim amendments to overcome objections, and responses to ISR and written-opinion observations raised during international prosecution.",
          },
          {
            name: "Foreign Associate Coordination",
            description:
              "We coordinate with associates across jurisdictions to keep filings, deadlines, and communications aligned wherever you're seeking protection.",
          }, // DUMMY
        ],
        process: [
          "Filing strategy and route selection", // DUMMY (ordered — renders numbered)
          "Preparation and submission", // DUMMY
          "Prosecution and office-action handling", // DUMMY
          "Grant and post-grant management", // DUMMY
        ],
      },
      {
        slug: "patent-intelligence",
        name: "Patent Intelligence Services",
        plainIntro:
          "Beyond a single filing, we help you manage patent rights strategically across every market that matters to you.",
        precise:
          "International patent protection support — PCT filings, national-phase coordination, and foreign prosecution management.",
        deliver: [
          {
            name: "PCT & International Filings",
            description:
              "We facilitate international patent filings through the Patent Cooperation Treaty (PCT) system and coordinate national-phase filings in your target countries.",
          },
          {
            name: "Foreign Prosecution Management",
            description:
              "We manage office actions, examiner communications, and compliance requirements across international jurisdictions, so your global patent protection stays on track.",
          },
        ],
      },
      {
        slug: "patent-agent-exam-training",
        name: "Patent Agent Examination Training",
        plainIntro:
          "We help aspiring patent agents build the technical and legal grounding needed to pass the Patent Agent Exam.",
        precise: "Focused, exam-oriented training covering patent law, drafting, patentability, and prior-art search.",
        deliver: [
          {
            name: "Structured Exam Preparation",
            description:
              "Our program covers essential topics — patent law, patent drafting, patentability requirements, prior-art search, and patent office procedures.",
          },
          {
            name: "Practical Drafting & Mock Assessments",
            description:
              "We combine conceptual learning with practical drafting exercises, mock tests, and exam-oriented guidance to build strong technical and legal competence for qualifying as a Patent Agent.",
          },
        ],
      },
      {
        slug: "ai-document-review",
        name: "AI-Generated Patent Document Review & Refinement",
        plainIntro:
          "If you've drafted with AI assistance, we review and refine it so it holds up — technically and legally.",
        precise:
          "Review and refinement of AI-generated specifications, claims, and prosecution responses for accuracy and enforceability.",
        deliver: [
          {
            name: "Accuracy & Compliance Review",
            description:
              "We review AI-generated patent documents — specifications, claims, and prosecution responses — for technical accuracy and legal compliance.",
          },
          {
            name: "Refinement for Enforceability",
            description:
              "We refine language and claim scope so the resulting patent document is defensible and enforceable, not just technically complete.",
          },
        ],
      },
      {
        slug: "patent-opposition",
        name: "Patent Opposition Services",
        // DUMMY — content handover cut off before this section's description; replace when received.
        plainIntro: "Support before and after grant if a patent needs to be challenged — or defended.", // DUMMY
        precise: "Opposition support across pre-grant and post-grant proceedings.", // DUMMY
        deliver: [
          {
            name: "Opposition Support",
            description: "Detailed description pending — placeholder until real content is provided.",
          }, // DUMMY
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
