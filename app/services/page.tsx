import type { Metadata } from "next";
import ServicesHub from "@/components/sections/ServicesHub";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return <ServicesHub />;
}
