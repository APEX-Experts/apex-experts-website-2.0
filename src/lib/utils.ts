import { Media } from "@/payload-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge.
 * This ensures that Tailwind CSS classes are properly merged without conflicts.
 *
 * @param inputs - A list of class values to merge.
 * @returns A single string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



/**
 * Resolves Payload Media object or string/number ID into a usable URL string.
 * @param image Payload Media object or string/number ID
 * @returns {string | null} URL string
 */
export function getMediaUrl(image: number | Media | null | undefined): string | null {
  if (!image) return null;
  if (typeof image === "object" && "url" in image && typeof image.url === "string") {
    return image.url;
  }
  return null;
}

/**
 * Resolves alt text from Payload Media or fallback string.
 * @param image Payload Media object or string/number ID
 * @param fallback Fallback string for alt text
 * @returns {string} Alt text
 */
export function getMediaAlt(image: number | Media | null | undefined, fallback: string): string {
  if (
    typeof image === "object" &&
    image !== null &&
    "alt" in image &&
    typeof image.alt === "string"
  ) {
    return image.alt || fallback;
  }
  return fallback;
}