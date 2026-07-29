import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/query-provider";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

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
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${montserrat.className} ${poppins.variable} ${poppins.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="APEX Experts" />
      </head>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Analytics />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
