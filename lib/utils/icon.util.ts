import * as Icons from '@/components/icons';
import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
}

// Exclude utility functions and add index signature
type IconsModule = Omit<typeof Icons, 'createIconComponent'> & {
  [key: string]: React.FC<IconProps> | undefined;
};

/**
 * Safely looks up an icon component by name
 * @param iconName The name of the icon to look up
 * @returns The icon component or a fallback component
 */
export function getIconByName(iconName: string): React.FC<IconProps> {
  // Create a safe way to look up icons without type errors
  const getIcon = (name: string): React.FC<IconProps> | undefined => {
    return (Icons as unknown as IconsModule)[name];
  };

  // Check if the icon exists
  const icon = getIcon(iconName);
  if (icon) {
    return icon;
  }

  // Return a fallback icon or empty component
  return ({ className }: IconProps) => {
    return React.createElement('span', { className }, 'Icon not found');
  };
}
