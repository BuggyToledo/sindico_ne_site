import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { SERVICE_CASES, SERVICE_TYPES } from "@/data/services";
import { Subheader } from "@/components/layout/Subheader";
import { ShortcutStrip } from "@/components/layout/ShortcutStrip";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Pagination } from "@/components/blog/Pagination";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Serviços de Síndico Profissional e Casos Reais - Síndico Né!",
  description:
    "Conheça os serviços de sindicância profissional do Síndico Né! e confira estudos de caso reais de redução de custos, controle de inadimplência, manutenção predial e implantação de condomínios no RJ.",
  alternates: {
    canonical: "https://www.sindicone.com.br/servicos-sindico-profissional/",
  },
};

export default function ServicosPage() {
  const perPage = 6;
  const pageCases = SERVICE_CASES.slice(0, perPage);
  const totalPages = Math.ceil(SERVICE_CASES.length / perPage);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos-sindico-profissional/" },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Atuação Comprovada"
        title="Serviços de Síndico Profissional e Casos Reais de Gestão"
        subtitle="Conheça os pilares da nossa administração condominial e veja como solucionamos desafios reais em condomínios do Rio de Janeiro."
        breadcrumbs={[{ label: "Serviços e Casos Reais" }]}
      />

      <ShortcutStrip overlap={true} />

      <ServicesGrid />

      {/* Case Studies Portfolio Section */}
      <section className="py-16 bg-[#f4f6f8] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="inline-block bg-[#d9e141] text-[#171c24] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">
              Portfólio de Resultados
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#171c24]">
              Estudos de Caso Reais em Condomínios Administrados
            </h2>
            <p className="mt-2 text-[#5c6470] text-base">
              Filtre por área de atuação ou explore os casos reais documentados pela nossa equipe:
            </p>
          </div>

          {/* Service Type Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <Link
              href="/servicos-sindico-profissional/"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#171c24] text-[#d9e141]"
            >
              Todos os Casos ({SERVICE_CASES.length})
            </Link>
            {SERVICE_TYPES.map((st) => (
              <Link
                key={st.slug}
                href={`/servico-tipo/${st.slug}/`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-[#4a525d] hover:bg-[#171c24] hover:text-[#d9e141] transition-colors"
              >
                {st.name}
              </Link>
            ))}
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {pageCases.map((item) => (
              <article
                key={item.slug}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/servico-item/${item.slug}/`}
                    className="relative block aspect-[16/10] bg-[#171c24] overflow-hidden"
                  >
                    <Image
                      src={item.featuredImage.url}
                      alt={item.featuredImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#171c24]/90 text-[#d9e141] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {item.serviceTypeName}
                    </span>
                  </Link>

                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-[#171c24]">
                      <Link
                        href={`/servico-item/${item.slug}/`}
                        className="hover:underline decoration-[#d9e141]"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#5c6470] mt-1">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-sm text-[#4a525d] leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/servico-tipo/${item.serviceTypeSlug}/`}
                    className="text-xs text-[#5c6470] hover:text-[#171c24]"
                  >
                    Categoria: {item.serviceTypeName}
                  </Link>
                  <Link
                    href={`/servico-item/${item.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#171c24]"
                  >
                    <span>Ver Detalhes</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            currentPage={1}
            totalPages={totalPages}
            basePath="/servicos-sindico-profissional"
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#eff4ff] border-t border-[#dbe1ff]/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e2e8f0] shadow-md space-y-4">
            <h2 className="font-heading text-3xl font-bold text-[#0b1c30]">
              Seu condomínio enfrenta desafios semelhantes?
            </h2>
            <p className="text-[#45464d] text-base max-w-2xl mx-auto">
              Solicite um diagnóstico técnico e conheça nossa proposta de trabalho para o seu condomínio.
            </p>
            <div className="pt-2">
              <Link
                href="/contato/"
                className="inline-flex items-center gap-2 bg-[#0b1c30] text-white font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-[#131b2e] transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#d0f121]" aria-hidden="true" />
                <span>Solicitar Diagnóstico Condominial</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
