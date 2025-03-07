/**
 * This file contains a fix for the Framer Motion animation issue with dark mode
 *
 * The error "You are trying to animate dark from "0" to "[object Object]"" occurs
 * when Framer Motion tries to animate between incompatible values for the "dark" property.
 *
 * This utility helps prevent that error by ensuring proper animation values.
 */

import type { MotionProps, MotionStyle } from 'framer-motion';
import * as React from 'react';

// Define a type that extends MotionStyle with the dark property
interface ExtendedMotionStyle extends MotionStyle {
  dark?: number;
}

// Define a generic props type that can use our extended style
interface MotionPropsWithStyle extends MotionProps {
  style?: ExtendedMotionStyle;
}

// Apply this to any component that's experiencing the dark mode animation issue
export const fixDarkAnimation = (props: MotionPropsWithStyle): MotionPropsWithStyle => {
  // If the component has a style prop with a dark property that's a number
  if (props.style && 'dark' in props.style && typeof props.style.dark === 'number') {
    // Create a new style object without the dark property
    const { dark: _dark, ...restStyle } = props.style;
    return {
      ...props,
      style: restStyle,
    };
  }
  return props;
};

// Use this as a higher-order component for motion components with dark mode issues
export const withFixedDarkAnimation = (
  Component: React.ComponentType<MotionPropsWithStyle>
): React.FC<MotionPropsWithStyle> => {
  const WrappedComponent: React.FC<MotionPropsWithStyle> = (props: MotionPropsWithStyle) => {
    const fixedProps = fixDarkAnimation(props);
    return React.createElement(Component, fixedProps);
  };
  return WrappedComponent;
};

export function useThemeEffect(
  theme: string | undefined,
  _systemTheme: string | undefined,
  _setTheme: (theme: string) => void
): void {
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme || 'light');
  }, [theme]);
}

export function useThemeWatcher(
  theme: string | undefined,
  setTheme: (theme: string) => void
): void {
  React.useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function handleChange(): void {
      if (theme !== 'system') return;
      setTheme('system');
    }

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [setTheme, theme]);
}
