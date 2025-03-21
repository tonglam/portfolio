import type { IconProps } from '@/types/components/common.type';
import { ExternalImageIcon } from './external-image-icon';

export function V0Icon({ className }: IconProps): JSX.Element {
  return <ExternalImageIcon src="https://v0.dev/assets/icon.svg" className={className} />;
}

export function BoltNewIcon({ className }: IconProps): JSX.Element {
  return <ExternalImageIcon src="https://bolt.new/static/favicon.svg" className={className} />;
}

export function CursorIcon({ className }: IconProps): JSX.Element {
  return <ExternalImageIcon src="https://www.cursor.com/favicon.ico" className={className} />;
}

export function WindsurfIcon({ className }: IconProps): JSX.Element {
  return <ExternalImageIcon src="https://codeium.com/favicon.svg" className={className} />;
}

export function MCPIcon({ className }: IconProps): JSX.Element {
  return <ExternalImageIcon src="https://www.claudemcp.com/logo.png" className={className} />;
}
