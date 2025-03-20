export interface PageBlogPost {
  title: string;
  summary: string;
  content: string;
  date: string;
  minRead: string;
  category: string;
  r2ImageUrl: string;
  originalPageUrl?: string;
}

export interface BlogPostResponse {
  success: boolean;
  data?: {
    post: PageBlogPost;
  };
  error?: string;
}
