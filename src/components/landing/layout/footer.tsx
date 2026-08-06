"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ChevronUp } from "lucide-react";
import { LogoProps, LogoSvg } from "./logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Represents a column of links in the footer.
 */
export interface FooterColumn {
  /** The title of the column */
  title: string;
  /** An array of links to display in this column */
  links: { label: string; href: string }[];
}

/**
 * Props for the Footer component.
 */
export interface FooterProps extends LogoProps {
  /** A brief description or tagline displayed under the logo */
  description?: string;
  /** An array of link columns to display in the footer */
  columns?: FooterColumn[];
  /** An array of social media links with icons */
  socialLinks?: { label: string; href: string; iconSvg: string }[];
  /** An array of links for the bottom bar (e.g., Privacy Policy, Terms of Service) */
  bottomLinks?: { label: string; href: string; iconSvg?: string }[];
}

/**
 * A structural footer component with branding, descriptive text, and dynamic link columns.
 */
export function Footer({
  brandName = "APEX Experts",
  logoSvg,
  description,
  columns = [],
  socialLinks = [],
  bottomLinks = [],
}: FooterProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const scrollToTopText = isArabic ? "العودة لأعلى الصفحة" : "Scroll to top";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderLogo = () => {
    if (typeof logoSvg === "string") {
      return (
        <div
          aria-label={typeof brandName === "string" ? brandName : "Logo"}
          className="h-10 w-auto text-white flex items-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:fill-current"
          dangerouslySetInnerHTML={{ __html: logoSvg }}
        />
      );
    }
    if (React.isValidElement(logoSvg)) {
      return logoSvg;
    }
    return <LogoSvg className="text-white" width={180} />;
  };

  return (
    <footer className="relative w-full bg-footer-gray text-white border-t border-white/10 font-poppins">
      {/* Scroll to Top Button with Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={scrollToTopText}
              title={scrollToTopText}
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white w-10 h-10 lg:w-18.75 lg:h-18.75 border-[3px] lg:border-[6px] border-[#303030] shadow-md cursor-pointer z-10 transition-transform hover:scale-105"
            >
              <ChevronUp className="w-5 h-5 lg:w-[37.5px] lg:h-[37.5px] text-primary-500" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            <p className="font-poppins text-xs font-medium text-white">{scrollToTopText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="mx-auto w-full pt-12 pb-4 lg:pt-18 lg:pb-0">
        {/* Main Footer Content Grid */}
        <div
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 px-4
lg:px-14"
        >
          {/* Brand Info & Description Column */}
          <div className="flex flex-col items-start gap-5 lg:col-span-4">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              {renderLogo()}
            </Link>

            {description && (
              <p className="text-sm leading-[160%] text-gray-300 max-w-sm">{description}</p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4.5 pt-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.href || index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-4.5 w-4.5 items-center justify-center rounded-full text-gray-300 transition-all hover:text-primary-500 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg]:fill-current"
                    dangerouslySetInnerHTML={{ __html: social.iconSvg }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Navigation Link Columns */}
          {columns.length > 0 && (
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:col-span-8">
              {columns.map((column, colIdx) => (
                <div key={column.title || colIdx} className="flex flex-col gap-4">
                  <h3 className="font-montserrat text-base font-semibold text-white">
                    {column.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {column.links?.map((link, linkIdx) => (
                      <li key={link.href || linkIdx}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-300 transition-colors hover:text-primary-500"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 pt-4 lg:pb-4 sm:flex-row text-sm text-white lg:bg-footer-bottom-gray">
          {bottomLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-6">
              {bottomLinks.map((link, idx) => (
                <p key={link.href || idx} className="flex items-center gap-1.5">
                  {link.iconSvg ? (
                    <span
                      className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:fill-current"
                      dangerouslySetInnerHTML={{ __html: link.iconSvg }}
                    />
                  ) : (
                    link.label
                  )}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
