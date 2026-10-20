import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";

const ContactSchema = z.object({
  name: z.string().min(2, "Por favor, informe seu nome completo."),
  email: z.string().email("Por favor, informe um endereço de e-mail válido."),
  phone: z.string().min(8, "Por favor, informe um telefone ou WhatsApp para contato."),
  condominiumName: z.string().optional(),
  neighborhood: z.string().optional(),
  subject: z.string().min(2, "Por favor, selecione o assunto."),
  message: z
    .string()
    .min(10, "Sua mensagem deve ter pelo menos 10 caracteres."),
  websiteHoneypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        {
          ok: false,
          error: firstIssue?.message || "Dados de contato inválidos.",
        },
        { status: 400 }
      );
    }

    // Anti-spam honeypot check
    if (
      parsed.data.websiteHoneypot &&
      parsed.data.websiteHoneypot.trim().length > 0
    ) {
      return NextResponse.json({
        ok: true,
        message: "Mensagem recebida.",
      });
    }

    const submission = {
      id: `lead-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      name: parsed.data.name.trim(),
      email: parsed.data.email.trim(),
      phone: parsed.data.phone.trim(),
      condominiumName: parsed.data.condominiumName?.trim() || "",
      neighborhood: parsed.data.neighborhood?.trim() || "",
      subject: parsed.data.subject.trim(),
      message: parsed.data.message.trim(),
    };

    try {
      const contentDir = path.join(process.cwd(), "content");
      if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
      }
      const leadsFile = path.join(contentDir, "contact-leads.json");
      const existing = fs.existsSync(leadsFile)
        ? (JSON.parse(fs.readFileSync(leadsFile, "utf-8")) as unknown[])
        : [];
      existing.unshift(submission);
      fs.writeFileSync(leadsFile, JSON.stringify(existing, null, 2), "utf-8");
    } catch {
      // Do not fail lead receipt if local filesystem is read-only in serverless runtime
    }

    return NextResponse.json({
      ok: true,
      message:
        "Solicitação registrada com sucesso! Nossa equipe entrará em contato em breve.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Erro ao processar sua mensagem. Tente novamente.",
      },
      { status: 500 }
    );
  }
}
