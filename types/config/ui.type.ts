export type ThemeConstants = {
  readonly COLORS: {
    readonly PRIMARY: 'hsl(var(--primary))';
    readonly SECONDARY: 'hsl(var(--secondary))';
    readonly ACCENT: 'hsl(var(--accent))';
    readonly BACKGROUND: 'hsl(var(--background))';
    readonly FOREGROUND: 'hsl(var(--foreground))';
    readonly MUTED: 'hsl(var(--muted))';
    readonly BORDER: 'hsl(var(--border))';
  };
  readonly CHART_COLORS: {
    readonly BLUE: 'hsl(var(--chart-1))';
    readonly GREEN: 'hsl(var(--chart-2))';
    readonly ORANGE: 'hsl(var(--chart-3))';
    readonly PURPLE: 'hsl(var(--chart-4))';
    readonly RED: 'hsl(var(--chart-5))';
  };
  readonly RADIUS: {
    readonly SMALL: string;
    readonly DEFAULT: string;
    readonly LARGE: string;
  };
};

export type AnimationConstants = {
  readonly DURATION: {
    readonly FAST: number;
    readonly DEFAULT: number;
    readonly SLOW: number;
    readonly VERY_SLOW: number;
  };
  readonly EASING: {
    readonly DEFAULT: string;
    readonly LINEAR: string;
    readonly IN: string;
    readonly OUT: string;
    readonly IN_OUT: string;
  };
};

export type TransitionConstants = {
  readonly DEFAULT: {
    readonly duration: number;
    readonly easing: string;
  };
  readonly FAST: {
    readonly duration: number;
    readonly easing: string;
  };
  readonly SLOW: {
    readonly duration: number;
    readonly easing: string;
  };
};

export type ZIndexConstants = {
  readonly MODAL: number;
  readonly DROPDOWN: number;
  readonly STICKY: number;
  readonly FIXED: number;
  readonly DRAWER: number;
  readonly OVERLAY: number;
  readonly HEADER: number;
  readonly FOOTER: number;
};

export type SpacingConstants = {
  readonly [key: number]: string;
};

export type PaginationConstants = {
  readonly DEFAULT_PAGE: number;
  readonly DEFAULT_POSTS_PER_PAGE: number;
  readonly MAX_PAGES_TO_SHOW: number;
};

export type AnimationTimingConstants = {
  readonly DEBOUNCE_MS: number;
  readonly FADE_IN_MS: number;
  readonly SLIDE_IN_MS: number;
  readonly STAGGER_CHILDREN_MS: number;
};

export type RetryConstants = {
  readonly MAX_ATTEMPTS: number;
  readonly BASE_DELAY_MS: number;
};

export type BreakpointConstants = {
  readonly MOBILE: number;
  readonly TABLET: number;
  readonly DESKTOP: number;
  readonly LARGE: number;
};

export type ScrollConstants = {
  readonly THRESHOLD: number;
  readonly OFFSET: number;
};

export type ToastConstants = {
  readonly DURATION: number;
  readonly MAX_VISIBLE: number;
};

export type ThemeModeConstants = {
  readonly LIGHT: string;
  readonly DARK: string;
  readonly SYSTEM: string;
};

export type LayoutConstants = {
  readonly MAX_WIDTH: string;
  readonly CONTENT_WIDTH: string;
  readonly SIDEBAR_WIDTH: string;
  readonly HEADER_HEIGHT: string;
  readonly FOOTER_HEIGHT: string;
};

export type MotionConstants = {
  readonly SPRING: {
    readonly STIFF: number;
    readonly DAMP: number;
    readonly MASS: number;
  };
  readonly TRANSITION: {
    readonly EASE: [number, number, number, number];
    readonly DURATION: number;
  };
};

export type UI = {
  readonly THEME: ThemeConstants;
  readonly ANIMATION: AnimationConstants;
  readonly TRANSITIONS: TransitionConstants;
  readonly Z_INDEX: ZIndexConstants;
  readonly SPACING: SpacingConstants;
  readonly PAGINATION: PaginationConstants;
  readonly ANIMATION_TIMING: AnimationTimingConstants;
  readonly RETRY: RetryConstants;
  readonly SCROLL_THRESHOLD: number;
  readonly BREAKPOINTS: BreakpointConstants;
  readonly SCROLL: ScrollConstants;
  readonly TOAST: ToastConstants;
  readonly THEME_MODE: ThemeModeConstants;
  readonly LAYOUT: LayoutConstants;
  readonly MOTION: MotionConstants;
};
