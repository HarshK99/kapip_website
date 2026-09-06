import type { Metadata } from "next";
import PatentActsLibrary from "@/components/sections/PatentActsLibrary";

export const metadata: Metadata = {
  title: "Patent Acts",
  description:
    "Browse the Indian Patents Act, key amendments, and related legislation with links to official IP India sources.",
};

export default function PatentActsPage() {
  return <PatentActsLibrary />;
}
