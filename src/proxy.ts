import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleRequest = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass next-intl middleware for Next.js internal assets, API routes, admin, and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  return handleRequest(request);
}

export const proxyConfig = {
  matcher: ["/((?!api|_next|_vercel|admin|.*\\..*).*)"],
};
