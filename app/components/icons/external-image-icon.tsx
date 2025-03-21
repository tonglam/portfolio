import type { IconProps } from '@/types/components/common.type';
import Image from 'next/image';

interface ExternalImageIconProps extends IconProps {
  src: string;
}

export function ExternalImageIcon({ className = '', src }: ExternalImageIconProps): JSX.Element {
  const size = '24px';
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image src={src} alt="Icon" fill className="object-contain" sizes={size} />
    </div>
  );
}
