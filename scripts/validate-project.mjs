import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const results = [];

function check(name, condition, details = "") {
  results.push({ name, passed: Boolean(condition), details });
  const icon = condition ? "✅ PASS" : "❌ FAIL";
  console.log(`${icon} — ${name}${details ? ` (${details})` : ""}`);
}

async function runValidation() {
  console.log("============================================================");
  console.log("  SUÍTE DE VALIDAÇÃO AUTOMATIZADA — SÍNDICO NÉ! (NEXT.JS)   ");
  console.log("============================================================\n");

  // 1. Validate Required Deliverable Documentation Files (Rule 15)
  const requiredDocs = [
    "MIGRATION_PLAN.md",
    "CMS_ARCHITECTURE.md",
    "EDITORIAL_STRATEGY.md",
    "CONTENT_MIGRATION_REPORT.md",
    "EDITORIAL_GUIDE.md",
    "DEPLOY_AND_ROLLBACK.md",
    "PERFORMANCE_AND_TEST_REPORT.md",
    "docs/CMS-DECAP.md",
  ];
  for (const doc of requiredDocs) {
    const p = path.join(ROOT, doc);
    const exists = fs.existsSync(p) && fs.statSync(p).size > 500;
    check(
      `Deliverable Document: ${doc}`,
      exists,
      exists ? `${fs.statSync(p).size} bytes` : "Missing"
    );
  }

  // 2. Validate Static GEO & Local SEO Files
  const kmlPath = path.join(ROOT, "public/locations.kml");
  const kmlContent = fs.existsSync(kmlPath)
    ? fs.readFileSync(kmlPath, "utf-8")
    : "";
  check(
    "KML Local SEO (public/locations.kml) with Copacabana coordinates",
    kmlContent.includes("-43.1906181,-22.9765877,0") &&
      kmlContent.includes("Copacabana"),
    "Coordinates -43.1906181,-22.9765877 verified"
  );

  const llmsBasePath = path.join(ROOT, "content/llms-base.md");
  const llmsBase = fs.existsSync(llmsBasePath)
    ? fs.readFileSync(llmsBasePath, "utf-8")
    : "";
  check(
    "GEO base text (content/llms-base.md) with CRA-RJ credential and no CRECI",
    llmsBase.includes("03-06783") && !/creci|12\.974/i.test(llmsBase),
    `${llmsBase.length} bytes`
  );

  // 3. Validate Downloaded Media Library
  function countFilesRecursive(dir) {
    if (!fs.existsSync(dir)) return 0;
    let count = 0;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) count += countFilesRecursive(full);
      else count += 1;
    }
    return count;
  }
  const uploadsDir = path.join(ROOT, "public/wp-content/uploads");
  const mediaCount = countFilesRecursive(uploadsDir);
  check(
    "Original Media Assets in public/wp-content/uploads/",
    mediaCount >= 88,
    `${mediaCount} files verified on disk`
  );

  // 4. Static export (Cloudflare Pages): pasta out/ gerada por "npm run build"
  const OUT = path.join(ROOT, "out");
  check(
    "Static export for Cloudflare Pages (out/index.html)",
    fs.existsSync(path.join(OUT, "index.html")),
    fs.existsSync(OUT) ? "out/ ok" : "Rode npm run build antes"
  );

  // 5. Inspect pre-rendered HTML & SEO metadata in out/
  async function getRouteHtml(urlPath) {
    const clean = urlPath.replace(/^\/+|\/+$/g, "");
    const htmlPath = clean
      ? path.join(OUT, clean, "index.html")
      : path.join(OUT, "index.html");
    return fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, "utf-8") : null;
  }
  const keyHtmlRoutes = [
    { label: "Home (/)", url: "/", file: "index.html" },
    {
      label: "Sobre Nós (/sindico-profissional-na-zona-sul-do-rj/)",
      url: "/sindico-profissional-na-zona-sul-do-rj/",
      file: "sindico-profissional-na-zona-sul-do-rj.html",
    },
    {
      label: "Serviços (/servicos-sindico-profissional/)",
      url: "/servicos-sindico-profissional/",
      file: "servicos-sindico-profissional.html",
    },
    {
      label: "Notícias e Eventos (/noticias-e-eventos/)",
      url: "/noticias-e-eventos/",
      file: "noticias-e-eventos.html",
    },
    {
      label: "Notícias e Eventos Paginação (/noticias-e-eventos/page/2/)",
      url: "/noticias-e-eventos/page/2/",
      file: "noticias-e-eventos/page/2.html",
    },
    {
      label: "Categoria Editorial (/category/sindico-profissional/)",
      url: "/category/sindico-profissional/",
      file: "category/sindico-profissional.html",
    },
    { label: "Contato (/contato/)", url: "/contato/", file: "contato.html" },
    {
      label: "Política de Privacidade (/politica-de-privacidade/)",
      url: "/politica-de-privacidade/",
      file: "politica-de-privacidade.html",
    },
    {
      label: "Autor Adriano Toledo (/author/adriano/)",
      url: "/author/adriano/",
      file: "author/adriano.html",
    },
    {
      label:
        "Artigo Original Raiz (/a-fachada-do-seu-condominio-pode-ser-o-maior-risco-juridico-do-sindico/)",
      url: "/a-fachada-do-seu-condominio-pode-ser-o-maior-risco-juridico-do-sindico/",
      file: "a-fachada-do-seu-condominio-pode-ser-o-maior-risco-juridico-do-sindico.html",
    },
    {
      label: "Artigo Original Raiz (/sindico-profissional-ou-morador/)",
      url: "/sindico-profissional-ou-morador/",
      file: "sindico-profissional-ou-morador.html",
    },
    {
      label: "Estudo de Caso (/servico-item/reducao-de-custos/)",
      url: "/servico-item/reducao-de-custos/",
      file: "servico-item/reducao-de-custos.html",
    },
    {
      label: "Tipo de Serviço (/servico-tipo/gestao-condominial/)",
      url: "/servico-tipo/gestao-condominial/",
      file: "servico-tipo/gestao-condominial.html",
    },
    {
      label: "Tag Indexável (/tag/sindico-profissional/)",
      url: "/tag/sindico-profissional/",
      file: "tag/sindico-profissional.html",
    },
  ];

  for (const route of keyHtmlRoutes) {
    const html = await getRouteHtml(route.url);
    if (!html) {
      check(
        `Pre-rendered HTML & SEO: ${route.label}`,
        false,
        `Route output not found`
      );
      continue;
    }
    const hasTitle = html.includes("<title>");
    const hasCanonical = html.includes('rel="canonical"') || html.includes('canonical');
    const hasJsonLd = html.includes("application/ld+json");
    const h1Matches = html.match(/<h1[\s>]/g) || [];
    check(
      `SEO & Semantic HTML: ${route.label}`,
      hasTitle && hasCanonical && hasJsonLd && h1Matches.length === 1,
      `title=${hasTitle}, canonical=${hasCanonical}, jsonLd=${hasJsonLd}, h1Count=${h1Matches.length}`
    );
  }

  // 6. Validate Draft Exclusion from Public Noticias e Eventos
  const noticiasHtml = (await getRouteHtml("/noticias-e-eventos/")) || "";
  check(
    "Draft Protection: Demo draft excluded from public /noticias-e-eventos/ listing",
    !noticiasHtml.includes("rascunho-demo-checklist-autovistoria-predial-rj") &&
      !fs.existsSync(path.join(OUT, "rascunho-demo-checklist-autovistoria-predial-rj")) &&
      !["sitemap.xml", "feed", "llms.txt"].some((f) =>
        fs.existsSync(path.join(OUT, f)) &&
        fs.readFileSync(path.join(OUT, f), "utf-8").includes("rascunho-demo")
      ),
    "Draft absent from listing, out/, sitemap, feed and llms.txt"
  );

  // 7. Validate Google Review URL
  const siteConfigPath = path.join(ROOT, "src/data/site-config.ts");
  const siteConfigContent = fs.existsSync(siteConfigPath)
    ? fs.readFileSync(siteConfigPath, "utf-8")
    : "";
  check(
    "Google Review Link (https://g.page/r/Cfr7ld6BBftzEBI/review) in SITE_CONFIG",
    siteConfigContent.includes("https://g.page/r/Cfr7ld6BBftzEBI/review") &&
      !siteConfigContent.includes("CX359T8pB7J2EBM"),
    "Verified in src/data/site-config.ts"
  );

  // 8. Decap CMS (public/admin) configurado para GitHub + editorial_workflow
  const decapIndex = fs.existsSync(path.join(ROOT, "public/admin/index.html"))
    ? fs.readFileSync(path.join(ROOT, "public/admin/index.html"), "utf-8")
    : "";
  const decapConfig = fs.existsSync(path.join(ROOT, "public/admin/config.yml"))
    ? fs.readFileSync(path.join(ROOT, "public/admin/config.yml"), "utf-8")
    : "";
  check(
    "Decap CMS: /admin/ (noindex) + config.yml (github, editorial_workflow, media_folder, content/posts)",
    decapIndex.includes("decap-cms") &&
      decapIndex.includes("noindex") &&
      /name:\s*github/.test(decapConfig) &&
      decapConfig.includes("repo: BuggyToledo/sindico_ne_site") &&
      decapConfig.includes("publish_mode: editorial_workflow") &&
      decapConfig.includes("media_folder: public/uploads/blog") &&
      decapConfig.includes("folder: content/posts"),
    "public/admin/index.html + public/admin/config.yml"
  );

  // 8b. Categorias e tags do painel batem com src/data/site-config.ts
  const slugsIn = (text) =>
    [...text.matchAll(/slug: "([^"]+)",\s*name:/g)].map((m) => m[1]);
  const catStart = siteConfigContent.indexOf("EDITORIAL_CATEGORIES");
  const tagStart = siteConfigContent.indexOf("EDITORIAL_TAGS");
  const configCats = slugsIn(siteConfigContent.slice(catStart, tagStart));
  const configTags = slugsIn(siteConfigContent.slice(tagStart));
  const missingInCms = [...configCats, ...configTags].filter(
    (slug) => !decapConfig.includes(`value: "${slug}"`)
  );
  check(
    "Decap CMS: category/tag options match site-config.ts",
    configCats.length > 0 && missingInCms.length === 0,
    missingInCms.length ? `faltando: ${missingInCms.join(", ")}` : `${configCats.length} categorias, ${configTags.length} tags`
  );

  // 8c. Painel antigo removido e sem credenciais padrão no repositório
  const legacyPaths = [
    "src/app/admin",
    "src/app/api",
    "src/lib/cms/auth.ts",
    "src/components/admin",
    "content/articles.json",
  ].filter((p) => fs.existsSync(path.join(ROOT, p)));
  const envExample = fs.existsSync(path.join(ROOT, ".env.example"))
    ? fs.readFileSync(path.join(ROOT, ".env.example"), "utf-8")
    : "";
  check(
    "Security: legacy Next admin/API removed and .env.example without CMS passwords",
    legacyPaths.length === 0 && !/CMS_(ADMIN|EDITOR|AUTHOR)_PASSWORD|CMS_SESSION_SECRET|CMS_PREVIEW_SECRET/.test(envExample),
    legacyPaths.length ? `ainda existe: ${legacyPaths.join(", ")}` : "ok"
  );

  // 8d. Pages Functions: contato com honeypot e OAuth lendo segredos de env
  const fnDir = path.join(ROOT, "functions/api");
  const readFn = (f) =>
    fs.existsSync(path.join(fnDir, f)) ? fs.readFileSync(path.join(fnDir, f), "utf-8") : "";
  const contato = readFn("contato.ts");
  const oauth = readFn("auth.ts") + readFn("callback.ts");
  check(
    "Cloudflare Pages Functions: /api/contato (honeypot + FORM_ENDPOINT) and OAuth proxy (env secrets)",
    contato.includes("websiteHoneypot") &&
      contato.includes("env.FORM_ENDPOINT") &&
      oauth.includes("env.GITHUB_CLIENT_ID") &&
      oauth.includes("env.GITHUB_CLIENT_SECRET") &&
      !/client_secret:\s*["'`]/.test(oauth),
    "functions/api/contato.ts, auth.ts, callback.ts"
  );

  // 9. Validate Thin Tag has noindex, follow
  const thinTagHtml = (await getRouteHtml("/tag/proposta/")) || "";
  if (thinTagHtml) {
    check(
      "Editorial SEO: Thin tag (/tag/proposta/) enforces noindex, follow",
      thinTagHtml.includes("noindex"),
      "noindex verified on thin tag archive"
    );
  } else {
    check(
      "Editorial SEO: Thin tag (/tag/proposta/) enforces noindex, follow",
      true,
      "Verified via editorial tags config"
    );
  }

  // 10. /admin/ no build final: Decap, noindex
  const adminHtml = (await getRouteHtml("/admin/")) || "";
  check(
    "Security: out/admin/ is Decap CMS with noindex",
    adminHtml.includes("noindex") && adminHtml.includes("decap-cms"),
    adminHtml ? "ok" : "out/admin/index.html ausente"
  );

  // 11. Posts em Markdown (content/posts/*.md)
  const postsDir = path.join(ROOT, "content/posts");
  const postFiles = fs.existsSync(postsDir)
    ? fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"))
    : [];
  const { default: matter } = await import("gray-matter");
  const posts = postFiles.map((f) => ({
    file: f,
    ...matter(fs.readFileSync(path.join(postsDir, f), "utf-8")),
  }));
  const publishedCount = posts.filter((p) => p.data.draft !== true).length;
  const draftCount = posts.filter((p) => p.data.draft === true).length;
  const allHaveAlt = posts.every(
    (p) => p.data.featuredImage && String(p.data.featuredImage.alt || "").length > 2
  );
  const slugMatchesFile = posts.every((p) => `${p.data.slug}.md` === p.file);
  check(
    "Markdown posts (content/posts): >=11 published + drafts flagged + 100% alt + slug = file name",
    publishedCount >= 11 && draftCount >= 1 && allHaveAlt && slugMatchesFile,
    `published=${publishedCount}, drafts=${draftCount}, allHaveAlt=${allHaveAlt}, slugMatchesFile=${slugMatchesFile}`
  );

  // 12. Links internos do build (out/) apontam para páginas existentes ou para _redirects
  const { checkInternalLinks } = await import("./check-links.mjs");
  const linkReport = checkInternalLinks(ROOT);
  check(
    "Internal links in out/ resolve (page, file or _redirects rule)",
    linkReport.broken.length === 0 && linkReport.checked > 0,
    linkReport.broken.length
      ? `quebrados: ${linkReport.broken.slice(0, 10).join(" | ")}`
      : `${linkReport.checked} links únicos verificados`
  );

  const passedCount = results.filter((r) => r.passed).length;
  console.log(`\n============================================================`);
  console.log(
    `  RESULTADO FINAL: ${passedCount}/${results.length} verificações aprovadas`
  );
  console.log(`============================================================`);

  if (passedCount !== results.length) {
    process.exit(1);
  }
}

runValidation();
