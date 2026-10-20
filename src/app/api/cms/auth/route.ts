import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  authenticateEditorialUser,
  createSessionToken,
  verifySessionToken,
} from "@/lib/cms/auth";

const COOKIE_NAME = "sindicone_cms_session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const user = verifySessionToken(token);
  if (!user) {
    return NextResponse.json({ authenticated: false, user: null });
  }
  return NextResponse.json({ authenticated: true, user });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      action?: string;
    };

    if (body.action === "logout") {
      const res = NextResponse.json({ ok: true, authenticated: false });
      res.cookies.delete(COOKIE_NAME);
      return res;
    }

    const user = authenticateEditorialUser(
      body.email || "",
      body.password || ""
    );

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Credenciais inválidas. Verifique seu e-mail e senha.",
        },
        { status: 401 }
      );
    }

    const token = createSessionToken(user);
    const res = NextResponse.json({
      ok: true,
      authenticated: true,
      user,
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erro no servidor de autenticação." },
      { status: 500 }
    );
  }
}
