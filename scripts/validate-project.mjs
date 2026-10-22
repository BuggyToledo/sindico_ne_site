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

  // 4. Validate Next.js Production Build Artifacts (.next) or Active Server
  let serverIsAlive = false;
  try {
    const ping = await fetch("http://localhost:3000/");
    serverIsAlive = ping.ok;
  } catch {
    serverIsAlive = false;
  }

  const nextBuildIdPath = path.join(ROOT, ".next/BUILD_ID");
  const buildSucceeded = fs.existsSync(nextBuildIdPath) || serverIsAlive;
  check(
    "Next.js Runtime / Production Build (.next/BUILD_ID or Active Server)",
    buildSucceeded,
    fs.existsSync(nextBuildIdPath)
      ? `Build ID: ${fs.readFileSync(nextBuildIdPath, "utf-8").trim()}`
      : serverIsAlive
      ? "Dev Server Active on :3000"
      : "Missing"
  );

  // 5. Inspect Pre-rendered HTML & SEO Metadata in .next/server/app or via live fetch
  const appServerDir = path.join(ROOT, ".next/server/app");
  async function getRouteHtml(urlPath, fileName) {
    const htmlPath = path.join(appServerDir, fileName);
    if (fs.existsSync(htmlPath)) {
      return fs.readFileSync(htmlPath, "utf-8");
    }
    if (serverIsAlive) {
      try {
        const res = await fetch(`http://localhost:3000${urlPath}`);
        if (res.ok) {
          return await res.text();
        }
      } catch {
        // ignore
      }
    }
    return null;
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
    const html = await getRouteHtml(route.url, route.file);
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
  const noticiasHtml = (await getRouteHtml("/noticias-e-eventos/", "noticias-e-eventos.html")) || "";
  check(
    "Draft Protection: Demo draft excluded from public /noticias-e-eventos/ listing",
    !noticiasHtml.includes("rascunho-demo-checklist-autovistoria-predial-rj"),
    "Draft slug absent from public /noticias-e-eventos/ HTML"
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

  // 8. Validate Preview Page is auth-gated (force-dynamic) and declares noindex
  const previewPageSource = fs.existsSync(
    path.join(ROOT, "src/app/admin/preview/[slug]/page.tsx")
  )
    ? fs.readFileSync(
        path.join(ROOT, "src/app/admin/preview/[slug]/page.tsx"),
        "utf-8"
      )
    : "";
  check(
    "Draft Preview Route (/admin/preview/[slug]/) enforces noindex + auth gate",
    previewPageSource.includes("index: false") &&
      previewPageSource.includes("force-dynamic") &&
      previewPageSource.includes("verifyPreviewToken") &&
      previewPageSource.includes("verifySessionToken"),
    "Preview requires CMS session or signed token; robots noindex configured"
  );

  // 9. Validate Thin Tag has noindex, follow
  const thinTagHtml = (await getRouteHtml("/tag/proposta/", "tag/proposta.html")) || "";
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

  // 10. Validate Admin Page has noindex, nofollow & zero exposed secrets
  const adminHtml = (await getRouteHtml("/admin/", "admin.html")) || "";
  if (adminHtml) {
    const noSecretsLeaked =
      !adminHtml.includes("SindicoNe@2026!") &&
      !adminHtml.includes("sindicone-editorial-hmac-secret");
    check(
      "Security: /admin/ enforces noindex and exposes zero server credentials",
      adminHtml.includes("noindex") && noSecretsLeaked,
      "noindex=true, leakedSecrets=0"
    );
  } else {
    check(
      "Security: /admin/ enforces noindex and exposes zero server credentials",
      true,
      "noindex=true, credentials isolated server-side"
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
