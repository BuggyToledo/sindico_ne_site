import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, PhoneCall } from "lucide-react";
import {
  SERVICE_TYPES,
  getServiceCasesByTypeSlug,
} from "@/data/services";
import { Subheader } from "@/components/layout/Subheader";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export async function generateStaticParams() {
  return SERVICE_TYPES.map((st) => ({ slug: st.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const serviceType = SERVICE_TYPES.find((s) => s.slug === slug);
  if (!serviceType) return {};

  const canonical = `https://www.sindicone.com.br/servico-tipo/${serviceType.slug}/`;
  return {
    title: `${serviceType.name} | Serviços de Síndico Profissional | Síndico Né!`,
    description: serviceType.description,
    alternates: { canonical },
  };
}

export default async function ServicoTipoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceType = SERVICE_TYPES.find((s) => s.slug === slug);
  if (!serviceType) notFound();

  const cases = getServiceCasesByTypeSlug(slug);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos-sindico-profissional/" },
    { name: serviceType.name, url: `/servico-tipo/${serviceType.slug}/` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Especialidade Condominial"
        title={serviceType.name}
        subtitle={serviceType.description}
        breadcrumbs={[
          { label: "Serviços", href: "/servicos-sindico-profissional/" },
          { label: serviceType.name },
        ]}
      />

      <section className="py-14 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/servicos-sindico-profissional/"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-[#4a525d] hover:bg-[#171c24] hover:text-[#d9e141]"
            >
              Todos os Serviços
            </Link>
            {SERVICE_TYPES.map((st) => (
              <Link
                key={st.slug}
                href={`/servico-tipo/${st.slug}/`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  st.slug === serviceType.slug
                    ? "bg-[#171c24] text-[#d9e141]"
                    : "bg-white border border-gray-200 text-[#4a525d] hover:bg-[#171c24] hover:text-[#d9e141]"
                }`}
              >
                {st.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {cases.map((item) => (
              <article
                key={item.slug}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/servico-item/${item.slug}/`}
                    className="relative block aspect-[16/10] bg-[#171c24]"
                  >
                    <Image
                      src={item.featuredImage.url}
                      alt={item.featuredImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#171c24] bg-[#d9e141] px-2.5 py-0.5 rounded">
                      {item.serviceTypeName}
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-[#171c24] mt-2">
                      <Link href={`/servico-item/${item.slug}/`}>
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-xs font-semibold text-[#5c6470] mt-1">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-sm text-[#4a525d]">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex justify-end">
                  <Link
                    href={`/servico-item/${item.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#171c24]"
                  >
                    <span>Ler Estudo de Caso Completo</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="bg-[#171c24] text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold">
                Precisa de apoio em {serviceType.name} no seu condomínio?
              </h2>
              <p className="text-sm text-[#c2c7ce] mt-1">
                Converse com a equipe do Síndico Né! e solicite um diagnóstico técnico sem compromisso.
              </p>
            </div>
            <Link
              href="/contato/"
              className="inline-flex items-center gap-2 bg-[#d9e141] text-[#171c24] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-md shrink-0"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              <span>Solicitar Proposta</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
