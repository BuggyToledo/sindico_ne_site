import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getArticleById,
  deleteArticleById,
  restoreArticleRevision,
} from "@/lib/cms/store";
import {
  getAuthenticatedUserFromRequest,
  hasRolePermission,
} from "@/lib/cms/auth";

const COOKIE_NAME = "sindicone_cms_session";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const user = getAuthenticatedUserFromRequest(
    request,
    cookieStore.get(COOKIE_NAME)?.value
  );
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Não autenticado." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) {
    return NextResponse.json(
      { ok: false, error: "Artigo não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, article });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const user = getAuthenticatedUserFromRequest(
    request,
    cookieStore.get(COOKIE_NAME)?.value
  );
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Não autenticado." },
      { status: 401 }
    );
  }

  if (!hasRolePermission(user.role, "restore")) {
    return NextResponse.json(
      {
        ok: false,
        error: "Seu perfil não tem permissão para restaurar revisões.",
      },
      { status: 403 }
    );
  }

  const { id } = await params;
  const body = (await request.json()) as { revisionId?: string };
  if (!body.revisionId) {
    return NextResponse.json(
      { ok: false, error: "ID da revisão é obrigatório." },
      { status: 400 }
    );
  }

  const restored = await restoreArticleRevision(
    id,
    body.revisionId,
    user.email
  );
  if (!restored) {
    return NextResponse.json(
      { ok: false, error: "Revisão não encontrada." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, article: restored });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const user = getAuthenticatedUserFromRequest(
    request,
    cookieStore.get(COOKIE_NAME)?.value
  );
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Não autenticado." },
      { status: 401 }
    );
  }

  if (!hasRolePermission(user.role, "delete")) {
    return NextResponse.json(
      {
        ok: false,
        error: `Apenas administradores podem excluir artigos. Seu perfil atual é '${user.role}'.`,
      },
      { status: 403 }
    );
  }

  const { id } = await params;
  const deleted = await deleteArticleById(id);
  if (!deleted) {
    return NextResponse.json(
      { ok: false, error: "Artigo não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
