import React from "react";
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
      "Planejamento orçamentário rigoroso, prestação de contas em tempo real pelo portal Syndic CRM e cronograma preventivo de manutenção predial na Zona Sul, Barra e Tijuca.",
    primaryCta: {
      label: "Ver Serviços e Casos Reais",
      href: "/servicos-sindico-profissional/",
    },
    secondaryCta: {
      label: "Ver Notícias & Artigos",
      href: "/noticias-e-eventos/",
      icon: "menu_book",
    },
  },
  {
    id: "slide-2",
    icon: "verified_user",
    badge: "SÍNDICO PROFISSIONAL NO RIO DE JANEIRO",
    title: "Síndico profissional na Zona Sul do Rio, perto do seu prédio",
    subtitle:
      "Eu cuido do dia a dia do condomínio, das contas, da manutenção e das assembleias, com prestação de contas clara para todos os moradores. Atendo Copacabana, Ipanema, Leblon, Botafogo e Flamengo.",
    primaryCta: {
      label: "Fale comigo no WhatsApp",
      href: "https://wa.me/5521978788211?text=SINDICO",
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
      href: "/noticias-e-eventos/",
      icon: "gavel",
    },
  },
];

export function HeroCarousel() {
  // Topo fixo (sem carrossel): uma mensagem só, sem JS no cliente.
  const slide = HERO_SLIDES[1];

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

            {/* Micro indicators */}
            <div className="mt-8 pt-6 border-t border-[#e2e8f0]/80 w-full flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-5 text-[#45464d] text-[11px] font-bold uppercase tracking-[0.06em]">
                <span>
                  Administrador registrado no CRA-RJ {SITE_CONFIG.credentials.craRj}. A Síndico Né! tem seguro RCP na Tokio Marine, e o Adriano tem seguro RCP próprio na Akad, cada um de R$ 1.000.000,00.
                </span>
              </div>

            </div>
          </div>

          {/* Coluna direita: fatos verificáveis + foto */}
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <ul className="space-y-3 mb-4" role="list">
              {[
                { icon: "verified_user", t: `Registro ativo no CRA-RJ (${SITE_CONFIG.credentials.craRj})` },
                { icon: "shield", t: "Seguro RCP PJ: Tokio Marine (R$ 1.000.000,00)" },
                { icon: "shield", t: "Seguro RCP PF: Akad Seguros (R$ 1.000.000,00)" },
                { icon: "chat", t: `WhatsApp ${SITE_CONFIG.contact.whatsappDisplay}` },
              ].map((i) => (
                <li key={i.t} className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-[#e2e8f0]">
                  <span className="material-symbols-outlined text-[#0051d5] text-[20px] shrink-0" aria-hidden="true">
                    {i.icon}
                  </span>
                  <span className="text-[14px] font-semibold text-[#0b1c30] break-words min-w-0">{i.t}</span>
                </li>
              ))}
            </ul>
            <div className="relative rounded-xl overflow-hidden h-40 bg-[#131b2e]">
              <Image
                src="/img/hero/cityhall-slider-slidebg1-1080.webp"
                alt="Prédios residenciais no Rio de Janeiro"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
