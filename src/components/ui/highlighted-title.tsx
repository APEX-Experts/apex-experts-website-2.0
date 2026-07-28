import React from "react";

export type EyebrowProps = {
  text?: string | null;
  className?: string;
};

export const Eyebrow: React.FC<EyebrowProps> = ({ text, className = "" }) => {
  if (!text) return null;

  return (
    <span
      className={`font-poppins text-sm lg:text-base leading-[130%] uppercase text-primary-500 ${className}`}
    >
      {text}
    </span>
  );
};

export type HighlightedTitleProps = {
  titleBeforeHighlight?: string | null;
  highlightedTitle?: string | null;
  titleAfterHighlight?: string | null;
  className?: string;
  highlightClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const HighlightedTitle: React.FC<HighlightedTitleProps> = ({
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  className = "",
  highlightClassName = "text-primary-500",
  as: Component = "h2",
}) => {
  if (!titleBeforeHighlight && !highlightedTitle && !titleAfterHighlight) return null;

  return (
    <Component
      className={`font-montserrat font-semibold text-xl md:text-3xl lg:text-5xl leading-[130%] tracking-[-7%] uppercase text-foreground ${className}`}
    >
      {titleBeforeHighlight && <span>{titleBeforeHighlight}</span>}
      {highlightedTitle && <span className={` ${highlightClassName}`}> {highlightedTitle}</span>}
      {titleAfterHighlight && <span> {titleAfterHighlight}</span>}
    </Component>
  );
};
