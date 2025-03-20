import type { IconProps } from '@/components/icons/types';
import Image from 'next/image';

export const V0Icon: React.FC<IconProps> = ({ size = 24, className }) => (
  <div style={{ width: size, height: size }} className={className}>
    <Image
      src="https://v0.dev/assets/icon.svg"
      alt="v0 icon"
      width={Number(size)}
      height={Number(size)}
      className="w-full h-full object-contain"
    />
  </div>
);

export const BoltNewIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <div style={{ width: size, height: size }} className={className}>
    <Image
      src="https://bolt.new/static/favicon.svg"
      alt="bolt.new icon"
      width={Number(size)}
      height={Number(size)}
      className="w-full h-full object-contain"
    />
  </div>
);

export const CursorIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <div style={{ width: size, height: size }} className={className}>
    <Image
      src="https://www.cursor.com/favicon.svg"
      alt="Cursor icon"
      width={Number(size)}
      height={Number(size)}
      className="w-full h-full object-contain"
    />
  </div>
);

export const WindsurfIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <div style={{ width: size, height: size }} className={className}>
    <Image
      src="https://codeium.com/favicon.svg"
      alt="Windsurf icon"
      width={Number(size)}
      height={Number(size)}
      className="w-full h-full object-contain"
    />
  </div>
);

export const MCPIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <div style={{ width: size, height: size }} className={className}>
    <Image
      src="https://www.claudemcp.com/logo.png"
      alt="MCP icon"
      width={Number(size)}
      height={Number(size)}
      className="w-full h-full object-contain"
    />
  </div>
);
