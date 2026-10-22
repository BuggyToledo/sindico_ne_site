import React from "react";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { Subheader } from "@/components/layout/Subheader";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Política de Privacidade - Síndico Né!",
  description:
    "Política de Privacidade e proteção de dados pessoais (LGPD) do site Síndico Né! Administração Condominial Profissional.",
  alternates: {
    canonical: "https://www.sindicone.com.br/politica-de-privacidade/",
  },
};

export default function PoliticaDePrivacidadePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Política de Privacidade", url: "/politica-de-privacidade/" },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="LGPD e Transparência"
        title="Política de Privacidade"
        subtitle="Compromisso do Síndico Né! com a segurança, o sigilo e o tratamento responsável das informações de condôminos, conselheiros e visitantes."
        breadcrumbs={[{ label: "Política de Privacidade" }]}
      />

      <section className="py-14 bg-[#f4f6f8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-7 sm:p-12 shadow-xs article-prose max-w-none">
            <h2>1. Quem Somos</h2>
            <p>
              O endereço do nosso site é:{" "}
              <strong>https://www.sindicone.com.br</strong>, mantido por{" "}
              <strong>{SITE_CONFIG.legalName}</strong>, com sede na{" "}
              {SITE_CONFIG.address.fullDisplay}, registrada no CRA-RJ sob o nº{" "}
              {SITE_CONFIG.credentials.craRj}.
            </p>

            <h2>2. Quais Dados Pessoais Coletamos e Por Quê</h2>
            <p>
              Coletamos apenas os dados estritamente necessários para responder
              às solicitações de contato comercial, atendimento a condôminos e
              envio de propostas de sindicância profissional, em conformidade
              com a Lei Geral de Proteção de Dados Pessoais (Lei nº
              13.709/2018 — LGPD):
            </p>
            <ul>
              <li>
                <strong>Formulário de Contato:</strong> Nome, endereço de
                e-mail, telefone/WhatsApp, bairro, nome do condomínio e mensagem
                enviada voluntariamente pelo titular.
              </li>
              <li>
                <strong>Cookies e Métricas de Navegação:</strong> Utilizamos
                cookies técnicos essenciais para o funcionamento do site e
                métricas agregadas de tráfego (Google Analytics 4) para
                aprimorar a experiência de leitura e desempenho das páginas.
              </li>
            </ul>

            <h2>3. Mídia Incorporada de Outros Sites</h2>
            <p>
              Artigos neste site podem incluir conteúdo incorporado como mapas
              (Google Maps) ou vídeos institucionais. O conteúdo incorporado de
              outros sites se comporta exatamente da mesma forma como se o
              visitante estivesse visitando o outro site.
            </p>

            <h2>4. Com Quem Compartilhamos Seus Dados</h2>
            <p>
              O <strong>Síndico Né!</strong> não comercializa nem cede dados
              pessoais a terceiros. As informações enviadas pelos formulários de
              contato são utilizadas exclusivamente pela nossa equipe técnica e
              administrativa para retorno ao solicitante.
            </p>

            <h2>5. Por Quanto Tempo Mantemos os Seus Dados</h2>
            <p>
              Os registros de solicitações comerciais e comunicações são
              mantidos pelo período necessário ao atendimento da demanda e ao
              cumprimento de obrigações legais ou regulatórias aplicáveis à
              administração condominial.
            </p>

            <h2>6. Quais os Seus Direitos Sobre Seus Dados</h2>
            <p>
              Nos termos do Art. 18 da LGPD, você pode solicitar a qualquer
              momento a confirmação da existência de tratamento, o acesso, a
              correção de dados incompletos ou desatualizados, ou a exclusão dos
              seus dados pessoais armazenados em nossos canais de atendimento,
              entrando em contato pelo e-mail{" "}
              <a href={`mailto:${SITE_CONFIG.contact.email}`}>
                {SITE_CONFIG.contact.email}
              </a>{" "}
              ou pelo telefone {SITE_CONFIG.contact.phoneDisplay}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
