import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { buildLocalBusinessJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.defaultTitle,
    template: "%s",
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [
    {
      name: SITE_CONFIG.credentials.founder,
      url: `${SITE_CONFIG.url}/author/adriano/`,
    },
  ],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/`,
    types: {
      "application/rss+xml": `${SITE_CONFIG.url}/feed/`,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: `${SITE_CONFIG.url}/`,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 675,
        alt: "Síndico Né! Administração Condominial Profissional no Rio de Janeiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalJsonLd = buildLocalBusinessJsonLd();

  return (
    <html lang="pt-BR" id="top">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f4f6f8] text-[#2b313a] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[#d9e141] focus:text-[#171c24] focus:px-4 focus:py-2 focus:rounded focus:font-bold"
        >
          Pular para o conteúdo principal
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <FloatingWhatsApp />

        {/* Preserved Google Analytics 4 (G-5JKJHM2SFL) loaded afterInteractive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.analytics.ga4MeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${SITE_CONFIG.analytics.ga4MeasurementId}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
