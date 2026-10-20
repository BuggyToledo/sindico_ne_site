"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

const SLIDES = [
  {
    id: "slide-1",
    badge: "SÍNDICO PROFISSIONAL NO RIO DE JANEIRO",
    title: "Administração Condominial Profissional, Transparente e Segura",
    subtitle:
      "Atuação técnica registrada no CRA-RJ (03-06783) e CRECI-J (12.974), com apólice de responsabilidade civil de até R$ 2.000.000,00 para tranquilidade total dos condôminos.",
    image: "/wp-content/uploads/2019/10/cityhall-slider-slidebg1.jpg",
    primaryCta: { label: "Solicitar Diagnóstico", href: "/contato/" },
    secondaryCta: {
      label: "Conheça Nossa História",
      href: "/sindico-profissional-na-zona-sul-do-rj/",
    },
  },
  {
    id: "slide-2",
    badge: "GESTÃO FINANCEIRA E MANUTENÇÃO PREDIAL",
    title: "Redução de Custos, Controle da Inadimplência e Valorização Patrimonial",
    subtitle:
      "Planejamento orçamentário rigoroso, prestação de contas em tempo real pelo portal SIN e cronograma preventivo de manutenção predial na Zona Sul, Barra e Tijuca.",
    image: "/wp-content/uploads/2019/10/cityhall-slider-slidebg2.jpg",
    primaryCta: {
      label: "Ver Serviços e Casos Reais",
      href: "/servicos-sindico-profissional/",
    },
    secondaryCta: { label: "Ler Guia Condominial", href: "/blog/" },
  },
  {
    id: "slide-3",
    badge: "ATENDIMENTO PRESENCIAL E EMERGÊNCIAS 24H",
    title: "Presença Ativa no Condomínio e Mediação Imparcial de Conflitos",
    subtitle:
      "Sede própria em Copacabana e equipe preparada para atender síndicos, conselheiros e moradores com agilidade, ética e cumprimento rigoroso do Código Civil.",
    image: "/wp-content/uploads/2019/10/cityhall-slider-slidebg3.jpg",
    primaryCta: { label: "Falar com Especialista", href: "/contato/" },
    secondaryCta: {
      label: "Artigos e Jurisprudência",
      href: "/blog/",
    },
  },
];

/**
 * Lightweight, zero-jQuery replacement for BeTheme's Slider Revolution (`#rev_slider_1_1`).
 * Preloads Slide 1 with Next/Image `priority` for optimal Largest Contentful Paint (LCP).
 */
export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Destaques Síndico Né!"
      className="relative bg-[#171c24] text-white min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-center overflow-hidden"
    >
      {/* Background Slide Image */}
      {SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
          aria-hidden={idx !== current}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171c24]/95 via-[#171c24]/85 to-[#171c24]/60" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#d9e141]/15 border border-[#d9e141]/40 text-[#d9e141] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>{slide.badge}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12]">
            {slide.title}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#d6dce5] leading-relaxed max-w-2xl">
            {slide.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={slide.primaryCta.href}
              className="inline-flex items-center gap-2 bg-[#d9e141] hover:bg-[#c5cd32] text-[#171c24] font-bold text-base px-7 py-3.5 rounded-md shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              <span>{slide.primaryCta.label}</span>
            </Link>
            <Link
              href={slide.secondaryCta.href}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold text-base px-6 py-3.5 rounded-md transition-all"
            >
              <span>{slide.secondaryCta.label}</span>
            </Link>
          </div>

          {/* Slide Controls */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar slide">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === current}
                  aria-label={`Slide ${idx + 1}: ${s.badge}`}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === current
                      ? "w-8 bg-[#d9e141]"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={() =>
                  setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
                }
                aria-label="Slide anterior"
                className="p-1.5 rounded bg-white/10 hover:bg-[#d9e141] hover:text-[#171c24] text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
                aria-label="Próximo slide"
                className="p-1.5 rounded bg-white/10 hover:bg-[#d9e141] hover:text-[#171c24] text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <span className="text-xs text-white/60 hidden sm:inline">
              Atendimento: {SITE_CONFIG.contact.phoneDisplay}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
