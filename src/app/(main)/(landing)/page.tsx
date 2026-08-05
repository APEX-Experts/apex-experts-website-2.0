// app/page.tsx
import { getPayload } from "@/lib/cms/getPayload";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RenderBlocks } from "@/components/landing/blocks/RenderBlocks";
import { cookies } from "next/headers";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "en").toLowerCase() as "en" | "ar";
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

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "en").toLowerCase() as "en" | "ar";
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
