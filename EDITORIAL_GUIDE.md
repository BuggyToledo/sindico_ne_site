# Guia Editorial e Manual de Publicação — Síndico Né! (`EDITORIAL_GUIDE.md`)

> Manual operacional voltado ao proprietário (**Adriano Toledo**) e à equipe editorial do **Síndico Né!** para administrar o blog, criar e revisar artigos, otimizar SEO e publicar com segurança sem precisar programar.

---

## 1. Como Acessar o Painel Editorial (`/admin/`)

1. Acesse a URL administrativa do site:
   - Ambiente local: `http://localhost:3000/admin/`
   - Ambiente de homologação/produção: `https://www.sindicone.com.br/admin/`
2. Informe seu **E-mail Editorial** e **Senha** configurados nas variáveis de ambiente do servidor (`.env.local`):
   - **Administrador (`admin`)**: Acesso total para criar, editar, publicar, agendar, restaurar versões anteriores e excluir artigos.
   - **Editor (`editor`)**: Pode criar, editar, publicar, agendar e restaurar revisões (não pode excluir artigos publicados).
   - **Autor (`author`)**: Pode criar artigos e salvar como **Rascunho (`draft`)** ou **Em Revisão (`in_review`)**, mas depende de aprovação do Editor ou Administrador para publicação.
3. A sessão utiliza cookie `HttpOnly` assinado no servidor (`sindicone_cms_session`) com duração de 12 horas — nenhuma chave ou senha fica exposta no navegador.

---

## 2. Como Criar um Novo Artigo

1. No topo do Painel Editorial (`/admin/`), clique no botão verde-lima **"+ Novo Artigo"**.
2. Preencha os campos principais:
   - **Título do Artigo (H1)**: Deve ser claro, informativo e focado na dúvida real do síndico, conselheiro ou morador (ex.: *"Autovistoria Predial no Rio de Janeiro: Prazos e Obrigações da Lei 6.400/2013"*).
   - **Slug (Caminho da URL)**: Gerado automaticamente a partir do título, sem acentos ou caracteres especiais. Novos artigos são publicados em `/blog/seu-slug/`, enquanto os 11 artigos históricos preservam seus endereços originais na raiz (`/[slug]/`).
   - **Categoria Editorial**: Escolha entre *Gestão Condominial*, *Finanças e Orçamento*, *Legislação e Assembleias*, *Segurança e Manutenção Predial* ou *Convivência e Implantação*.
   - **Autor e Revisor Técnico**: Por padrão, atribui **Adriano Toledo (CRA-RJ 03-06783 | CRECI-J 12.974)**, reforçando os sinais de autoridade e confiabilidade (E-E-A-T).
   - **Resumo Editorial (Excerpt)**: Parágrafo curto (2 a 3 linhas) exibido nos cards de listagem do blog e compartilhamentos.
   - **Síntese Direta (GEO / Resposta Rápida IA)**: Resposta direta e objetiva (40 a 65 palavras) posicionada no topo do artigo para facilitar citações em motores de busca com Inteligência Artificial (Google AI Overviews, Perplexity, ChatGPT Search).

---

## 3. Como Salvar Rascunhos, Pré-visualizar, Agendar e Publicar

- **Salvar Rascunho (`draft`)**:
  - Clique em **"Salvar Rascunho"**. O artigo é salvo imediatamente no repositório editorial (`content/articles.json`), mas **não aparece** nas listagens públicas (`/blog/`, `/noticias-e-eventos/`), **não entra** no `sitemap.xml` e recebe automaticamente a diretiva `noindex, nofollow`.
- **Pré-visualizar antes de publicar (`/blog/preview/[slug]/`)**:
  - Clique no botão amarelo **"Pré-visualizar"**. Uma nova aba abrirá a página `/blog/preview/[slug]/` com o layout idêntico ao artigo final e uma faixa de aviso no topo informando que o conteúdo está em modo de pré-visualização não indexável.
- **Agendar Publicação (`scheduled`)**:
  - No seletor **"Status Editorial"**, escolha **"Agendado"**, selecione a **Data e Hora Programada** e clique em salvar. Assim que a data programada for atingida, o sistema promove automaticamente o artigo para **"Publicado"** e libera sua indexação.
- **Publicar Imediatamente (`published`)**:
  - Clique no botão **"Publicar Agora"**. O artigo passa a integrar imediatamente o `/blog/`, a página da categoria correspondente, o feed RSS (`/feed/`) e o `sitemap.xml`.

---

## 4. Como Escolher Imagens e Preencher o Texto Alternativo (`alt`)

1. Na seção **"Imagem Destacada e Acessibilidade"**, selecione uma imagem otimizada da biblioteca ou informe o caminho em `/wp-content/uploads/...`.
2. **Padrão de Qualidade Visual**:
   - Proporção recomendada: **16:9** (`1200x675 px`).
   - Formato preferencial: WebP, AVIF ou JPEG otimizado (até 200 KB).
3. **Texto Alternativo (`Alt Text`) — Obrigatório**:
   - Descreva de forma objetiva o que aparece na imagem conectando ao tema do artigo (ex.: *"Vistoria técnica de equipamentos de combate a incêndio em condomínio no Rio de Janeiro"*).
   - O sistema valida o preenchimento do `alt` antes de permitir o salvamento.

---

## 5. Como Preencher os Campos de SEO (`seoTitle`, `seoDescription`, `canonicalUrl`)

Na caixa **"Configurações de SEO Técnico e Indexação"**:
- **Título SEO (`seoTitle`)**: Entre **50 e 60 caracteres**, incluindo a palavra-chave principal e a assinatura `| Síndico Né!`.
- **Meta Description (`seoDescription`)**: Entre **140 e 160 caracteres**, resumindo o benefício prático da leitura e convidando ao clique.
- **URL Canônica (`canonicalUrl`)**: Preenchida automaticamente pelo sistema. Só altere caso o texto seja republicação autorizada de outro endereço.
- **Controle de Indexação (`noIndex`)**: Mantido desmarcado para artigos publicados que devem ranquear no Google; ativado automaticamente para rascunhos e conteúdos em revisão.

---

## 6. Como Inserir Links Internos e Chamadas para Ação (CTAs)

- Utilize o botão rápido **"+ Link Interno Comercial"** na barra do editor ou insira links HTML padrão apontando para páginas estratégicas do site:
  - Página de Serviços: `/servicos-sindico-profissional/`
  - Página Sobre Nós (Zona Sul RJ): `/sindico-profissional-na-zona-sul-do-rj/`
  - Página de Contato / Diagnóstico: `/contato/`
- **Regra de Ouro de Linkagem Interna**: Todo novo artigo deve conter pelo menos **2 links para artigos correlatos do blog** e **1 link contextual para página de serviço ou contato**.

---

## 7. Como Revisar e Atualizar Artigos Antigos (Histórico de Revisões)

1. Ao editar qualquer artigo existente, o sistema grava automaticamente um **Snapshot de Revisão** com data, hora, autor da alteração e conteúdo anterior.
2. Caso precise desfazer uma edição ou recuperar um parágrafo antigo, role até a seção **"Histórico de Revisões e Recuperação de Conteúdo"** no final do formulário e clique em **"Restaurar versão"**.
3. Sempre que atualizar dados legais ou técnicos de um artigo já publicado, a data `"Atualizado em"` e a propriedade `dateModified` do Schema.org `BlogPosting` são atualizadas automaticamente para sinalizar frescor editorial ao Google.
