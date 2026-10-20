import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ServicesGrid, TrustBadges } from "@/components/home/ServicesGrid";
import { ShortcutStrip } from "@/components/layout/ShortcutStrip";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getAllArticles } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Síndico Profissional no Rio de Janeiro - Síndico Né!",
  description:
    "Síndico Profissional no Rio de Janeiro (Copacabana, Zona Sul, Barra da Tijuca e Tijuca). Gestão condominial com registro no CRA-RJ (03-06783), CRECI-J (12.974) e Seguro de Responsabilidade Civil até R$ 2 milhões.",
  alternates: {
    canonical: "https://www.sindicone.com.br/",
  },
};

export default async function HomePage() {
  const articles = await getAllArticles({ includeUnpublished: false });
  const recentArticles = articles.slice(0, 3);

  return (
    <div>
      {/* 1. Hero Slider Carousel */}
      <HeroCarousel />

      {/* 2. 4 Overlapping Shortcut Cards */}
      <ShortcutStrip overlap={true} />

      {/* 3. Institutional Presentation Section (Síndico Profissional no RJ) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-7 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171c24] bg-[#d9e141] px-3 py-1 rounded">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Administração Condominial Profissional</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#171c24] leading-tight">
                Gestão Profissional com Responsabilidade, Transparência e Presença Ativa no seu Condomínio
              </h2>

              <p className="text-[#4a525d] text-base leading-relaxed">
                O <strong>Síndico Né!</strong> nasceu para profissionalizar a gestão de condomínios residenciais, comerciais e mistos no Rio de Janeiro. Liderado por{" "}
                <strong>Adriano Toledo</strong> — Síndico Profissional certificado com louvor pela Gábor RH, Administrador e Corretor de Imóveis —, nosso trabalho une rigor financeiro, manutenção preventiva e diálogo construtivo.
              </p>

              <p className="text-[#4a525d] text-base leading-relaxed">
                Somos empresa regularmente registrada no{" "}
                <strong>CRA-RJ ({SITE_CONFIG.credentials.craRj})</strong> e no{" "}
                <strong>CRECI-J ({SITE_CONFIG.credentials.creciJ})</strong>, contando com seguro de responsabilidade civil profissional de até{" "}
                <strong>R$ 2.000.000,00</strong> junto à Tokio Marine e Akad Seguros.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-[#171c24] font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#171c24] shrink-0" aria-hidden="true" />
                  <span>Redução comprovada de custos e contratos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#171c24] shrink-0" aria-hidden="true" />
                  <span>Combate técnico à inadimplência</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#171c24] shrink-0" aria-hidden="true" />
                  <span>Acompanhamento em tempo real pelo SIN</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#171c24] shrink-0" aria-hidden="true" />
                  <span>Atendimento 24h para emergências</span>
                </li>
              </ul>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/sindico-profissional-na-zona-sul-do-rj/"
                  className="inline-flex items-center gap-2 bg-[#171c24] hover:bg-[#252d3a] text-[#d9e141] font-bold text-sm px-6 py-3.5 rounded-md transition-colors"
                >
                  <span>Conheça Nossa Metodologia</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contato/"
                  className="inline-flex items-center gap-2 border border-[#171c24] text-[#171c24] hover:bg-[#171c24] hover:text-white font-bold text-sm px-6 py-3.5 rounded-md transition-colors"
                >
                  <span>Solicitar Proposta</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#171c24] shadow-md">
                <Image
                  src="/wp-content/uploads/2021/10/Design-sem-nome-15.jpg"
                  alt="Gestão Condominial Síndico Né! no Rio de Janeiro"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <div className="bg-[#171c24] text-white p-5 rounded-xl flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#d9e141] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-[#d9e141] uppercase tracking-wider">
                    Atuação Presencial no Rio de Janeiro
                  </p>
                  <p className="mt-1 text-[#d0d6df]">
                    Copacabana, Ipanema, Leblon, Botafogo, Flamengo, Laranjeiras, Humaitá, Barra da Tijuca, Tijuca e Grande Tijuca.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 8 Service Pillars Grid */}
      <ServicesGrid />

      {/* 5. 6 Trust Badges Section */}
      <TrustBadges />

      {/* 6. Editorial Blog & Recent Guides Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#171c24] bg-[#d9e141] px-3 py-1 rounded mb-3">
                Conteúdo Técnico e Legislação
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#171c24]">
                Artigos e Guias sobre Gestão Condominial
              </h2>
              <p className="mt-2 text-[#5c6470] text-base max-w-2xl">
                Orientações práticas fundamentadas no Código Civil (Art. 1.348), normas ABNT e boas práticas para síndicos, conselheiros e moradores.
              </p>
            </div>
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#171c24] hover:underline shrink-0"
            >
              <span>Acessar o Blog Completo</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom Conversion Banner */}
      <section className="py-16 bg-[#171c24] text-white border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#d9e141] text-[#171c24] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">
            Fale com o Síndico Né!
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Quer melhorar a gestão financeira e operacional do seu condomínio?
          </h2>
          <p className="mt-3 text-[#d0d6df] text-base sm:text-lg max-w-2xl mx-auto">
            Agende uma apresentação para o Conselho Consultivo ou solicite uma proposta personalizada sem compromisso.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contato/"
              className="inline-flex items-center gap-2 bg-[#d9e141] hover:bg-[#c5cd32] text-[#171c24] font-bold text-sm px-7 py-3.5 rounded-md transition-colors"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              <span>Solicitar Proposta Agora</span>
            </Link>
            <a
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-sm px-7 py-3.5 rounded-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp {SITE_CONFIG.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
