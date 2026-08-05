import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyKAP from "@/components/sections/WhyKAP";
import Stats from "@/components/sections/Stats";
import Team from "@/components/sections/Team";
import TalkToUs from "@/components/sections/TalkToUs";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesOverview />
      <WhyKAP />
      <Stats />
      <Team />
      <TalkToUs />
    </>
  );
}
