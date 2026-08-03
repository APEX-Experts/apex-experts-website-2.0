import { TextureCircles } from "@/components/ui/texture-circles";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { Media, User } from "@/payload-types";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface AuthorBoxProps {
  author: User | null;
  className?: string;
}

/**
 * AuthorBox Component
 * Displays author picture, name, bio (title/role), and description inside a footer-gray styled card.
 */
export const AuthorBox: React.FC<AuthorBoxProps> = ({ author, className = "" }) => {
  if (!author) return null;

  const authorName = author.name || author.email || "Apex Experts";
  const authorMedia = typeof author.image === "object" ? (author.image as Media) : null;
  const authorImageUrl = getMediaUrl(authorMedia);
  const authorImageAlt = getMediaAlt(authorMedia, authorName);
  const bio = author.bio;
  const description = author.description;

  return (
    <div
      className={`relative overflow-hidden rounded-[1rem] bg-footer-gray p-4 text-white shadow-md transition-all ${className}`}
    >
      <TextureCircles />

      <div className="relative z-10 flex flex-col items-start gap-3 pb-4 border-b border-outline/30">
        {/* Author Avatar */}
        <div className="relative w-15 h-15 lg:w-25 lg:h-25 shrink-0 overflow-hidden rounded-[0.625rem] border border-white/50 bg-[#433E40]">
          {authorImageUrl ? (
            <Image src={authorImageUrl} alt={authorImageAlt} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white/80">
              <UserIcon className="h-7 w-7" />
            </div>
          )}
        </div>

        {/* Author Name & Bio */}
        <div className="flex flex-col">
          <h3 className="font-montserrat font-semibold text-lg lg:text-xl text-white">
            {authorName}
          </h3>
          {bio && <p className="font-poppins text-[0.8125rem] text-white lg:text-sm">{bio}</p>}
        </div>
      </div>
      {/* Author Description */}
      {description && (
        <p className="relative z-10 font-poppins text-[0.8125rem] lg:text-sm text-white mt-3">
          {description}
        </p>
      )}
    </div>
  );
};
