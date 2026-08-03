"use client";

import { TextureCircles } from "@/components/ui/texture-circles";
import { Check, Link2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface ShareBoxProps {
  title: string;
  slug: string;
  className?: string;
}

/**
 * ShareBox Component
 * Renders social sharing buttons for Facebook, Twitter/X, and LinkedIn using SVG assets from /public,
 * sized 32x32 on smaller screens and 30x30 on lg: screens, inside a footer-gray card.
 */
export const ShareBox: React.FC<ShareBoxProps> = ({ title, slug, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `https://apex-experts.com/blog/${slug}`;

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Facebook",
      src: "/facebook-1.svg",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      hoverColor: "hover:bg-foreground/20 hover:border-foreground/40",
    },
    {
      name: "Twitter",
      src: "/twitter.svg",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      hoverColor: "hover:bg-foreground/20 hover:border-white/40",
    },
    {
      name: "LinkedIn",
      src: "/linkedin.svg",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      hoverColor: "hover:bg-foreground/20 hover:border-foreground/40",
    },
  ];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-footer-gray py-5 px-4 text-white shadow-md border border-white/10 ${className}`}
    >
      <TextureCircles />

      <h3 className="relative z-10 font-montserrat font-semibold text-base text-white mb-3">
        Share with your community!
      </h3>
      <div className="relative z-10 flex items-center gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className={`group flex w-8 h-8 lg:w-7.5 lg:h-7.5 items-center justify-center transition-all duration-300 hover:scale-105 ${link.hoverColor} text-white`}
          >
            <Image
              src={link.src}
              alt={link.name}
              width={32}
              height={32}
              className=" object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        ))}

        <button
          onClick={handleCopyLink}
          aria-label="Copy link"
          title={copied ? "Copied!" : "Copy link"}
          className="flex w-8 h-8 lg:w-7.5 lg:h-7.5 items-center justify-center bg-white rounded transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          {copied ? (
            <Check className="h-5 w-5 text-success-500" />
          ) : (
            <Link2 className="h-5 w-5 text-footer-gray" />
          )}
        </button>
      </div>
    </div>
  );
};
