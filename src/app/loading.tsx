import React from "react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8"
    >
      <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
          >
            <div className="aspect-[16/9] bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <span className="sr-only">Carregando conteúdo...</span>
    </div>
  );
}
