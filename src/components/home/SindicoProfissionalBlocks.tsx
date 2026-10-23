import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site-config";

type Block = {
  id: string;
  icon: string;
  title: string;
  text: string;
  items: string[];
  cta: { label: string; href: string; external?: boolean };
};

const BLOCKS: Block[] = [
  {
    id: "vantagens",
    icon: "verified_user",
    title: "Vantagens do síndico profissional",
    text: "Gestão técnica e imparcial para condomínios em Copacabana e na Zona Sul do RJ, com registro no CRA-RJ e seguros de Responsabilidade Civil Profissional PJ (Tokio Marine) e PF (Akad).",
    items: [
      "Rigor financeiro e prestação de contas transparente",
      "Mediação imparcial de conflitos",
      "Presença ativa no condomínio",
    ],
    cta: {
      label: "Conheça o Síndico Né!",
      href: "/sindico-profissional-na-zona-sul-do-rj/",
    },
  },
  {
    id: "funcoes",
    icon: "assignment",
    title: "Funções do síndico profissional",
    text: "Administração do condomínio conforme o Código Civil (Art. 1.348): finanças, manutenção, pessoas e comunicação com conselho e moradores.",
    items: [
      "Planejamento orçamentário e combate à inadimplência",
      "Manutenção preventiva e vistorias prediais",
      "Acompanhamento pelo portal Syndic CRM",
    ],
    cta: { label: "Ver os serviços", href: "/servicos-sindico-profissional/" },
  },
  {
    id: "contratacao",
    icon: "handshake",
    title: "Como contratar",
    text: "Agende uma apresentação para o Conselho Consultivo ou peça uma proposta personalizada, sem compromisso.",
    items: [
      "Diagnóstico gratuito do condomínio",
      "Retorno em até 24 horas úteis",
      `WhatsApp ${SITE_CONFIG.contact.whatsappDisplay}`,
    ],
    cta: {
      label: "Falar no WhatsApp",
      href: SITE_CONFIG.contact.whatsappUrl,
      external: true,
    },
  },
];

const ctaClass =
  "mt-auto inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0b1c30] text-white hover:bg-[#131b2e] transition-all font-semibold text-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0051d5]";

/** 3 blocos fixos abaixo do topo (substituem o antigo carrossel). Sem JS. */
export function SindicoProfissionalBlocks() {
  return (
    <section
      aria-labelledby="sindico-profissional-blocos"
      className="w-full py-16 lg:py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <h2
          id="sindico-profissional-blocos"
          className="text-[26px] sm:text-[34px] leading-tight font-bold text-[#0b1c30] tracking-[-0.02em] mb-3 max-w-3xl"
        >
          Síndico profissional na Zona Sul do RJ: vantagens, funções e contratação
        </h2>
        <p className="text-[16px] text-[#45464d] leading-relaxed mb-10 max-w-2xl">
          O que muda quando o seu condomínio em Copacabana ou na Zona Sul do Rio
          de Janeiro tem um síndico profissional.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          {BLOCKS.map((b) => (
            <li
              key={b.id}
              id={b.id}
              className="flex flex-col bg-[#f8f9ff] rounded-2xl p-6 border border-[#e2e8f0] shadow-xs"
            >
              <div className="w-11 h-11 rounded-xl bg-[#131b2e] flex items-center justify-center mb-4">
                <span
                  className="material-symbols-outlined text-[#d0f121] text-[22px]"
                  aria-hidden="true"
                >
                  {b.icon}
                </span>
              </div>
              <h3 className="text-[20px] font-bold text-[#0b1c30] mb-3">
                {b.title}
              </h3>
              <p className="text-[15px] text-[#45464d] leading-relaxed mb-4">
                {b.text}
              </p>
              <ul className="space-y-2 mb-6 text-[15px] text-[#0b1c30]">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span
                      className="material-symbols-outlined text-[#0051d5] text-[18px] shrink-0"
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {b.cta.external ? (
                <a
                  href={b.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClass}
                >
                  {b.cta.label}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              ) : (
                <Link href={b.cta.href} className={ctaClass}>
                  {b.cta.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
