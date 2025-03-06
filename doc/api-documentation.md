# API Documentation

This document provides comprehensive documentation for the API endpoints available in the portfolio project.

## Overview

The portfolio project includes several API endpoints organized by domain:

- **Blog API**: Endpoints for retrieving blog posts and categories
- **Cloudflare API**: Endpoints for managing DNS records

All API endpoints follow a consistent response format and error handling approach.

## Base URL

The base URL for all API endpoints is:

```
/api
```

## Response Format

All API responses follow a consistent format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    message: string;
    code?: number;
    details?: unknown;
  };
}
```

Example successful response:

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "123",
        "title": "Example Post",
        "slug": "example-post",
        "description": "This is an example post",
        "publishedAt": "2023-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 25,
      "totalPages": 3,
      "hasMore": true
    }
  }
}
```

Example error response:

```json
{
  "success": false,
  "error": {
    "message": "Resource not found",
    "code": 404,
    "details": {
      "resource": "blog-post",
      "id": "non-existent-slug"
    }
  }
}
```

## Error Handling

API errors are handled consistently across all endpoints. Common error codes include:

| Code | Description                                     |
| ---- | ----------------------------------------------- |
| 400  | Bad Request - Invalid input parameters          |
| 401  | Unauthorized - Authentication required          |
| 403  | Forbidden - Insufficient permissions            |
| 404  | Not Found - Resource does not exist             |
| 429  | Too Many Requests - Rate limit exceeded         |
| 500  | Internal Server Error - Unexpected server error |

## Blog API

### Get Blog Posts

Retrieves a paginated list of blog posts.

**Endpoint:** `GET /api/blog`

**Query Parameters:**

| Parameter | Type   | Default | Description                        |
| --------- | ------ | ------- | ---------------------------------- |
| page      | number | 1       | Page number for pagination         |
| limit     | number | 10      | Number of items per page (max 100) |
| category  | string | null    | Filter posts by category           |
| tag       | string | null    | Filter posts by tag                |
| search    | string | null    | Search term to filter posts        |

**Response:**

```typescript
interface BlogPostsResponse {
  success: boolean;
  data: {
    posts: {
      id: string;
      title: string;
      slug: string;
      description: string;
      coverImage?: string;
      author: string;
      publishedAt: string;
      tags: string[];
      category: string;
    }[];
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      hasMore: boolean;
    };
  };
}
```

**Example Request:**

```
GET /api/blog?page=1&limit=10&category=technology
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "123",
        "title": "Getting Started with Next.js",
        "slug": "getting-started-with-nextjs",
        "description": "Learn how to build modern web applications with Next.js",
        "coverImage": "https://example.com/images/nextjs.jpg",
        "author": "John Doe",
        "publishedAt": "2023-01-01T00:00:00Z",
        "tags": ["nextjs", "react", "javascript"],
        "category": "technology"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 25,
      "totalPages": 3,
      "hasMore": true
    }
  }
}
```

### Get Blog Post by Slug

Retrieves a single blog post by its slug.

**Endpoint:** `GET /api/blog/[slug]`

**Path Parameters:**

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| slug      | string | Unique slug of the blog post |

**Response:**

```typescript
interface BlogPostResponse {
  success: boolean;
  data: {
    post: {
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
    };
  };
}
```

**Example Request:**

```
GET /api/blog/getting-started-with-nextjs
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "post": {
      "id": "123",
      "title": "Getting Started with Next.js",
      "slug": "getting-started-with-nextjs",
      "description": "Learn how to build modern web applications with Next.js",
      "content": "# Getting Started with Next.js\n\nNext.js is a React framework...",
      "coverImage": "https://example.com/images/nextjs.jpg",
      "author": "John Doe",
      "publishedAt": "2023-01-01T00:00:00Z",
      "tags": ["nextjs", "react", "javascript"],
      "category": "technology"
    }
  }
}
```

### Search Blog Posts

Searches for blog posts based on a query string.

**Endpoint:** `GET /api/blog/search`

**Query Parameters:**

| Parameter | Type   | Default  | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| q         | string | required | Search query                       |
| page      | number | 1        | Page number for pagination         |
| limit     | number | 10       | Number of items per page (max 100) |

**Response:**

```typescript
interface SearchResponse {
  success: boolean;
  data: {
    results: {
      id: string;
      title: string;
      slug: string;
      description: string;
      publishedAt: string;
      category: string;
    }[];
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      hasMore: boolean;
    };
  };
}
```

**Example Request:**

```
GET /api/blog/search?q=nextjs&page=1&limit=10
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "123",
        "title": "Getting Started with Next.js",
        "slug": "getting-started-with-nextjs",
        "description": "Learn how to build modern web applications with Next.js",
        "publishedAt": "2023-01-01T00:00:00Z",
        "category": "technology"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasMore": false
    }
  }
}
```

### Get Blog Categories

Retrieves all blog categories.

**Endpoint:** `GET /api/blog/categories`

**Response:**

```typescript
interface CategoriesResponse {
  success: boolean;
  data: {
    categories: {
      name: string;
      count: number;
    }[];
  };
}
```

**Example Request:**

```
GET /api/blog/categories
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "name": "technology",
        "count": 15
      },
      {
        "name": "design",
        "count": 8
      },
      {
        "name": "business",
        "count": 5
      }
    ]
  }
}
```

## Cloudflare API

### Get DNS Records

Retrieves DNS records for a specific Cloudflare zone.

**Endpoint:** `GET /api/cloudflare/dns/[zoneId]`

**Path Parameters:**

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| zoneId    | string | Cloudflare Zone ID |

