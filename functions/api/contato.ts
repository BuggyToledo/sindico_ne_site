/**
 * Cloudflare Pages Function: POST /api/contato
 *
 * Valida o formulário de contato e encaminha para um serviço externo configurável.
 * Nenhuma chave fica no código: tudo vem de variáveis de ambiente do projeto no Cloudflare Pages.
 *
 *   FORM_ENDPOINT        (opcional) URL que recebe um POST JSON com o lead
 *                        (ex.: endpoint de um serviço de formulários ou webhook próprio).
 *   FORM_ENDPOINT_TOKEN  (opcional, segredo) enviado como "Authorization: Bearer <token>".
 *   ALLOWED_ORIGINS      (opcional) lista separada por vírgula, ex.: "https://www.sindicone.com.br".
 *   WHATSAPP_NUMBER      (opcional) número só com dígitos para o fallback. Padrão: 5521978788211.
 *
 * Sem FORM_ENDPOINT (ou se o serviço falhar) a resposta traz `whatsappUrl` com a mensagem
 * pronta, e o site mostra o botão "Enviar pelo WhatsApp".
 */

interface Env {
  FORM_ENDPOINT?: string;
  FORM_ENDPOINT_TOKEN?: string;
  ALLOWED_ORIGINS?: string;
  WHATSAPP_NUMBER?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const MAX_BODY_BYTES = 16 * 1024;
const LIMITS: Record<string, number> = {
  name: 120,
  email: 160,
  phone: 40,
  condominiumName: 160,
  neighborhood: 120,
  subject: 120,
  message: 4000,
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function whatsappLink(env: Env, lead: Record<string, string>): string {
  const number = (env.WHATSAPP_NUMBER || "5521978788211").replace(/\D/g, "");
  const text = [
    `Olá! Sou ${lead.name}.`,
    lead.condominiumName ? `Condomínio: ${lead.condominiumName}.` : "",
    lead.neighborhood ? `Bairro: ${lead.neighborhood}.` : "",
    `Assunto: ${lead.subject}.`,
    lead.message,
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(text.slice(0, 1500))}`;
}

export function validateLead(
  raw: Record<string, unknown>
): { ok: true; lead: Record<string, string> } | { ok: false; error: string } {
  const lead: Record<string, string> = {};
  for (const [field, max] of Object.entries(LIMITS)) lead[field] = clean(raw[field], max);
  if (lead.name.length < 2) return { ok: false, error: "Por favor, informe seu nome completo." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email))
    return { ok: false, error: "Por favor, informe um endereço de e-mail válido." };
  if (lead.phone.replace(/\D/g, "").length < 8)
    return { ok: false, error: "Por favor, informe um telefone ou WhatsApp para contato." };
  if (lead.subject.length < 2) return { ok: false, error: "Por favor, selecione o assunto." };
  if (lead.message.length < 10)
    return { ok: false, error: "Sua mensagem deve ter pelo menos 10 caracteres." };
  return { ok: true, lead };
}

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const origin = request.headers.get("Origin") || "";
  if (allowed.length > 0 && !allowed.includes(origin)) {
    return json({ ok: false, error: "Origem não permitida." }, 403);
  }

  const length = Number(request.headers.get("Content-Length") || "0");
  if (length > MAX_BODY_BYTES) return json({ ok: false, error: "Mensagem muito grande." }, 413);

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: "Mensagem muito grande." }, 413);
    raw = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Dados de contato inválidos." }, 400);
  }

  // Honeypot: robôs preenchem o campo escondido. Responde "ok" sem encaminhar nada.
  if (clean(raw.websiteHoneypot, 200).length > 0) {
    return json({ ok: true, message: "Mensagem recebida." });
  }

  const result = validateLead(raw);
  if (!result.ok) return json({ ok: false, error: result.error }, 400);
  const lead = result.lead;
  const fallback = whatsappLink(env, lead);

  if (!env.FORM_ENDPOINT) {
    return json(
      {
        ok: false,
        error: "O envio por formulário ainda não está ativo. Envie sua mensagem pelo WhatsApp:",
        whatsappUrl: fallback,
      },
      503
    );
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (env.FORM_ENDPOINT_TOKEN) headers.Authorization = `Bearer ${env.FORM_ENDPOINT_TOKEN}`;
    const res = await fetch(env.FORM_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...lead,
        source: "site-sindicone",
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
  } catch {
    return json(
      {
        ok: false,
        error: "Não foi possível enviar agora. Envie sua mensagem pelo WhatsApp:",
        whatsappUrl: fallback,
      },
      502
    );
  }

  return json({
    ok: true,
    message: "Solicitação registrada com sucesso! Nossa equipe entrará em contato em breve.",
  });
};

export const onRequest = async (): Promise<Response> =>
  json({ ok: false, error: "Método não permitido." }, 405);
