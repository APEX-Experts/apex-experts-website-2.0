import { Footer } from "@/components/landing/layout/footer";
import { LogoSvg } from "@/components/landing/layout/logo";
import { Navbar } from "@/components/landing/layout/navbar";
import { getPayload } from "@/lib/cms/getPayload";
import React from "react";

/**
 * Layout component for the landing route group.
 * Fetches global site settings from Payload CMS and renders Navbar/Footer.
 *
 * @param props - Component props containing children elements.
 */
export default async function LandingLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "ar" ? "ar" : "en") as "en" | "ar";
  const payload = await getPayload();

  const header = await payload.findGlobal({
    slug: "header",
    locale,
  });

  const footer = await payload.findGlobal({
    slug: "footer",
    locale,
  });

  const footerColumns =
    footer.columns?.map((col) => ({
      title: col.title,
      links:
        col.links?.map((link) => ({
          href: link.link,
          label: link.label,
        })) || [],
    })) || [];

  const footerSocialLinks =
    footer.socialLinks?.map((social) => ({
      href: social.link,
      label: social.label,
      iconSvg: social.iconSvg,
    })) || [];

  const footerBottomLinks =
    footer.bottomLinks?.map((link) => ({
      href: link.link,
      label: link.label,
      iconSvg: link.iconSvg || undefined,
    })) || [];

  return (
    <>
      {/* Global Navbar */}
      <Navbar
        brandName={header.brandName}
        logoSvg={header.logoSvg || <LogoSvg />}
        navItems={header.navItems || []}
      />
      <main className="">{children}</main>
      {/* Global Footer */}
      <Footer
        brandName={footer.brandName}
        logoSvg={footer.logoSvg || <LogoSvg />}
        description={footer.description || undefined}
        socialLinks={footerSocialLinks}
        columns={footerColumns}
        bottomLinks={footerBottomLinks}
      />
    </>
  );
}