**Response:**

```typescript
interface DnsRecordsResponse {
  success: boolean;
  dnsRecords?: {
    id: string;
    type: string;
    name: string;
    content: string;
    ttl: number;
    proxied: boolean;
    created_on: string;
    modified_on: string;
  }[];
  error?: string;
  details?: Record<string, unknown>;
}
```

**Example Request:**

```
GET /api/cloudflare/dns/abc123
```

**Example Response:**

```json
{
  "success": true,
  "dnsRecords": [
    {
      "id": "dns123",
      "type": "A",
      "name": "example.com",
      "content": "192.0.2.1",
      "ttl": 3600,
      "proxied": true,
      "created_on": "2023-01-01T00:00:00Z",
      "modified_on": "2023-01-01T00:00:00Z"
    }
  ]
}
```

### Create DNS Record

Creates a new DNS record in a specific Cloudflare zone.

**Endpoint:** `POST /api/cloudflare/dns/[zoneId]`

**Path Parameters:**

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| zoneId    | string | Cloudflare Zone ID |

**Request Body:**

```typescript
interface CreateDnsRecordRequest {
  type: string;
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
  priority?: number;
}
```

**Response:**

```typescript
interface CreateRecordResponse {
  success: boolean;
  message?: string;
  record?: {
    id: string;
    type: string;
    name: string;
    content: string;
    ttl: number;
    proxied: boolean;
    created_on: string;
    modified_on: string;
  };
  error?: string;
  details?: Record<string, unknown>;
}
```

**Example Request:**

```
POST /api/cloudflare/dns/abc123
Content-Type: application/json

{
  "type": "A",
  "name": "example.com",
  "content": "192.0.2.1",
  "ttl": 3600,
  "proxied": true
}
```

**Example Response:**

```json
{
  "success": true,
  "message": "DNS record created successfully",
  "record": {
    "id": "dns123",
    "type": "A",
    "name": "example.com",
    "content": "192.0.2.1",
    "ttl": 3600,
    "proxied": true,
    "created_on": "2023-01-01T00:00:00Z",
    "modified_on": "2023-01-01T00:00:00Z"
  }
}
```

### Get Cloudflare Zones

Retrieves all Cloudflare zones for the authenticated account.

**Endpoint:** `GET /api/cloudflare/zones`

**Response:**

```typescript
interface ZonesApiResponse {
  success: boolean;
  zones?: {
    id: string;
    name: string;
    status: string;
    paused: boolean;
    type: string;
    development_mode: number;
    name_servers: string[];
    original_name_servers: string[];
    original_registrar: string;
    original_dnshost: string;
    modified_on: string;
    created_on: string;
    activated_on: string;
    owner: {
      id: string;
      type: string;
      email: string;
    };
    account: {
      id: string;
      name: string;
    };
    permissions: string[];
    plan: {
      id: string;
      name: string;
      price: number;
      currency: string;
      frequency: string;
      is_subscribed: boolean;
      can_subscribe: boolean;
      legacy_id: string;
      legacy_discount: boolean;
      externally_managed: boolean;
    };
  }[];
  error?: string;
  details?: Record<string, unknown>;
}
```

**Example Request:**

```
GET /api/cloudflare/zones
```

**Example Response:**

```json
{
  "success": true,
  "zones": [
    {
      "id": "abc123",
      "name": "example.com",
      "status": "active",
      "paused": false,
      "type": "full",
      "development_mode": 0,
      "name_servers": ["ns1.cloudflare.com", "ns2.cloudflare.com"],
      "original_name_servers": ["ns1.example.com", "ns2.example.com"],
      "original_registrar": "Example Registrar",
      "original_dnshost": "Example DNS",
      "modified_on": "2023-01-01T00:00:00Z",
      "created_on": "2022-01-01T00:00:00Z",
      "activated_on": "2022-01-01T00:00:00Z",
      "owner": {
        "id": "user123",
        "type": "user",
        "email": "user@example.com"
      },
      "account": {
        "id": "account123",
        "name": "Example Account"
      },
      "permissions": ["read", "write"],
      "plan": {
        "id": "plan123",
        "name": "Pro Plan",
        "price": 20,
        "currency": "USD",
        "frequency": "monthly",
        "is_subscribed": true,
        "can_subscribe": true,
        "legacy_id": "pro",
        "legacy_discount": false,
        "externally_managed": false
      }
    }
  ]
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse. The default rate limits are:

- 60 requests per minute per IP address
- 1000 requests per hour per IP address

When a rate limit is exceeded, the API will respond with a 429 Too Many Requests status code and include a Retry-After header indicating when the client can retry the request.

## Authentication

Some API endpoints require authentication. Authentication is handled through environment variables for API keys and tokens.

## Error Codes

The API uses the following error codes:

| Code | Name                  | Description                                                             |
| ---- | --------------------- | ----------------------------------------------------------------------- |
| 400  | BAD_REQUEST           | The request was malformed or contained invalid parameters               |
| 401  | UNAUTHORIZED          | Authentication is required to access this resource                      |
| 403  | FORBIDDEN             | The authenticated user does not have permission to access this resource |
| 404  | NOT_FOUND             | The requested resource was not found                                    |
| 429  | RATE_LIMITED          | The client has sent too many requests in a given time period            |
| 500  | INTERNAL_SERVER_ERROR | An unexpected error occurred on the server                              |

## Conclusion

This API documentation provides a comprehensive overview of the available endpoints, request/response formats, and error handling in the portfolio project. For any questions or issues, please refer to the project's GitHub repository or contact the project maintainers.
