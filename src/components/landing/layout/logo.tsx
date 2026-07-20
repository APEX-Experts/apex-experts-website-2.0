import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /**
   * The text or component to display for the brand name.
   * If image or svg is provided, this will be used alongside it unless logoOnly is true.
   */
  brandName?: React.ReactNode;
  /**
   * Alt text for the image logo. Falls back to brandName if it's a string, or "Logo".
   */
  alt?: string;
  /**
   * Optional image source for the logo.
   */
  logoImage?: string;
  /**
   * Optional SVG component or element for the logo.
   */
  logoSvg?: React.ReactNode;
  /**
   * Width of the logo (default: 30)
   */
  width?: number;
  /**
   * Height of the logo (default: 30)
   */
  height?: number;
  /**
   * Additional class names for the container.
   */
  className?: string;
  /**
   * If true, renders only the logo without the text.
   */
  logoOnly?: boolean;
}

/**
 * A flexible logo component that supports text, images, or SVGs.
 *
 * @param {LogoProps} props - The component props.
 * @param {React.ReactNode} [props.brandName] - The text or component to display for the brand name.
 * @param {string} [props.alt] - Alt text for the image logo.
 * @param {string} [props.logoImage] - Optional image URL for the logo.
 * @param {React.ReactNode} [props.logoSvg] - Optional SVG element or component for the logo.
 * @param {number} [props.width=30] - The width of the logo in pixels.
 * @param {number} [props.height=30] - The height of the logo in pixels.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {boolean} [props.logoOnly=false] - If true, only the logo will be rendered without the brand name.
 *
 * @example
 * ```tsx
 * <Logo brandName="OpenAI" logoImage="/logo.png" />
 * <Logo logoSvg={<MySvg />} logoOnly />
 * ```
 */

export function Logo({
  brandName,
  alt,
  logoImage,
  logoSvg,
  width,
  height,
  className,
  logoOnly = false,
}: LogoProps) {
  const imageAlt = alt || (typeof brandName === "string" ? brandName : "Logo");

  const isSvgString = typeof logoSvg === "string";
  const defaultWidth = logoImage || isSvgString ? 30 : undefined;
  const defaultHeight = logoImage || isSvgString ? 30 : undefined;
  const logoWidth = width ?? defaultWidth;
  const logoHeight = height ?? defaultHeight;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {logoImage ? (
        <Image
          src={logoImage}
          alt={imageAlt}
          width={logoWidth ?? 30}
          height={logoHeight ?? 30}
          className="object-contain"
          priority
        />
      ) : logoSvg ? (
        <div
          className="flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current"
          style={logoWidth && logoHeight ? { width: logoWidth, height: logoHeight } : undefined}
          {...(isSvgString
            ? { dangerouslySetInnerHTML: { __html: logoSvg } }
            : { children: logoSvg })}
        />
      ) : (
        brandName && <span className="font-bold tracking-tight">{logoOnly ? "AE" : brandName}</span>
      )}
    </div>
  );
}

export function LogoSvg() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 302.5 58.48"
    >
      <defs></defs>
      <path
        fill="currentColor"
        d="M78.11,36.35l8.46-14.3h3l8.15,14.3H94.52L93,33.81h-10l-1.73,2.54Zm6.06-5h7.57L88,25.13Z"
      />
      <path
        fill="currentColor"
        d="M99.59,36.33V22.05h10.16c2.36,0,3.68,1.12,3.68,3.68v2.58c0,2.74-1.14,3.69-3.82,3.69h-7.43v4.35Zm2.59-6.92h7.57a1.06,1.06,0,0,0,1.1-1.1V25.73a1.07,1.07,0,0,0-.94-1.1h-7.73Z"
      />
      <path
        fill="currentColor"
        d="M131.88,22.05v2.58H119.05v3H131v2.58H119.05v3.55h13.39v2.58h-16V22.05Z"
      />
      <path
        fill="currentColor"
        d="M177.54,22.05v2.58H164.71v3h11.93v2.58H164.71v3.55H178.1v2.58h-16V22.05Z"
      />
      <path
        fill="currentColor"
        d="M183.69,36.35h-3.75l7.39-7-7.39-7.29h3.73l5.47,5.54,5.5-5.54h3.71L191,29.27l7.39,7.08h-3.87l-5.34-5.17Z"
      />
      <path
        fill="currentColor"
        d="M200.19,36.33V22.05h10.16c2.36,0,3.68,1.12,3.68,3.68v2.58c0,2.74-1.14,3.69-3.82,3.69h-7.44v4.35Zm2.58-6.92h7.58a1.06,1.06,0,0,0,1.09-1.1V25.73a1.07,1.07,0,0,0-.93-1.1h-7.74Z"
      />
      <path
        fill="currentColor"
        d="M232.48,22.05v2.58H219.64v3h11.93v2.58H219.64v3.55H233v2.58h-16V22.05Z"
      />
      <path
        fill="currentColor"
        d="M238.65,31.48v4.87l-2.59,0V22.05h10.21c2.36,0,3.68,1.12,3.68,3.68V27.8a4.08,4.08,0,0,1-.69,2.63c.43.24.92,1.11.92,2.89,0,1,0,0,0,2.22v.81h-2.82v-3c0-.79-.53-1.84-1.23-1.84Zm0-2.58h7.62a1.06,1.06,0,0,0,1.09-1.1V25.73a1.06,1.06,0,0,0-.93-1.1h-7.78Z"
      />
      <path fill="currentColor" d="M268.63,22.05v2.33h-6.45v12h-2.59v-12h-6.22V22.05Z" />
      <path
        fill="currentColor"
        d="M284.2,26.44V25.39c0-.45-.45-.77-1.31-.77h-7.71c-.42,0-.93.33-.93.77V27c0,.39,2.27.84,4.8,1,5.61.42,7.73,1.24,7.73,3.6v1.46c0,2.45-1.3,3.36-3.89,3.36H275.5c-2.56,0-3.84-.87-3.84-3.36v-.95h2.54V33c0,.49.29.77,1,.77h7.71c.95,0,1.31-.35,1.31-.77V31.59c0-.36-1.94-.78-5.15-1-4.95-.36-7.39-1.24-7.39-3.61V25.38c0-2.21,1.26-3.36,3.52-3.36h7.71c2.81,0,3.89,1.08,3.89,3.37v1.05Z"
      />
      <polygon
        fill="currentColor"
        points="152.37 36.35 148.52 36.35 143.29 31.06 138.04 36.35 134.21 36.35 141.41 29.17 134.37 22.05 138.04 22.05 143.29 27.28 148.52 22.05 152.2 22.05 145.16 29.16 152.37 36.35"
      />
      <path
        fill="currentColor"
        d="M27.89,33.63l7.73-12.55-2.9-6.2-17,28.72H22l3.45-5.08H38.81V33.63Zm17.64,4.89H38.81V43.6h9.85Zm-.34-12.41,3,5.2H68v-5.2ZM38.81,14.88v0L44,24v-4H69.77v-5.2ZM52.22,38.4l3,5.2H70.92V38.4ZM35.62,21.08l-2.9-6.2"
      />
    </svg>
  );
}
