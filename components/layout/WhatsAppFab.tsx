import { whatsappHref } from "@/data/site";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-paper transition-colors hover:bg-accent-deep md:hidden"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    </a>
  );
}
