export type PatentAct = {
  title: string;
  shortTitle: string;
  year: number;
  actNumber?: string;
  kind: "Consolidated Act" | "Amendment Act" | "Related Act";
  summary: string;
  sourceUrl: string;
  sourceLabel: "Read online" | "Open PDF";
  current?: boolean;
};

// Static starter library sourced from Intellectual Property India, the official
// portal of the Office of the Controller General of Patents, Designs & Trade Marks.
export const patentActs: PatentAct[] = [
  {
    title: "The Patents Act, 1970 (incorporating all amendments till 01-08-2024)",
    shortTitle: "The Patents Act, 1970",
    year: 1970,
    actNumber: "39 of 1970",
    kind: "Consolidated Act",
    summary:
      "The principal law governing patents in India, presented with amendments incorporated through 1 August 2024.",
    sourceUrl: "https://ipindia.gov.in/acts/patent-act-1970",
    sourceLabel: "Read online",
    current: true,
  },
  {
    title: "The Jan Vishwas (Amendment of Provisions) Act, 2023",
    shortTitle: "Jan Vishwas Amendment Act",
    year: 2023,
    actNumber: "18 of 2023",
    kind: "Related Act",
    summary:
      "Amends penalty and adjudication provisions across several central laws, including the Patents Act, 1970.",
    sourceUrl:
      "https://ipindia.gov.in/storage/uploads/docs-operator/8f3e28fb-b6af-4e43-bbe9-10fa373274fb.pdf",
    sourceLabel: "Open PDF",
  },
  {
    title: "The Tribunals Reforms Act, 2021",
    shortTitle: "Tribunals Reforms Act",
    year: 2021,
    actNumber: "33 of 2021",
    kind: "Related Act",
    summary:
      "Revises tribunal and appellate arrangements under several laws, including parts of India's patent framework.",
    sourceUrl:
      "https://ipindia.gov.in/storage/uploads/docs-operator/102130cc-39ef-4474-a931-43cafbce3e4f.pdf",
    sourceLabel: "Open PDF",
  },
  {
    title: "The Patents (Amendment) Act, 2005",
    shortTitle: "Patents Amendment Act",
    year: 2005,
    kind: "Amendment Act",
    summary:
      "A major amendment to the Patents Act that updated India's patent regime, including product-patent provisions.",
    sourceUrl:
      "https://ipindia.gov.in/storage/uploads/docs-operator/7ad3887d-496d-4b52-b043-88f86c3dd3d6.pdf",
    sourceLabel: "Open PDF",
  },
  {
    title: "The Patents (Amendment) Act, 2002",
    shortTitle: "Patents Amendment Act",
    year: 2002,
    actNumber: "38 of 2002",
    kind: "Amendment Act",
    summary:
      "Updates the 1970 Act across patent terms, procedures, rights, and safeguards.",
    sourceUrl:
      "https://ipindia.gov.in/storage/uploads/docs-operator/b16c94ac-6cb6-452e-a93c-a3c52b301ac6.pdf",
    sourceLabel: "Open PDF",
  },
  {
    title: "The Patents (Amendment) Act, 1999",
    shortTitle: "Patents Amendment Act",
    year: 1999,
    kind: "Amendment Act",
    summary:
      "Introduced transitional provisions for certain product-patent applications and exclusive marketing rights.",
    sourceUrl:
      "https://ipindia.gov.in/storage/uploads/docs-operator/dcb8f8cb-f35f-4953-8837-e7c1093fa213.pdf",
    sourceLabel: "Open PDF",
  },
];

export const officialPatentActsIndex =
  "https://ipindia.gov.in/resource/patents-resources-act";
