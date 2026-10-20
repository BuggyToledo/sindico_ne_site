import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}

export function Breadcrumbs({ items, variant = "light" }: BreadcrumbsProps) {
  const isDark = variant === "dark";
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-xs sm:text-sm ${
        isDark ? "text-[#b8c0cc]" : "text-[#5c6470]"
      }`}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            className={`inline-flex items-center gap-1 transition-colors ${
              isDark ? "hover:text-[#d9e141]" : "hover:text-[#171c24]"
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#d9e141]" aria-hidden="true" />
            <span>Início</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              <ChevronRight
                className="w-3.5 h-3.5 opacity-60 shrink-0"
                aria-hidden="true"
              />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    isDark ? "hover:text-[#d9e141]" : "hover:text-[#171c24]"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className={`font-medium line-clamp-1 max-w-[260px] sm:max-w-md ${
                    isDark ? "text-white" : "text-[#171c24]"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
