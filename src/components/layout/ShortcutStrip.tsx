import React from "react";
import Link from "next/link";
import { SHORTCUT_CARDS } from "@/data/site-config";

const CARD_META = [
  {
    icon: "feed",
    badgeClass:
      "bg-[#dce9ff] text-[#0051d5] group-hover:bg-[#0051d5] group-hover:text-white",
    ctaLabel: "Acessar acervo →",
    ctaClass: "text-[#0051d5]",
  },
  {
    icon: "star",
    badgeClass:
      "bg-[#dce9ff] text-amber-500 group-hover:bg-amber-500 group-hover:text-white",
    ctaLabel: "Ver avaliações →",
    ctaClass: "text-amber-600",
  },
  {
    icon: "balance",
    badgeClass:
      "bg-[#dce9ff] text-[#0051d5] group-hover:bg-[#0051d5] group-hover:text-white",
    ctaLabel: "Comparar modelos →",
    ctaClass: "text-[#0051d5]",
  },
  {
    icon: "chat",
    badgeClass:
      "bg-[#d0f121] text-[#181e00] group-hover:bg-[#181e00] group-hover:text-[#d0f121]",
    ctaLabel: "Conversar agora →",
    ctaClass: "text-emerald-600",
  },
];

/**
 * 4 interactive quick-access PropTech cards matching the new light-mode design.
 */
export function ShortcutStrip({ overlap = false }: { overlap?: boolean }) {
  return (
    <section
      aria-label="Atalhos Rápidos"
      className={`relative z-20 max-w-7xl mx-auto px-6 lg:px-16 ${
        overlap ? "mt-6 mb-10" : "my-10"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SHORTCUT_CARDS.map((card, idx) => {
          const meta = CARD_META[idx] || CARD_META[0];
          const isExternal = card.external;

          const cardInner = (
            <div className="group bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${meta.badgeClass}`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      {meta.icon}
                    </span>
                  </span>
                  <span
                    className="material-symbols-outlined text-[#45464d] group-hover:text-[#0051d5] transition-colors text-[18px]"
                    aria-hidden="true"
                  >
                    north_east
                  </span>
                </div>
                <h3 className="text-[14px] font-bold text-[#0b1c30] group-hover:text-[#0051d5] transition-colors mb-1 leading-snug">
                  Síndico Né! {card.title}
                </h3>
                <p className="text-[13px] text-[#45464d] leading-snug">
                  {card.subtitle}
                </p>
              </div>
              <span
                className={`text-[11px] font-bold uppercase tracking-[0.08em] mt-3 inline-flex items-center gap-1 ${meta.ctaClass}`}
              >
                {meta.ctaLabel}
              </span>
            </div>
          );

          if (isExternal) {
            return (
              <a
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0051d5] rounded-xl"
              >
                {cardInner}
              </a>
            );
          }

          return (
            <Link
              key={card.id}
              href={card.href}
              className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0051d5] rounded-xl"
            >
              {cardInner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
