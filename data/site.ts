// data/site.ts
// SINGLE SOURCE OF TRUTH for org + contact info.
// All values below are DUMMY placeholders — replace on content handover.
// Components must import { site } or the helpers here; never hardcode contact info.

export type NavItem = { label: string; href: string };

export type Site = {
  name: string;
  tagline: string;
  /** E.164, used for tel: — DUMMY */
  phone: string;
  /** digits only, used for https://wa.me/<whatsapp> — DUMMY */
  whatsapp: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  hours?: string;
  /** Web3Forms access key — public by design. DUMMY */
  web3formsKey: string;
  nav: NavItem[];
};

export const site: Site = {
  name: "KAP IP",
  tagline: "Strategic patent and IP solutions for innovators worldwide.",
  phone: "+910000000000", // DUMMY — replace with real E.164 number
  whatsapp: "910000000000", // DUMMY — digits only, country code + number
  email: "hello@example.com", // DUMMY — awaiting real email
  address: {
    line1: "1402, A Block, Royal Aawas Tirupati",
    line2: "Ahom Gaon, near Royal Global University, Betkuchi",
    city: "Guwahati",
    state: "Assam",
    pincode: "781035",
    country: "India",
  },
  hours: "Mon–Fri, 10:00–18:00 IST", // DUMMY
  web3formsKey: "REPLACE_WITH_WEB3FORMS_ACCESS_KEY", // DUMMY
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
};

// ---- Access helpers (use these in components) ----
export const telHref = () => `tel:${site.phone}`;
export const whatsappHref = (message?: string) =>
  `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
export const mailHref = () => `mailto:${site.email}`;
export const formattedAddress = () => {
  const a = site.address;
  return [a.line1, a.line2, `${a.city}, ${a.state} ${a.pincode}`, a.country]
    .filter(Boolean)
    .join(", ");
};
