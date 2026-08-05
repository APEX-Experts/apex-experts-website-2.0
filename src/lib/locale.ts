import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export type SupportedLocale = "en" | "ar";

/**
 * Asynchronously retrieves the active locale in Server Components.
 * Reads from the NEXT_LOCALE cookie set by client language switcher.
 */
export async function getLocaleServer(): Promise<SupportedLocale> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "en").toLowerCase();
  return locale === "ar" ? "ar" : "en";
}

/**
 * Extracts the active locale in Next.js API Route Handlers.
 * Checks search parameters (?locale=ar) first, then NEXT_LOCALE cookie, defaulting to "en".
 */
export function getLocaleFromRequest(req: NextRequest): SupportedLocale {
  const queryLocale = req.nextUrl.searchParams.get("locale");
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  const locale = (queryLocale || cookieLocale || "en").toLowerCase();
  return locale === "ar" ? "ar" : "en";
}

/**
 * Formats a date string or object according to the active locale.
 */
export function formatDate(
  dateInput: string | Date | number | null | undefined,
  locale: SupportedLocale
): string {
  if (!dateInput) return "";
  const dateObj = new Date(dateInput);
  if (isNaN(dateObj.getTime())) return "";

  if (locale === "ar") {
    return dateObj.toLocaleDateString("ar-EG", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
