import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyKAP from "@/components/sections/WhyKAP";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesOverview />
      <WhyKAP />
      <CTA />
    </>
  );
}
