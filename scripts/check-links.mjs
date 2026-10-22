// Verifica links internos (href/src que começam com "/") em out/**/*.html.
// Um link é válido se existir como arquivo, como pasta com index.html, ou se casar com uma regra de public/_redirects.
// Uso direto: node scripts/check-links.mjs
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function redirectRules(root) {
  const file = path.join(root, "public/_redirects");
  if (!fs.existsSync(file)) return [];
  return fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const from = l.split(/\s+/)[0];
      const re = "^" + from.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/:[a-z]+/g, "[^/]+").replace(/\*/g, ".*") + "$";
      return new RegExp(re);
    });
}

export function checkInternalLinks(root = process.cwd()) {
  const outDir = path.join(root, "out");
  if (!fs.existsSync(outDir)) return { checked: 0, broken: ["out/ ausente"] };
  const rules = redirectRules(root);
  const seen = new Map();
  for (const file of walk(outDir)) {
    const html = fs.readFileSync(file, "utf-8");
    for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const link = m[1];
      if (link.startsWith("//") || link.startsWith("/_next/")) continue;
      if (!seen.has(link)) seen.set(link, path.relative(outDir, file));
    }
  }
  const broken = [];
  for (const [link, from] of seen) {
    let decoded = link;
    try {
      decoded = decodeURIComponent(link);
    } catch {
      /* mantém */
    }
    const target = path.join(outDir, decoded);
    const ok =
      (fs.existsSync(target) && fs.statSync(target).isFile()) ||
      fs.existsSync(path.join(target, "index.html")) ||
      rules.some((r) => r.test(link));
    if (!ok) broken.push(`${link} (em ${from})`);
  }
  return { checked: seen.size, broken };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const r = checkInternalLinks();
  console.log(`${r.checked} links internos únicos; ${r.broken.length} quebrados`);
  for (const b of r.broken) console.log(" -", b);
  process.exit(r.broken.length ? 1 : 0);
}
