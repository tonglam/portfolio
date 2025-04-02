import type {
  AnimationConstants,
  AnimationTimingConstants,
  BreakpointConstants,
  LayoutConstants,
  MotionConstants,
  PaginationConstants,
  RetryConstants,
  ScrollConstants,
  SpacingConstants,
  ThemeConstants,
  ThemeModeConstants,
  ToastConstants,
  TransitionConstants,
  ZIndexConstants,
} from '@/types/ui.type';
import { TIME } from './common.config';

/**
 * UI-related constants
 */

export const THEME: ThemeConstants = {
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

export const ANIMATION: AnimationConstants = {
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

export const TRANSITIONS: TransitionConstants = {
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

export const Z_INDEX: ZIndexConstants = {
  MODAL: 1000,
  DROPDOWN: 900,
  STICKY: 800,
  FIXED: 700,
  DRAWER: 600,
  OVERLAY: 500,
  HEADER: 400,
  FOOTER: 300,
} as const;

export const SPACING: SpacingConstants = {
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

export const ANIMATION_TIMING: AnimationTimingConstants = {
  DEBOUNCE_MS: 300,
  FADE_IN_MS: 200,
  SLIDE_IN_MS: 300,
  STAGGER_CHILDREN_MS: 100,
} as const;

export const RETRY: RetryConstants = {
  MAX_ATTEMPTS: 3,
  BASE_DELAY_MS: 1000,
} as const;

export const SCROLL_THRESHOLD = 200;

export const BREAKPOINTS: BreakpointConstants = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280,
} as const;

export const SCROLL: ScrollConstants = {
  THRESHOLD: 0.1,
  OFFSET: 100,
} as const;

export const TOAST: ToastConstants = {
  DURATION: 5000,
  MAX_VISIBLE: 3,
} as const;

export const THEME_MODE: ThemeModeConstants = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const LAYOUT: LayoutConstants = {
  MAX_WIDTH: '1440px',
  CONTENT_WIDTH: '1200px',
  SIDEBAR_WIDTH: '280px',
  HEADER_HEIGHT: '64px',
  FOOTER_HEIGHT: '80px',
} as const;

export const MOTION: MotionConstants = {
  SPRING: {
    STIFF: 100,
    DAMP: 12,
    MASS: 1,
  },
  TRANSITION: {
    EASE: [0.6, 0.01, -0.05, 0.95],
    DURATION: 0.6,
  },
} as const;

export const PAGINATION: PaginationConstants = {
  DEFAULT_PAGE: 1,
  DEFAULT_POSTS_PER_PAGE: 9,
  MAX_PAGES_TO_SHOW: 5,
} as const;

const ui = {
  THEME,
  ANIMATION,
  TRANSITIONS,
  Z_INDEX,
  SPACING,
  PAGINATION,
  ANIMATION_TIMING,
  RETRY,
  SCROLL_THRESHOLD,
  BREAKPOINTS,
  SCROLL,
  TOAST,
  THEME_MODE,
  LAYOUT,
  MOTION,
} as const;

export default ui;

export type UI = typeof ui;
