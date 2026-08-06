import { getPayload } from "@/lib/cms/getPayload";
import { getLocaleFromRequest } from "@/lib/locale";
import { NextRequest, NextResponse } from "next/server";
import type { Where } from "payload";

/**
 * GET /api/blog/posts
 * Fetches paginated, filtered, and searched blog posts from Payload CMS database.
 */
export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request);
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

    // Tag filtering
    if (tags.length > 0) {
      andConditions.push({
        tags: {
          in: tags,
        },
      });
    }

    // Search query
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

    const payload = await getPayload();

    // Fetch unique tags from posts collection for tag filter bar
    const allPostsDocs = await payload.find({
      collection: "posts",
      limit: 200,
      select: {
        tags: true,
      },
      locale,
    });

    const allTags = Array.from(new Set(allPostsDocs.docs.flatMap((doc) => doc.tags || []))).filter(
      Boolean,
    );

    let mainWhere: Where = {};

    // If we have filters, we need to bypass the Postgres Adapter SQL bug
    if (andConditions.length > 0) {
      // TWO-STEP WORKAROUND:
      // Fetch matching IDs using locale: "all" to bypass the broken SQL JOIN generation.
      const matchingPosts = await payload.find({
        collection: "posts",
        where: { and: andConditions },
        limit: 1000,
        select: {}, // Only fetch IDs for maximum performance
        locale: "all", // <-- This explicitly disables the buggy locale SQL injection
      });

      const matchedIds = matchingPosts.docs.map((doc) => doc.id);

      // If no posts match the filters, return empty results early
      if (matchedIds.length === 0) {
        return NextResponse.json({
          docs: [],
          totalPages: 0,
          page: 1,
          totalDocs: 0,
          hasPrevPage: false,
          hasNextPage: false,
          allTags,
        });
      }

      // Use the matched IDs for our actual paginated, localized query
      mainWhere = {
        id: {
          in: matchedIds,
        },
      };
    }

    const result = await payload.find({
      collection: "posts",
      where: mainWhere,
      limit,
      page,
      sort: "-publishedDate",
      locale,
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
