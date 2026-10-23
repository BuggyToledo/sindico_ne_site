import type { NextConfig } from "next";

/**
 * Build 100% estático para Cloudflare Pages (pasta `out/`).
 * - Redirecionamentos: public/_redirects
 * - Cabeçalhos de segurança: public/_headers
 * - Formulário de contato e login do CMS: functions/api/* (Cloudflare Pages Functions)
 * - Painel de conteúdo: public/admin/ (Decap CMS)
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  devIndicators: false,
  images: {
    // Sem servidor de otimização de imagem no export estático.
    unoptimized: true,
  },
};

export default nextConfig;
