import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sindicone.com.br",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "sindicone.com.br",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/blog/preview/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 1. Correção de link quebrado (404) herdado do tema CityHall na página de Serviços
      {
        source: "/news/",
        destination: "/noticias-e-eventos/",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/noticias-e-eventos/",
        permanent: true,
      },
      // 2. Redirecionamento histórico 301 do slug antigo do artigo ID 57
      {
        source: "/sindico-profissional-ou-morador-o-que-vale-mais-a-pena/",
        destination: "/sindico-profissional-ou-morador/",
        permanent: true,
      },
      {
        source: "/sindico-profissional-ou-morador-o-que-vale-mais-a-pena",
        destination: "/sindico-profissional-ou-morador/",
        permanent: true,
      },
      // 3. Slug interno da Home (WP ID 2)
      {
        source: "/sample-page/",
        destination: "/",
        permanent: true,
      },
      // 4. Consolidação do feed de comentários desativados
      {
        source: "/comments/feed/",
        destination: "/feed/",
        permanent: true,
      },
      // 5. Higienização das 5 tags criadas por colagem acidental de frases inteiras no WP
      {
        source:
          "/tag/beneficios-exclusivos-e-convivencia-mais-leve-nos-condominios-da-zona-sul-do-rio/",
        destination: "/parceria-sindico-ne-e-forneria-carioca/",
        permanent: true,
      },
      {
        source:
          "/tag/conheca-a-parceria-sindico-ne-e-forneria-carioca-uma-acao-que-une-pizza/",
        destination: "/parceria-sindico-ne-e-forneria-carioca/",
        permanent: true,
      },
      {
        source:
          "/tag/o-que-e-condominio-como-funciona-um-condominio-quem-e-condomino-quem-manda-no-condominio-taxa-de-condominio-sindico-profissional-gestao-de-condominio/",
        destination: "/o-que-e-um-condominio/",
        permanent: true,
      },
      {
        source:
          "/tag/reforma-de-fachada-condominio-manutencao-predial-com-engenharia-responsabilidade-civil-sindico-obras-com-art-e-laudo-tecnico-gestao-condominial-profissional/",
        destination:
          "/a-fachada-do-seu-condominio-pode-ser-o-maior-risco-juridico-do-sindico/",
        permanent: true,
      },
      {
        source:
          "/tag/veja-passo-a-passo-como-contratar-um-sindico-profissional-avaliacao/",
        destination: "/contratacao-de-um-sindico-profissional/",
        permanent: true,
      },
      // 6. Rotas legadas do WordPress
      {
        source: "/wp-login.php",
        destination: "/admin/",
        permanent: false,
      },
      {
        source: "/wp-admin/",
        destination: "/admin/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
