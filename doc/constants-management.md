# Constants Management

This document outlines the approach to managing constants and avoiding magic numbers/strings in the portfolio project.

## Organization

Constants are organized in a hierarchical structure under the `config/constants/` directory:

```
config/constants/
├── common.ts     # Common constants (HTTP codes, time values)
├── defaults.ts   # Default values and settings
├── errors.ts     # Error messages and codes
├── ui.ts         # UI-related constants
├── urls.ts       # URL patterns and endpoints
└── index.ts      # Central export point
```

## Constant Categories

### Common Constants (`common.ts`)

Common constants include fundamental values used throughout the application:

```typescript
// Example from config/constants/common.ts
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

export const HTTP = {
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  },
  STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    RATE_LIMITED: 429,
    SERVER_ERROR: 500,
  },
  HEADERS: {
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: 'Authorization',
    CACHE_CONTROL: 'Cache-Control',
    RETRY_AFTER: 'Retry-After',
  },
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

export const LIMITS = {
  MAX_PAGE_SIZE: 100,
  MIN_PASSWORD_LENGTH: 8,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_TAGS: 10,
} as const;
```

### Default Values (`defaults.ts`)

Default values and settings for various features:

```typescript
// Example from config/constants/defaults.ts
import { LIMITS, TIME } from './common';

export const BLOG_DEFAULTS = {
  limit: LIMITS.MAX_PAGE_SIZE,
  minRead: '3 Min Read',
  pagination: {
    itemsPerPage: 10,
    maxPages: 5,
  },
} as const;

export const CACHE_DEFAULTS = {
  control: `public, max-age=${TIME.HOUR / TIME.SECOND}, stale-while-revalidate=${TIME.DAY / TIME.SECOND}`,
  revalidate: TIME.HOUR / TIME.SECOND,
} as const;

export const API_DEFAULTS = {
  retryAttempts: 3,
  timeout: 10 * TIME.SECOND,
  rateLimit: {
    windowMs: TIME.MINUTE,
    maxRequests: 60,
  },
} as const;
```

### Error Messages (`errors.ts`)

Standardized error messages:

```typescript
// Example from config/constants/errors.ts
export const API_ERRORS = {
  GENERAL: {
    INTERNAL: 'An internal server error occurred',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Authentication required',
    FORBIDDEN: 'You do not have permission to access this resource',
    VALIDATION: 'Invalid input data',
  },
  BLOG: {
    FETCH_FAILED: 'Failed to fetch blog posts',
    POST_NOT_FOUND: 'Blog post not found',
    INVALID_SLUG: 'Invalid blog post slug',
  },
  CLOUDFLARE: {
    FETCH_FAILED: 'Failed to fetch DNS records',
    CREATE_FAILED: 'Failed to create DNS record',
    API_ERROR: 'Cloudflare API error',
  },
  CONTACT: {
    EMAIL_FAILED: 'Failed to send email',
    INVALID_EMAIL: 'Invalid email address',
    RATE_LIMITED: 'Too many requests. Please try again later',
  },
} as const;
```

### UI Constants (`ui.ts`)

User interface related constants:

```typescript
// Example from config/constants/ui.ts
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1280,
  WIDE: 1536,
} as const;

export const DIMENSIONS = {
  HEADER_HEIGHT: 64,
  FOOTER_HEIGHT: 60,
  SIDEBAR_WIDTH: 250,
  CONTAINER_WIDTH: 1200,
  NAV_HEIGHT: 56,
} as const;

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const ANIMATION = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    LINEAR: 'linear',
    IN: 'cubic-bezier(0.4, 0, 1, 1)',
    OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
```

### URL Patterns (`urls.ts`)

URL constants for API endpoints and external links:

```typescript
// Example from config/constants/urls.ts
export const API_URLS = {
  BLOG: {
    LIST: '/api/blog',
    DETAIL: (slug: string) => `/api/blog/${slug}`,
    SEARCH: '/api/blog/search',
    CATEGORIES: '/api/blog/categories',
  },
  CLOUDFLARE: {
    ZONES: '/api/cloudflare/zones',
    DNS: (zoneId: string) => `/api/cloudflare/dns/${zoneId}`,
  },
} as const;

export const EXTERNAL_URLS = {
  GITHUB: 'https://github.com/yourusername',
  LINKEDIN: 'https://linkedin.com/in/yourprofile',
  TWITTER: 'https://twitter.com/yourhandle',
} as const;
```

## Guidelines

### Constant Naming Conventions

- **Constant Names**: Use UPPER_SNAKE_CASE for primitive constants (e.g., `MAX_RETRY_COUNT`)
- **Constant Objects**: Use PascalCase for objects (e.g., `HttpStatus`)
- **Enumeration-like Objects**: Use UPPER_SNAKE_CASE for keys in objects (e.g., `COLORS.PRIMARY`)

```typescript
// Good examples
export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
};

export const COLORS = {
  PRIMARY: '#0070f3',
  SECONDARY: '#f5f5f5',
  ERROR: '#e53e3e',
};
```

### Best Practices

#### 1. Use Nested Objects for Related Constants

Group related constants in nested objects:

