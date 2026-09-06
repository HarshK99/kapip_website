// data/stats.ts
// Numbers/stats strip (Home page). Values below are DUMMY placeholders.
// ACCEPTANCE NOTE: these figures MUST be verified and truthful before launch
// — do not ship placeholder numbers to production.

export type Stat = {
  value: number;
  label: string;
  /** appended after the count-up value, e.g. "+" */
  suffix?: string;
};

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Patents filed" }, // DUMMY
  { value: 120, suffix: "+", label: "Clients served" }, // DUMMY
  { value: 10, suffix: "+", label: "Years of experience" }, // DUMMY
  { value: 90, suffix: "%", label: "Patent grant rate" }, // DUMMY
];

// ---- Access layer (import this, not the array) ----
export const getStats = (): Stat[] => stats;
