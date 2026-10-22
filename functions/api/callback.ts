/**
 * Cloudflare Pages Function: GET /api/callback
 * Fim do login do Decap CMS: troca o "code" do GitHub por um token e devolve
 * para a janela do /admin no formato que o Decap espera (postMessage).
 * Segredos lidos de env (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET). Nada fica salvo no servidor.
 */

interface Env {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}

interface Context {
  request: Request;
  env: Env;
}

function readCookie(request: Request, name: string): string {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.split(/;\s*/).find((c) => c.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : "";
}

function page(status: "success" | "error", payload: Record<string, string>, origin: string): Response {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Login do CMS</title></head><body>
<p>${status === "success" ? "Login concluído. Pode fechar esta janela." : "Falha no login. Feche esta janela e tente de novo."}</p>
<script>
(function () {
  var target = ${JSON.stringify(origin)};
  var msg = ${JSON.stringify(message)};
  function receive(e) {
    if (e.origin !== target) return;
    window.removeEventListener("message", receive, false);
    window.opener && window.opener.postMessage(msg, target);
  }
  window.addEventListener("message", receive, false);
  window.opener && window.opener.postMessage("authorizing:github", target);
})();
</script></body></html>`;
  return new Response(html, {
    status: status === "success" ? 200 : 400,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": "decap_oauth_state=; Path=/api/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    },
  });
}

export const onRequestGet = async ({ request, env }: Context): Promise<Response> => {
  const url = new URL(request.url);
  const origin = url.origin;
  const code = url.searchParams.get("code") || "";
  const state = url.searchParams.get("state") || "";
  const expected = readCookie(request, "decap_oauth_state");

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return page("error", { message: "OAuth não configurado" }, origin);
  }
  if (!code || !state || state !== expected) {
    return page("error", { message: "state inválido" }, origin);
  }

  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${origin}/api/callback`,
      }),
    });
    const data = (await res.json()) as { access_token?: string; error?: string };
    if (!data.access_token) {
      return page("error", { message: data.error || "sem token" }, origin);
    }
    return page("success", { token: data.access_token, provider: "github" }, origin);
  } catch {
    return page("error", { message: "falha ao falar com o GitHub" }, origin);
  }
};
