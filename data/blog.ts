// data/blog.ts
// IP Blogs content + access layer. Components call the exported helpers,
// NEVER the `posts` array directly, and never hardcode post copy.
//
// All copy below is DUMMY placeholder — plausible, patenting-focused, and
// real-shaped so the listing + article UI is exercised properly, but it is
// not client-approved content. Real posts pour into the same typed shapes;
// keep the SHAPES stable so the swap stays mechanical.
//
// Body is a typed block union rather than a markdown/HTML string: static
// export has no server-side renderer and the project bans raw markup in
// components. `BlogBody` maps each block to design-token styling.

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string } // in-article sub-head (renders as h2)
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; caption?: string };

export type BlogPost = {
  slug: string; // stable, e.g. "what-makes-an-invention-patentable"
  title: string;
  /** 1–2 lines — used on the card and as the meta description. */
  excerpt: string;
  /** ISO date, e.g. "2026-08-14". Sorted newest-first by the access layer. */
  date: string;
  /** path under /public — placeholder now (`npm run placeholder-blog`). */
  coverImage: string;
  body: BlogBlock[];
};

// ---- CONTENT (all DUMMY) ----
const posts: BlogPost[] = [
  {
    slug: "what-makes-an-invention-patentable",
    title: "What makes an invention patentable in India",
    excerpt:
      "Novelty, inventive step, and industrial applicability — the three tests every application has to clear, and what each one actually means in practice.",
    date: "2026-08-28",
    coverImage: "/images/blog/what-makes-an-invention-patentable.svg",
    body: [
      {
        type: "paragraph",
        text: "Before you spend on drafting and filing, it helps to know what the patent office is actually looking for. In India, as in most jurisdictions, an invention has to clear three tests to be granted a patent. None of them is about how clever the idea feels — they are about how it compares to everything that came before it.",
      },
      { type: "heading", text: "Novelty" },
      {
        type: "paragraph",
        text: "An invention is novel if it has not been disclosed anywhere in the world before your filing date — not in an earlier patent, not in a journal, not in a product on sale, and not in your own conference talk. Public disclosure by the inventor counts against the application in India, so the sequence matters: file first, publish second.",
      },
      { type: "heading", text: "Inventive step" },
      {
        type: "paragraph",
        text: "Novelty alone is not enough. The invention also has to be non-obvious to a person skilled in the field — someone who knows the existing technology but has no inventive imagination of their own. A change that any competent engineer would have made when faced with the same problem does not clear this bar.",
      },
      {
        type: "quote",
        text: "Most applications that fail do so on inventive step, not novelty. The prior art rarely describes your exact invention — it describes something close enough that reaching yours was an obvious next move.",
      },
      { type: "heading", text: "Industrial applicability" },
      {
        type: "paragraph",
        text: "Finally, the invention has to be capable of being made or used in some kind of industry. This is a low bar for most technologies, but it rules out purely theoretical results and things that cannot actually be built.",
      },
      { type: "heading", text: "What is excluded outright" },
      {
        type: "paragraph",
        text: "Section 3 of the Patents Act lists subject matter that is not patentable regardless of how novel or inventive it is. The categories that come up most often:",
      },
      {
        type: "list",
        items: [
          "Mere discoveries of a scientific principle or a naturally occurring substance",
          "A new form of a known substance that does not improve its known efficacy",
          "Methods of agriculture or horticulture",
          "Methods of medical treatment of humans or animals",
          "A mathematical or business method, or a computer program as such",
          "Presentation of information",
        ],
      },
      {
        type: "paragraph",
        text: "A patentability search early in the process tells you where your idea sits against these tests before you commit to the full cost of an application. It is the cheapest point at which to change direction.",
      },
    ],
  },
  {
    slug: "provisional-vs-complete-specification",
    title: "Provisional vs. complete specification — which to file first",
    excerpt:
      "A provisional application secures your priority date while the invention is still moving. Here is when that is the right call, and when it is not.",
    date: "2026-08-14",
    coverImage: "/images/blog/provisional-vs-complete-specification.svg",
    body: [
      {
        type: "paragraph",
        text: "When you file a patent application in India you can file a provisional specification or a complete one. The choice affects your timeline, your cost, and how much of the invention you have to have worked out on day one.",
      },
      { type: "heading", text: "What a provisional specification does" },
      {
        type: "paragraph",
        text: "A provisional specification describes the invention as far as it has been developed and secures a priority date for everything it discloses. You then have twelve months to file the complete specification. It does not need claims and it is never examined on its own — its whole job is to plant a flag.",
      },
      {
        type: "list",
        items: [
          "Locks in an early priority date against competing filings and later disclosures",
          "Buys twelve months to test, refine, and raise funding",
          "Costs less upfront and needs less finished detail",
          "Lets you disclose to investors and partners with a filing already on record",
        ],
      },
      { type: "heading", text: "The catch" },
      {
        type: "paragraph",
        text: "You only get priority for what the provisional actually describes. If the complete specification adds a feature that was not disclosed — even a small one — that feature takes the later date. A thin provisional filed in a hurry can give a false sense of protection.",
      },
      {
        type: "quote",
        text: "Treat the provisional as a real technical document, not a placeholder. Everything you might later claim should be somewhere in it, even if only in outline.",
      },
      { type: "heading", text: "When to skip straight to a complete specification" },
      {
        type: "paragraph",
        text: "If the invention is already fully developed, if there is no imminent disclosure or competitive pressure, or if you want examination to start as soon as possible, filing a complete specification directly saves you a step and twelve months of calendar time.",
      },
      {
        type: "paragraph",
        text: "The right answer depends on how settled the invention is and what is happening around it commercially. That is a conversation to have before anything is drafted.",
      },
    ],
  },
  {
    slug: "why-a-prior-art-search-is-worth-it",
    title: "Why a prior-art search is worth it before you file",
    excerpt:
      "A few hundred dollars of searching can save you a multi-year prosecution fight — or tell you to redesign while it is still cheap to do so.",
    date: "2026-07-30",
    coverImage: "/images/blog/why-a-prior-art-search-is-worth-it.svg",
    body: [
      {
        type: "paragraph",
        text: "It is tempting to file first and find out later. A prior-art search feels like a delay when you are keen to get a filing date. But the search is the one step that changes what you file, and it is far cheaper to change course now than after an examination report lands.",
      },
      { type: "heading", text: "What the search tells you" },
      {
        type: "list",
        items: [
          "Whether something close to your invention is already published",
          "Which features are genuinely new and which are already known",
          "How to frame the claims so they sit in clear space",
          "Whether the idea is worth filing on at all",
        ],
      },
      { type: "heading", text: "It shapes the draft, not just the go/no-go" },
      {
        type: "paragraph",
        text: "A good search does more than return a yes or no. It shows the examiner's likely starting point, so the specification can address the closest known work head-on and the claims can be pitched at the right level of generality from the first draft — instead of being narrowed reactively, one office action at a time.",
      },
      {
        type: "quote",
        text: "An application drafted around a proper search usually needs fewer rounds of prosecution. The cost of the search is often recovered in attorney time alone.",
      },
      { type: "heading", text: "The kinds of search" },
      {
        type: "paragraph",
        text: "A patentability search looks at whether the invention is new and inventive. A freedom-to-operate search asks a different question — whether making or selling your product would infringe someone else's live rights. They use overlapping databases but answer different questions, and you may need both.",
      },
      {
        type: "paragraph",
        text: "For an early-stage invention, start with patentability. Bring in freedom-to-operate once the product design is close to final.",
      },
    ],
  },
  {
    slug: "the-pct-route-explained",
    title: "The PCT route, explained for first-time filers",
    excerpt:
      "One international application, thirty months of breathing room, and a single search report before you commit to individual countries.",
    date: "2026-07-11",
    coverImage: "/images/blog/the-pct-route-explained.svg",
    body: [
      {
        type: "paragraph",
        text: "If you want patent protection in more than one or two countries, the Patent Cooperation Treaty gives you a way to keep your options open without filing everywhere at once. It does not grant an international patent — no such thing exists — but it defers the expensive decisions.",
      },
      { type: "heading", text: "How it works" },
      {
        type: "paragraph",
        text: "You file a single PCT application, usually within twelve months of your first national filing. That one application has legal effect in every PCT member state. An International Searching Authority produces a search report and a written opinion on patentability. Then, typically thirty or thirty-one months from your priority date, you enter the national phase in the specific countries you have chosen.",
      },
      {
        type: "list",
        items: [
          "Months 0–12: first filing, often a national provisional",
          "Month 12: file the PCT application",
          "Months 16–18: international search report and written opinion issued",
          "Month 18: application publishes",
          "Months 30–31: national phase entry in chosen countries",
        ],
      },
      { type: "heading", text: "What you gain" },
      {
        type: "paragraph",
        text: "The extra eighteen months between a direct foreign filing deadline and national phase entry is time to assess the invention commercially, raise money, and read the search report before spending on translations and local agents in each country.",
      },
      {
        type: "quote",
        text: "The PCT does not make protection cheaper overall. It makes the big spend later and better informed.",
      },
      { type: "heading", text: "When a direct filing is better" },
      {
        type: "paragraph",
        text: "If you already know you only want two or three specific countries, filing directly in each under the Paris Convention within twelve months can be faster and cheaper than routing through the PCT. The PCT earns its keep when the list of target countries is long or still undecided.",
      },
    ],
  },
  {
    slug: "responding-to-a-first-examination-report",
    title: "Responding to a First Examination Report",
    excerpt:
      "The FER is not a rejection. It is the examiner's opening position, and a well-structured response is how most Indian applications get to grant.",
    date: "2026-06-24",
    coverImage: "/images/blog/responding-to-a-first-examination-report.svg",
    body: [
      {
        type: "paragraph",
        text: "The First Examination Report is the patent office's formal list of objections to your application. Getting one is routine — almost every application receives one. What matters is the response, which in India must be filed within the prescribed period from the date the FER is issued.",
      },
      { type: "heading", text: "What the FER typically contains" },
      {
        type: "list",
        items: [
          "Novelty and inventive-step objections citing specific prior-art documents",
          "Objections under Section 3 that the subject matter is not patentable",
          "Clarity, support, and definitiveness objections on the claims",
          "Formal requirements — drawings, the priority document, statements about corresponding foreign applications",
        ],
      },
      { type: "heading", text: "Building the response" },
      {
        type: "paragraph",
        text: "For each substantive objection, the response either argues that the objection is wrong or amends the claims to overcome it — and usually a combination. Amendments cannot add matter beyond the original disclosure, so the room to manoeuvre was set when the specification was drafted. A good technical argument distinguishes the invention from the cited art on a feature that is actually claimed, not just mentioned.",
      },
      {
        type: "quote",
        text: "The strongest responses engage with the examiner's specific reasoning rather than restating the invention. Show why the cited document does not lead a skilled person to your claim.",
      },
      { type: "heading", text: "The hearing" },
      {
        type: "paragraph",
        text: "If objections remain after the written response, the applicant is offered a hearing. This is an opportunity, not a bad sign — a short discussion often resolves points that several rounds of paper could not, and written submissions after the hearing lock in what was agreed.",
      },
      {
        type: "paragraph",
        text: "Deadlines in prosecution are strict and mostly non-extendable. The response should be scoped and started well before the due date, not in the final week.",
      },
    ],
  },
];

// ---- ACCESS LAYER (import these, not the array) ----
export const getPosts = (): BlogPost[] =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string): BlogPost | undefined =>
  posts.find((p) => p.slug === slug);

export const getPostSlugs = (): string[] => posts.map((p) => p.slug);
