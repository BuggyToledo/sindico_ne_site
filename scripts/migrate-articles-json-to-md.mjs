// Migração única: content/articles.json -> content/posts/<slug>.md (frontmatter YAML + corpo HTML).
// Mantido no repo só para auditoria. Uso: node scripts/migrate-articles-json-to-md.mjs
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "content/articles.json");
const OUT = path.join(ROOT, "content/posts");
const articles = JSON.parse(fs.readFileSync(SRC, "utf-8"));
fs.mkdirSync(OUT, { recursive: true });

const KEEP = [
  "id", "wpId", "wpGuid", "title", "slug", "excerpt", "directAnswer",
  "featuredImage", "galleryImages", "authorId", "technicalReviewerId",
  "reviewerId", "categorySlug", "legacyCategorySlugs", "tags", "publishedAt",
  "updatedAt", "readingTimeMinutes", "seoTitle", "seoDescription",
  "references", "relatedLinks", "relatedArticleSlugs", "relatedServiceSlugs",
  "faq", "authorCommentary", "cta", "likeCount",
];

for (const a of articles) {
  const fm = {};
  for (const k of KEEP) if (a[k] !== undefined) fm[k] = a[k];
  fm.legacyRootUrl = Boolean(a.LegacyRootUrl);
  fm.draft = a.status !== "published";
  fm.noIndex = a.status === "published" ? Boolean(a.noIndex) : false;
  fm.bodyFormat = "html"; // corpo HTML original preservado; posts novos do Decap usam markdown
  const file = path.join(OUT, `${a.slug}.md`);
  const out = matter.stringify(a.contentHtml, fm);
  fs.writeFileSync(file, out, "utf-8");
  const back = matter(fs.readFileSync(file, "utf-8"));
  if (back.content.replace(/\n$/, "") !== a.contentHtml.replace(/\n$/, "")) {
    throw new Error(`Corpo não confere após ida e volta: ${a.slug}`);
  }
  console.log("ok", a.slug);
}
