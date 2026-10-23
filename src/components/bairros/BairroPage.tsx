import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site-config";
import { Subheader } from "@/components/layout/Subheader";
import { BAIRROS, faqJsonLd } from "@/data/bairros";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

function get(slug: string) {
  const b = BAIRROS.find((x) => x.slug === slug);
  if (!b) throw new Error(`bairro ${slug}`);
  return b;
}

export function bairroMetadata(slug: string): Metadata {
  const b = get(slug);
  const url = `${SITE_CONFIG.url}/${b.slug}/`;
  return {
    title: b.title,
    description: b.meta,
    alternates: { canonical: url },
    openGraph: { title: b.title, description: b.meta, url, type: "website", locale: "pt_BR", siteName: SITE_CONFIG.name },
  };
}

export function BairroPage({ slug }: { slug: string }) {
  const b = get(slug);
  const url = `${SITE_CONFIG.url}/${b.slug}/`;
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Síndico Profissional na Zona Sul do RJ", url: "/sindico-profissional-na-zona-sul-do-rj/" },
    { name: b.nome, url: `/${b.slug}/` },
  ]);
  const outros = BAIRROS.filter((x) => x.slug !== b.slug);
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {b.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(b.faq, url)) }} />
      )}
      <Subheader
        badge="Síndico profissional na Zona Sul do RJ"
        title={b.h1}
        subtitle={b.meta.replace(/ Fale no WhatsApp\.$/, "")}
        breadcrumbs={[
          { label: "Zona Sul do RJ", href: "/sindico-profissional-na-zona-sul-do-rj/" },
          { label: b.nome },
        ]}
      />
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5 text-[16px] leading-relaxed text-[#3b424d]">
          {b.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          <p>
            <a
              href="https://wa.me/5521978788211?text=SINDICO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center px-6 py-3 rounded-lg bg-[#0b1c30] text-white font-semibold text-[15px] w-full sm:w-auto"
            >
              Fale comigo no WhatsApp
            </a>
          </p>
        </div>
      </section>
      {b.faq.length > 0 && (
        <section className="py-10 sm:py-14 bg-[#f4f6f8]" aria-labelledby="faq-bairro">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 id="faq-bairro" className="font-heading text-2xl sm:text-3xl font-bold text-[#171c24] mb-6">
              Perguntas frequentes sobre síndico profissional em {b.nome}
            </h2>
            <div className="space-y-4">
              {b.faq.map((f) => (
                <div key={f.q} className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-[#171c24] text-[17px] mb-2">{f.q}</h3>
                  <p className="text-[15px] text-[#3b424d] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="py-10 sm:py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-[15px] text-[#3b424d] space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#171c24]">Veja também</h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {outros.map((o) => (
              <li key={o.slug}>
                <Link href={`/${o.slug}/`} className="inline-flex min-h-11 items-center px-4 py-2 rounded-lg border border-gray-200 hover:bg-[#eff4ff]">
                  Síndico profissional {o.h1.includes(" no ") ? "no" : "em"} {o.nome}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/" className="underline">Página inicial</Link> ·{" "}
            <Link href="/sindico-profissional-na-zona-sul-do-rj/" className="underline">Síndico profissional na Zona Sul do RJ</Link> ·{" "}
            <Link href="/servicos-sindico-profissional/" className="underline">Serviços</Link> ·{" "}
            <Link href="/contato/" className="underline">Contato</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
