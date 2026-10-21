"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/site-config";

const HERO_SLIDES = [
  {
    id: "slide-1",
    icon: "tune",
    badge: "GESTÃO FINANCEIRA E MANUTENÇÃO PREDIAL",
    title: "Redução de Custos, Controle da Inadimplência e Valorização Patrimonial",
    subtitle:
      "Planejamento orçamentário rigoroso, prestação de contas em tempo real pelo portal SIN e cronograma preventivo de manutenção predial na Zona Sul, Barra e Tijuca.",
    primaryCta: {
      label: "Ver Serviços e Casos Reais",
      href: "/servicos-sindico-profissional/",
    },
    secondaryCta: {
      label: "Ler Guia Condominial",
      href: "/blog/",
      icon: "menu_book",
    },
  },
  {
    id: "slide-2",
    icon: "verified_user",
    badge: "SÍNDICO PROFISSIONAL NO RIO DE JANEIRO",
    title: "Administração Condominial Profissional, Transparente e Segura",
    subtitle:
      "Atuação técnica registrada no CRA-RJ (03-06783) e CRECI-J (12.974), com apólice de responsabilidade civil de até R$ 2.000.000,00 para tranquilidade total dos condôminos.",
    primaryCta: {
      label: "Solicitar Diagnóstico",
      href: "/contato/",
    },
    secondaryCta: {
      label: "Conheça Nossa História",
      href: "/sindico-profissional-na-zona-sul-do-rj/",
      icon: "domain",
    },
  },
  {
    id: "slide-3",
    icon: "support_agent",
    badge: "ATENDIMENTO PRESENCIAL E EMERGÊNCIAS 24H",
    title: "Presença Ativa no Condomínio e Mediação Imparcial de Conflitos",
    subtitle:
      "Sede própria em Copacabana e equipe preparada para atender síndicos, conselheiros e moradores com agilidade, ética e cumprimento rigoroso do Código Civil.",
    primaryCta: {
      label: "Falar com Especialista",
      href: "/contato/",
    },
    secondaryCta: {
      label: "Artigos e Jurisprudência",
      href: "/blog/",
      icon: "gavel",
    },
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = HERO_SLIDES[current];

  return (
    <section
      aria-label="Destaque Principal Síndico Né!"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-white to-[#f8f9ff] pt-8 pb-6 lg:pt-14 lg:pb-10"
    >
      {/* Ambient subtle background lighting circles */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[880px] h-[420px] bg-[#dbe1ff]/40 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 right-[-100px] w-96 h-96 bg-[#d0f121]/25 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d0f121] text-[#181e00] shadow-xs mb-6">
              <span
                className="material-symbols-outlined text-[16px] text-[#181e00]"
                aria-hidden="true"
              >
                {slide.icon}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em]">
                {slide.badge}
              </span>
            </div>

            <h1 className="text-[34px] leading-[40px] sm:text-[46px] sm:leading-[54px] lg:text-[52px] lg:leading-[60px] font-extrabold text-[#0b1c30] tracking-[-0.03em] mb-6">
              {slide.title}
            </h1>

            <p className="text-[17px] sm:text-[18px] leading-[28px] text-[#45464d] max-w-2xl mb-8">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href={slide.primaryCta.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0b1c30] text-white hover:bg-[#131b2e] transition-all shadow-md font-semibold text-[14px] group"
              >
                <span>{slide.primaryCta.label}</span>
                <span
                  className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>

              <Link
                href={slide.secondaryCta.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff] border border-[#dbe1ff] transition-all shadow-xs font-semibold text-[14px]"
              >
                <span
                  className="material-symbols-outlined text-[18px] text-[#0051d5]"
                  aria-hidden="true"
                >
                  {slide.secondaryCta.icon}
                </span>
                <span>{slide.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Micro indicators + Slide selector */}
            <div className="mt-8 pt-6 border-t border-[#e2e8f0]/80 w-full flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-5 text-[#45464d] text-[11px] font-bold uppercase tracking-[0.06em]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  CRA-RJ {SITE_CONFIG.credentials.craRj} Ativo
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0051d5]" />
                  CRECI-J {SITE_CONFIG.credentials.creciJ} Homologado
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#b5d300]" />
                  RC Tokio Marine &amp; Akad
                </span>
              </div>

              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label="Alternar destaque principal"
              >
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === current}
                    aria-label={`Destaque ${idx + 1}: ${s.badge}`}
                    onClick={() => setCurrent(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === current
                        ? "w-7 bg-[#0051d5]"
                        : "w-2 bg-[#cbd5e1] hover:bg-[#94a3b8]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Real-time Governance Cockpit ("Painel Síndico Né! • SIN") */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_20px_32px_-8px_rgba(15,23,42,0.08)] p-6 relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#f1f5f9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#131b2e] flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#d0f121] text-[22px]"
                      aria-hidden="true"
                    >
                      bar_chart
                    </span>
                  </div>
                  <div>
                    <div className="text-[16px] font-bold text-[#0b1c30]">
                      Painel Síndico Né! • SIN
                    </div>
                    <div className="text-[12px] text-[#45464d]">
                      Zona Sul &amp; Barra da Tijuca • RJ
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#0051d5] text-[10px] font-bold uppercase tracking-[0.08em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* SVG Inadimplência & Economia Data Visualization */}
              <div className="bg-[#eff4ff] rounded-xl p-4 mb-4 border border-[#dbe1ff]/60">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#45464d]">
                    Taxa de Inadimplência Condominial
                  </span>
                  <span className="text-[15px] text-emerald-600 font-bold">
                    -64% no 1º semestre
                  </span>
                </div>
                <svg
                  className="w-full h-24 text-[#0051d5]"
                  fill="none"
                  viewBox="0 0 320 80"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Gráfico de redução da taxa de inadimplência condominial em 64% no primeiro semestre"
                >
                  <path
                    d="M0,65 Q40,55 80,48 T160,32 T240,24 T320,12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <path
                    d="M0,65 Q40,55 80,48 T160,32 T240,24 T320,12 L320,80 L0,80 Z"
                    fill="currentColor"
                    fillOpacity="0.08"
                  />
                  <circle cx="240" cy="24" fill="currentColor" r="4" />
                  <circle
                    className="fill-[#d0f121] stroke-[#0b1c30]"
                    cx="320"
                    cy="12"
                    r="5"
                    strokeWidth="2"
                  />
                </svg>
                <div className="flex justify-between text-[11px] text-[#45464d] font-bold uppercase tracking-[0.05em] mt-2">
                  <span>Mês 01 (Entrada)</span>
                  <span>Mês 03 (Auditoria)</span>
                  <span>Mês 06 (Equilíbrio)</span>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#f8f9ff] rounded-xl p-3.5 border border-[#e2e8f0]">
                  <div className="flex items-center justify-between text-[#0051d5] mb-1">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      savings
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#45464d]">
                      Economia Média
                    </span>
                  </div>
                  <div className="text-[22px] font-bold text-[#0b1c30] leading-tight">
                    Até 20%
                  </div>
                  <div className="text-[12px] text-[#45464d] mt-0.5">
                    Revisão de contratos fixos
                  </div>
                </div>

                <div className="bg-[#f8f9ff] rounded-xl p-3.5 border border-[#e2e8f0]">
                  <div className="flex items-center justify-between text-[#0051d5] mb-1">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      shield_with_heart
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#45464d]">
                      Seguro Garantido
                    </span>
                  </div>
                  <div className="text-[22px] font-bold text-[#0b1c30] leading-tight">
                    R$ 2,0 Mi
                  </div>
                  <div className="text-[12px] text-[#45464d] mt-0.5">
                    Tokio Marine &amp; Akad
                  </div>
                </div>
              </div>

              {/* Integrated Image Preview */}
              <div className="relative rounded-xl overflow-hidden shadow-xs h-36 bg-[#131b2e]">
                <Image
                  src="/wp-content/uploads/2019/10/cityhall-slider-slidebg1.jpg"
                  alt="Condomínios residenciais e comerciais administrados na Zona Sul, Barra da Tijuca e Grande Tijuca no Rio de Janeiro"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/85 via-[#0b1c30]/20 to-transparent flex items-end p-3.5">
                  <span className="text-white text-[11px] font-bold uppercase tracking-[0.05em] flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[#d0f121] text-[16px]"
                      aria-hidden="true"
                    >
                      location_on
                    </span>
                    Presença Diária: Copacabana, Ipanema, Barra e Grande Tijuca
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
