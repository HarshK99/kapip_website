import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, getServiceSlugs } from "@/data/services";
import ServiceDetail from "@/components/sections/ServiceDetail";
import SubServiceExplorer from "@/components/sections/SubServiceExplorer";
import CTA from "@/components/sections/CTA";

type ServicePageParams = { slug: string };

export function generateStaticParams(): ServicePageParams[] {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ServicePageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  return service ? { title: service.name } : {};
}

export default async function ServicePage({
  params,
}: {
  params: Promise<ServicePageParams>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceDetail service={service} />
      {service.subServices.length > 0 ? (
        <SubServiceExplorer subServices={service.subServices} />
      ) : null}
      <CTA />
    </>
  );
}
