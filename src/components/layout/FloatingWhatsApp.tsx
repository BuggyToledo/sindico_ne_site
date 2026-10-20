"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
      gtag("event", "whatsapp_click", {
        event_category: "conversion",
        event_label: "floating_whatsapp_button",
      });
    }
  };

  return (
    <a
      href={SITE_CONFIG.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      aria-label="Conversar pelo WhatsApp com o Síndico Né!"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold text-sm px-4 py-3 rounded-full shadow-xl transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <MessageCircle className="w-5 h-5 fill-current" aria-hidden="true" />
      <span className="hidden sm:inline">Atendimento WhatsApp</span>
    </a>
  );
}
