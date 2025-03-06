# Types Management

This document outlines the type management strategy for the portfolio project, explaining the organization, conventions, and best practices for TypeScript types.

## Organization

Types are organized in a hierarchical structure under the `types/` directory:

```
types/
├── api/             # API-related types
│   ├── blog.ts      # Blog API types
│   ├── cloudflare.ts # Cloudflare API types
│   ├── common.ts    # Common API types
│   └── index.ts     # API types barrel file
├── data/            # Data model types
│   └── index.ts     # Data types barrel file
├── config/          # Configuration types
│   └── urls.ts      # URL configuration types
├── common.ts        # Common shared types
└── index.ts         # Central export point
```

## Key Type Definitions

### API Types

API types define the structure of API requests and responses:

```typescript
// Example from types/api/blog.ts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  author: string;
  publishedAt: string;
  tags: string[];
  category: string;
}

export interface BlogPostsResponse {
  success: boolean;
  data: {
    posts: BlogPost[];
    pagination: Pagination;
  };
}
```

### Data Types

Data types represent application domain models:

```typescript
// Example from types/data/index.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  images: Image[];
  technologies: string[];
  links: Link[];
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
  highlights: string[];
}
```

### Common Types

Common types are shared across different parts of the application:

```typescript
// Example from types/common.ts
export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    message: string;
    code?: number;
    details?: unknown;
  };
}
```

## Guidelines

### Type Naming Conventions

- **Interfaces**: Use PascalCase (e.g., `BlogPost`)
- **Type Aliases**: Use PascalCase (e.g., `ApiResponse<T>`)
- **Enums**: Use PascalCase with Enum suffix (e.g., `ColorEnum`)
- **Generic Type Parameters**: Use single uppercase letters or descriptive PascalCase (e.g., `T` or `ResponseData`)

### Type Exports

All types should be exported through the central `types/index.ts` file to create a single import point:

```typescript
// types/index.ts
export type * from './common';

// API types - export with namespace to avoid conflicts
import type * as ApiTypes from './api';
export { ApiTypes };

// Data types - export with namespace to avoid conflicts
import type * as DataTypes from './data';
export { DataTypes };
```

In application code, import types from the central export point:

```typescript
// Good
import type { ApiResponse, Pagination } from '@/types';
import type { ApiTypes } from '@/types';

// Avoid
import type { ApiResponse } from '@/types/common';
import type { BlogPost } from '@/types/api/blog';
```

### Type Guards

Type guards ensure type safety at runtime. The project includes utility type guards in `app/lib/utils/type-guards.ts`:

```typescript
// Example type guard from app/lib/utils/type-guards.ts
export function isApiResponse<T>(obj: unknown): obj is ApiResponse<T> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'success' in obj &&
    typeof (obj as ApiResponse<T>).success === 'boolean' &&
    'data' in obj
  );
}
```

Usage in application code:

```typescript
if (isApiResponse<BlogPost>(response)) {
  // response is typed as ApiResponse<BlogPost>
  if (response.success) {
    return response.data;
  }
}
```

### Generic Types

The project uses generic types for reusable interfaces:

```typescript
// Example of generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    message: string;
    code?: number;
    details?: unknown;
  };
}

// Usage
const response: ApiResponse<BlogPost[]> = await fetchBlogPosts();
```

### Utility Types

The project leverages TypeScript utility types:

- **Partial<T>**: Makes all properties optional
- **Required<T>**: Makes all properties required
- **Readonly<T>**: Makes all properties readonly
- **Pick<T, K>**: Selects a subset of properties
- **Omit<T, K>**: Removes specific properties
- **Record<K, T>**: Creates a type with specified keys and values

Examples:

```typescript
// Example usages
type BlogPostUpdateParams = Partial<BlogPost>;
type BlogPostPreview = Pick<BlogPost, 'id' | 'title' | 'description' | 'coverImage'>;
type BlogPostWithoutContent = Omit<BlogPost, 'content'>;
```

### Discriminated Unions

Discriminated unions are used for typing different variants:

```typescript
// Example discriminated union
type ApiResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: { message: string; code: number } }
  | { status: 'loading' };

// Usage
function handleResult(result: ApiResult<BlogPost>): void {
  switch (result.status) {
    case 'success':
      // result.data is typed as BlogPost
      break;
    case 'error':
      // result.error is available
      break;
    case 'loading':
      // No additional data
      break;
  }
}
```

## Best Practices

### 1. Avoid `any`

Never use the `any` type. Use `unknown` if the type is truly unknown, then perform type narrowing:

```typescript
// Bad
function processData(data: any): void {
  console.log(data.property); // No type safety
}

// Good
function processData(data: unknown): void {
  if (typeof data === 'object' && data !== null && 'property' in data) {
    console.log(data.property);
  }
}
```

### 2. Use Readonly

For immutable data, use `Readonly<T>` or `ReadonlyArray<T>`:

```typescript
// Example of readonly types
export type Config = Readonly<{
  apiUrl: string;
  timeout: number;
}>;

export function processItems(items: ReadonlyArray<string>): void {
  // items.push('new item'); // Error: Property 'push' does not exist on type 'readonly string[]'
}
```

### 3. Use Const Assertions

Use `as const` for literal values to get more specific types:

```typescript
// Example of const assertions
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// This creates a type: 'light' | 'dark' | 'system'
export type Theme = (typeof THEMES)[keyof typeof THEMES];
```

### 4. Document Complex Types

Use JSDoc comments to document complex types:

```typescript
/**
 * Represents a blog post with its metadata
 * @property id - Unique identifier for the post
 * @property title - Post title
 * @property content - Post content in markdown format
 * @property publishedAt - ISO date string of publication
 */
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  // ...other properties
}
```

## Type Checking

Run TypeScript's type checker to verify types:

```bash
npm run type-check
```

This command runs `tsc --noEmit` to check types without generating JavaScript files.

## Tools and Resources

- **TypeScript Configuration**: See `tsconfig.json` for compiler options
- **ESLint Rules**: See `eslint.config.js` for TypeScript-specific rules
- **Type Guard Utilities**: Available in `app/lib/utils/type-guards.ts`
- **TypeScript Documentation**: [typescriptlang.org](https://www.typescriptlang.org/docs/)
