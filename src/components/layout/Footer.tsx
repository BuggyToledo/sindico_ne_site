import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#e2e8f0] shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Coluna 1: Identidade & Credenciais */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-block py-1" aria-label="Síndico Né! - Página Inicial">
              <Image
                src="/logo-sindicone-roxo-verde.svg"
                alt="Síndico Né! Administração Condominial"
                width={220}
                height={27}
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </Link>

            <p className="text-[13px] leading-relaxed text-[#45464d] mt-1">
              Administração Condominial Profissional com rigor financeiro,
              transparência jurídica e governança predial moderna no Rio de
              Janeiro.
            </p>

            <div className="flex flex-col gap-1.5 mt-2 text-[11px] font-bold uppercase tracking-[0.06em] text-[#0b1c30]">
              <span className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[15px] text-[#0051d5]"
                  aria-hidden="true"
                >
                  shield
                </span>
                CRA-RJ: {SITE_CONFIG.credentials.craRj}
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[15px] text-[#0051d5]"
                  aria-hidden="true"
                >
                  verified_user
                </span>
                Seguro RC Síndico e Empresa
              </span>
            </div>

            <div className="text-[12px] text-[#45464d] pt-2 border-t border-[#e2e8f0] space-y-0.5">
              <p className="font-semibold text-[#0b1c30]">Horário de Atendimento</p>
              <p>{SITE_CONFIG.openingHours.weekdays}</p>
              <p>{SITE_CONFIG.openingHours.saturday}</p>
              <p className="text-[11px] text-[#0051d5] font-semibold">
                Plantão 24h para emergências condominiais
              </p>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#0b1c30] uppercase tracking-wide">
              Navegação
            </h3>
            <nav aria-label="Links do Rodapé" className="flex flex-col gap-2 text-[13px]">
              <Link
                href="/"
                className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/sindico-profissional-na-zona-sul-do-rj/"
                className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
              >
                O Síndico Profissional
              </Link>
              <Link
                href="/servicos-sindico-profissional/"
                className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
              >
                Serviços e Soluções
              </Link>
              <Link
                href="/noticias-e-eventos/"
                className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
              >
                Notícias &amp; Eventos
              </Link>
              <Link
                href="/author/adriano/"
                className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
              >
                Adriano Toledo (Autor)
              </Link>
              <Link
                href="/politica-de-privacidade/"
                className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/contato/"
                className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
              >
                Atendimento &amp; Propostas
              </Link>
            </nav>
          </div>

          {/* Coluna 3: Áreas de Atuação - RJ & Endereço */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#0b1c30] uppercase tracking-wide">
              Áreas de Atuação - RJ
            </h3>
            <ul className="flex flex-col gap-2 text-[13px] text-[#45464d]">
              <li className="flex items-center gap-1.5 font-semibold text-[#0b1c30]">
                <span
                  className="material-symbols-outlined text-[15px] text-[#0051d5]"
                  aria-hidden="true"
                >
                  pin_drop
                </span>
                Zona Sul do Rio de Janeiro:
              </li>
              <li className="pl-5 text-[12px]">
                Copacabana, Leme, Ipanema, Leblon, Botafogo, Flamengo, Jardim Botânico, Laranjeiras, Humaitá, Catete, Glória e Gávea
              </li>
              <li className="flex items-center gap-1.5 pt-1 font-semibold text-[#0b1c30]">
                <span
                  className="material-symbols-outlined text-[15px] text-[#0051d5]"
                  aria-hidden="true"
                >
                  pin_drop
                </span>
                Atendimento Adicional:
              </li>
              <li className="pl-5 text-[12px]">
                Barra da Tijuca &amp; Tijuca
              </li>
            </ul>

            <div className="mt-2 pt-3 border-t border-[#e2e8f0] text-[12px] text-[#45464d]">
              <p className="font-bold text-[#0b1c30] uppercase tracking-wider text-[11px] mb-1">
                Sede Copacabana
              </p>
              <address className="not-italic leading-relaxed">
                Rua Xavier da Silveira, 45/1009 - Copacabana
                <br />
                Rio de Janeiro-RJ, CEP 22061-010
              </address>
            </div>
          </div>

          {/* Coluna 4: Syndic CRM */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#0b1c30] uppercase tracking-wide">
              Syndic CRM
            </h3>
            <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#dbe1ff]">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="material-symbols-outlined text-[#0051d5] text-[20px]"
                  aria-hidden="true"
                >
                  devices
                </span>
                <span className="text-[14px] font-semibold text-[#0b1c30]">
                  Acesso Syndic CRM
                </span>
              </div>
              <p className="text-[12px] text-[#45464d] mb-3 leading-relaxed">
                Plataforma de gestão condominial para condôminos, conselho e administração.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://app.crm-syndic.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2.5 rounded-lg bg-[#0051d5] text-white font-semibold text-[13px] hover:bg-[#316bf3] transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px] mr-1" aria-hidden="true">
                    login
                  </span>
                  Acessar App Syndic
                </a>
                <a
                  href="https://crm-syndic.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2 rounded-lg bg-white text-[#0b1c30] border border-[#dbe1ff] font-semibold text-[12px] hover:bg-[#dce9ff] transition-colors"
                >
                  Visitar Site Syndic CRM →
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-[13px] text-[#45464d] mt-1">
              <a
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                className="flex items-center gap-2 hover:text-[#0051d5] transition-colors font-semibold text-[#0b1c30]"
              >
                <span
                  className="material-symbols-outlined text-[16px] text-[#0051d5]"
                  aria-hidden="true"
                >
                  call
                </span>
                (21) 97878-8211
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-2 hover:text-[#0051d5] transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[16px] text-[#0051d5]"
                  aria-hidden="true"
                >
                  mail
                </span>
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bloco Obrigatório de Identificação Corporativa Grupo Ícone-Rio */}
        <div className="mt-10 pt-6 border-t border-[#e2e8f0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[13px] text-[#45464d]">
          <div className="space-y-1 leading-relaxed">
            <p className="font-bold text-[#0b1c30] text-[14px]">
              Síndico Né! ·{" "}
              <a
                href="https://www.icone-rio.com.br/"
                target="_blank"
                rel="noopener"
                className="hover:underline"
              >
                Uma empresa Grupo Ícone-Rio
              </a>
            </p>
            <p>CNPJ {SITE_CONFIG.cnpj}</p>
            <p className="text-[#64748b] pt-0.5">
              © 2026 Grupo Ícone-Rio. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
            >
              Instagram
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
            >
              Facebook
            </a>
            <Link
              href="/politica-de-privacidade/"
              className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
            >
              Privacidade &amp; LGPD
            </Link>
            <Link
              href="/admin/"
              className="inline-flex items-center min-h-12 md:min-h-0 text-[#45464d] hover:text-[#0051d5] transition-colors"
            >
              Painel Editorial
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
