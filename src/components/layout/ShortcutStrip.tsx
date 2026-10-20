import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SHORTCUT_CARDS } from "@/data/site-config";

/**
 * Reconstructs the 4 signature BeTheme overlapping shortcut cards (`margin-top:-60px`)
 * present across Home, Sobre Nós, Serviços, Notícias e Eventos, and Contato.
 */
export function ShortcutStrip({ overlap = true }: { overlap?: boolean }) {
  return (
    <section
      aria-label="Atalhos Rápidos"
      className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        overlap ? "-mt-10 sm:-mt-14 mb-12" : "my-12"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#171c24] rounded-lg shadow-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-white/10 border border-white/10">
        {SHORTCUT_CARDS.map((card) => {
          const isExternal = card.external;
          const content = (
            <div className="group p-6 sm:p-7 flex flex-col justify-between h-full hover:bg-[#1f2631] transition-colors">
              <div>
                <span className="inline-block text-[11px] font-bold tracking-widest text-[#d9e141] uppercase mb-2">
                  Síndico Né!
                </span>
                <h2 className="font-heading text-lg font-bold text-white group-hover:text-[#d9e141] transition-colors flex items-center justify-between gap-2">
                  <span>{card.title}</span>
                  <ArrowRight
                    className="w-4 h-4 text-[#d9e141] group-hover:translate-x-1 transition-transform shrink-0"
                    aria-hidden="true"
                  />
                </h2>
                <p className="mt-2 text-sm text-[#b0b7c0] leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );

          if (isExternal) {
            return (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d9e141]"
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={card.title}
              href={card.href}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d9e141]"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
