"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-[#f4f6f8]">
      <div className="max-w-lg w-full bg-white rounded-xl border border-gray-200 p-8 text-center shadow-xs">
        <AlertTriangle
          className="w-12 h-12 text-amber-500 mx-auto mb-3"
          aria-hidden="true"
        />
        <h1 className="font-heading text-2xl font-bold text-[#171c24]">
          Ocorreu uma instabilidade temporária
        </h1>
        <p className="mt-2 text-sm text-[#5c6470] leading-relaxed">
          Não se preocupe: nossos canais de atendimento condominial seguem funcionando normalmente. Tente recarregar a página ou fale conosco pelo telefone/WhatsApp (21) 97878-8211.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 bg-[#171c24] text-[#d9e141] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-md cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Tentar Novamente</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-gray-100 text-[#171c24] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-md"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Início</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
