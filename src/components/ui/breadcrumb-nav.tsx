import React from "react";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  id?: string | null;
  text: string;
  href?: string | null;
};

export type BreadcrumbNavProps = {
  items?: BreadcrumbItem[] | null;
  className?: string;
  separator?: "slash" | "chevron";
};

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items,
  className = "",
  separator = "slash",
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`max-lg:hidden mb-1 ${className}`}>
      <ol className="inline-flex items-center text-sm lg:text-base text-white/70 font-poppins uppercase">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.id || index} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-1 shrink-0">
                  {separator === "chevron" ? (
                    <ChevronRight className="w-4 h-4 text-gray-400 rtl:rotate-180" />
                  ) : (
                    "/"
                  )}
                </span>
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-white transition-colors duration-200">
                  {item.text}
                </Link>
              ) : (
                <span className={isLast ? "text-white font-medium" : ""}>{item.text}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
