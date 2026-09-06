// data/team.ts
// People shown as cards (Home team section). Values below are DUMMY
// placeholders — replace on content handover. Components must import
// getPeople()/getFounder(), never a raw array.
//
// The About page's narrative team paragraph lives separately in
// data/about.ts (`about.team`) — do not duplicate that copy here.

export type Person = {
  name: string;
  role: string;
  /** path under public/images — DUMMY placeholder until real photo arrives */
  image: string;
  bio: string;
};

const people: Person[] = [
  {
    name: "Poonam Chetry", // DUMMY
    role: "Founder & Managing Partner", // DUMMY
    image: "/images/team/founder.png", // DUMMY placeholder photo
    bio: "Poonam leads KAP IP Services. She has spent over a decade working with scientists, startups, and research institutions on patent strategy across biotechnology, pharmaceuticals, and engineering, handling portfolios from first filing through prosecution in multiple jurisdictions. Her focus is careful drafting and filing decisions that match each client's commercial priorities.", // DUMMY
  },
];

// ---- Access layer (import these, not the array) ----
export const getPeople = (): Person[] => people;
export const getFounder = (): Person | undefined => people[0];
