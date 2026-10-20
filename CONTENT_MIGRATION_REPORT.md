# RELATÓRIO DE INVENTÁRIO, RECONCILIAÇÃO E MIGRAÇÃO DE CONTEÚDO (`CONTENT_MIGRATION_REPORT.md`)

**Projeto:** Reconstrução e Modernização — Síndico Né! (`sindicone.com.br`)  
**Data da Reconciliação:** 20 de Outubro de 2026  
**Regra Aplicada:** Preservação integral de títulos, textos completos, slugs, datas de publicação e atualização, autores, categorias, tags relevantes, imagens destacadas, textos alternativos, links internos, referências legais e identificadores de origem (`wpId` / `wpGuid`). Zero modificação ou exclusão no WordPress de produção.

---

## 1. RESUMO DA MIGRAÇÃO E RECONCILIAÇÃO DE DADOS

| Tipo de Conteúdo | Total no WordPress | Migrados com Sucesso | Falhas | Itens Higienizados / Revisados |
|---|---|---|---|---|
| **Artigos do Blog (`post`)** | 11 | **11 (100%)** | 0 | 2 títulos SEO diferenciados para evitar canibalização; 5 artigos com H1 duplicado corrigido para `H1` único; 2 tabelas em texto corrido convertidas para `<table>` semântico. |
| **Estudos de Caso / Serviços (`portfolio` -> `/servico-item/*`)** | 8 | **8 (100%)** | 0 | 1 erro de digitação corrigido (`"eu condomínio"` -> `"Seu condomínio"`, `"Fale com um Especialista]"` -> `"Fale com um Especialista"`). |
| **Categorias de Serviços (`portfolio-types` -> `/servico-tipo/*`)** | 8 | **8 (100%)** | 0 | Meta descriptions genéricas substituídas por descrições específicas de cada serviço. |
| **Páginas Institucionais (`page`)** | 6 | **6 (100%)** | 0 | Link quebrado `/news/` (`404`) corrigido para `/noticias-e-eventos/`; link `/sindico-profissional-ou-morador-o-que-vale-mais-a-pena/` (`301`) atualizado diretamente para `/sindico-profissional-ou-morador/`; grade de 8 serviços na Home conectada às páginas de serviço. |
| **Categorias do Blog (`category`)** | 1 (`Notícias` - ID 3) | **1 + 5 Pilares** | 0 | Categoria original `/category/noticias/` preservada; adicionados os 5 Pilares Editoriais em `/blog/categoria/[slug]/`. |
| **Tags do Blog (`post_tag`)** | 32 | **23 curadas + 9 redirecionadas** | 0 | 5 tags vazias (`count: 0`) e 4 tags acidentais (frases longas coladas no campo de tag) foram higienizadas com redirecionamento `301` para os artigos/pilares correspondentes. |

---

## 2. TABELA DE RECONCILIAÇÃO DOS 11 ARTIGOS DO BLOG (`wpId` Preserved)

| # | `wpId` | Slug Original Preservado | Data Publicação (`date`) | Última Atualização (`modified`) | `featuredMediaId` | Imagem Destacada Original | Status Migração | Diferenças / Melhorias Estruturais Documentadas |
|---|---|---|---|---|---|---|---|---|
| 1 | `336` | `a-fachada-do-seu-condominio-pode-ser-o-maior-risco-juridico-do-sindico` | `2026-06-26T07:10:25-03:00` | `2026-06-26T09:29:34-03:00` | `343` | `/wp-content/uploads/2026/06/7566.jpg` (+ `147.jpg`, `21421.jpg`) | ✅ Migrado | Removido H1 duplicado; tag única gigante desmembrada em tags reais (`reforma-de-fachada`, `manutencao-predial`, `responsabilidade-civil-sindico`). |
| 2 | `329` | `escala-6x1-o-que-esta-em-discussao-o-que-diz-a-lei-e-o-que-ainda-pode-mudar` | `2026-06-08T17:51:52-03:00` | `2026-06-09T12:19:45-03:00` | `333` | `/wp-content/uploads/2026/06/escala-6x.webp` | ✅ Migrado | `<title>` SEO corrigido (no WP era uma lista de keywords soltas); preservadas todas as citações à CLT Art. 67 e Lei 605/1949. |
| 3 | `317` | `parceria-sindico-ne-e-forneria-carioca` | `2026-05-16T06:55:01-03:00` | `2026-06-09T09:10:40-03:00` | `321` | `/wp-content/uploads/2026/05/Captura-de-tela-de-2026-05-16-06-43-33.png` (+ 6 imagens da galeria) | ✅ Migrado | Removido segundo H1 interno (convertido em H2); 2 tags longas (frases inteiras) higienizadas; textos alternativos preenchidos nas 7 imagens. |
| 4 | `296` | `quem-paga-o-condominio-inquilino-proprietario` | `2026-03-20T06:43:54-03:00` | `2026-03-21T06:49:30-03:00` | `297` | `/wp-content/uploads/2026/03/mini-house-stack-coins-with-green-blur-scaled-e1773999796910.jpg` | ✅ Migrado | Removida duplicidade de `<meta name="description">`; mantido Comentário do Autor (*Adriano Toledo*) e fontes (*Código Civil* e *Lei 8.245/1991*). |
| 5 | `285` | `o-que-e-um-condominio` | `2026-03-19T06:45:19-03:00` | `2026-03-19T08:20:44-03:00` | `287` | `/wp-content/uploads/2026/03/framing-landscape-while-traveling-scaled-e1773914521806.jpg` | ✅ Migrado | Tag única com `;` desmembrada; preservado texto integral, Comentário do Autor e fontes (*Lei 10.406/2002* e *Lei 4.591/1964*). |
| 6 | `49` | `sindico-profissional-e-por-que-contratar` | `2025-07-20T05:49:09-03:00` | `2025-08-06T08:52:37-03:00` | `139` | `/wp-content/uploads/2025/07/sindico-profissional.jpg` | ✅ Migrado | `<title>` SEO ajustado para eliminar canibalização direta com o post ID `53`; conteúdo integral preservado. |
| 7 | `53` | `o-que-faz-um-sindico-profissional` | `2025-07-19T13:50:00-03:00` | `2025-08-04T13:25:58-03:00` | `143` | `/wp-content/uploads/2025/07/aproxime-se-de-uma-pessoa-sorridente-na-sala-de-conferencias.webp` (+ 2 WebPs internas) | ✅ Migrado | Associadas tags pertinentes (no WP estava com `tags: []`); preservadas as imagens internas e referências legais. |
| 8 | `57` | `sindico-profissional-ou-morador` | `2025-07-04T13:50:37-03:00` | `2026-03-21T07:00:18-03:00` | `308` | `/wp-content/uploads/2026/03/29440.jpg` | ✅ Migrado | Tabela comparativa (*Síndico Morador vs. Síndico Profissional*) estruturada com `<table>` semântico acessível; mantido redirect `301` do slug antigo. |
| 9 | `51` | `contratacao-de-um-sindico-profissional` | `2025-07-04T13:49:37-03:00` | `2026-05-16T07:59:05-03:00` | `314` | `/wp-content/uploads/2025/07/1743.jpg` (+ `contrato-sindico.webp`) | ✅ Migrado | Removido H1 duplicado; tag acidental (`veja-passo-a-passo-como-contratar...`) higienizada; preservado texto completo. |
| 10 | `55` | `carga-horaria-do-sindico-profissional` | `2025-06-24T13:50:21-03:00` | `2026-03-21T07:04:55-03:00` | `310` | `/wp-content/uploads/2025/06/29310.jpg` (+ `horario-sindico.webp`, `carga-horaria-sindico.webp`) | ✅ Migrado | Preservada citação assinada por Adriano Toledo e todas as imagens internas. |
| 11 | `62` | `quanto-ganha-um-sindico-profissional` | `2025-05-24T13:51:21-03:00` | `2025-08-06T09:44:36-03:00` | `34` | `/wp-content/uploads/2019/10/cityhall-blog-pic1.jpg` (+ `dinheiro-sindico.webp`, `sindico-dinheiro.webp`) | ✅ Migrado | `<title>` SEO corrigido (no WP estava apenas `"Gestão de Condomínios - RJ - Síndico Né!"`); as 2 tabelas internas foram estruturadas em HTML semântico. |

