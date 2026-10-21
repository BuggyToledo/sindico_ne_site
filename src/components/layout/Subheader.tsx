import React from "react";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

interface SubheaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
}

/**
 * Modern PropTech Corporate Light Subheader with ambient glow and crisp hierarchy.
 */
export function Subheader({
  title,
  subtitle,
  badge,
  breadcrumbs,
}: SubheaderProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#eff4ff] via-white to-[#f8f9ff] text-[#0b1c30] overflow-hidden border-b border-[#dbe1ff]/80">
      <div
        className="pointer-events-none absolute -top-20 left-1/3 w-[640px] h-[280px] bg-[#dbe1ff]/45 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-10 right-10 w-64 h-64 bg-[#d0f121]/20 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 sm:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} variant="light" />
          </div>
        )}
        {badge && (
          <span className="inline-flex items-center gap-1.5 bg-[#d0f121] text-[#181e00] text-[11px] font-bold uppercase tracking-[0.08em] px-3.5 py-1 rounded-full mb-3 shadow-xs">
            {badge}
          </span>
        )}
        <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold tracking-[-0.025em] text-[#0b1c30] max-w-4xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#45464d] max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
