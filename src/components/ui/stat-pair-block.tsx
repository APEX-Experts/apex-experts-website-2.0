import React from "react";

export type StatItem = {
  id?: string | null;
  title: string;
  description: string;
};

export type StatPairBlockProps = {
  left: StatItem;
  right?: StatItem | null;
  className?: string;
};

export const StatPairBlock: React.FC<StatPairBlockProps> = ({ left, right, className = "" }) => {
  const getTitleSizeClass = (title: string) =>
    title.length > 3 ? "text-[1.5rem] lg:text-[2rem]" : "text-[1.5rem] lg:text-[6.5rem]";
  const titleClassName =
    "font-montserrat font-semibold leading-[130%] lg:leading-41 tracking-[-7%] uppercase";
  const descriptionClassName = "font-poppins lg:text-lg lg:leading-6 lowercase text-foreground/70";

  return (
    <div className={`flex items-start lg:items-stretch gap-6 ${className}`}>
      <div className="flex-1 flex flex-col gap-1 lg:gap-3 justify-start lg:justify-center">
        <span className={`${titleClassName} ${getTitleSizeClass(left.title)}`}>{left.title}</span>
        <p className={descriptionClassName}>{left.description}</p>
      </div>

      {right && (
        <>
          <div className="max-lg:hidden w-0.75 shrink-0 bg-primary-100/20 me-1 lg:me-4" />

          <div className="flex-1 flex flex-col gap-1 lg:gap-3 justify-center">
            <span className={`${titleClassName} ${getTitleSizeClass(right.title)}`}>
              {right.title}
            </span>
            <p className={descriptionClassName}>{right.description}</p>
          </div>
        </>
      )}
    </div>
  );
};
