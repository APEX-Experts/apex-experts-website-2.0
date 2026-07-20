import { LogoProps } from "./logo";

/**
 * Represents a column of links in the footer.
 */
interface FooterColumn {
  /** The title of the column */
  title: string;
  /** An array of links to display in this column */
  links: { label: string; href: string }[];
}

/**
 * Props for the Footer component.
 */
interface FooterProps extends LogoProps {
  /** A brief description or tagline displayed under the logo */
  description?: string;
  /** An array of link columns to display in the footer */
  columns?: FooterColumn[];
  /** An array of social media links with icons */
  socialLinks?: { label: string; href: string; iconSvg: string }[];
  /** An array of links for the bottom bar (e.g., Privacy Policy, Terms of Service) */
  bottomLinks?: { label: string; href: string; iconSvg?: string }[];
}

/**
 * A structural footer component with branding, descriptive text, and dynamic link columns.
 *
 * @param {FooterProps} props - The component props.
 * @param {string} [props.brandName="Brand"] - The name of your brand for the copyright notice and logo.
 * @param {string} [props.logoImage] - Optional image URL for the brand logo.
 * @param {React.ReactNode} [props.logoSvg] - Optional SVG component for the brand logo.
 * @param {string} [props.description] - A brief description or tagline displayed under the logo.
 * @param {FooterColumn[]} [props.columns=[]] - An array of link columns, each with a title and a list of links.
 * @param {{label: string, href: string, iconSvg: string}[]} [props.socialLinks=[]] - An array of social media links with icons.
 * @param {{label: string, href: string, iconSvg?: string}[]} [props.bottomLinks=[]] - An array of links for the bottom bar.
 *
 * @example
 * ```tsx
 * <Footer
 *   brandName="MyStore"
 *   description="The best store in town."
 *   columns={[{ title: "Shop", links: [{ label: "All Items", to: "/shop" }] }]}
 *   socialLinks={[{ label: "Twitter", href: "https://twitter.com", iconSvg: "<svg>...</svg>" }]}
 *   bottomLinks={[{ label: "Privacy", href: "/privacy" }]}
 * />
 * ```
 */

export function Footer(
  {
    // brandName = "Brand",
    // logoImage,
    // logoSvg,
    // description,
    // columns = [],
    // socialLinks = [],
    // bottomLinks = [],
  }: FooterProps,
) {
  // const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/10 bg-bg text-white overflow-x-clip"></footer>
  );
}
