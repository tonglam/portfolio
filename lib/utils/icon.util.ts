import type { IconProps } from '@/types/components/common.type';
import type { ElementType } from 'react';
import React from 'react';

/**
 * Creates a new icon component from a React element type
 */
export function createIconComponent<T extends ElementType>(Icon: T): React.FC<IconProps> {
  return function IconComponent({ size = 24, className }: IconProps): JSX.Element {
    return React.createElement(Icon, { size, className });
  };
}

/**
 * Creates a fallback icon component
 */
export function createFallbackIcon(message = 'Icon not found'): React.FC<IconProps> {
  return function FallbackIcon({ className }: IconProps): JSX.Element {
    return React.createElement('span', { className }, message);
  };
}
