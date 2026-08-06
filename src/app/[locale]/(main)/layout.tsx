import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/query-provider";
import type { Metadata } from "next";
import { Montserrat, Poppins, Alexandria, Rubik } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "100", "200", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const rubik = Rubik({
  subsets: ["arabic", "latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "APEX Experts",
    template: "%s | APEX Experts",
  },
  description:
    "APEX Experts is a leading software development company that provides custom web development services, mobile app development services, and IT consulting services to businesses of all sizes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: {
      default: "APEX Experts",
      template: "%s | APEX Experts",
    },
    description:
      "APEX Experts is a leading software development company that provides custom web development services, mobile app development services, and IT consulting services to businesses of all sizes.",
    url: "/",
    siteName: "APEX Experts",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "APEX Experts",
      template: "%s | APEX Experts",
    },
    description:
      "APEX Experts is a leading software development company that provides custom web development services, mobile app development services, and IT consulting services to businesses of all sizes.",
  },
};

/**
 * Root layout component for the main application group.
 * Handles global providers (Query), fonts, and global UI elements like Toaster.
 *
 * @param props - Component props containing children elements.
 */
export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "ar" ? "ar" : "en";

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${montserrat.variable} ${montserrat.className} ${poppins.variable} ${poppins.className} ${alexandria.variable} ${alexandria.className} ${rubik.variable} ${rubik.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="APEX Experts" />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale}>
          <QueryProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <Analytics />
            </TooltipProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
