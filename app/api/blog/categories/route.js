import { CACHE_SETTINGS, EXTERNAL_URLS } from "@/config/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Cache control
    const cacheControl = CACHE_SETTINGS.BLOG.CONTROL;

    // Fetch data from R2 storage
    const response = await fetch(EXTERNAL_URLS.BLOG_DATA_SOURCE, {
      next: { revalidate: CACHE_SETTINGS.BLOG.REVALIDATE },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.status}`);
    }

    const allPosts = await response.json();

    // Debug: Log the first post structure
    if (allPosts.length > 0) {
      console.log(
        "First post sample properties:",
        Object.keys(allPosts[0].properties || {})
      );
    }

    // Extract categories from Notion API format
    const categories = allPosts.reduce((acc, post) => {
      if (
        post.properties &&
        post.properties.Category &&
        post.properties.Category.select &&
        post.properties.Category.select.name
      ) {
        const category = post.properties.Category.select.name;
        if (!acc.includes(category)) {
          acc.push(category);
        }
      }
      return acc;
    }, []);

    // Sort categories alphabetically
    categories.sort();

    // Add "All" as the first category
    const finalCategories = ["All", ...categories];

    console.log("Extracted categories:", finalCategories);

    // Return the categories with appropriate cache headers
    return NextResponse.json(
      {
        categories: finalCategories,
      },
      {
        headers: {
          "Cache-Control": cacheControl,
        },
      }
    );
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
