/**
 * Central export point for all configuration constants
 */

// Core configs
export * from './cache.config';
export * from './common.config';
export * from './defaults.config';

// Feature configs
export * from './cors.config';
export * from './errors.config';
export * from './urls.config';

// UI configs
export {
  ANIMATION,
  BREAKPOINTS,
  THEME,
  TOAST,
  TRANSITIONS,
  default as ui,
  Z_INDEX,
} from './ui.config';

// Validation
export * from './validator.config';

// Note: Types should be imported from @/types/* instead of here
