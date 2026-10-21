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
      className={`text-xs sm:text-[13px] ${
        isDark ? "text-[#b8c0cc]" : "text-[#45464d]"
      }`}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            className={`inline-flex items-center gap-1 font-medium transition-colors ${
              isDark ? "hover:text-[#d0f121]" : "hover:text-[#0051d5]"
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#0051d5]" aria-hidden="true" />
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
                    isDark ? "hover:text-[#d0f121]" : "hover:text-[#0051d5]"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className={`font-semibold line-clamp-1 max-w-[260px] sm:max-w-md ${
                    isDark ? "text-white" : "text-[#0b1c30]"
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
