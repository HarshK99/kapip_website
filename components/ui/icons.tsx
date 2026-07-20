import type { SVGProps } from "react";

// Shared, restrained line-art icons — currentColor, no brand colors, matching
// the Mark's fine-line aesthetic. Used wherever a contact/social affordance
// needs an icon (Footer, WhatsAppFab, ...).

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.6-1.21A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 9.5c0 3.5 2.5 6 6 6 .8 0 1-1.8.6-2.2l-1.6-.9c-.3-.2-.7-.1-.9.2l-.3.5c-1-.5-1.9-1.4-2.4-2.4l.5-.3c.3-.2.4-.6.2-.9l-.9-1.6c-.4-.4-2.2-.2-2.2.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="7.5" r="1.1" fill="currentColor" />
      <path d="M7.5 10.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 18v-4.5c0-1.4 1-2.5 2.3-2.5s2.2 1 2.2 2.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 10.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 6.5c-.6.3-1.2.5-1.9.6a3.3 3.3 0 0 0 1.4-1.8c-.6.4-1.3.6-2.1.8a3.3 3.3 0 0 0-5.6 3c-2.7-.1-5.2-1.4-6.8-3.4a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4 0 1.6 1.2 3 2.7 3.3-.5.1-1 .2-1.5.1a3.3 3.3 0 0 0 3.1 2.3A6.7 6.7 0 0 1 4 17.4a9.4 9.4 0 0 0 5.1 1.5c6.1 0 9.5-5.1 9.5-9.5v-.4c.6-.5 1.2-1 1.6-1.7Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
