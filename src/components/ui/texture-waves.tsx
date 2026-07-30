import React from "react";
import Image from "next/image";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { Media } from "@/payload-types";

export type TextureWavesProps = {
  image?: (number | null) | Media;
  position?:
    | "top"
    | "bottom"
    | "both"
    | "top-reversed"
    | "bottom-reversed"
    | "both-reversed"
    | "all-four";
  className?: string;
  opacityClass?: string;
};

export const TextureWaves: React.FC<TextureWavesProps> = ({
  image,
  position = "top",
  className = "",
  opacityClass = "",
}) => {
  const url = getMediaUrl(image);
  if (!url) return null;

  const alt = getMediaAlt(image, "Texture Waves");

  const topElement = (
    <div
      className={`absolute top-0 inset-e-0 w-51.5 h-37.5 lg:w-145.5 lg:h-105.75 pointer-events-none ${opacityClass} ${className}`}
    >
      <Image src={url} alt={alt} fill className="object-cover object-center" />
    </div>
  );

  const bottomElement = (
    <div
      className={`absolute bottom-0 inset-s-0 rotate-180 w-51.5 h-37.5 lg:w-145.5 lg:h-105.75 pointer-events-none ${opacityClass} ${className}`}
    >
      <Image src={url} alt={alt} fill className="object-cover object-center" />
    </div>
  );

  const topReversedElement = (
    <div
      className={`absolute top-0 inset-s-0 w-51.5 h-37.5 lg:w-145.5 lg:h-105.75 pointer-events-none ${opacityClass} ${className}`}
    >
      <Image src={url} alt={alt} fill className="object-cover object-center" />
    </div>
  );

  const bottomReversedElement = (
    <div
      className={`absolute bottom-0 inset-e-0 rotate-180 w-51.5 h-37.5 lg:w-145.5 lg:h-105.75 pointer-events-none ${opacityClass} ${className}`}
    >
      <Image src={url} alt={alt} fill className="object-cover object-center" />
    </div>
  );

  if (position === "both") {
    return (
      <>
        {topElement}
        {bottomElement}
      </>
    );
  }

  if (position === "top-reversed") return topReversedElement;
  if (position === "bottom-reversed") return bottomReversedElement;

  if (position === "both-reversed") {
    return (
      <>
        {topReversedElement}
        {bottomReversedElement}
      </>
    );
  }

  if (position === "all-four") {
    return (
      <>
        {topElement}
        {bottomElement}
        {topReversedElement}
        {bottomReversedElement}
      </>
    );
  }

  return position === "top" ? topElement : bottomElement;
};
