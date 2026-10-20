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

  const llmsPath = path.join(ROOT, "public/llms.txt");
  const llmsContent = fs.existsSync(llmsPath)
    ? fs.readFileSync(llmsPath, "utf-8")
    : "";
  check(
    "GEO Structured File (public/llms.txt) with CRA-RJ & CRECI-J credentials",
    llmsContent.includes("03-06783") && llmsContent.includes("12.974"),
    `${llmsContent.length} bytes`
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

  // 4. Validate Next.js Production Build Artifacts (.next)
  const nextBuildIdPath = path.join(ROOT, ".next/BUILD_ID");
  const buildSucceeded = fs.existsSync(nextBuildIdPath);
  check(
    "Next.js Production Build (.next/BUILD_ID)",
    buildSucceeded,
    buildSucceeded
      ? `Build ID: ${fs.readFileSync(nextBuildIdPath, "utf-8").trim()}`
      : "Missing"
  );

  // 5. Inspect Pre-rendered HTML & SEO Metadata in .next/server/app
  const appServerDir = path.join(ROOT, ".next/server/app");
  const keyHtmlRoutes = [
    { label: "Home (/)", file: "index.html" },
    {
      label: "Sobre Nós (/sindico-profissional-na-zona-sul-do-rj/)",
      file: "sindico-profissional-na-zona-sul-do-rj.html",
    },
    {
      label: "Serviços (/servicos-sindico-profissional/)",
      file: "servicos-sindico-profissional.html",
    },
    { label: "Blog Hub (/blog/)", file: "blog.html" },
    { label: "Blog Paginação (/blog/page/2/)", file: "blog/page/2.html" },
    {
      label: "Blog Categoria (/blog/categoria/sindico-profissional/)",
      file: "blog/categoria/sindico-profissional.html",
    },
    {
      label: "Notícias e Eventos (/noticias-e-eventos/)",
      file: "noticias-e-eventos.html",
    },
    { label: "Contato (/contato/)", file: "contato.html" },
    {
      label: "Política de Privacidade (/politica-de-privacidade/)",
      file: "politica-de-privacidade.html",
    },
    {
      label: "Autor Adriano Toledo (/author/adriano/)",
      file: "author/adriano.html",
    },
    {
      label:
        "Artigo Original Raiz (/a-fachada-do-seu-condominio-pode-ser-o-maior-risco-juridico-do-sindico/)",
      file: "a-fachada-do-seu-condominio-pode-ser-o-maior-risco-juridico-do-sindico.html",
    },
    {
      label: "Artigo Original Raiz (/sindico-profissional-ou-morador/)",
      file: "sindico-profissional-ou-morador.html",
    },
    {
      label: "Estudo de Caso (/servico-item/reducao-de-custos/)",
      file: "servico-item/reducao-de-custos.html",
    },
    {
      label: "Tipo de Serviço (/servico-tipo/gestao-condominial/)",
      file: "servico-tipo/gestao-condominial.html",
    },
    {
      label: "Tag Indexável (/tag/sindico-profissional/)",
      file: "tag/sindico-profissional.html",
    },
  ];

  for (const route of keyHtmlRoutes) {
    const htmlPath = path.join(appServerDir, route.file);
    const exists = fs.existsSync(htmlPath);
    if (!exists) {
      check(
        `Pre-rendered HTML & SEO: ${route.label}`,
        false,
        `File not found: ${route.file}`
      );
      continue;
    }
    const html = fs.readFileSync(htmlPath, "utf-8");
    const hasTitle = html.includes("<title>");
    const hasCanonical = html.includes('rel="canonical"');
    const hasJsonLd = html.includes("application/ld+json");
    const h1Matches = html.match(/<h1[\s>]/g) || [];
    check(
      `SEO & Semantic HTML: ${route.label}`,
      hasTitle && hasCanonical && hasJsonLd && h1Matches.length === 1,
      `title=${hasTitle}, canonical=${hasCanonical}, jsonLd=${hasJsonLd}, h1Count=${h1Matches.length}`
    );
  }

  // 6. Validate Draft Exclusion from Public Sitemap & Public Blog
  const blogHtmlPath = path.join(appServerDir, "blog.html");
  const blogHtml = fs.existsSync(blogHtmlPath)
    ? fs.readFileSync(blogHtmlPath, "utf-8")
    : "";
  check(
    "Draft Protection: Demo draft excluded from public /blog/ listing",
    !blogHtml.includes("rascunho-demo-checklist-autovistoria-predial-rj"),
    "Draft slug absent from public /blog/ HTML"
  );

  const sitemapBodyPath = path.join(appServerDir, "sitemap.xml.body");
  if (fs.existsSync(sitemapBodyPath)) {
    const sitemapXml = fs.readFileSync(sitemapBodyPath, "utf-8");
    check(
      "Sitemap XML (/sitemap.xml) excludes drafts and includes canonical URLs",
      !sitemapXml.includes("rascunho-demo-checklist-autovistoria-predial-rj") &&
        sitemapXml.includes("https://www.sindicone.com.br/sindico-profissional-ou-morador/"),
      `${sitemapXml.length} bytes`
    );
  }

  // 7. Validate Preview Page has noindex, nofollow
  const previewHtmlPath = path.join(
    appServerDir,
    "blog/preview/rascunho-demo-checklist-autovistoria-predial-rj.html"
  );
  if (fs.existsSync(previewHtmlPath)) {
    const previewHtml = fs.readFileSync(previewHtmlPath, "utf-8");
    check(
      "Draft Preview Route (/blog/preview/[slug]/) enforces noindex",
      previewHtml.includes("noindex"),
      "robots noindex verified on preview HTML"
    );
  }

  // 8. Validate Thin Tag has noindex, follow whereas Strategic Tag is indexable
  const thinTagHtmlPath = path.join(appServerDir, "tag/proposta.html");
  if (fs.existsSync(thinTagHtmlPath)) {
    const thinTagHtml = fs.readFileSync(thinTagHtmlPath, "utf-8");
    check(
      "Editorial SEO: Thin tag (/tag/proposta/) enforces noindex, follow",
      thinTagHtml.includes("noindex"),
      "noindex verified on thin tag archive"
    );
  }

  // 9. Validate Admin Page has noindex, nofollow & zero exposed secrets
  const adminHtmlPath = path.join(appServerDir, "admin.html");
  if (fs.existsSync(adminHtmlPath)) {
    const adminHtml = fs.readFileSync(adminHtmlPath, "utf-8");
    const noSecretsLeaked =
      !adminHtml.includes("SindicoNe@2026!") &&
      !adminHtml.includes("sindicone-editorial-hmac-secret");
    check(
      "Security: /admin/ enforces noindex and exposes zero server credentials",
      adminHtml.includes("noindex") && noSecretsLeaked,
      "noindex=true, leakedSecrets=0"
    );
  }

  // 10. Validate Persistent CMS Store (`content/articles.json`) reconciliation
  const articlesJsonPath = path.join(ROOT, "content/articles.json");
  if (fs.existsSync(articlesJsonPath)) {
    const storedArticles = JSON.parse(fs.readFileSync(articlesJsonPath, "utf-8"));
    const publishedCount = storedArticles.filter(
      (a) => a.status === "published"
    ).length;
    const draftCount = storedArticles.filter((a) => a.status === "draft").length;
    const allHaveAlt = storedArticles.every(
      (a) => a.featuredImage && a.featuredImage.alt && a.featuredImage.alt.length > 2
    );
    check(
      "CMS Store Reconciliation (11 published original posts + 1 draft demo + 100% alt text)",
      publishedCount === 11 && draftCount >= 1 && allHaveAlt,
      `published=${publishedCount}, drafts=${draftCount}, allHaveAlt=${allHaveAlt}`
    );
  }

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
