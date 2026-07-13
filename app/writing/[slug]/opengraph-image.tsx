import { ImageResponse } from 'next/og';
import { SocialImage } from '@/src/components/social-image';
import { getArticle } from '@/src/content/writing';

export const alt = 'Engineering article by Qitong Lan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  return new ImageResponse(
    <SocialImage
      eyebrow="Engineering note"
      title={article?.title ?? 'Engineering writing'}
      description={article?.description}
      detail={article ? `${article.minutes} min read · ${article.tags.join(' · ')}` : 'Qitong Lan'}
    />,
    size
  );
}
