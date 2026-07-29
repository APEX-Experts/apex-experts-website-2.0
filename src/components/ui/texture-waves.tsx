import React from "react";
import Image from "next/image";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { Media } from "@/payload-types";

export type TextureWavesProps = {
  image?: (number | null) | Media;
  position?: "top" | "bottom" | "both";
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

  if (position === "both") {
    return (
      <>
        {topElement}
        {bottomElement}
      </>
    );
  }

  return position === "top" ? topElement : bottomElement;
};
