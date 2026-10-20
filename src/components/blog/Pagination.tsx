import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g., "/blog" or "/noticias-e-eventos"
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const cleanBase = basePath.replace(/\/$/, "");
  const getPageHref = (page: number) =>
    page === 1 ? `${cleanBase}/` : `${cleanBase}/page/${page}/`;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginação de artigos"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link
          href={getPageHref(currentPage - 1)}
          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-[#171c24] hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>Anterior</span>
        </Link>
      )}

      <div className="flex items-center gap-1.5">
        {pages.map((p) => {
          const isCurrent = p === currentPage;
          return (
            <Link
              key={p}
              href={getPageHref(p)}
              aria-current={isCurrent ? "page" : undefined}
              className={`w-10 h-10 rounded-md inline-flex items-center justify-center text-sm font-bold transition-colors ${
                isCurrent
                  ? "bg-[#171c24] text-[#d9e141]"
                  : "bg-white border border-gray-300 text-[#171c24] hover:bg-gray-50"
              }`}
            >
              {p}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages && (
        <Link
          href={getPageHref(currentPage + 1)}
          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-[#171c24] hover:bg-gray-50 transition-colors"
        >
          <span>Próxima</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
