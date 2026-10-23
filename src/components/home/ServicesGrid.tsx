import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HOME_SERVICES_GRID, TRUST_BADGES } from "@/data/site-config";

const SERVICE_ICONS = [
  "corporate_fare",
  "support_agent",
  "account_balance_wallet",
  "handshake",
  "published_with_changes",
  "engineering",
  "groups",
  "policy",
];

const BADGE_META: Record<string, { tag: string; tagClass: string }> = {
  "tokio-marine": {
    tag: "PJ",
    tagClass: "bg-emerald-100 text-emerald-800",
  },
  "akad-seguro": {
    tag: "PF",
    tagClass: "bg-emerald-100 text-emerald-800",
  },
  "cra-rj": {
    tag: "OFICIAL",
    tagClass: "bg-blue-100 text-[#0051d5]",
  },
  "syndic-crm": {
    tag: "PROPTECH",
    tagClass: "bg-purple-100 text-purple-800",
  },
  townsq: {
    tag: "CERTIFICADO",
    tagClass: "bg-yellow-100 text-yellow-900",
  },
};

export function ServicesGrid() {
  return (
    <section className="w-full py-20 lg:py-24 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dce9ff] text-[#0051d5] mb-3">
            <span
              className="material-symbols-outlined text-[15px]"
              aria-hidden="true"
            >
              construction
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]">
              GESTÃO CONDOMINIAL COMPLETA
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] leading-tight font-bold text-[#0b1c30] tracking-[-0.02em] mb-4">
            Soluções de Sindicância Profissional para o seu Condomínio
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#45464d] leading-relaxed">
            Atuamos com metodologia própria, presença ativa e total
            transparência para valorizar o patrimônio dos condôminos e garantir
            tranquilidade ao conselho.
          </p>
        </div>

        {/* Grade moderna de 8 cards com visual tech claro */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_SERVICES_GRID.map((item, idx) => {
            const iconName = SERVICE_ICONS[idx] || "corporate_fare";
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs hover:shadow-lg hover:border-[#cbd5e1] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#e5eeff] group-hover:bg-[#0051d5] flex items-center justify-center text-[#0051d5] group-hover:text-white transition-colors mb-5">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      aria-hidden="true"
                    >
                      {iconName}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-bold text-[#0b1c30] group-hover:text-[#0051d5] transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-[#45464d] mb-6 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <span className="text-[14px] font-semibold text-[#0051d5] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  <span>Ver estudo de caso</span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TrustBadges() {
  return (
    <section className="w-full py-20 lg:py-24 bg-[#eff4ff] border-y border-[#dbe1ff]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dce9ff] text-[#0b1c30] mb-3">
            <span
              className="material-symbols-outlined text-[16px] text-[#0051d5]"
              aria-hidden="true"
            >
              verified
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]">
              DIFERENCIAIS EXCLUSIVOS
            </span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] leading-tight font-bold text-[#0b1c30] tracking-[-0.02em] mb-4">
            Por que escolher o Síndico Né! para administrar seu condomínio?
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#45464d] leading-relaxed">
            Segurança jurídica, qualificação técnica comprovada e atendimento
            rápido em toda a Zona Sul, Barra da Tijuca e Grande Tijuca.
          </p>
        </div>

        {/* Grid de 6 cards de credenciais/garantias com logos oficiais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_BADGES.map((badge) => {
            const meta = BADGE_META[badge.id] || {
              tag: "OFICIAL",
              tagClass: "bg-blue-100 text-[#0051d5]",
            };
            return (
              <div
                key={badge.id}
                className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                  <Image
                    src={badge.imageUrl}
                    alt={badge.alt}
                    width={badge.width}
                    height={badge.height}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-[18px] font-bold text-[#0b1c30]">
                      {badge.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.08em] ${meta.tagClass}`}
                    >
                      {meta.tag}
                    </span>
                  </div>
                  <p className="text-[15px] text-[#45464d] leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
