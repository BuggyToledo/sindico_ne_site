import fs from "node:fs";
import path from "node:path";
import { SITE_CONFIG } from "@/data/site-config";
import { getAllArticles } from "@/lib/cms/store";

export const dynamic = "force-static";

/**
 * /llms.txt gerado no build: texto fixo de content/llms-base.md + lista dos posts
 * publicados (lida de content/posts/*.md, sem rascunhos nem datas futuras).
 */
export async function GET() {
  const base = fs.readFileSync(
    path.join(process.cwd(), "content", "llms-base.md"),
    "utf-8"
  );
  const articles = (await getAllArticles({ includeUnpublished: false })).filter(
    (a) => !a.noIndex
  );
  const list = articles
    .map((a) => `- [${a.title}](${a.canonicalUrl || `${SITE_CONFIG.url}/${a.slug}/`})`)
    .join("\n");
  const body = `${base.trimEnd()}\n\n## Artigos e Guias Técnicos Publicados (\`/noticias-e-eventos/\`)\n${list}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
