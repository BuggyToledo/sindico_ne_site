import React from "react";
import Link from "next/link";
import { Home, BookOpen, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 py-20 bg-[#f4f6f8]">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center shadow-sm">
        <span className="inline-block bg-[#d9e141] text-[#171c24] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">
          Erro 404
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#171c24]">
          Página não encontrada
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#5c6470] leading-relaxed">
          O endereço que você tentou acessar mudou ou não existe mais. Utilize os atalhos abaixo para encontrar o conteúdo sobre gestão condominial no Rio de Janeiro.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#171c24] text-[#d9e141] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-md hover:bg-[#222a36] transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Página Inicial</span>
          </Link>
          <Link
            href="/noticias-e-eventos/"
            className="inline-flex items-center gap-2 bg-gray-100 text-[#171c24] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-md hover:bg-gray-200 transition-colors"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Notícias &amp; Eventos</span>
          </Link>
          <Link
            href="/contato/"
            className="inline-flex items-center gap-2 bg-gray-100 text-[#171c24] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Fale Conosco</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
