// app/page.tsx
import { getPayload } from "@/lib/cms/getPayload";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RenderBlocks } from "@/components/landing/blocks/RenderBlocks";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "ar" ? "ar" : "en") as "en" | "ar";
  const payload = await getPayload();
  const result = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    locale,
  });

  const page = result.docs[0];
  if (!page) return {};

  return {
    title: `${page.title} | APEX Experts`,
    description: `View ${page.title} on APEX Experts.`,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "ar" ? "ar" : "en") as "en" | "ar";
  const payload = await getPayload();
  const result = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    locale,
  });

  const page = result.docs[0];
  if (!page) return notFound();

  return (
    <main className="min-h-screen">
      <RenderBlocks blocks={page.layout} />
    </main>
  );
}
