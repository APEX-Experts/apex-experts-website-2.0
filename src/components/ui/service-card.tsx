import { TextureWaves } from "@/components/ui/texture-waves";
import type { Media } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface ServiceCardTag {
  id?: string | null;
  tag?: string | null;
}

export interface ServiceCardProps {
  eyebrow?: string | null;
  supertitle?: string | null;
  title: string;
  subtitle?: string | null;
  tags?: ServiceCardTag[] | null;
  ctaText?: string | null;
  ctaHref?: string | null;
  textureWavesImage?: (number | null) | Media;
  variant?: "dark" | "light";
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  eyebrow,
  supertitle,
  title,
  subtitle,
  tags,
  ctaText,
  ctaHref,
  textureWavesImage,
  variant = "dark",
  className = "",
}) => {
  const isDark = variant === "dark";

  const containerStyles = isDark
    ? "bg-footer-gray hover:bg-primary-900 text-white"
    : "bg-white text-foreground border border-outline/30 hover:border-transparent hover:bg-primary-900 hover:text-foreground service-shadow-blur group";

  const eyebrowStyles = "text-gray-300";
  const supertitleStyles = isDark ? "text-white/80" : "text-primary-500 group-hover:text-white/80";
  const titleStyles = isDark ? "text-white" : "text-foreground group-hover:text-white";
  const subtitleStyles = isDark ? "text-white/70" : "text-foreground/70 group-hover:text-white/70";
  const borderDividerStyles = "border-outline/30";
  const tagsStyles = isDark ? "text-gray-300" : "text-foreground/70 group-hover:text-gray-300";

  const buttonStyles = isDark
    ? "max-lg:w-full rounded-full max-lg:border max-lg:border-outline/30 max-lg:py-2.5 max-lg:px-2 lg:p-2 flex items-center justify-center gap-2"
    : "max-lg:w-full rounded-full max-lg:border max-lg:border-outline/30 max-lg:py-2.5 max-lg:px-2 lg:p-2 flex items-center justify-center gap-2";

  const buttonTextStyles = isDark
    ? "text-white font-montserrat font-medium text-base"
    : "text-foreground font-montserrat font-medium text-base group-hover:text-white";

  const arrowCircleStyles = isDark
    ? "rounded-full border border-white w-7 h-7 flex items-center justify-center"
    : "rounded-full border border-foreground w-7 h-7 flex items-center justify-center group-hover:border-white";

  const arrowIconStyles = isDark
    ? "-rotate-30 w-5 h-5 text-white"
    : "-rotate-30 w-5 h-5 text-foreground group-hover:text-white";

  const cardContent = (
    <>
      <TextureWaves image={textureWavesImage} className="w-57.5! h-49.5! lg:w-62! lg:h-53.5!" />

      <span className={`font-poppins text-sm uppercase ${eyebrowStyles}`}>{eyebrow}</span>

      <div className="flex flex-col gap-6 lg:gap-2">
        <div className={`flex flex-col pb-6 lg:pb-8 border-b ${borderDividerStyles}`}>
          {supertitle && (
            <span
              className={`font-poppins font-semibold text-sm leading-[160%] uppercase mb-0.5 ${supertitleStyles}`}
            >
              {supertitle}
            </span>
          )}
          <h4
            className={`font-montserrat font-semibold text-[1.875rem] leading-[160%] uppercase mb-2 ${titleStyles}`}
          >
            {title}
          </h4>
          {subtitle && (
            <p className={`font-poppins text-sm leading-[160%] ${subtitleStyles}`}>{subtitle}</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:justify-between w-full">
          <div className={`font-poppins font-medium text-sm leading-[160%] lg:py-3 ${tagsStyles}`}>
            {tags?.map(({ id, tag }, idx) => (
              <span key={id ?? idx}>
                {idx > 0 ? " · " : ""}
                {tag}
              </span>
            ))}
          </div>

          {ctaHref && ctaText && (
            <div className={buttonStyles}>
              <span className={buttonTextStyles}>{ctaText}</span>
              <div className={arrowCircleStyles}>
                <ArrowRight className={arrowIconStyles} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const cardClassName = `relative w-full p-6 flex flex-col gap-18 transition-all duration-300 service-shadow-blur lg:rounded-[1rem] ${containerStyles} ${className}`;

  if (ctaHref) {
    return (
      <Link href={ctaHref} className={cardClassName}>
        {cardContent}
      </Link>
    );
  }

  return <div className={cardClassName}>{cardContent}</div>;
};
