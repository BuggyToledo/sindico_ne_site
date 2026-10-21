"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Save,
  Eye,
  Trash2,
  History,
  LogOut,
  Lock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Globe,
  Clock,
  Link2,
  Image as ImageIcon,
} from "lucide-react";
import type { Article, ArticleStatus, EditorialUser } from "@/types/editorial";
import {
  EDITORIAL_CATEGORIES,
  EDITORIAL_TAGS,
  AUTHORS,
} from "@/data/site-config";

const AVAILABLE_MEDIA = [
  {
    label: "Síndico Profissional (Destaque Principal)",
    url: "/wp-content/uploads/2021/10/Design-sem-nome-15.jpg",
  },
  {
    label: "Gestão Condominial e Importância do Síndico",
    url: "/wp-content/uploads/2021/10/Design-sem-nome-12.jpg",
  },
  {
    label: "Responsabilidades do Síndico (Código Civil)",
    url: "/wp-content/uploads/2021/10/Design-sem-nome-11.jpg",
  },
  {
    label: "Contratação de Síndico Profissional",
    url: "/wp-content/uploads/2021/10/Design-sem-nome-14.jpg",
  },
  {
    label: "Síndico Profissional RJ (Vista Rio de Janeiro)",
    url: "/wp-content/uploads/2021/10/Design-sem-nome-16.jpg",
  },
  {
    label: "Implantação de Condomínio",
    url: "/wp-content/uploads/2021/10/Design-sem-nome-13.jpg",
  },
  {
    label: "Assembleia Virtual de Condomínio",
    url: "/wp-content/uploads/2021/10/Design-sem-nome-10.jpg",
  },
  {
    label: "Segurança contra Incêndios / Emergências",
    url: "/wp-content/uploads/2021/10/Design-sem-nome-8.jpg",
  },
  {
    label: "Bicicletário e Organização Condominial",
    url: "/wp-content/uploads/2021/10/Design-sem-nome-9.jpg",
  },
];

