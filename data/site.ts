// data/site.ts
// SINGLE SOURCE OF TRUTH for org + contact info.
// All values below are DUMMY placeholders — replace on content handover.
// Components must import { site } or the helpers here; never hardcode contact info.

export type NavItem = { label: string; href: string };

export type Office = {
  /** e.g. "Registered Office", "Bangalore Office" */
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export type Site = {
  name: string;
  tagline: string;
  /** Short positioning statement — the Home hero's big headline. Not the
      full tagline sentence (too long to read well at hero display size);
      keep this to a handful of words. */
  brandLine: string;
  /** E.164, used for tel: — DUMMY */
  phone: string;
  /** digits only, used for https://wa.me/<whatsapp> — DUMMY */
  whatsapp: string;
  email: string;
  /** Registered Office first; additional offices follow. */
  offices: Office[];
  hours?: string;
  /** Web3Forms access key — public by design. DUMMY */
  web3formsKey: string;
  nav: NavItem[];
  /** Social profile URLs — DUMMY placeholders until real profiles exist */
  socials: {
    linkedin: string;
    twitter: string;
  };
  /** Studio credit shown in the footer's bottom bar */
  developer?: string;
};

export const site: Site = {
  name: "KAP IP",
  tagline: "We help you search, draft, file, and defend the ideas that make your business valuable",
  brandLine: "Patent and IP solutions for innovators worldwide",
  phone: "+910000000000", // DUMMY — replace with real E.164 number
  whatsapp: "910000000000", // DUMMY — digits only, country code + number
  email: "hello@example.com", // DUMMY — awaiting real email
  offices: [
    {
      label: "Registered Office",
      line1: "1402, A Block, Royal Aawas Tirupati",
      line2: "Royal Chowk, near Royal Global University, Betkuchi",
      city: "Guwahati",
      state: "Assam",
      pincode: "781035",
      country: "India",
    },
    {
      label: "Bangalore Office",
      line1: "REPLACE_WITH_ADDRESS_LINE_1", // DUMMY
      line2: "REPLACE_WITH_ADDRESS_LINE_2", // DUMMY
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560000", // DUMMY
      country: "India",
    },
  ],
  hours: "Mon–Fri, 10:00–18:00 IST", // DUMMY
  web3formsKey: "REPLACE_WITH_WEB3FORMS_ACCESS_KEY", // DUMMY
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  socials: {
    linkedin: "https://linkedin.com/company/REPLACE_ME", // DUMMY
    twitter: "https://twitter.com/REPLACE_ME", // DUMMY
  },
  developer: "Dragun Labs",
};

// ---- Access helpers (use these in components) ----
export const telHref = () => `tel:${site.phone}`;
export const whatsappHref = (message?: string) =>
  `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
export const mailHref = () => `mailto:${site.email}`;
export const formattedAddress = (office: Office) =>
  [office.line1, office.line2, `${office.city}, ${office.state} ${office.pincode}`, office.country]
    .filter(Boolean)
    .join(", ");
