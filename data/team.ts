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
    name: "REPLACE_WITH_FOUNDER_NAME", // DUMMY
    role: "Founder & Managing Partner", // DUMMY
    image: "/images/team/founder.png", // DUMMY placeholder photo
    bio: "A short founder bio goes here — background, focus areas, and what drives the firm's approach to IP. Replace with real copy on content handover.", // DUMMY
  },
];

// ---- Access layer (import these, not the array) ----
export const getPeople = (): Person[] => people;
export const getFounder = (): Person | undefined => people[0];
