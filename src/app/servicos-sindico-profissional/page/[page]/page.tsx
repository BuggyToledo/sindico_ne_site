import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SERVICE_CASES, SERVICE_TYPES } from "@/data/services";
import { Subheader } from "@/components/layout/Subheader";
import { ShortcutStrip } from "@/components/layout/ShortcutStrip";
import { Pagination } from "@/components/blog/Pagination";

export async function generateStaticParams() {
  const perPage = 6;
  const totalPages = Math.ceil(SERVICE_CASES.length / perPage);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const pageNum = Number(page) || 1;
  return {
    title: `Serviços de Síndico Profissional — Página ${pageNum} - Síndico Né!`,
    description: `Portfólio de serviços e casos reais de gestão condominial do Síndico Né! no Rio de Janeiro — Página ${pageNum}.`,
    alternates: {
      canonical:
        pageNum === 1
          ? "https://www.sindicone.com.br/servicos-sindico-profissional/"
          : `https://www.sindicone.com.br/servicos-sindico-profissional/page/${pageNum}/`,
    },
  };
}

export default async function ServicosPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = Number(page);
  const perPage = 6;
  const totalPages = Math.ceil(SERVICE_CASES.length / perPage);

  if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > totalPages) {
    notFound();
  }

  const start = (pageNum - 1) * perPage;
  const pageCases = SERVICE_CASES.slice(start, start + perPage);

  return (
    <div>
      <Subheader
        badge={`Portfólio — Página ${pageNum} de ${totalPages}`}
        title="Serviços de Síndico Profissional e Casos Reais"
        subtitle="Estudos de caso reais de gestão financeira, manutenção predial e redução de inadimplência no Rio de Janeiro."
        breadcrumbs={[
          { label: "Serviços", href: "/servicos-sindico-profissional/" },
          { label: `Página ${pageNum}` },
        ]}
      />

      <ShortcutStrip overlap={true} />

      <section className="py-14 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-[#4a525d] hover:bg-[#171c24] hover:text-[#d9e141]"
              >
                {st.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {pageCases.map((item) => (
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
                    <p className="mt-3 text-sm text-[#4a525d] line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex justify-end">
                  <Link
                    href={`/servico-item/${item.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#171c24]"
                  >
                    <span>Ver Estudo de Caso</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            basePath="/servicos-sindico-profissional"
          />
        </div>
      </section>
    </div>
  );
}
