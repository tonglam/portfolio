'use client';

import iconRegistry from '@/components/icons';
import type {
  IconComponent,
  IconContextType,
  IconMetadata,
  IconProviderProps,
} from '@/types/components/icon.type';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// Create the icon context
const IconContext = createContext<IconContextType | undefined>(undefined);

/**
 * Hook to use the icon context
 */
export const useIcons = (): IconContextType => {
  const context = useContext(IconContext);
  if (!context) {
    throw new Error('useIcons must be used within an IconProvider');
  }
  return context;
};

/**
 * Icon provider component
 */
export function IconProvider({ children }: IconProviderProps): JSX.Element {
  const [icons, setIcons] = useState<Record<string, IconMetadata>>(iconRegistry);

  // Get an icon by name
  const getIcon = useCallback(
    (name: string): IconComponent | undefined => {
      return icons[name]?.component;
    },
    [icons]
  );

  // Register a new icon
  const registerIcon = useCallback((name: string, metadata: IconMetadata) => {
    setIcons(prev => ({
      ...prev,
      [name]: metadata,
    }));
  }, []);

  // Unregister an icon
  const unregisterIcon = useCallback((name: string) => {
    setIcons(prev => {
      const newIcons = { ...prev };
      delete newIcons[name];
      return newIcons;
    });
  }, []);

  // Create the context value
  const value = useMemo(
    () => ({
      getIcon,
      registerIcon,
      unregisterIcon,
    }),
    [getIcon, registerIcon, unregisterIcon]
  );

  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

export default IconProvider;
