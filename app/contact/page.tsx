import type { Metadata } from "next";
import ContactBlock from "@/components/sections/ContactBlock";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return <ContactBlock />;
}
