import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/site-config";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ServicesGrid, TrustBadges } from "@/components/home/ServicesGrid";
import { ShortcutStrip } from "@/components/layout/ShortcutStrip";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getAllArticles } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Síndico Profissional no Rio de Janeiro - Síndico Né!",
  description:
    "Síndico Profissional no Rio de Janeiro (Copacabana, Zona Sul, Barra da Tijuca e Tijuca). Gestão condominial com registro no CRA-RJ (03-06783), CRECI-J (12.974) e Seguro de Responsabilidade Civil até R$ 2 milhões.",
  alternates: {
    canonical: "https://www.sindicone.com.br/",
  },
};

const BAIRROS_ATUACAO = [
  "Copacabana",
  "Ipanema",
  "Leblon",
  "Botafogo",
  "Flamengo",
  "Laranjeiras",
  "Humaitá",
  "Barra da Tijuca",
  "Tijuca",
  "Grande Tijuca",
];

export default async function HomePage() {
  const articles = await getAllArticles({ includeUnpublished: false });
  const recentArticles = articles.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO COCKPIT + 4 CARDS DE DESTAQUE */}
      <div className="bg-gradient-to-b from-[#f8f9ff] via-white to-[#f8f9ff] pb-14 lg:pb-20">
        <HeroCarousel />
        <ShortcutStrip overlap={true} />
      </div>

      {/* SECTION 2: SOBRE / CREDENCIAIS E ATUAÇÃO PRESENCIAL */}
      <section className="w-full py-20 lg:py-24 bg-[#eff4ff] border-y border-[#dbe1ff]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Main Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d3e4fe] text-[#0051d5] mb-4">
                <span
                  className="material-symbols-outlined text-[15px]"
                  aria-hidden="true"
                >
                  verified_user
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em]">
                  ADMINISTRAÇÃO CONDOMINIAL PROFISSIONAL
                </span>
              </div>

              <h2 className="text-[26px] sm:text-[36px] leading-tight font-bold text-[#0b1c30] tracking-[-0.02em] mb-6">
                Gestão Profissional com Responsabilidade, Transparência e
                Presença Ativa no seu Condomínio
              </h2>

              <div className="flex flex-col gap-4 text-[15px] text-[#45464d] leading-relaxed mb-8">
                <p>
                  O <strong className="text-[#0b1c30]">Síndico Né!</strong>{" "}
                  nasceu para profissionalizar a gestão de condomínios
                  residenciais, comerciais e mistos no Rio de Janeiro. Liderado
                  por <strong className="text-[#0b1c30]">Adriano Toledo</strong>{" "}
                  — Síndico Profissional certificado com louvor pela Gábor RH,
                  Administrador e Corretor de Imóveis —, nosso trabalho une
                  rigor financeiro, manutenção preventiva e diálogo construtivo.
                </p>
                <p>
                  Somos empresa regularmente registrada no{" "}
                  <strong className="text-[#0b1c30]">
                    CRA-RJ ({SITE_CONFIG.credentials.craRj})
                  </strong>{" "}
                  e no{" "}
                  <strong className="text-[#0b1c30]">
                    CRECI-J ({SITE_CONFIG.credentials.creciJ})
                  </strong>
                  , contando com seguro de responsabilidade civil profissional
                  de até{" "}
                  <strong className="text-[#0b1c30]">R$ 2.000.000,00</strong>{" "}
                  junto à Tokio Marine e Akad Seguros.
                </p>
              </div>

              {/* Differentials with modern tech icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      trending_down
                    </span>
                  </div>
                  <span className="text-[14px] font-semibold text-[#0b1c30]">
                    Redução comprovada de custos e contratos
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0051d5] flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      shield
                    </span>
                  </div>
                  <span className="text-[14px] font-semibold text-[#0b1c30]">
                    Combate técnico à inadimplência
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      devices
                    </span>
                  </div>
                  <span className="text-[14px] font-semibold text-[#0b1c30]">
                    Acompanhamento em tempo real pelo SIN
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      emergency
                    </span>
                  </div>
                  <span className="text-[14px] font-semibold text-[#0b1c30]">
                    Atendimento 24h para emergências
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/sindico-profissional-na-zona-sul-do-rj/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0b1c30] text-white hover:bg-[#131b2e] transition-all shadow-xs font-semibold text-[14px]"
                >
                  <span>Conheça Nossa Metodologia</span>
                  <span
                    className="material-symbols-outlined text-[18px]"
                    aria-hidden="true"
                  >
                    explore
                  </span>
                </Link>
                <Link
                  href="/contato/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#d0f121] text-[#181e00] hover:bg-[#b5d300] transition-all shadow-xs font-semibold text-[14px]"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    aria-hidden="true"
                  >
                    assignment
                  </span>
                  <span>Solicitar Proposta</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Card Lateral de Atuação Presencial */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-md relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-[#131b2e] flex items-center justify-center text-[#d0f121] mb-5">
                  <span
                    className="material-symbols-outlined text-[28px]"
                    aria-hidden="true"
                  >
                    domain
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#0051d5] uppercase tracking-[0.08em] block mb-2">
                  Presença In Loco
                </span>
                <h3 className="text-[22px] sm:text-[24px] font-bold text-[#0b1c30] tracking-[-0.015em] mb-4">
                  ATUAÇÃO PRESENCIAL NO RIO DE JANEIRO
                </h3>
                <p className="text-[15px] text-[#45464d] mb-6 leading-relaxed">
                  Visitas operacionais periódicas, vistorias prediais e reuniões
                  com comissões de moradores nos principais bairros cariocas:
                </p>

                {/* Bairros Tag Cloud */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {BAIRROS_ATUACAO.map((bairro) => (
                    <span
                      key={bairro}
                      className="px-3 py-1.5 rounded-lg bg-[#e5eeff] text-[#0b1c30] font-semibold text-[13px]"
                    >
                      {bairro}
                    </span>
                  ))}
                </div>

                {/* Regional Map / Headquarters Preview */}
                <div className="w-full h-44 rounded-xl shadow-xs relative overflow-hidden bg-[#131b2e]">
                  <Image
                    src="/wp-content/uploads/2026/06/147.jpg"
                    alt="Atuação presencial do Síndico Né! em Copacabana e Zona Sul do Rio de Janeiro"
                    fill
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0b1c30]/35 backdrop-blur-[1px] flex items-end p-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-[#0b1c30] font-bold text-[11px] uppercase tracking-[0.05em] shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#0051d5] animate-pulse shrink-0" />
                      Sede: Rua Xavier da Silveira 45/1009 - Copacabana
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 8 PILARES DE SERVIÇOS */}
      <ServicesGrid />

      {/* SECTION 4: 6 CREDENCIAIS E GARANTIAS */}
      <TrustBadges />

      {/* SECTION 5: ARTIGOS E GUIAS (BLOG) */}
      <section className="w-full py-20 lg:py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dce9ff] text-[#0051d5] mb-3">
                <span
                  className="material-symbols-outlined text-[15px]"
                  aria-hidden="true"
                >
                  article
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em]">
                  CONTEÚDO TÉCNICO E LEGISLAÇÃO
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[36px] leading-tight font-bold text-[#0b1c30] tracking-[-0.02em] mb-3">
                Artigos e Guias sobre Gestão Condominial
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#45464d] leading-relaxed">
                Orientações práticas fundamentadas no Código Civil (Art. 1.348),
                normas ABNT e boas práticas para síndicos, conselheiros e
                moradores.
              </p>
            </div>

            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#dce9ff] text-[#0b1c30] hover:bg-[#0051d5] hover:text-white transition-all font-semibold text-[14px] shrink-0"
            >
              <span>Acessar o Blog Completo</span>
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                priority={idx < 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section className="w-full py-20 lg:py-24 bg-[#eff4ff] relative overflow-hidden border-t border-[#dbe1ff]/60">
        <div
          className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 bg-[#d0f121]/30 rounded-full blur-3xl -z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-0 left-10 w-72 h-72 bg-[#dbe1ff]/40 rounded-full blur-2xl -z-10"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-6 lg:px-16 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#e2e8f0] shadow-[0_20px_32px_-8px_rgba(15,23,42,0.08)] relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d0f121] text-[#181e00] mb-6 shadow-xs">
              <span
                className="material-symbols-outlined text-[16px]"
                aria-hidden="true"
              >
                contact_support
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em]">
                FALE COM O SÍNDICO NÉ!
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[36px] leading-tight font-bold text-[#0b1c30] max-w-2xl mx-auto mb-4 tracking-[-0.02em]">
              Quer melhorar a gestão financeira e operacional do seu condomínio?
            </h2>

            <p className="text-[16px] sm:text-[18px] text-[#45464d] max-w-xl mx-auto mb-8 leading-relaxed">
              Agende uma apresentação para o Conselho Consultivo ou solicite uma
              proposta personalizada sem compromisso.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contato/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0b1c30] text-white hover:bg-[#131b2e] transition-all shadow-md font-semibold text-[14px] group"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  aria-hidden="true"
                >
                  description
                </span>
                <span>Solicitar Proposta Agora</span>
                <span
                  className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>

              <a
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#d0f121] text-[#181e00] hover:bg-[#b5d300] transition-all shadow-md font-bold text-[14px]"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  aria-hidden="true"
                >
                  chat
                </span>
                <span>WhatsApp (21) 97878-8211</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex flex-wrap items-center justify-center gap-6 text-[12px] font-medium text-[#45464d]">
              <span className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[#0051d5] text-[16px]"
                  aria-hidden="true"
                >
                  check_circle
                </span>
                Diagnóstico Gratuito
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[#0051d5] text-[16px]"
                  aria-hidden="true"
                >
                  schedule
                </span>
                Retorno em até 24 horas úteis
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[#0051d5] text-[16px]"
                  aria-hidden="true"
                >
                  lock
                </span>
                Dados protegidos sob a LGPD
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
