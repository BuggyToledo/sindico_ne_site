# Painel do blog (Decap CMS) — guia simples

O blog agora é editado em **`/admin/`** com o **Decap CMS**. Cada post é um arquivo
Markdown em `content/posts/<slug>.md`. O site é estático e fica no **Cloudflare Pages**.

- Endereço do painel: `https://www.sindicone.com.br/admin/` (sem indexação no Google).
- Login: conta do **GitHub** com acesso ao repositório `BuggyToledo/sindico_ne_site`.
- Fluxo de revisão (`editorial_workflow`): ao salvar, o Decap cria uma **branch + Pull Request**.
  O post só vai ao ar quando o PR é aprovado/mesclado na `main` e o Cloudflare faz o novo build.
  Cada PR gera uma **prévia** no Cloudflare Pages (URL de preview), boa para conferir antes.

---

## 1. Testar no seu computador (sem GitHub, sem login)

Precisa de Node 22.

```bash
npm install
npm run dev          # terminal 1 — site em http://localhost:3000
npm run cms:local    # terminal 2 — decap-server (proxy local na porta 8081)
```

Abra **http://localhost:3000/admin/index.html**.
Como o `config.yml` tem `local_backend: true`, no `localhost` o Decap grava direto nos
arquivos da sua pasta (`content/posts/` e `public/uploads/blog/`), sem login e sem PR.
Depois é só conferir com `git status` / `git diff`.

> Teste importante: abra um post **antigo**, mude uma vírgula, salve e rode `git diff`.
> Confira se os campos extras do topo do arquivo (ex.: `references`, `cta`, `relatedLinks`)
> continuaram lá. Os posts antigos têm o corpo em HTML: edite-os no modo **Markdown**
> do editor (não no modo visual), para não bagunçar o HTML.

Para ver o site final igual ao Cloudflare:

```bash
npm run build        # gera a pasta out/
npm run preview      # serve out/ localmente
npm run test:validate
```

## 2. Campos do post

Título, slug (endereço — não mude o de posts já publicados), resumo, resposta direta (IA),
imagem de capa + texto alternativo, categoria, tags, perguntas frequentes (FAQ),
**rascunho** (marcado = não aparece), **data de publicação**, "não indexar" (noindex),
título/descrição SEO e o texto.

- **Rascunho marcado** → não aparece em lugar nenhum (lista, sitemap, RSS, llms.txt).
- **Data no futuro** → também não aparece **até o próximo build depois dessa data**.
  O site é estático: alguém (ou um agendamento) precisa disparar um novo build. Veja o item 5.
- Imagens enviadas pelo painel vão para `public/uploads/blog/` (endereço `/uploads/blog/...`).

## 3. Login com GitHub (produção)

O Decap precisa de um "OAuth App" do GitHub e de um pequeno proxy. **O código do proxy já está
pronto** em `functions/api/auth.ts` e `functions/api/callback.ts` (Pages Functions), lendo
os segredos das variáveis de ambiente.

Opção recomendada (tudo no próprio Cloudflare Pages):

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: `https://www.sindicone.com.br`
   - Authorization callback URL: `https://www.sindicone.com.br/api/callback`
2. Copie o **Client ID** e gere um **Client secret**.
3. Cloudflare Pages → projeto → **Settings → Variables and Secrets**:
   - `GITHUB_CLIENT_ID` = Client ID
   - `GITHUB_CLIENT_SECRET` = Client secret (**tipo Secret**)
   - `OAUTH_SCOPE` = `repo` (repositório privado) ou `public_repo` (se for público)

Outras opções: usar um proxy OAuth externo já pronto (ex.: um Cloudflare Worker separado) e
trocar `base_url`/`auth_endpoint` em `public/admin/config.yml`. Para testar o login numa URL
de preview, é preciso um segundo OAuth App com a callback dessa URL (o GitHub aceita só uma
callback por app) e `base_url` apontando para ela.

## 4. Cloudflare Pages — configuração do projeto

- Repositório: `BuggyToledo/sindico_ne_site`, branch de produção `main`
- Build command: `npm run build`
- Build output directory: `out`
- Variável `NODE_VERSION` = `22`
- Variáveis (ver `.env.example`): `SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
  `FORM_ENDPOINT`, `FORM_ENDPOINT_TOKEN` (Secret, opcional), `ALLOWED_ORIGINS`,
  `WHATSAPP_NUMBER`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (Secret), `OAUTH_SCOPE`
- Redirects antigos e cabeçalhos: `public/_redirects` e `public/_headers`.
- Conferir na prévia: `/feed/` deve abrir o RSS (é servido a partir do arquivo `out/feed`).

## 5. Publicação agendada (opcional, não ativada)

Para posts com data futura entrarem sozinhos:

1. Cloudflare Pages → **Settings → Builds → Deploy hooks** → criar um hook (ex.: "agendado").
2. GitHub → **Settings → Secrets and variables → Actions** → secret
   `CLOUDFLARE_DEPLOY_HOOK_URL` com a URL do hook.
3. Copie `docs/exemplos/rebuild-agendado.yml` para `.github/workflows/` (roda todo dia 06:00 de Brasília).

Sem isso, o post agendado aparece no primeiro build que acontecer após a data
(qualquer merge na `main` faz um build).

## 6. Formulário de contato

`/contato/` envia para a Pages Function `functions/api/contato.ts`, que valida os campos,
descarta robôs (campo escondido "honeypot") e repassa o lead em JSON para `FORM_ENDPOINT`
(o serviço que você escolher). Se `FORM_ENDPOINT` não estiver configurado ou falhar,
o formulário mostra o botão **"Enviar pelo WhatsApp"** com a mensagem pronta.
Nenhuma chave fica no código.

## 7. Segurança — painel antigo

O painel antigo (Next `/admin`, `/api/cms/*`, login por senha) foi removido, e as senhas
saíram do `.env.example`. **Elas continuam no histórico do Git**: trate-as como vazadas e
não as reutilize em nenhum serviço. Se foram usadas em algum lugar, troque.
