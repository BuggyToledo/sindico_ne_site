# Síndico Né! — Site Institucional, Blog e CMS Editorial (Next.js 15 + React 19 + TypeScript)

Reconstrução e modernização completa do site oficial **[sindicone.com.br](https://www.sindicone.com.br/)** em **Next.js 15 (App Router)**, **React 19**, **TypeScript** e **Tailwind CSS v4**, com foco em **Core Web Vitals**, **SEO Técnico e Local (Zona Sul RJ)**, **GEO (Generative Engine Optimization)** e **Painel Editorial Integrado (CMS)**.

---

## Principais Recursos

- **Preservação 100% de URLs e SEO**:
  - Todas as URLs originais do WordPress preservadas com `trailingSlash: true` (incluindo os 11 artigos na raiz `/[slug]/`, os 8 estudos de caso `/servico-item/[slug]/`, as 8 áreas `/servico-tipo/[slug]/`, `/category/noticias/`, `/author/adriano/` e as 32 tags `/tag/[slug]/`).
- **Nova Seção de Blog (`/blog/`) e Painel Editorial (`/admin/`)**:
  - Listagem paginada (`/blog/` e `/blog/page/[page]/`), categorias (`/blog/categoria/[slug]/`), busca instantânea, artigos relacionados, breadcrumbs, tempo de leitura, síntese direta para IA (GEO), FAQ estruturado e histórico de revisões com restauração em 1 clique.
  - Painel editorial **Decap CMS** em `/admin/`: login com GitHub, fluxo de revisão (`editorial_workflow`, cada post vira um Pull Request) e posts salvos como Markdown em `content/posts/*.md`. Rascunhos e posts com data futura não aparecem no site. Veja [`docs/CMS-DECAP.md`](./docs/CMS-DECAP.md).
  - Hospedagem estática no **Cloudflare Pages** (`output: "export"`, pasta `out/`), com formulário em Pages Function (`functions/api/contato.ts`).
- **SEO Técnico, Local e GEO**:
  - Dados estruturados `JSON-LD` validados (`ProfessionalService` / `LocalBusiness`, `WebSite`, `BlogPosting`, `FAQPage`, `BreadcrumbList`, `Service`, `ProfilePage` / `Person`).
  - Sitemap XML dinâmico (`/sitemap.xml`), Feed RSS (`/feed/`), geolocalização KML corrigida (`/locations.kml`) e manifesto para motores de IA (`/llms.txt`).

---

## Documentação Técnica do Projeto

- [`MIGRATION_PLAN.md`](./MIGRATION_PLAN.md) — Auditoria completa do site original e plano de migração.
- [`CMS_ARCHITECTURE.md`](./CMS_ARCHITECTURE.md) — Decisão arquitetural do CMS e análise técnica da API REST / Muffin Builder.
- [`EDITORIAL_STRATEGY.md`](./EDITORIAL_STRATEGY.md) — Estratégia de conteúdo, pilares editoriais, prevenção de canibalização e 12 pautas prioritárias.
- [`CONTENT_MIGRATION_REPORT.md`](./CONTENT_MIGRATION_REPORT.md) — Relatório de reconciliação de artigos, páginas, estudos de caso e 88 arquivos de mídia.
- [`docs/CMS-DECAP.md`](./docs/CMS-DECAP.md) — Como usar e testar o Decap CMS (`/admin/`), login GitHub, Cloudflare Pages e agendamento.
- [`EDITORIAL_GUIDE.md`](./EDITORIAL_GUIDE.md) — Boas práticas editoriais (a parte de operação do painel antigo foi substituída pelo Decap).
- [`DEPLOY_AND_ROLLBACK.md`](./DEPLOY_AND_ROLLBACK.md) — Procedimento de deploy em produção, variáveis de ambiente e plano de rollback.
- [`PERFORMANCE_AND_TEST_REPORT.md`](./PERFORMANCE_AND_TEST_REPORT.md) — Resultados reais dos testes automatizados, build estático (153 páginas) e auditoria de segurança.

---

## Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Verificar tipos TypeScript
npm run typecheck

# 3. Gerar build de produção
npm run build

# 4. Executar suíte automatizada de validação (inclui links internos)
npm run test:validate

# 5. Iniciar servidor de desenvolvimento
npm run dev

# 6. (Opcional) Testar o painel /admin/ sem GitHub, em outro terminal
npm run cms:local
```
