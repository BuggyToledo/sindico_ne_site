"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Replaces the legacy Contact Form 7 (`form id="70"`) with native accessible validation,
 * anti-spam honeypot field, validação no servidor via Cloudflare Pages Function `/api/contato`
 * (functions/api/contato.ts) e GA4. Se o envio não estiver configurado, oferece o WhatsApp.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");
    setWhatsappUrl("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      condominiumName: String(formData.get("condominiumName") || ""),
      neighborhood: String(formData.get("neighborhood") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      websiteHoneypot: String(formData.get("websiteHoneypot") || ""),
    };

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        error?: string;
        whatsappUrl?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        if (data.whatsappUrl) setWhatsappUrl(data.whatsappUrl);
        setFeedback(
          data.error ||
            "Não foi possível enviar sua mensagem. Por favor, tente novamente ou fale conosco pelo WhatsApp (21) 97878-8211."
        );
        return;
      }

      setStatus("success");
      setFeedback(
        data.message ||
          "Mensagem recebida com sucesso! Nossa equipe entrará em contato rapidamente."
      );
      (e.target as HTMLFormElement).reset();

      if (typeof window !== "undefined" && "gtag" in window) {
        const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
        gtag("event", "generate_lead", {
          event_category: "contact_form",
          event_label: payload.subject || "proposta_sindico",
        });
      }
    } catch {
      setStatus("error");
      setFeedback(
        "Erro de conexão ao enviar o formulário. Você também pode falar diretamente pelo WhatsApp (21) 97878-8211."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-sm space-y-5"
      noValidate={false}
    >
      <div>
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#181e00] bg-[#d0f121] px-3 py-1 rounded-full">
          Atendimento Direto
        </span>
        <h2 className="font-heading text-2xl font-bold text-[#0b1c30] mt-2.5">
          Envie uma Mensagem ou Solicite uma Proposta
        </h2>
        <p className="text-sm text-[#45464d] mt-1">
          Preencha os dados abaixo para agendar uma conversa ou diagnóstico do seu condomínio.
        </p>
      </div>

      {/* Anti-spam Honeypot (hidden from humans) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="websiteHoneypot">Não preencha este campo</label>
        <input
          id="websiteHoneypot"
          name="websiteHoneypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1.5"
          >
            Seu Nome *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            placeholder="Nome completo"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-[#171c24] focus:outline-none focus:ring-2 focus:ring-[#171c24]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1.5"
          >
            Seu E-mail *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com.br"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-[#171c24] focus:outline-none focus:ring-2 focus:ring-[#171c24]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1.5"
          >
            Telefone / WhatsApp *
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            placeholder="(21) 99999-9999"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-[#171c24] focus:outline-none focus:ring-2 focus:ring-[#171c24]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-neighborhood"
            className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1.5"
          >
            Bairro do Condomínio
          </label>
          <input
            id="contact-neighborhood"
            name="neighborhood"
            type="text"
            placeholder="Ex.: Copacabana, Ipanema, Barra, Tijuca..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-[#171c24] focus:outline-none focus:ring-2 focus:ring-[#171c24]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-condominium"
            className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1.5"
          >
            Nome do Condomínio (opcional)
          </label>
          <input
            id="contact-condominium"
            name="condominiumName"
            type="text"
            placeholder="Ex.: Edifício Atlântico"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-[#171c24] focus:outline-none focus:ring-2 focus:ring-[#171c24]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1.5"
          >
            Assunto *
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            defaultValue="Proposta de Síndico Profissional"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-[#171c24] bg-white focus:outline-none focus:ring-2 focus:ring-[#171c24]"
          >
            <option value="Proposta de Síndico Profissional">
              Proposta de Síndico Profissional
            </option>
            <option value="Implantação de Condomínio">
              Implantação de Condomínio
            </option>
            <option value="Diagnóstico Financeiro e Redução de Custos">
              Diagnóstico Financeiro e Redução de Custos
            </option>
            <option value="Atendimento a Condômino / Morador">
              Atendimento a Condômino / Morador
            </option>
            <option value="Outros Assuntos">Outros Assuntos</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1.5"
        >
          Sua Mensagem *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          minLength={10}
          placeholder="Conte-nos brevemente as necessidades atuais do seu condomínio (número de unidades, principais desafios, etc.)..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-[#171c24] focus:outline-none focus:ring-2 focus:ring-[#171c24]"
        />
      </div>

      {status === "success" && (
        <div
          role="status"
          className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-2.5"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{feedback}</span>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            {feedback}
            {whatsappUrl && (
              <>
                {" "}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  Enviar pelo WhatsApp
                </a>
              </>
            )}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0b1c30] hover:bg-[#131b2e] disabled:opacity-60 text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors shadow-sm cursor-pointer"
      >
        <Send className="w-4 h-4 text-[#d0f121]" aria-hidden="true" />
        <span>
          {status === "submitting" ? "Enviando mensagem..." : "Enviar Mensagem"}
        </span>
      </button>
    </form>
  );
}
