import { TIME } from './common';

/**
 * UI-related constants
 */

export const THEME = {
  COLORS: {
    PRIMARY: 'hsl(var(--primary))',
    SECONDARY: 'hsl(var(--secondary))',
    ACCENT: 'hsl(var(--accent))',
    BACKGROUND: 'hsl(var(--background))',
    FOREGROUND: 'hsl(var(--foreground))',
    MUTED: 'hsl(var(--muted))',
    BORDER: 'hsl(var(--border))',
  },
  CHART_COLORS: {
    BLUE: 'hsl(var(--chart-1))',
    GREEN: 'hsl(var(--chart-2))',
    ORANGE: 'hsl(var(--chart-3))',
    PURPLE: 'hsl(var(--chart-4))',
    RED: 'hsl(var(--chart-5))',
  },
  RADIUS: {
    SMALL: 'calc(var(--radius) - 4px)',
    DEFAULT: 'var(--radius)',
    LARGE: 'calc(var(--radius) + 2px)',
  },
} as const;

export const ANIMATION = {
  DURATION: {
    FAST: TIME.SECOND * 0.15, // 150ms
    DEFAULT: TIME.SECOND * 0.2, // 200ms
    SLOW: TIME.SECOND * 0.3, // 300ms
    VERY_SLOW: TIME.SECOND * 0.5, // 500ms
  },
  EASING: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    LINEAR: 'linear',
    IN: 'cubic-bezier(0.4, 0, 1, 1)',
    OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const TRANSITIONS = {
  DEFAULT: {
    duration: ANIMATION.DURATION.DEFAULT,
    easing: ANIMATION.EASING.DEFAULT,
  },
  FAST: {
    duration: ANIMATION.DURATION.FAST,
    easing: ANIMATION.EASING.DEFAULT,
  },
  SLOW: {
    duration: ANIMATION.DURATION.SLOW,
    easing: ANIMATION.EASING.DEFAULT,
  },
} as const;

export const Z_INDEX = {
  MODAL: 1000,
  DROPDOWN: 900,
  STICKY: 800,
  FIXED: 700,
  DRAWER: 600,
  OVERLAY: 500,
  HEADER: 400,
  FOOTER: 300,
} as const;

export const SPACING = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
} as const;

export type ThemeConstants = typeof THEME;
export type AnimationConstants = typeof ANIMATION;
export type TransitionConstants = typeof TRANSITIONS;
export type ZIndexConstants = typeof Z_INDEX;
export type SpacingConstants = typeof SPACING;

const ui = {
  THEME,
  ANIMATION,
  TRANSITIONS,
  Z_INDEX,
  SPACING,
} as const;

export type UI = typeof ui;
export default ui;
