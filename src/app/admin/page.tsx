import React from "react";
import type { Metadata } from "next";
import { EditorialDashboard } from "@/components/admin/EditorialDashboard";

export const metadata: Metadata = {
  title: "Painel Editorial (CMS) | Síndico Né!",
  description:
    "Sistema administrativo para gerenciamento de artigos, rascunhos, categorias, tags e SEO do blog Síndico Né!.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="bg-[#f4f6f8] min-h-[80vh]">
      <EditorialDashboard />
    </div>
  );
}
