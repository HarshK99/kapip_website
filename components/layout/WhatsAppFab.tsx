import { whatsappHref } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/icons";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-paper transition-colors hover:bg-accent-deep md:hidden"
    >
      <WhatsAppIcon width={24} height={24} />
    </a>
  );
}
