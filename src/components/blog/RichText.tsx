import { getPayload } from "@/lib/cms/getPayload";
import { cn } from "@/lib/utils";
import type { Post } from "@/payload-types";
import { getPayloadPopulateFn } from "@payloadcms/richtext-lexical";
import { convertLexicalToHTMLAsync } from "@payloadcms/richtext-lexical/html-async";
import React from "react";
import type { HeadingItem } from "./TableOfContents";

type RichTextContent = Post["content"];

interface RichTextProps {
  content?: RichTextContent | null;
  html?: string;
  className?: string;
}

/**
 * Process Lexical HTML output to inject id attributes into h1-h4 tags and extract headings array.
 */
export function processHtmlHeadings(rawHtml: string): {
  html: string;
  headings: HeadingItem[];
} {
  const headings: HeadingItem[] = [];
  const slugCounts = new Map<string, number>();

  const processedHtml = rawHtml.replace(
    /<h([1-4])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, levelStr, attrs, innerContent) => {
      const level = parseInt(levelStr, 10);
      const cleanText = innerContent.replace(/<[^>]*>/g, "").trim();
      if (!cleanText) return match;

      let baseSlug = cleanText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      if (!baseSlug) baseSlug = `heading-${level}`;

      const count = slugCounts.get(baseSlug) || 0;
      slugCounts.set(baseSlug, count + 1);
      const slug = count > 0 ? `${baseSlug}-${count}` : baseSlug;

      headings.push({
        id: slug,
        text: cleanText,
        level,
      });

      if (/id=["'][^"']*["']/i.test(attrs)) {
        return match;
      }

      return `<h${level} id="${slug}"${attrs}>${innerContent}</h${level}>`;
    },
  );

  return { html: processedHtml, headings };
}

/**
 * Helper to convert Lexical content JSON to HTML with heading IDs and extracted headings array.
 */
export async function getRichTextHtmlAndHeadings(content?: RichTextContent | null): Promise<{
  html: string;
  headings: HeadingItem[];
}> {
  if (!content) return { html: "", headings: [] };

  try {
    const payload = await getPayload();
    const rawHtml = await convertLexicalToHTMLAsync({
      data: content,
      populate: await getPayloadPopulateFn({
        currentDepth: 0,
        depth: 1,
        payload,
      }),
    });

    return processHtmlHeadings(rawHtml);
  } catch (error) {
    console.error("Error converting Lexical rich text to HTML:", error);
    return { html: "", headings: [] };
  }
}

/**
 * RichText Component
 * Converts Payload Lexical rich text JSON into sanitized, beautifully styled HTML with heading IDs.
 */
export const RichText: React.FC<RichTextProps> = async ({ content, html, className }) => {
  let htmlContent = html || "";

  if (!htmlContent && content) {
    const result = await getRichTextHtmlAndHeadings(content);
    htmlContent = result.html;
  }

  if (!htmlContent) return null;

  return (
    <div
      className={cn(
        "prose max-w-none font-poppins text-gray-700 dark:text-gray-300 text-base lg:text-lg leading-relaxed",
        // Headings
        "[&_h1]:font-montserrat [&_h1]:text-3xl [&_h1]:lg:text-4xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-10 [&_h1]:mb-6 [&_h1]:scroll-mt-28",
        "[&_h2]:font-montserrat [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:scroll-mt-28",
        "[&_h3]:font-montserrat [&_h3]:text-xl [&_h3]:lg:text-2xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:scroll-mt-28",
        "[&_h4]:font-montserrat [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-gray-900 [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:scroll-mt-28",
        // Paragraphs & Text
        "[&_p]:mb-6 [&_p]:leading-relaxed",
        "[&_strong]:font-semibold [&_strong]:text-gray-900",
        // Links
        "[&_a]:text-secondary-700 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-secondary-900 [&_a]:transition-colors",
        // Lists
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2",
        "[&_li]:leading-relaxed",
        // Blockquotes
        "[&_blockquote]:border-l-4 [&_blockquote]:border-secondary-500 [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-gray-800 [&_blockquote]:bg-secondary-50/50 [&_blockquote]:rounded-r-lg",
        // Code & Pre
        "[&_code]:px-2 [&_code]:py-1 [&_code]:bg-gray-100 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-secondary-700",
        "[&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:mb-6",
        // Images & Figures
        "[&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-8 [&_img]:max-w-full [&_img]:h-auto",
        "[&_figure]:my-8",
        "[&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:mt-2",
        // Tables
        "[&_table]:w-full [&_table]:my-8 [&_table]:border-collapse",
        "[&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold",
        "[&_td]:border [&_td]:border-gray-200 [&_td]:p-3",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
