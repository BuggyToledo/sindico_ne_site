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
 * Matches BeTheme `#Subheader` dark navy hero banner with background image overlay
 */
export function Subheader({
  title,
  subtitle,
  badge,
  breadcrumbs,
  backgroundImage = "/wp-content/uploads/2019/10/cityhall-subheader1.jpg",
}: SubheaderProps) {
  return (
    <section
      className="relative bg-[#171c24] text-white overflow-hidden border-b border-white/10"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(23, 28, 36, 0.92), rgba(23, 28, 36, 0.78)), url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} variant="dark" />
          </div>
        )}
        {badge && (
          <span className="inline-block bg-[#d9e141] text-[#171c24] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">
            {badge}
          </span>
        )}
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-[#d0d6df] max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
