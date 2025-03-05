import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Cache control - R2 data updates at 5am daily
    const cacheControl = "public, max-age=3600, stale-while-revalidate=86400"; // 1 hour fresh, 24 hours stale

    // Fetch data from R2 storage
    const response = await fetch(
      "https://pub-d8dffa084afd41feb7c476a46103017d.r2.dev/blog-data.json",
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

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

    // Extract categories from Notion API format - only from Category.select.name
    const categoriesSet = new Set();

    // Process each post to extract categories
    allPosts.forEach((post) => {
      if (!post.properties) return;

      // Extract category from the "Category" property which is a select field
      if (post.properties.Category && post.properties.Category.select) {
        const categoryName = post.properties.Category.select.name;
        if (categoryName) {
          categoriesSet.add(categoryName);
        }
      }
    });

    // Create final categories array with "All" first
    const categories = ["All", ...Array.from(categoriesSet).sort()];

    console.log("Extracted categories:", categories);

    // Return the categories with appropriate cache headers
    return NextResponse.json(categories, {
      headers: {
        "Cache-Control": cacheControl,
      },
    });
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
