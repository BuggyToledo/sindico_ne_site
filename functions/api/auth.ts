/**
 * Cloudflare Pages Function: GET /api/auth
 * Início do login do Decap CMS com GitHub (proxy OAuth). Redireciona para o GitHub.
 *
 * Variáveis de ambiente (Cloudflare Pages > Settings > Variables, tipo "Secret"):
 *   GITHUB_CLIENT_ID      ID do OAuth App do GitHub
 *   GITHUB_CLIENT_SECRET  segredo do OAuth App (usado só em /api/callback)
 *   OAUTH_SCOPE           (opcional) padrão "repo" (repositório privado). Use "public_repo" se for público.
 */

interface Env {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  OAUTH_SCOPE?: string;
}

interface Context {
  request: Request;
  env: Env;
}

export const onRequestGet = async ({ request, env }: Context): Promise<Response> => {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response("Login do CMS não configurado (GITHUB_CLIENT_ID ausente).", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorize.searchParams.set("redirect_uri", `${url.origin}/api/callback`);
  authorize.searchParams.set("scope", env.OAUTH_SCOPE || "repo");
  authorize.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      "Set-Cookie": `decap_oauth_state=${state}; Path=/api/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
      "Cache-Control": "no-store",
    },
  });
};
