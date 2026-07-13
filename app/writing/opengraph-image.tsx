import { ImageResponse } from 'next/og';
import { SocialImage } from '@/src/components/social-image';

export const alt = 'Engineering writing by Qitong Lan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function WritingOpenGraphImage() {
  return new ImageResponse(
    <SocialImage
      eyebrow="Engineering writing"
      title="Notes from software I’ve built and worked on."
      description="Live-data reliability, event-driven billing and role-secured product workflows."
      detail="Three evidence-led articles"
    />,
    size
  );
}
