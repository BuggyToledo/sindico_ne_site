import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Clock,
  MapPin,
  ExternalLink,
  Shield,
  ArrowUp,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="bg-[#171c24] text-[#9ca2aa] border-t border-white/10">
      {/* Main 3-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: Telefone & Horários */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#d9e141] font-semibold tracking-wider uppercase text-xs">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Central de Atendimento</span>
            </div>
            <p className="text-white text-xl font-bold font-heading tracking-wide">
              <a
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                className="hover:text-[#d9e141] transition-colors"
              >
                (21) 97878-8211
              </a>
            </p>
            <p className="text-sm text-[#c2c7ce]">
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="hover:text-[#d9e141] transition-colors"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </p>
            <div className="flex items-start gap-2.5 text-sm leading-relaxed text-[#c2c7ce]">
              <Clock className="w-4 h-4 text-[#d9e141] shrink-0 mt-1" aria-hidden="true" />
              <div>
                <p>{SITE_CONFIG.openingHours.weekdays}</p>
                <p>{SITE_CONFIG.openingHours.saturday}</p>
                <p className="text-xs text-[#9ca2aa] mt-1">
                  Plantão 24h para emergências condominiais
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-xs space-y-1 text-[#c2c7ce]">
              <p className="flex items-center gap-1.5 font-medium text-white">
                <Shield className="w-3.5 h-3.5 text-[#d9e141]" aria-hidden="true" />
                Credenciais e Seguros Oficiais:
              </p>
              <p>CRA-RJ: {SITE_CONFIG.credentials.craRj} | CRECI-J: {SITE_CONFIG.credentials.creciJ}</p>
              <p>CNPJ: 02.634.709/0001-74</p>
              <p>Seguro RC Síndico até R$ 2.000.000,00 (Tokio Marine / Akad)</p>
            </div>
          </div>

          {/* Column 2: Endereço e Links Rápidos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#d9e141] font-semibold tracking-wider uppercase text-xs">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Sede Copacabana — Rio de Janeiro</span>
            </div>
            <address className="not-italic text-white text-base leading-relaxed font-medium">
              Rua Xavier da Silveira 45/1009, Copacabana
              <br />
              Rio de Janeiro-RJ, CEP 22061-010
            </address>

            <div className="pt-3 border-t border-white/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#d9e141] mb-2">
                Navegação e Conteúdo
              </p>
              <ul className="grid grid-cols-2 gap-1.5 text-sm">
                <li>
                  <Link href="/" className="hover:text-[#d9e141] transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sindico-profissional-na-zona-sul-do-rj/"
                    className="hover:text-[#d9e141] transition-colors"
                  >
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicos-sindico-profissional/"
                    className="hover:text-[#d9e141] transition-colors"
                  >
                    Serviços e Cases
                  </Link>
                </li>
                <li>
                  <Link href="/blog/" className="hover:text-[#d9e141] transition-colors">
                    Blog Editorial
                  </Link>
                </li>
                <li>
                  <Link
                    href="/noticias-e-eventos/"
                    className="hover:text-[#d9e141] transition-colors"
                  >
                    Notícias e Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/contato/" className="hover:text-[#d9e141] transition-colors">
                    Fale Conosco
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politica-de-privacidade/"
                    className="hover:text-[#d9e141] transition-colors"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/author/adriano/"
                    className="hover:text-[#d9e141] transition-colors"
                  >
                    Adriano Toledo
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Portal SIN Icondev & Apps Mobile */}
          <div className="space-y-4">
            <div className="text-[#d9e141] font-semibold tracking-wider uppercase text-xs">
              Acesso Digital ao Condomínio
            </div>
            <p className="text-white text-sm leading-relaxed">
              Acesse as informações e serviços de seu condomínio em tempo real:
            </p>
            <div>
              <a
                href={SITE_CONFIG.portal.sinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#d9e141] hover:bg-[#c5cd32] text-[#171c24] font-bold text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm"
              >
                <span>Clique aqui para acessar o SIN</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="pt-2">
              <p className="text-xs text-[#c2c7ce] mb-3">
                Aplicativo para smartphones iOS e Android:
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SITE_CONFIG.portal.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Baixar aplicativo Síndico Né! na App Store (iOS)"
                  className="inline-block opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={SITE_CONFIG.sinPortal.appStoreBadgeUrl}
                    alt="Disponível na App Store"
                    width={135}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <a
                  href={SITE_CONFIG.portal.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Baixar aplicativo Síndico Né! no Google Play (Android)"
                  className="inline-block opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={SITE_CONFIG.sinPortal.googlePlayBadgeUrl}
                    alt="Disponível no Google Play"
                    width={135}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Identification & Copyright Bar */}
      <div className="border-t border-white/10 bg-[#12161d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-[#c2c7ce]">
          <div className="space-y-1 leading-relaxed">
            <p className="font-semibold text-white text-sm">
              Síndico Né! · Uma empresa Grupo Ícone-Rio
            </p>
            <p>
              Rua Xavier da Silveira 45/1009, Copacabana, Rio de Janeiro-RJ, CEP 22061-010
            </p>
            <p>
              <a
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                className="hover:text-[#d9e141] transition-colors"
              >
                (21) 97878-8211
              </a>{" "}
              ·{" "}
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="hover:text-[#d9e141] transition-colors"
              >
                contato@sindicone.com.br
              </a>
            </p>
            <p>CNPJ 02.634.709/0001-74</p>
            <p className="text-[#9ca2aa] pt-1">
              © 2026 Grupo Ícone-Rio. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex items-center gap-4 self-end md:self-center">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d9e141] transition-colors"
            >
              Instagram
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d9e141] transition-colors"
            >
              Facebook
            </a>
            <a
              href="#top"
              aria-label="Voltar ao topo da página"
              className="inline-flex items-center justify-center w-8 h-8 rounded bg-white/5 hover:bg-[#d9e141] hover:text-[#171c24] transition-colors"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
