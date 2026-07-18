// data/about.ts
// REAL content (client handover). Single source for the About page.
// Access via the exported `about` object; components never hardcode this copy.
// Structured into blocks so the redesign can lay them out as distinct sections
// (intro, expertise grid, approach, values, network, team) rather than one wall of text.

export type AboutContent = {
  /** tight positioning line for the About hero — edit freely */
  lead: string;
  intro: string;
  mission: string;
  /** technology areas — good as an expertise grid */
  domains: string[];
  /** capabilities mentioned in About — good as a chips/list block */
  services: string[];
  approach: string;
  /** the promise triad — good as three quiet cards */
  values: string[];
  network: string;
  team: string;
};

export const about: AboutContent = {
  lead: "Strategic, high-quality, commercially focused IP solutions for innovators worldwide.",

  intro:
    "KAP IP Services is an intellectual property consulting firm committed to delivering strategic, high-quality, and commercially focused IP solutions to innovators, startups, research institutions, universities, and businesses worldwide.",

  mission:
    "Our mission is to help organizations protect, manage, and maximize the value of their intellectual property through comprehensive patent and IP services.",

  domains: [
    "Biotechnology",
    "Pharmaceuticals",
    "Chemistry",
    "Life Sciences",
    "Medical Devices",
    "Engineering",
    "Electronics",
    "Software",
    "Artificial Intelligence",
    "Emerging Technologies",
  ],

  services: [
    "Patent drafting",
    "Patentability searches",
    "Freedom-to-operate (FTO) analyses",
    "Patent landscape studies",
    "Validity and infringement analyses",
    "Patent prosecution",
    "Opposition support",
    "IP portfolio management",
    "Global filing strategies",
  ],

  approach:
    "At KAP IP Services, we believe that effective intellectual property protection begins with a thorough understanding of both technology and business objectives. Our multidisciplinary approach combines technical expertise, legal insight, and commercial awareness to develop practical IP strategies that support innovation, reduce business risks, and create long-term competitive advantage.",

  values: ["Precision", "Confidentiality", "Quality"],

  network:
    "Our growing network of clients and associates extends across India and international markets, reflecting our commitment to delivering reliable, timely, and cost-effective IP solutions. We collaborate closely with inventors, research organizations, technology companies, and legal professionals to safeguard innovations and facilitate successful commercialization in global markets.",

  team:
    "The strength of KAP IP Services lies in its people. Our team consists of experienced patent professionals with expertise in diverse scientific and engineering disciplines. As technology continues to evolve, KAP IP Services remains dedicated to empowering innovators with strategic intellectual property guidance, helping them transform ideas into valuable assets while contributing to the advancement of innovation and technology on a global scale.",
};
