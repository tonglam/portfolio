import { ImageResponse } from 'next/og';
import { SocialImage } from '@/src/components/social-image';
import { getCaseStudy } from '@/src/content/case-studies';

export const alt = 'Software engineering case study by Qitong Lan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function CaseStudyOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  return new ImageResponse(
    <SocialImage
      eyebrow="Engineering case study"
      title={study?.title ?? 'Selected software work'}
      description={study?.seoDescription}
      detail={
        study ? `${study.period} · ${study.capabilities.slice(0, 4).join(' · ')}` : 'Qitong Lan'
      }
    />,
    size
  );
}
