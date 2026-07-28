import React from "react";
import Image from "next/image";

export type BackgroundOverlayProps = {
  src?: string | null;
  alt?: string | null;
  opacityClass?: string;
  overlayClass?: string;
  className?: string;
  priority?: boolean;
};

export const BackgroundOverlay: React.FC<BackgroundOverlayProps> = ({
  src,
  alt = "Background",
  opacityClass = "",
  overlayClass = "",
  className = "object-cover object-center",
  priority = false,
}) => {
  if (!src) return null;

  return (
    <>
      <div className={`absolute inset-0 w-full h-full pointer-events-none ${opacityClass}`}>
        <Image
          src={src}
          alt={alt || "Background"}
          fill
          className={className}
          priority={priority}
        />
      </div>
      {overlayClass && (
        <div className={`absolute inset-0 w-full h-full pointer-events-none ${overlayClass}`} />
      )}
    </>
  );
};
