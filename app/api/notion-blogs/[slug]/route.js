import { getBlogPostBySlug } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { error: `Blog post with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
