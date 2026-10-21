"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export function Header() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e2e8f0]/80">
        {/* Top Credential & Contact Strip */}
        <div className="bg-[#eff4ff] border-b border-[#dbe1ff]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 h-9 flex items-center justify-between text-[11px] font-bold tracking-[0.06em]">
            <div className="flex items-center gap-3 sm:gap-4 text-[#45464d] overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="inline-flex items-center gap-1 text-[#0b1c30]">
                <span className="material-symbols-outlined text-[14px] text-[#0051d5]" aria-hidden="true">
                  verified
                </span>
                CRA-RJ {SITE_CONFIG.credentials.craRj}
              </span>
              <span className="text-[#c6c6cd]">|</span>
              <span className="inline-flex items-center gap-1 text-[#0b1c30]">
                <span className="material-symbols-outlined text-[14px] text-[#0051d5]" aria-hidden="true">
                  real_estate_agent
                </span>
                CRECI-J {SITE_CONFIG.credentials.creciJ}
              </span>
              <span className="text-[#c6c6cd] hidden md:inline">|</span>
              <span className="hidden md:inline-flex items-center gap-1 text-[#0b1c30] font-semibold">
                <span className="material-symbols-outlined text-[14px] text-[#0051d5]" aria-hidden="true">
                  location_on
                </span>
                Copacabana, Zona Sul, Barra da Tijuca e Grande Tijuca — RJ
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <a
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                className="inline-flex items-center gap-1 text-[#0b1c30] hover:text-[#0051d5] transition-colors font-semibold text-[12px] tracking-normal"
              >
                <span className="material-symbols-outlined text-[15px] text-[#0051d5]" aria-hidden="true">
                  phone_iphone
                </span>
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
              <Link
                href="/admin/"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#dce9ff] text-[#0b1c30] hover:bg-[#0051d5] hover:text-white transition-colors uppercase text-[10px] font-bold tracking-wider"
              >
                Painel Editorial
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between gap-4">
          {/* Brand Lockup */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0051d5] rounded-lg"
            aria-label="Síndico Né! - Página Inicial"
          >
            <div className="w-10 h-10 rounded-lg bg-[#131b2e] flex items-center justify-center shadow-xs group-hover:bg-[#0051d5] transition-colors">
              <span className="material-symbols-outlined text-[#d0f121] text-[24px]" aria-hidden="true">
                apartment
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-bold uppercase tracking-tight text-[#0b1c30] group-hover:text-[#0051d5] transition-colors leading-none">
                SÍNDICO NÉ!
              </span>
              <span className="text-[10px] font-bold text-[#45464d] tracking-[0.08em] uppercase mt-1">
                Gestão Condominial RJ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navegação Principal"
            className="hidden xl:flex items-center gap-1"
          >
            {SITE_CONFIG.navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors ${
                    active
                      ? "bg-[#dce9ff] text-[#0b1c30]"
                      : "text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2">
            <a
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#d0f121] text-[#181e00] hover:bg-[#b5d300] transition-colors font-semibold text-[13px] shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                chat
              </span>
              <span>WhatsApp</span>
            </a>

            <Link
              href="/contato/"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0b1c30] text-white hover:bg-[#131b2e] transition-colors font-semibold text-[13px]"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                send
              </span>
              <span>Falar com Síndico</span>
            </Link>

            <Link
              href="/author/adriano/"
              aria-label="Perfil do Síndico Profissional Adriano Toledo"
              title="Adriano Toledo — Síndico Profissional"
              className="hidden sm:flex w-9 h-9 rounded-full bg-[#0b1c30] hover:bg-[#0051d5] text-white items-center justify-center ml-0.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                person
              </span>
            </Link>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-side-slide"
              aria-label="Abrir menu de navegação"
              className="xl:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-[#0b1c30] bg-[#eff4ff] hover:bg-[#dce9ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0051d5]"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Modern PropTech Light) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 xl:hidden flex justify-end bg-[#0b1c30]/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Mobile"
          id="mobile-side-slide"
        >
          <div className="w-80 max-w-[88vw] bg-white text-[#0b1c30] h-full flex flex-col justify-between p-6 shadow-2xl border-l border-[#e2e8f0] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#131b2e] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#d0f121] text-[20px]" aria-hidden="true">
                      apartment
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold uppercase tracking-tight text-[#0b1c30] leading-none">
                      SÍNDICO NÉ!
                    </span>
                    <span className="text-[10px] font-bold text-[#45464d] uppercase tracking-wider mt-0.5">
                      Gestão Condominial RJ
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                  className="p-2 text-[#45464d] hover:text-[#0b1c30] rounded-lg hover:bg-[#eff4ff]"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#d0f121] text-[#181e00] font-semibold text-xs px-3 py-2.5 rounded-lg"
                >
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    chat
                  </span>
                  <span>WhatsApp</span>
                </a>
                <Link
                  href="/contato/"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#0b1c30] text-white font-semibold text-xs px-3 py-2.5 rounded-lg"
                >
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    send
                  </span>
                  <span>Contato</span>
                </Link>
              </div>

              <nav aria-label="Menu Mobile" className="mt-5 flex flex-col gap-1">
                {SITE_CONFIG.navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        active
                          ? "bg-[#dce9ff] text-[#0051d5]"
                          : "text-[#0b1c30] hover:bg-[#eff4ff]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/admin/"
                  onClick={() => setMobileOpen(false)}
                  className="px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#0051d5] bg-[#eff4ff] mt-2"
                >
                  Painel Editorial (CMS)
                </Link>
              </nav>
            </div>

            <div className="pt-5 border-t border-[#e2e8f0] text-xs text-[#45464d] space-y-1.5">
              <p className="font-bold text-[#0b1c30]">
                Síndico Né! · Uma empresa Grupo Ícone-Rio
              </p>
              <p>Rua Xavier da Silveira 45/1009, Copacabana</p>
              <p>Rio de Janeiro-RJ, CEP 22061-010</p>
              <p>(21) 97878-8211 · {SITE_CONFIG.contact.email}</p>
              <p>CNPJ 02.634.709/0001-74</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
