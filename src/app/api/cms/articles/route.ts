import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  getAllArticles,
  createOrUpdateArticle,
} from "@/lib/cms/store";
import { verifySessionToken, hasRolePermission } from "@/lib/cms/auth";

const COOKIE_NAME = "sindicone_cms_session";

const ArticleUpsertSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres."),
  slug: z.string().min(3, "O slug deve ter pelo menos 3 caracteres."),
  excerpt: z.string().min(10, "O resumo deve ter pelo menos 10 caracteres."),
  directAnswer: z.string().optional(),
  contentHtml: z.string().min(20, "O conteúdo do artigo está muito curto."),
  featuredImage: z
    .object({
      url: z.string().min(1),
      alt: z.string().min(2, "O texto alternativo (alt) da imagem é obrigatório para acessibilidade e SEO."),
      width: z.number().default(1200),
      height: z.number().default(675),
      caption: z.string().optional(),
    })
    .optional(),
  authorId: z.string().default("adriano-toledo"),
  reviewerId: z.string().optional(),
  categorySlug: z.string().default("gestao-condominial"),
  tags: z.array(z.string()).default(["sindico-profissional"]),
  publishedAt: z.string().optional(),
  scheduledFor: z.string().optional(),
  status: z
    .enum(["draft", "in_review", "scheduled", "published", "archived"])
    .default("draft"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonicalUrl: z.string().optional(),
  noIndex: z.boolean().optional(),
  summaryNote: z.string().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get("includeDrafts") === "true";

  if (includeDrafts) {
    const cookieStore = await cookies();
    const user = verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Acesso restrito ao painel editorial." },
        { status: 401 }
      );
    }
    const articles = await getAllArticles({ includeUnpublished: true });
    return NextResponse.json({ ok: true, articles, user });
  }

  const published = await getAllArticles({ includeUnpublished: false });
  return NextResponse.json({ ok: true, articles: published });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const user = verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Sessão expirada ou não autenticada." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const parsed = ArticleUpsertSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Dados editoriais inválidos.",
        },
        { status: 400 }
      );
    }

    const desiredStatus = parsed.data.status;

    // RBAC Check: Authors can create/edit drafts & review requests, but cannot publish or schedule directly
    if (
      (desiredStatus === "published" || desiredStatus === "scheduled") &&
      !hasRolePermission(user.role, "publish")
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: `Seu perfil (${user.role}) pode salvar rascunhos ou enviar para revisão, mas não possui permissão para publicar diretamente.`,
        },
        { status: 403 }
      );
    }

    const saved = await createOrUpdateArticle(
      parsed.data,
      user.email,
      parsed.data.summaryNote || `Edição por ${user.name} (${user.role})`
    );

    return NextResponse.json({ ok: true, article: saved });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erro ao salvar artigo no repositório editorial." },
      { status: 500 }
    );
  }
}
