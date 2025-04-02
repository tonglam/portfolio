import type { SVGProps } from 'react';

/**
 * Base icon props
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

/**
 * Base icon component type
 */
export type IconComponent = React.FC<IconProps>;

/**
 * Icon categories
 */
export enum IconCategory {
  TECH = 'tech',
  SOCIAL = 'social',
  UI = 'ui',
  CONTACT = 'contact',
  AI_TOOLS = 'ai-tools',
}

/**
 * Icon metadata
 */
export interface IconMetadata {
  name: string;
  category: IconCategory;
  component: IconComponent;
  color?: string;
}

/**
 * Icon registry type
 */
export interface IconRegistry {
  [key: string]: IconMetadata;
}

/**
 * Icon context type
 */
export interface IconContextType {
  getIcon: (name: string) => IconComponent | undefined;
  registerIcon: (name: string, metadata: IconMetadata) => void;
  unregisterIcon: (name: string) => void;
}

/**
 * Icon provider props
 */
export interface IconProviderProps {
  children: React.ReactNode;
  initialIcons?: IconRegistry;
}
