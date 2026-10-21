import React from "react";
import type { Metadata } from "next";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { Subheader } from "@/components/layout/Subheader";
import { ShortcutStrip } from "@/components/layout/ShortcutStrip";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Contato - Solicite uma Proposta de Síndico Profissional | Síndico Né!",
  description:
    "Entre em contato com o Síndico Né! em Copacabana, Rio de Janeiro. Solicite uma proposta de sindicância profissional para seu condomínio na Zona Sul, Barra da Tijuca ou Tijuca. Tel: (21) 3828-0273.",
  alternates: {
    canonical: "https://www.sindicone.com.br/contato/",
  },
};

export default function ContatoPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Contato", url: "/contato/" },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Atendimento Condominial no RJ"
        title="Entre em Contato com o Síndico Né!"
        subtitle="Solicite uma proposta personalizada de sindicância profissional, agende uma reunião com o conselho ou tire suas dúvidas com nossa equipe em Copacabana."
        breadcrumbs={[{ label: "Contato" }]}
      />

      <ShortcutStrip overlap={true} />

      <section className="py-12 sm:py-16 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: NAP Details, Credentials & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white text-[#0b1c30] rounded-2xl p-7 border border-[#e2e8f0] shadow-xs space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#0051d5] bg-[#dce9ff] px-3 py-1 rounded-full">
                    Canais Oficiais
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-[#0b1c30] mt-2">
                    Fale Diretamente Conosco
                  </h2>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3.5">
                    <Phone
                      className="w-5 h-5 text-[#0051d5] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#45464d] font-semibold">
                        Telefone &amp; Atendimento
                      </p>
                      <a
                        href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                        className="text-lg font-bold text-[#0b1c30] hover:text-[#0051d5]"
                      >
                        (21) 97878-8211
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MessageCircle
                      className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#45464d] font-semibold">
                        WhatsApp Direto
                      </p>
                      <a
                        href={SITE_CONFIG.contact.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-[#0051d5] hover:underline"
                      >
                        {SITE_CONFIG.contact.whatsappDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail
                      className="w-5 h-5 text-[#0051d5] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#45464d] font-semibold">
                        E-mail Corporativo
                      </p>
                      <a
                        href={`mailto:${SITE_CONFIG.contact.email}`}
                        className="text-base font-semibold text-[#0b1c30] hover:text-[#0051d5]"
                      >
                        {SITE_CONFIG.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin
                      className="w-5 h-5 text-[#0051d5] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#45464d] font-semibold">
                        Endereço da Sede (Grupo Ícone-Rio)
                      </p>
                      <address className="not-italic text-[#0b1c30] leading-relaxed font-medium">
                        Rua Xavier da Silveira 45/1009, Copacabana
                        <br />
                        Rio de Janeiro-RJ, CEP 22061-010
                        <br />
                        CNPJ 02.634.709/0001-74
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock
                      className="w-5 h-5 text-[#0051d5] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#45464d] font-semibold">
                        Horário de Funcionamento
                      </p>
                      <p className="text-[#0b1c30] font-medium">
                        De Segunda à Sexta, das 09h00 às 18h00 | Sábado 09h00 às 14h00
                      </p>
                      <p className="text-xs text-[#45464d]">
                        Plantão 24h para emergências nos condomínios administrados
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#e2e8f0] text-xs text-[#45464d] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#0051d5]">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    <span>Garantia Técnica e Registro Profissional</span>
                  </div>
                  <p className="font-medium text-[#0b1c30]">
                    CRA-RJ nº {SITE_CONFIG.credentials.craRj} | CRECI-J nº{" "}
                    {SITE_CONFIG.credentials.creciJ}
                  </p>
                  <p>
                    Seguro de Responsabilidade Civil Síndico de até R$ 2.000.000,00 (Tokio Marine / Akad)
                  </p>
                </div>
              </div>

              {/* Portal SIN Quick Card */}
              <div className="bg-[#eff4ff] rounded-2xl border border-[#dbe1ff] p-6 shadow-xs">
                <h3 className="font-heading text-lg font-bold text-[#0b1c30]">
                  Já é condômino de um prédio administrado pelo Síndico Né!?
                </h3>
                <p className="text-xs sm:text-sm text-[#45464d] mt-1">
                  Acesse segunda via de comunicados, atas, documentos e serviços em tempo real pelo portal SIN:
                </p>
                <a
                  href={SITE_CONFIG.portal.sinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-[#0051d5] hover:bg-[#316bf3] text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors"
                >
                  <span>Acessar Portal SIN</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Column: Validated Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* Lazy-loaded Google Map of Rua Xavier da Silveira 45/1009, Copacabana */}
          <div className="mt-12 bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
            <div className="p-4 sm:px-6 bg-[#eff4ff] border-b border-[#dbe1ff] text-[#0b1c30] flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-semibold">
                Localização: Rua Xavier da Silveira 45/1009, Copacabana, Rio de Janeiro-RJ, CEP 22061-010
              </span>
              <a
                href={SITE_CONFIG.geo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#0051d5] hover:underline"
              >
                Abrir no Google Maps →
              </a>
            </div>
            <iframe
              title="Mapa de Localização Síndico Né! em Copacabana"
              src={SITE_CONFIG.geo.googleMapsEmbedUrl}
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
