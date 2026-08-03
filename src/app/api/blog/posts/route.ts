import { getPayload } from "@/lib/cms/getPayload";
import { NextRequest, NextResponse } from "next/server";
import type { Where } from "payload";

/**
 * GET /api/blog/posts
 * Fetches paginated, filtered, and searched blog posts from Payload CMS database.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "6", 10));
    const search = searchParams.get("q")?.trim() || "";

    const rawTags = searchParams.getAll("tag");
    const tags = rawTags
      .flatMap((t) => t.split(","))
      .map((t) => t.trim())
      .filter(Boolean);

    const andConditions: Where[] = [];

    // Tag filtering - filter by selected tags
    if (tags.length > 0) {
      andConditions.push({
        tags: {
          in: tags,
        },
      });
    }

    // Search query - search across post titles and tags
    if (search) {
      andConditions.push({
        or: [
          {
            title: {
              like: search,
            },
          },
          {
            tags: {
              like: search,
            },
          },
        ],
      });
    }

    const where: Where = andConditions.length > 0 ? { and: andConditions } : {};

    const payload = await getPayload();

    // Fetch unique tags from posts collection for tag filter bar
    const allPostsDocs = await payload.find({
      collection: "posts",
      limit: 200,
      select: {
        tags: true,
      },
    });

    const allTags = Array.from(
      new Set(
        allPostsDocs.docs.flatMap((doc) => doc.tags || [])
      )
    ).filter(Boolean);

    const result = await payload.find({
      collection: "posts",
      where,
      limit,
      page,
      sort: "-publishedDate",
    });

    return NextResponse.json({
      docs: result.docs,
      totalPages: result.totalPages,
      page: result.page || page,
      totalDocs: result.totalDocs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      allTags,
    });
  } catch (error) {
    console.error("Error fetching blog posts API:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
