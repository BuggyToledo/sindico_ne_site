import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  generatePreviewToken,
  getAuthenticatedUserFromRequest,
} from "@/lib/cms/auth";

const COOKIE_NAME = "sindicone_cms_session";

/**
 * Returns a short-lived shareable preview token for a draft slug.
 * Requires an authenticated editorial session (cookie or Bearer).
 */
export async function GET(request: Request) {
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

  const { searchParams } = new URL(request.url);
  const slug = (searchParams.get("slug") || "").trim();
  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "Slug do artigo é obrigatório." },
      { status: 400 }
    );
  }

  const token = generatePreviewToken(slug);
  return NextResponse.json({
    ok: true,
    slug,
    token,
    previewPath: `/admin/preview/${slug}/?token=${token}`,
  });
}
