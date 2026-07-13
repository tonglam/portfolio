import { ImageResponse } from 'next/og';
import { SocialImage } from '@/src/components/social-image';

export const alt = 'Qitong Lan — Full-stack software engineer in Perth';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <SocialImage
      eyebrow="Software engineering portfolio"
      title="Full-stack products. Dependable engineering end to end."
      description="Eight-plus years of commercial experience, current full-stack delivery and full Australian working rights."
      detail="Perth · hybrid · remote"
    />,
    size
  );
}
