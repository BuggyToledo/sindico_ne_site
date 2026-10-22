import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2, PhoneCall, Building2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { Subheader } from "@/components/layout/Subheader";
import { ShortcutStrip } from "@/components/layout/ShortcutStrip";
import { TrustBadges } from "@/components/home/ServicesGrid";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Síndico Profissional na Zona Sul do RJ - Síndico Né!",
  description:
    "Conheça a história, credenciais (CRA-RJ 03-06783) e metodologia do Síndico Né! para administração condominial profissional na Zona Sul, Barra da Tijuca e Tijuca.",
  alternates: {
    canonical: "https://www.sindicone.com.br/sindico-profissional-na-zona-sul-do-rj/",
  },
};

export default function SobreNosPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    {
      name: "Sobre Nós — Síndico Profissional na Zona Sul do RJ",
      url: "/sindico-profissional-na-zona-sul-do-rj/",
    },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Quem Somos"
        title="Síndico Profissional na Zona Sul do Rio de Janeiro"
        subtitle="Excelência técnica, transparência na prestação de contas e presença constante na Zona Sul do RJ, com atendimento também na Barra da Tijuca e Tijuca."
        breadcrumbs={[
          { label: "Sobre Nós — Síndico Profissional na Zona Sul do RJ" },
        ]}
      />

      <ShortcutStrip overlap={true} />

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* History & Founder */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block bg-[#d9e141] text-[#171c24] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                Nossa Trajetória e Propósito
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#171c24]">
                Compromisso com a Gestão Condominial Ética, Técnica e Segura
              </h2>

              <p className="text-[#3b424d] text-base leading-relaxed">
                O <strong>Síndico Né!</strong> nasceu da vivência prática na gestão de edifícios residenciais e comerciais no Rio de Janeiro. Nosso fundador,{" "}
                <strong>Adriano Toledo</strong>, iniciou sua trajetória como morador eleito síndico em seu próprio condomínio, onde liderou uma profunda reestruturação financeira, recuperou áreas comuns degradadas e reduziu drasticamente a inadimplência histórica.
              </p>

              <p className="text-[#3b424d] text-base leading-relaxed">
                Para oferecer o mais alto padrão técnico ao mercado condominial carioca, Adriano Toledo graduou-se e especializou-se, obtendo certificação de{" "}
                <strong>Síndico Profissional aprovado com louvor pela Gábor RH</strong>, além de manter registros profissionais ativos como Administrador e Corretor de Imóveis.
              </p>

              <p className="text-[#3b424d] text-base leading-relaxed">
                Diferente de atuações informais, o <strong>Síndico Né!</strong> opera como pessoa jurídica regularmente inscrita no órgão fiscalizador:{" "}
                <strong>CRA-RJ ({SITE_CONFIG.credentials.craRj})</strong>, garantindo respaldo institucional completo aos condomínios contratantes.
              </p>

              <div className="bg-[#f4f6f8] border-l-4 border-[#171c24] p-5 rounded-r-xl space-y-2">
                <div className="flex items-center gap-2 font-heading text-lg font-bold text-[#171c24]">
                  <ShieldCheck className="w-5 h-5 text-[#171c24]" aria-hidden="true" />
                  <span>Garantia Patrimonial de até R$ 2.000.000,00</span>
                </div>
                <p className="text-sm text-[#4a525d] leading-relaxed">
                  Contamos com seguros de Responsabilidade Civil Profissional contratados junto à{" "}
                  <strong>Tokio Marine</strong> e à <strong>Akad Seguros</strong> com cobertura de até{" "}
                  <strong>R$ 2.000.000,00</strong> para eventuais prejuízos em que o síndico seja responsabilizado civilmente, trazendo segurança real para o patrimônio coletivo.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#eff4ff] text-[#0b1c30] rounded-2xl p-7 border border-[#dbe1ff] shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#131b2e] flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#d0f121]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#0b1c30]">
                      Credenciais Verificáveis
                    </h3>
                    <p className="text-xs text-[#45464d]">
                      Regularidade Técnica e Jurídica no RJ
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-[#334155]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0051d5] shrink-0 mt-1" aria-hidden="true" />
                    <span>
                      <strong>Conselho Regional de Administração:</strong> Registro PJ CRA-RJ nº {SITE_CONFIG.credentials.craRj}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0051d5] shrink-0 mt-1" aria-hidden="true" />
                    <span>
                      <strong>Certificação Especializada:</strong> Síndico Profissional aprovado com louvor pela Gábor RH
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0051d5] shrink-0 mt-1" aria-hidden="true" />
                    <span>
                      <strong>Sede em Copacabana (Grupo Ícone-Rio):</strong> Rua Xavier da Silveira, 45/1009 - Copacabana, Rio de Janeiro-RJ, CEP 22061-010 (CNPJ 02.634.709/0001-74)
                    </span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-[#dbe1ff] flex flex-wrap items-center gap-4">
                  <Image
                    src="/wp-content/uploads/2025/07/CRA.jpg"
                    alt="Registro CRA-RJ"
                    width={64}
                    height={64}
                    className="w-14 h-14 object-contain bg-white rounded-lg p-1.5 border border-[#e2e8f0]"
                  />
                  <Image
                    src="/wp-content/uploads/2025/07/TOWN.jpg"
                    alt="Certificação TownSq"
                    width={64}
                    height={64}
                    className="w-14 h-14 object-contain bg-white rounded-lg p-1.5 border border-[#e2e8f0]"
                  />
                  <Image
                    src="/wp-content/uploads/2026/07/tokio.jpg"
                    alt="Seguros Tokio Marine e Akad"
                    width={64}
                    height={64}
                    className="w-14 h-14 object-contain bg-white rounded-lg p-1.5 border border-[#e2e8f0]"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0051d5] mb-2">
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                  <span>Regiões de Atendimento</span>
                </div>
                <p className="text-sm text-[#45464d] leading-relaxed">
                  Nossa atuação principal concentra-se na <strong>Zona Sul do Rio de Janeiro</strong> (Copacabana, Leme, Ipanema, Leblon, Botafogo, Flamengo, Jardim Botânico, Laranjeiras, Catete, Glória, Humaitá e Gávea), atendendo também condomínios na <strong>Barra da Tijuca</strong> e <strong>Tijuca</strong>.
                </p>
                <Link
                  href="/contato/"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#0b1c30] text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded-lg hover:bg-[#131b2e] transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#d0f121]" aria-hidden="true" />
                  <span>Agendar Apresentação ao Conselho</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />
    </div>
  );
}
