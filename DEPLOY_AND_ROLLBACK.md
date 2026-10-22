# Plano de Implantação em Produção e Rollback — Síndico Né! (`DEPLOY_AND_ROLLBACK.md`)

> Procedimento operacional padrão para transição segura do site WordPress legado (`https://www.sindicone.com.br/`) para a nova plataforma Next.js, garantindo **zero perda de URLs orgânicas**, preservação de e-mails corporativos (`@sindicone.com.br`) e capacidade de **rollback imediato em menos de 5 minutos** caso necessário.

---

## 1. Regra de Segurança de Produção

> **IMPORTANTE**: Nenhuma alteração de DNS, apontamento de domínio ou desligamento da hospedagem WordPress atual foi executada automaticamente. A virada para produção deve ocorrer exclusivamente após aprovação formal do proprietário e validação em ambiente de homologação (*staging*).

---

## 2. Pré-Requisitos de Infraestrutura e Variáveis de Ambiente

### 2.1. Plataforma de Hospedagem: Cloudflare Pages (export estático)
- **Build command**: `npm run build` · **Output directory**: `out` · **Node**: `22` (variável `NODE_VERSION=22`).
- O site é 100% estático (`output: "export"`). Redirects e cabeçalhos ficam em `public/_redirects` e `public/_headers`.
- Rotas dinâmicas são Pages Functions em `functions/`: `/api/contato` (formulário), `/api/auth` e `/api/callback` (login GitHub do Decap CMS).
- **Certificado SSL/TLS**: automático pela Cloudflare.

### 2.2. Variáveis de Ambiente (painel Cloudflare Pages > Settings > Variables and Secrets)

Veja `.env.example` e `docs/CMS-DECAP.md`. Nenhum segredo vai no código.

```ini
SITE_URL=https://www.sindicone.com.br
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-5JKJHM2SFL
NODE_VERSION=22

# Formulário (/api/contato)
FORM_ENDPOINT=            # URL do serviço que recebe o lead (a definir)
FORM_ENDPOINT_TOKEN=      # opcional, secret
ALLOWED_ORIGINS=https://www.sindicone.com.br
WHATSAPP_NUMBER=5521978788211

# Login do Decap CMS (OAuth App do GitHub)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=     # secret
OAUTH_SCOPE=repo
```

> ⚠️ O painel antigo (Next `/admin` com senhas em variáveis `CMS_*`) foi removido. As senhas antigas continuam no histórico do Git e devem ser tratadas como vazadas: não reutilize em nenhum lugar.

---

## 3. Passo a Passo de Implantação (Cutover Seguro)

### Etapa 1 — Backup Integral do WordPress Atual (T - 24h)
1. No painel cPanel da hospedagem atual (`ns1006.hostgator.com.br` / servidor atual):
   - Gerar backup completo (`Full cPanel Backup`) incluindo banco MySQL e diretório `public_html/wp-content/uploads/`.
   - Exportar o arquivo XML nativo do WordPress (`Ferramentas > Exportar > Todo o conteúdo`).
2. Reduzir o **TTL (Time to Live)** dos registros DNS `A` e `CNAME` de `sindicone.com.br` e `www.sindicone.com.br` para **300 segundos (5 minutos)** pelo menos 24 horas antes da janela de migração.
3. **Preservação de E-mails (`MX`, `SPF`, `DKIM`, `DMARC`)**:
   - **NÃO alterar** os registros `MX` nem `TXT` (SPF/DKIM) responsáveis pelo recebimento e envio de `contato@sindicone.com.br`. Apenas os registros web (`A` de `@` e `CNAME` de `www`) serão apontados para a nova aplicação.

### Etapa 2 — Publicação e Validação em Ambiente de Homologação (`staging`)
1. Subir a aplicação em uma URL temporária de homologação (ex.: `https://staging.sindicone.com.br`).
2. Executar a suíte automatizada de verificação:
   ```bash
   npm run typecheck
   npm run build
   npm run test:validate
   ```
3. Conferir visualmente:
   - Página Inicial (`/`), Sobre Nós (`/sindico-profissional-na-zona-sul-do-rj/`), Serviços (`/servicos-sindico-profissional/`), Blog (`/blog/`), Notícias e Eventos (`/noticias-e-eventos/`) e Contato (`/contato/`).
   - Os 11 artigos originais na raiz (`/[slug]/`) e os 8 estudos de caso (`/servico-item/[slug]/`).
   - Envio real de teste no formulário de contato (`/contato/`) e clique no botão de WhatsApp.

### Etapa 3 — Virada de DNS (Janela Recomendada: Terça ou Quarta-feira, 22h00 BRT)
1. Apontar o registro `A` (`sindicone.com.br`) e `CNAME` (`www.sindicone.com.br`) para o projeto Cloudflare Pages (mantendo o WordPress legado intacto no servidor de origem por no mínimo 30 dias).
2. Verificar propagação SSL/HTTPS e redirecionamento `http://` → `https://www.sindicone.com.br/`.

---

## 4. Checklist de Monitoramento Pós-Publicação (Primeiras 72 Horas)

1. **Google Search Console (`https://search.google.com/search-console`)**:
   - Enviar o novo sitemap: `https://www.sindicone.com.br/sitemap.xml` e `https://www.sindicone.com.br/locations.kml`.
   - Utilizar a ferramenta **"Inspeção de URL"** nas 10 páginas principais para validar que o Googlebot lê status `200 OK`, canonical correta e dados estruturados (`LocalBusiness`, `BlogPosting`, `FAQPage`, `BreadcrumbList`) sem erros.
   - Monitorar o relatório **Páginas > Não encontradas (404)** nas primeiras 72 horas e semanalmente durante 30 dias.
2. **Google Analytics 4 (`G-5JKJHM2SFL`)**:
   - Verificar no **Relatório em Tempo Real** o disparo de `page_view`, `whatsapp_click` e `generate_lead`.
3. **Verificação de Cabeçalhos de Segurança e Indexação**:
   - Confirmar que `/admin/` (Decap CMS) retorna `X-Robots-Tag: noindex, nofollow`.

---

## 5. Plano de Rollback Imediato (< 5 Minutos)

Caso seja detectada qualquer anomalia crítica após a virada:

1. **Opção A — Rollback de Versão no Cloudflare Pages (Tempo estimado: 30 segundos)**:
   - Reverter imediatamente para o build anterior estável no painel do Cloudflare Pages (Deployments > Rollback) ou via `git revert`.
2. **Opção B — Rollback Completo para o WordPress Original (Tempo estimado: 5 minutos)**:
   - Como o servidor WordPress original permanece intacto e congelado durante os primeiros 30 dias, basta restaurar os registros `A` (`@`) e `CNAME` (`www`) no painel de DNS para o IP original da hospedagem WordPress.
   - Graças ao TTL reduzido para 300 segundos, o tráfego retorna integralmente ao WordPress antigo em até 5 minutos, sem perda de nenhum URL (pois todas as URLs originais foram preservadas na mesma estrutura `trailingSlash: true`).
