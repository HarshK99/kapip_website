import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import AboutExpertise from "@/components/sections/AboutExpertise";
import AboutApproach from "@/components/sections/AboutApproach";
import AboutNetwork from "@/components/sections/AboutNetwork";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutExpertise />
      <AboutApproach />
      <AboutNetwork />
      <CTA />
    </>
  );
}