export function EditorialDashboard() {
  const [user, setUser] = useState<EditorialUser | null>(null);
  const [sessionToken, setSessionToken] = useState<string>("");
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState("admin@sindicone.com.br");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Partial<Article> | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  const getAuthHeaders = useCallback(
    (extra: Record<string, string> = {}) => {
      const storedToken =
        sessionToken ||
        (typeof window !== "undefined"
          ? window.sessionStorage.getItem("sindicone_cms_token") || ""
          : "");
      return {
        ...extra,
        ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
      };
    },
    [sessionToken]
  );

  const fetchArticles = useCallback(
    async (overrideToken?: string) => {
      const tokenToUse =
        overrideToken ||
        sessionToken ||
        (typeof window !== "undefined"
          ? window.sessionStorage.getItem("sindicone_cms_token") || ""
          : "");
      const res = await fetch("/api/cms/articles/?includeDrafts=true", {
        headers: tokenToUse ? { Authorization: `Bearer ${tokenToUse}` } : {},
        credentials: "include",
      });
      if (res.ok) {
        const data = (await res.json()) as {
          articles: Article[];
          user: EditorialUser;
        };
        setArticles(data.articles || []);
        if (data.user) setUser(data.user);
      }
    },
    [sessionToken]
  );

  useEffect(() => {
    async function checkSession() {
      try {
        const storedToken =
          typeof window !== "undefined"
            ? window.sessionStorage.getItem("sindicone_cms_token") || ""
            : "";
        if (storedToken) setSessionToken(storedToken);
        const res = await fetch("/api/cms/auth/", {
          headers: storedToken
            ? { Authorization: `Bearer ${storedToken}` }
            : {},
          credentials: "include",
        });
        const data = (await res.json()) as {
          authenticated: boolean;
          user: EditorialUser | null;
        };
        if (data.authenticated && data.user) {
          setUser(data.user);
          await fetchArticles(storedToken);
        }
      } finally {
        setLoadingAuth(false);
      }
    }
    checkSession();
  }, [fetchArticles]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/cms/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        user?: EditorialUser;
        token?: string;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.user) {
        setAuthError(data.error || "Falha na autenticação.");
        return;
      }
      if (data.token) {
        setSessionToken(data.token);
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("sindicone_cms_token", data.token);
        }
      }
      setUser(data.user);
      setPassword("");
      await fetchArticles(data.token);
    } catch {
      setAuthError(
        "Erro de conexão com o servidor. Verifique se a aplicação está rodando."
      );
    }
  }

  async function handleLogout() {
    await fetch("/api/cms/auth/", {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      credentials: "include",
      body: JSON.stringify({ action: "logout" }),
    });
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("sindicone_cms_token");
    }
    setSessionToken("");
    setUser(null);
    setSelected(null);
  }

  function handleNewArticle() {
    const nowIso = new Date().toISOString();
    setSelected({
      title: "",
      slug: "",
      LegacyRootUrl: false,
      excerpt: "",
      directAnswer: "",
      contentHtml:
        "<h2>Introdução</h2>\n<p>Escreva aqui o conteúdo técnico do artigo...</p>\n<h2>Principais Cuidados para o Síndico e o Conselho</h2>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>",
      featuredImage: {
        url: "/wp-content/uploads/2021/10/Design-sem-nome-15.jpg",
        alt: "",
        width: 1200,
        height: 675,
      },
      authorId: "adriano-toledo",
      reviewerId: "adriano-toledo",
      categorySlug: "gestao-condominial",
      tags: ["sindico-profissional"],
      publishedAt: nowIso,
      status: "draft",
      seoTitle: "",
      seoDescription: "",
      canonicalUrl: "",
      noIndex: true,
    });
    setFeedback(null);
  }

  function generateSlugFromTitle(title: string) {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleSave(targetStatus?: ArticleStatus) {
    if (!selected) return;
    setSaving(true);
    setFeedback(null);

    const finalStatus = targetStatus ?? selected.status ?? "draft";
    const slug =
      selected.slug?.trim() || generateSlugFromTitle(selected.title || "");
    const canonicalUrl =
      selected.canonicalUrl?.trim() ||
      (selected.LegacyRootUrl
        ? `https://www.sindicone.com.br/${slug}/`
        : `https://www.sindicone.com.br/blog/${slug}/`);

    const payload = {
      ...selected,
      slug,
      status: finalStatus,
      canonicalUrl,
      seoTitle:
        selected.seoTitle?.trim() || `${selected.title || ""} | Síndico Né!`,
      seoDescription:
        selected.seoDescription?.trim() || selected.excerpt || "",
      noIndex: finalStatus !== "published" ? true : Boolean(selected.noIndex),
    };

    try {
      const res = await fetch("/api/cms/articles/", {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        article?: Article;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.article) {
        setFeedback({
          type: "error",
          text: data.error || "Não foi possível salvar o artigo.",
        });
        setSaving(false);
        return;
      }

      setSelected(data.article);
      await fetchArticles();
      setFeedback({
        type: "success",
        text: `Artigo salvo com sucesso com status "${data.article.status.toUpperCase()}".`,
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Erro de comunicação ao salvar artigo.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir este artigo permanentemente?"
      )
    ) {
      return;
    }
    const res = await fetch(`/api/cms/articles/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      setFeedback({
        type: "error",
        text: data.error || "Não foi possível excluir o artigo.",
      });
      return;
    }
    setSelected(null);
    await fetchArticles();
    setFeedback({
      type: "success",
      text: "Artigo excluído com sucesso.",
    });
  }

  async function handleRestoreRevision(revisionId: string) {
    if (!selected?.id) return;
    const res = await fetch(`/api/cms/articles/${selected.id}/`, {
      method: "PATCH",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      credentials: "include",
      body: JSON.stringify({ revisionId }),
    });
    const data = (await res.json()) as {
      ok?: boolean;
      article?: Article;
      error?: string;
    };
    if (!res.ok || !data.ok || !data.article) {
      setFeedback({
        type: "error",
        text: data.error || "Erro ao restaurar revisão.",
      });
      return;
    }
    setSelected(data.article);
    await fetchArticles();
    setFeedback({
      type: "success",
      text: "Versão anterior restaurada com sucesso!",
    });
  }

  function insertSnippet(snippet: string) {
    if (!selected) return;
    setSelected({
      ...selected,
      contentHtml: `${selected.contentHtml || ""}\n${snippet}`,
    });
  }

  if (loadingAuth) {
    return (
      <div className="p-12 text-center text-sm text-[#5c6470]">
        Verificando sessão editorial...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171c24] bg-[#d9e141] px-3 py-1 rounded w-fit mb-4">
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Acesso Restrito — CMS Síndico Né!</span>
        </div>
        <h1 className="font-heading text-2xl font-bold text-[#171c24]">
          Painel Editorial do Blog
        </h1>
        <p className="mt-1 text-sm text-[#5c6470]">
          Entre com suas credenciais de Administrador, Editor ou Autor para gerenciar artigos, rascunhos e SEO.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="cms-email"
              className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1"
            >
              E-mail Editorial
            </label>
            <input
              id="cms-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="cms-password"
                className="block text-xs font-bold uppercase tracking-wider text-[#171c24]"
              >
                Senha
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[11px] font-semibold text-[#171c24] underline cursor-pointer"
              >
                {showPassword ? "Ocultar senha" : "Mostrar senha"}
              </button>
            </div>
            <input
              id="cms-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="SindicoNe@2026!"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
            />
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#171c24] hover:bg-[#242c38] text-[#d9e141] font-bold text-sm py-3 rounded-md transition-colors cursor-pointer"
          >
            Entrar no Painel Editorial
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-[#5c6470] space-y-1">
          <p className="font-bold text-[#171c24]">Perfis configurados (RBAC):</p>
          <p>• Administrador: admin@sindicone.com.br</p>
          <p>• Editor: editor@sindicone.com.br</p>
          <p>• Autor: autor@sindicone.com.br</p>
          <p className="text-[11px] text-gray-400">
            (Consulte <code>.env.example</code> e <code>EDITORIAL_GUIDE.md</code> para senhas de ambiente local).
          </p>
        </div>
      </div>
    );
  }

  const filteredList = articles.filter((a) =>
    statusFilter === "all" ? true : a.status === statusFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Bar */}
      <div className="bg-[#171c24] text-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#d9e141]">
            Sistema de Gestão Editorial (CMS)
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold">
            Painel Editorial Síndico Né!
          </h1>
          <p className="text-xs text-[#b8c0cc] mt-0.5">
            Logado como: <strong>{user.name}</strong> ({user.email}) — Perfil:{" "}
            <span className="uppercase font-bold text-[#d9e141]">
              {user.role}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleNewArticle}
            className="inline-flex items-center gap-1.5 bg-[#d9e141] hover:bg-[#c5cd32] text-[#171c24] font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-md cursor-pointer"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Novo Artigo</span>
          </button>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-md"
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            <span>Ver Blog Público</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 font-semibold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-md cursor-pointer"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          role="status"
          className={`p-4 rounded-xl border text-sm flex items-center gap-2.5 ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Article List */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-4 h-fit">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-[#171c24] flex items-center gap-1.5">
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Artigos ({filteredList.length})</span>
            </h2>
            <select
              aria-label="Filtrar por status editorial"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2.5 py-1.5 text-[#171c24]"
            >
              <option value="all">Todos ({articles.length})</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos</option>
              <option value="in_review">Em Revisão</option>
              <option value="scheduled">Agendados</option>
            </select>
          </div>

          <div className="divide-y divide-gray-100 max-h-[680px] overflow-y-auto pr-1">
            {filteredList.map((art) => {
              const isSelected = selected?.id === art.id;
              return (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => {
                    setSelected(art);
                    setFeedback(null);
                  }}
                  className={`w-full text-left py-3.5 px-3 rounded-lg transition-colors block cursor-pointer ${
                    isSelected ? "bg-[#171c24] text-white" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        art.status === "published"
                          ? "bg-emerald-100 text-emerald-800"
                          : art.status === "draft"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {art.status === "published"
                        ? "Publicado"
                        : art.status === "draft"
                        ? "Rascunho (noindex)"
                        : art.status}
                    </span>
                    <span
                      className={`text-[11px] ${
                        isSelected ? "text-gray-300" : "text-gray-400"
                      }`}
                    >
                      {new Date(art.updatedAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p
                    className={`font-heading text-base font-bold leading-snug ${
                      isSelected ? "text-[#d9e141]" : "text-[#171c24]"
                    }`}
                  >
                    {art.title}
                  </p>
                  <p
                    className={`text-xs truncate mt-0.5 ${
                      isSelected ? "text-gray-300" : "text-[#5c6470]"
                    }`}
                  >
                    /{art.slug}/
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Editor */}
        <div className="lg:col-span-8">
          {!selected ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-[#5c6470]">
              <FileText className="w-10 h-10 mx-auto mb-3 text-[#171c24] opacity-70" />
              <h3 className="font-heading text-xl font-bold text-[#171c24]">
                Selecione um artigo ao lado ou clique em &ldquo;Novo Artigo&rdquo;
              </h3>
              <p className="text-sm mt-1">
                Você pode editar títulos, texto, imagens destacadas, SEO, agendamento e consultar o histórico de revisões.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Editor Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSave("draft")}
                    className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#171c24] font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-md cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Salvar Rascunho</span>
                  </button>

                  {user.role !== "author" && (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleSave("published")}
                      className="inline-flex items-center gap-1.5 bg-[#171c24] hover:bg-[#252d3a] text-[#d9e141] font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-md cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Publicar Agora</span>
                    </button>
                  )}

                  {selected.slug && (
                    <Link
                      href={`/blog/preview/${selected.slug}/`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-md"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Pré-visualizar</span>
                    </Link>
                  )}
                </div>

                {selected.id && user.role === "admin" && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selected.id!)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                    <span>Excluir</span>
                  </button>
                )}
              </div>

              {/* Main Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1">
                    Título do Artigo (H1) *
                  </label>
                  <input
                    type="text"
                    value={selected.title || ""}
                    onChange={(e) => {
                      const title = e.target.value;
                      setSelected({
                        ...selected,
                        title,
                        slug: selected.id
                          ? selected.slug
                          : generateSlugFromTitle(title),
                      });
                    }}
                    placeholder="Ex.: Como reduzir a inadimplência no condomínio com segurança jurídica"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-[#171c24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1">
                    Slug (Caminho da URL) *
                  </label>
                  <input
                    type="text"
                    value={selected.slug || ""}
                    onChange={(e) =>
                      setSelected({ ...selected, slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1">
                    Status Editorial e Agendamento
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={selected.status || "draft"}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          status: e.target.value as ArticleStatus,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-[#171c24]"
                    >
                      <option value="draft">Rascunho (Não indexado)</option>
                      <option value="in_review">Em Revisão Técnica</option>
                      <option value="scheduled">Agendado</option>
                      <option value="published">Publicado</option>
                      <option value="archived">Arquivado</option>
                    </select>
                  </div>
                </div>
              </div>

              {selected.status === "scheduled" && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-700 shrink-0" />
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase text-blue-900">
                      Data e Hora Programada para Publicação Automática
                    </label>
                    <input
                      type="datetime-local"
                      value={
                        selected.scheduledFor
                          ? selected.scheduledFor.slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          scheduledFor: new Date(e.target.value).toISOString(),
                        })
                      }
                      className="mt-1 px-3 py-1.5 rounded border border-blue-300 text-xs bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Category, Author & Reviewer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1">
                    Categoria Editorial
                  </label>
                  <select
                    value={selected.categorySlug || "gestao-condominial"}
                    onChange={(e) =>
                      setSelected({ ...selected, categorySlug: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                  >
                    {EDITORIAL_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1">
                    Autor
                  </label>
                  <select
                    value={selected.authorId || "adriano-toledo"}
                    onChange={(e) =>
                      setSelected({ ...selected, authorId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                  >
                    {Object.values(AUTHORS).map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1">
                    Revisor Técnico
                  </label>
                  <select
                    value={selected.reviewerId || "adriano-toledo"}
                    onChange={(e) =>
                      setSelected({ ...selected, reviewerId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                  >
                    {Object.values(AUTHORS).map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Excerpt & GEO Direct Answer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1">
                    Resumo Editorial (Excerpt) *
                  </label>
                  <textarea
                    rows={3}
                    value={selected.excerpt || ""}
                    onChange={(e) =>
                      setSelected({ ...selected, excerpt: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1">
                    Síntese Direta (GEO / Resposta Rápida IA)
                  </label>
                  <textarea
                    rows={3}
                    value={selected.directAnswer || ""}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        directAnswer: e.target.value,
                      })
                    }
                    placeholder="Resposta objetiva de 2 a 3 frases sobre a pergunta central do artigo..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                  />
                </div>
              </div>

              {/* Featured Image & Alt Text */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#171c24]">
                  <ImageIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Imagem Destacada e Acessibilidade (Alt Text)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5c6470] mb-1">
                      Selecionar da Biblioteca ou informar caminho
                    </label>
                    <select
                      value={
                        selected.featuredImage?.url ||
                        "/wp-content/uploads/2021/10/Design-sem-nome-15.jpg"
                      }
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          featuredImage: {
                            url: e.target.value,
                            alt:
                              selected.featuredImage?.alt ||
                              selected.title ||
                              "Síndico Né!",
                            width: 1200,
                            height: 675,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded border border-gray-300 text-xs bg-white"
                    >
                      {AVAILABLE_MEDIA.map((m) => (
                        <option key={m.url} value={m.url}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#5c6470] mb-1">
                      Texto Alternativo (Alt Text Obrigatório) *
                    </label>
                    <input
                      type="text"
                      value={selected.featuredImage?.alt || ""}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          featuredImage: {
                            url:
                              selected.featuredImage?.url ||
                              "/wp-content/uploads/2021/10/Design-sem-nome-15.jpg",
                            alt: e.target.value,
                            width: 1200,
                            height: 675,
                          },
                        })
                      }
                      placeholder="Descreva a imagem para leitores de tela e Google Imagens"
                      className="w-full px-3 py-2 rounded border border-gray-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Content Editor with Quick Formatting & Internal Link Helpers */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24]">
                    Conteúdo do Artigo (HTML Semântico H2/H3/Listas/Links) *
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        insertSnippet("<h2>Novo Subtítulo da Seção</h2>")
                      }
                      className="px-2 py-1 text-[11px] font-bold bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
                    >
                      + H2
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertSnippet("<h3>Subtópico Complementar</h3>")
                      }
                      className="px-2 py-1 text-[11px] font-bold bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
                    >
                      + H3
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertSnippet(
                          '<p>Consulte também nossos <a href="/servicos-sindico-profissional/">serviços de síndico profissional no Rio de Janeiro</a> ou <a href="/contato/">solicite um diagnóstico condominial</a>.</p>'
                        )
                      }
                      className="px-2 py-1 text-[11px] font-bold bg-[#d9e141]/40 hover:bg-[#d9e141] text-[#171c24] rounded inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Link2 className="w-3 h-3" />
                      <span>+ Link Interno Comercial</span>
                    </button>
                  </div>
                </div>
                <textarea
                  rows={12}
                  value={selected.contentHtml || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, contentHtml: e.target.value })
                  }
                  className="w-full px-3.5 py-3 rounded-lg border border-gray-300 text-xs font-mono leading-relaxed"
                />
              </div>

              {/* Tags Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171c24] mb-1.5">
                  Tags Relacionadas
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-3 rounded-lg border border-gray-200 bg-gray-50">
                  {EDITORIAL_TAGS.map((tag) => {
                    const active = (selected.tags || []).includes(tag.slug);
                    return (
                      <button
                        key={tag.slug}
                        type="button"
                        onClick={() => {
                          const current = selected.tags || [];
                          const next = active
                            ? current.filter((t) => t !== tag.slug)
                            : [...current, tag.slug];
                          setSelected({ ...selected, tags: next });
                        }}
                        className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                          active
                            ? "bg-[#171c24] text-[#d9e141] font-bold"
                            : "bg-white border border-gray-200 text-[#5c6470]"
                        }`}
                      >
                        #{tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SEO Metadata Panel */}
              <div className="p-5 rounded-xl bg-[#f4f6f8] border border-gray-200 space-y-4">
                <h3 className="font-heading text-base font-bold text-[#171c24] uppercase tracking-wider">
                  Configurações de SEO Técnico e Indexação
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#171c24] mb-1">
                      Título SEO (Meta Title)
                    </label>
                    <input
                      type="text"
                      value={selected.seoTitle || ""}
                      onChange={(e) =>
                        setSelected({ ...selected, seoTitle: e.target.value })
                      }
                      placeholder="Título para o Google (50–60 caracteres)"
                      className="w-full px-3 py-2 rounded border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#171c24] mb-1">
                      URL Canônica
                    </label>
                    <input
                      type="text"
                      value={selected.canonicalUrl || ""}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          canonicalUrl: e.target.value,
                        })
                      }
                      placeholder="https://www.sindicone.com.br/..."
                      className="w-full px-3 py-2 rounded border border-gray-300 text-xs bg-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#171c24] mb-1">
                      Meta Description (140–160 caracteres)
                    </label>
                    <textarea
                      rows={2}
                      value={selected.seoDescription || ""}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          seoDescription: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded border border-gray-300 text-xs bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <input
                      id="noindex-toggle"
                      type="checkbox"
                      checked={
                        selected.status !== "published"
                          ? true
                          : Boolean(selected.noIndex)
                      }
                      disabled={selected.status !== "published"}
                      onChange={(e) =>
                        setSelected({ ...selected, noIndex: e.target.checked })
                      }
                      className="rounded border-gray-300"
                    />
                    <label
                      htmlFor="noindex-toggle"
                      className="text-xs font-semibold text-[#171c24]"
                    >
                      Impedir indexação pelos mecanismos de busca (
                      <code>noindex, nofollow</code>) — Obrigatório automaticamente para rascunhos e artigos em revisão.
                    </label>
                  </div>
                </div>
              </div>

              {/* Revision History & Recovery */}
              {selected.revisions && selected.revisions.length > 0 && (
                <div className="p-5 rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171c24]">
                    <History className="w-4 h-4" aria-hidden="true" />
                    <span>
                      Histórico de Revisões e Recuperação de Conteúdo (
                      {selected.revisions.length})
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto text-xs">
                    {selected.revisions.map((rev) => (
                      <div
                        key={rev.id}
                        className="py-2.5 flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-semibold text-[#171c24]">
                            {rev.summary}
                          </p>
                          <p className="text-[11px] text-[#5c6470]">
                            {new Date(rev.timestamp).toLocaleString("pt-BR")}{" "}
                            por {rev.authorEmail}
                          </p>
                        </div>
                        {user.role !== "author" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRestoreRevision(rev.id || rev.revisionId)
                            }
                            className="px-3 py-1 rounded bg-gray-100 hover:bg-[#171c24] hover:text-[#d9e141] font-bold text-[11px] transition-colors cursor-pointer shrink-0"
                          >
                            Restaurar versão
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
