import React from "react";
import Image from "next/image";

export type FeatureCardProps = {
  title: string;
  description?: string | null;
  eyebrow?: string | null;
  iconUrl?: string | null;
  iconAlt?: string | null;
  className?: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  eyebrow,
  iconUrl,
  iconAlt = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-row gap-6 ${className}`}>
      {iconUrl && (
        <div className="w-8 h-10 lg:w-12 lg:h-15 relative shrink-0">
          <Image
            src={iconUrl}
            alt={iconAlt || title}
            fill
            className="object-cover object-center brain-shadow"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          {eyebrow && (
            <span className="font-poppins text-xs lg:text-[0.9375rem] leading-[130%] uppercase text-primary-500">
              {eyebrow}
            </span>
          )}
          <h4 className="font-poppins font-medium text-xl leading-8 tracking-[-7%] uppercase">
            {title}
          </h4>
        </div>
        {description && (
          <p className="font-poppins text-sm leading-5 text-foreground/70 lg:max-w-xs max-lg:pb-7.5 max-lg:border-b max-lg:border-outline/30">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
