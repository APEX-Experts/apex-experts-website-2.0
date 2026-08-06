import { Logo, LogoSvg } from "@/components/landing/layout/logo";

/**
 * Global loading component for the application.
 * Displays a spinner during route transitions.
 */
export default function Loading() {
  // You can replace this with a branded skeleton loader
  return (
    <div className="flex h-screen items-center justify-center">
      <Logo
        className="text-4xl animate-pulse"
        logoSvg={<LogoSvg />}
        alt="Logo"
        brandName="APEX Experts"
        logoOnly
        width={32}
      />
    </div>
  );
}
