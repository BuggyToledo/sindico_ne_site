"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Phone, ShieldCheck } from "lucide-react";
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
      {/* Top Credential & Contact Strip */}
      <div className="bg-[#0e1217] text-[#a0a8b4] text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 text-white/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d9e141]" aria-hidden="true" />
              CRA-RJ {SITE_CONFIG.credentials.craRj} | CRECI-J {SITE_CONFIG.credentials.creciJ}
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline">
              Copacabana, Zona Sul, Barra da Tijuca e Grande Tijuca — RJ
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              className="hover:text-[#d9e141] transition-colors inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#d9e141]" aria-hidden="true" />
              {SITE_CONFIG.contact.phoneDisplay}
            </a>
            <Link
              href="/admin/"
              className="hidden sm:inline text-white/60 hover:text-[#d9e141] transition-colors"
            >
              Painel Editorial
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header (#Top_bar faithful to BeTheme CityHall) */}
      <header className="sticky top-0 z-40 bg-[#171c24]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d9e141] rounded"
            aria-label="Síndico Né! - Página Inicial"
          >
            <Image
              src={SITE_CONFIG.logoUrl}
              alt="Logo Síndico Né! Administração Condominial Profissional"
              width={185}
              height={52}
              priority
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navegação Principal"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {SITE_CONFIG.navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 text-[15px] font-medium tracking-wide transition-colors relative rounded ${
                    active
                      ? "text-[#d9e141]"
                      : "text-white hover:text-[#d9e141]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#d9e141] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button (Original BeTheme "Instagram >" Lime Pill + CTA) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SITE_CONFIG.actionButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#d9e141] hover:bg-[#c5cd32] text-[#171c24] font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm transition-all"
            >
              <span>{SITE_CONFIG.actionButton.label}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-side-slide"
            aria-label="Abrir menu de navegação"
            className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-md text-[#d9e141] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d9e141]"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer (#Side_slide dark #191919 faithful to BeTheme) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Mobile"
          id="mobile-side-slide"
        >
          <div className="w-72 max-w-[85vw] bg-[#191919] text-white h-full flex flex-col justify-between p-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <Image
                  src={SITE_CONFIG.logoUrl}
                  alt="Síndico Né!"
                  width={140}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                  className="p-2 text-[#a6a6a6] hover:text-white rounded-md"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5">
                <a
                  href={SITE_CONFIG.actionButton.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#d9e141] text-[#171c24] font-semibold text-sm px-4 py-2.5 rounded-full"
                >
                  <span>{SITE_CONFIG.actionButton.label}</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              <nav aria-label="Menu Mobile" className="mt-6 flex flex-col divide-y divide-white/10">
                {SITE_CONFIG.navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`py-3 text-base font-medium transition-colors ${
                        active ? "text-[#d9e141]" : "text-white hover:text-[#d9e141]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/admin/"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm text-[#a6a6a6] hover:text-[#d9e141]"
                >
                  Painel Editorial (CMS)
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-[#a6a6a6] space-y-2">
              <p className="font-semibold text-white">Atendimento Síndico Né!</p>
              <p>{SITE_CONFIG.contact.phoneDisplay}</p>
              <p>WhatsApp: {SITE_CONFIG.contact.whatsappDisplay}</p>
              <p>{SITE_CONFIG.address.fullDisplay}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
