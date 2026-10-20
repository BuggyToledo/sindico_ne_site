import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_SERVICES_GRID, TRUST_BADGES } from "@/data/site-config";

export function ServicesGrid() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#171c24] bg-[#d9e141] px-3 py-1 rounded mb-3">
            Gestão Condominial Completa
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#171c24] tracking-tight">
            Soluções de Sindicância Profissional para o seu Condomínio
          </h2>
          <p className="mt-4 text-[#5c6470] text-base sm:text-lg leading-relaxed">
            Atuamos com metodologia própria, presença ativa e total transparência para valorizar o patrimônio dos condôminos e garantir tranquilidade ao conselho.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_SERVICES_GRID.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-[#f8f9fa] hover:bg-[#171c24] border border-gray-200/80 rounded-xl p-6 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-lg"
            >
              <div>
                <div className="w-16 h-16 rounded-lg bg-white group-hover:bg-white/10 p-2.5 flex items-center justify-center mb-5 shadow-xs">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={52}
                    height={52}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#171c24] group-hover:text-[#d9e141] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#5c6470] group-hover:text-[#d0d6df] leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-200/60 group-hover:border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171c24] group-hover:text-[#d9e141]">
                <span>Ver estudo de caso</span>
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBadges() {
  return (
    <section className="py-16 sm:py-20 bg-[#f4f6f8] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#171c24] bg-[#d9e141] px-3 py-1 rounded mb-3">
            Diferenciais Exclusivos
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#171c24]">
            Por que escolher o Síndico Né! para administrar seu condomínio?
          </h2>
          <p className="mt-3 text-[#5c6470] text-base">
            Segurança jurídica, qualificação técnica comprovada e atendimento rápido em toda a Zona Sul, Barra da Tijuca e Grande Tijuca.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.title}
              className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs flex items-start gap-4"
            >
              <div className="w-16 h-16 shrink-0 rounded-lg bg-[#f4f6f8] p-2 flex items-center justify-center">
                <Image
                  src={badge.image}
                  alt={badge.title}
                  width={56}
                  height={56}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#171c24]">
                  {badge.title}
                </h3>
                <p className="mt-1 text-sm text-[#5c6470] leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