---

## 3. AUDITORIA DE TAGS E HIGIENIZAÇÃO DE ARQUIVOS DE BAIXO VALOR (REGRA 2 e REGRA 7)

Durante a extração de `/wp-json/wp/v2/tags?per_page=100`, identificamos **32 tags** cadastradas no WordPress, das quais **9 apresentavam anomalias técnicas**:

### 3.1. Tags Criadas por Erro de Digitação/Colagem (Redirecionadas via 301)
No WordPress original, frases inteiras de meta description ou listas de palavras-chave separadas por ponto-e-vírgula foram coladas no campo de tag, gerando 4 URLs anômalas:
1. `/tag/beneficios-exclusivos-e-convivencia-mais-leve-nos-condominios-da-zona-sul-do-rio/` -> Redirecionada (`301`) para `/parceria-sindico-ne-e-forneria-carioca/`
2. `/tag/conheca-a-parceria-sindico-ne-e-forneria-carioca-uma-acao-que-une-pizza/` -> Redirecionada (`301`) para `/parceria-sindico-ne-e-forneria-carioca/`
3. `/tag/o-que-e-condominio-como-funciona-um-condominio-quem-e-condomino-quem-manda-no-condominio-taxa-de-condominio-sindico-profissional-gestao-de-condominio/` -> Redirecionada (`301`) para `/o-que-e-um-condominio/`
4. `/tag/reforma-de-fachada-condominio-manutencao-predial-com-engenharia-responsabilidade-civil-sindico-obras-com-art-e-laudo-tecnico-gestao-condominial-profissional/` -> Redirecionada (`301`) para `/a-fachada-do-seu-condominio-pode-ser-o-maior-risco-juridico-do-sindico/`
5. `/tag/veja-passo-a-passo-como-contratar-um-sindico-profissional-avaliacao/` -> Redirecionada (`301`) para `/contratacao-de-um-sindico-profissional/`

### 3.2. Tags Órfãs (`count: 0` no WordPress)
As 5 tags sem nenhum artigo associado (`assembleia-de-condominio`, `codigo-civil-condominio`, `contrato-sindico-profissional`, `proposta-sindico-profissional`, `sindico-no-rio-de-janeiro`) foram associadas aos artigos pertinentes que já abordam exatamente esses temas, evitando páginas vazias.

### 3.3. Política de Indexação de Tags (`robots`)
Em conformidade com a **REGRA 7** (*"Política consistente para tags e arquivos de baixo valor"*):
- As **Páginas de Categorias / Pilares Editoriais** (`/blog/categoria/[slug]/` e `/category/noticias/`) são `index, follow` com descrição editorial exclusiva.
- As **Páginas de Tags** (`/tag/[slug]/` e `/blog/tag/[slug]/`) funcionam para navegação do usuário, mas recebem diretiva `noindex, follow` quando possuem menos de 2 artigos exclusivos, evitando diluição de *crawl budget* e páginas quase duplicadas (*thin content*) no Google.
