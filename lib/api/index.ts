/**
 * API utilities
 * Higher-level abstractions for API functionality
 */

// Rename the imports to avoid naming conflicts
import * as blogServiceModule from './blog-service';
import * as cloudflareModule from './cloudflare';

// Re-export with better names
export const blogService = blogServiceModule;
export const cloudflare = cloudflareModule;
