import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import AboutExpertise from "@/components/sections/AboutExpertise";
import AboutApproach from "@/components/sections/AboutApproach";
import Statement from "@/components/ui/Statement";
import Team from "@/components/sections/Team";
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
      {/* DUMMY statement copy — `\n` authors the two balanced lines */}
      <Statement>{"An idea is only as strong as\nthe claim that protects it."}</Statement>
      <Team />
      <AboutNetwork />
      <CTA />
    </>
  );
}
