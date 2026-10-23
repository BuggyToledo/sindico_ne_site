import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneCall, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { SERVICE_CASES, getServiceCaseBySlug } from "@/data/services";
import { SITE_CONFIG } from "@/data/site-config";
import { Subheader } from "@/components/layout/Subheader";
import {
  buildBreadcrumbJsonLd,
  buildServiceCaseJsonLd,
} from "@/lib/seo/json-ld";

export async function generateStaticParams() {
  return SERVICE_CASES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceCaseBySlug(slug);
  if (!service) return {};

  const canonical = `https://www.sindicone.com.br/servico-item/${service.slug}/`;
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: canonical,
      images: [service.featuredImage.url],
    },
  };
}

export default async function ServicoItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceCaseBySlug(slug);
  if (!service) notFound();

  const otherCases = SERVICE_CASES.filter((c) => c.slug !== service.slug).slice(
    0,
    3
  );

  const serviceJsonLd = buildServiceCaseJsonLd(service);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos-sindico-profissional/" },
    {
      name: service.serviceTypeName,
      url: `/servico-tipo/${service.serviceTypeSlug}/`,
    },
    { name: service.title, url: `/servico-item/${service.slug}/` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge={service.serviceTypeName}
        title={`${service.title}: ${service.subtitle}`}
        subtitle={service.excerpt}
        breadcrumbs={[
          { label: "Serviços", href: "/servicos-sindico-profissional/" },
          {
            label: service.serviceTypeName,
            href: `/servico-tipo/${service.serviceTypeSlug}/`,
          },
          { label: service.title },
        ]}
      />

      <section className="py-14 bg-[#f4f6f8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="relative aspect-[16/9] w-full bg-[#171c24]">
              <Image
                src={service.featuredImage.url}
                alt={service.featuredImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>

            <div className="p-7 sm:p-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#171c24] bg-[#d9e141] px-3 py-1 rounded">
                    Estudo de Caso Verificado
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#171c24] mt-2">
                    {service.subtitle}
                  </h2>
                </div>
                <Link
                  href={`/servico-tipo/${service.serviceTypeSlug}/`}
                  className="text-xs font-bold uppercase tracking-wider text-[#5c6470] hover:text-[#171c24] border border-gray-200 px-3.5 py-2 rounded-md"
                >
                  Área: {service.serviceTypeName}
                </Link>
              </div>

              <div
                className="article-prose max-w-none text-[#2b313a]"
                dangerouslySetInnerHTML={{
                  __html: service.contentHtml || `<p>${service.excerpt}</p>`,
                }}
              />

              <div className="bg-[#f4f6f8] rounded-xl p-6 border border-gray-200/80 space-y-3">
                <h3 className="font-heading text-lg font-bold text-[#171c24] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#171c24]" aria-hidden="true" />
                  <span>Padrão de Qualidade Síndico Né!</span>
                </h3>
                <p className="text-sm text-[#4a525d] leading-relaxed">
                  Todos os nossos serviços contam com acompanhamento direto de Adriano Toledo (CRA-RJ {SITE_CONFIG.credentials.craRj}), seguros RCP PJ Tokio Marine (R$ 1.000.000,00) e RCP PF Akad Seguros (R$ 1.000.000,00) e acesso transparente pelo Syndic CRM.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
                <Link
                  href="/servicos-sindico-profissional/"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#171c24] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Voltar para todos os Serviços e Casos</span>
                </Link>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/contato/"
                    className="inline-flex items-center gap-2 bg-[#171c24] text-[#d9e141] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-md hover:bg-[#242c38] transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" aria-hidden="true" />
                    <span>Solicitar Proposta</span>
                  </Link>
                  <a
                    href={SITE_CONFIG.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-md hover:bg-[#1ebe5b] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Other Service Cases */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#171c24] mb-5">
              Outros Casos Reais de Atuação
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/servico-item/${c.slug}/`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all block"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#171c24] bg-[#d9e141] px-2 py-0.5 rounded">
                    {c.serviceTypeName}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#171c24] mt-2">
                    {c.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#5c6470] mt-0.5">
                    {c.subtitle}
                  </p>
                  <p className="text-xs text-[#4a525d] mt-2 line-clamp-2">
                    {c.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