```typescript
// Good: Grouped related constants
export const ANIMATION = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // other easing functions...
  },
} as const;

// Avoid: Flat and unrelated constants
export const FAST_ANIMATION = 200;
export const NORMAL_ANIMATION = 300;
export const SLOW_ANIMATION = 500;
```

#### 2. Use Computed Values When Possible

Derive constants from other constants to maintain relationships:

```typescript
// Good: Derived values
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
} as const;

// Avoid: Hardcoded values that should be related
export const SECOND_MS = 1000;
export const MINUTE_MS = 60000;
export const HOUR_MS = 3600000;
```

#### 3. Export Types with Constants

Always export TypeScript types along with constants:

```typescript
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Creates a union type: 'light' | 'dark' | 'system'
export type Theme = (typeof THEME)[keyof typeof THEME];

// Usage
function setTheme(theme: Theme): void {
  // ...
}
```

#### 4. Document Units in Comments

Include units in comments for numeric constants:

```typescript
export const SIZES = {
  TINY: 4, // px
  SMALL: 8, // px
  MEDIUM: 16, // px
  LARGE: 24, // px
  X_LARGE: 32, // px
} as const;

export const TIMEOUTS = {
  SHORT: 2000, // ms
  MEDIUM: 5000, // ms
  LONG: 10000, // ms
} as const;
```

#### 5. Use Factory Functions for Dynamic Constants

For dynamic constants that depend on input parameters, use factory functions:

```typescript
// Example
export function getApiUrl(endpoint: string): string {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
  return `${BASE_URL}/${endpoint}`;
}

// Usage
const usersApiUrl = getApiUrl('users');
```

## Finding Magic Numbers and Strings

The project includes a script to identify potential magic numbers and strings that should be moved to constants:

```bash
npm run find:magic
```

This script scans the codebase for:

- Numeric literals that aren't 0 or 1
- String literals longer than 3 characters
- Patterns that might indicate hardcoded values

### Example Script Output

```
Potential magic numbers found:
app/components/ui/Pagination.tsx:42: return Math.ceil(totalItems / 10);
app/hooks/useTypewriter.ts:15: setTimeout(typeNextCharacter, 150);

Potential hardcoded strings found:
app/components/ContactForm.tsx:55: placeholder="Your name"
app/components/ContactForm.tsx:62: placeholder="Your email"
```

If you find magic numbers or strings, move them to the appropriate constants file.

## Utility Functions

Several utility functions in `app/lib/utils/constants.ts` help work with constants:

### 1. `createLookup`

Creates a lookup object from an enum-like object:

```typescript
// Definition
export function createLookup<T extends Record<string, string | number>>(
  constants: T
): Record<string, string | number>;

// Usage
const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
} as const;

const STATUS_LOOKUP = createLookup(HTTP_STATUS);
// Result: { '200': 200, '404': 404 }
```

### 2. `createValidator`

Creates a type guard function to validate constants:

```typescript
// Definition
export function createValidator<T extends Record<string, string | number>>(
  constants: T
): (value: unknown) => value is T[keyof T];

// Usage
const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

const isValidTheme = createValidator(THEME);

if (isValidTheme(userInput)) {
  // userInput is typed as 'light' | 'dark'
}
```

### 3. `getConstant`

Gets a constant with fallback value:

```typescript
// Definition
export function getConstant<T extends Record<string, unknown>, K extends keyof T>(
  constants: T,
  key: K,
  fallback: T[K]
): T[K];

// Usage
const theme = getConstant(THEME, userTheme as keyof typeof THEME, THEME.SYSTEM);
```

### 4. `deepFreeze`

Deep freezes a constants object to prevent modifications:

```typescript
// Definition
export function deepFreeze<T>(obj: T): Readonly<T>;

// Usage
const FROZEN_CONFIG = deepFreeze({
  api: {
    url: 'https://api.example.com',
    timeout: 5000,
  },
});

// FROZEN_CONFIG.api.url = 'new-url'; // Error: Cannot assign to read-only property
```

## Examples

### Good Constant Usage

```typescript
// In component code
import { BLOG_DEFAULTS } from '@/config/constants';

function BlogList(): JSX.Element {
  const [page, setPage] = useState(1);
  const [limit] = useState(BLOG_DEFAULTS.pagination.itemsPerPage);

  // fetch blog posts with limit
}
```

### API Integration with Constants

```typescript
// In API service
import { API_DEFAULTS, API_ERRORS } from '@/config/constants';

async function fetchData<T>(url: string): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_DEFAULTS.timeout);

    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(API_ERRORS.GENERAL.FETCH_FAILED);
    }

    return await response.json();
  } catch (error) {
    // Handle error
    throw error;
  }
}
```

### Responsive Design with Constants

```tsx
// In component code
import { BREAKPOINTS } from '@/config/constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';

function ResponsiveComponent(): JSX.Element {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE}px)`);
  const isTablet = useMediaQuery(`(max-width: ${BREAKPOINTS.TABLET}px)`);

  return <div>{isMobile ? <MobileView /> : isTablet ? <TabletView /> : <DesktopView />}</div>;
}
```

## Conclusion

By following these guidelines and using the provided utilities, you can maintain a clean, consistent, and type-safe approach to constants management in the portfolio project. This approach helps eliminate magic numbers and strings, improves code readability, and reduces errors caused by hardcoded values.
