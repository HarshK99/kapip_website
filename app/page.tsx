import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import AboutPreview from "@/components/sections/AboutPreview";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyKAP from "@/components/sections/WhyKAP";
import Statement from "@/components/ui/Statement";
import TalkToUs from "@/components/sections/TalkToUs";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />
      <ServicesOverview />
      <WhyKAP />
      {/* DUMMY statement copy — the firm's positioning, in its own voice */}
      <Statement dimLead>Fewer filings. Stronger claims.</Statement>
      <TalkToUs />
    </>
  );
}
