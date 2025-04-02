/**
 * Configuration validator utility
 * Validates the presence of required environment variables and configuration settings
 */

import { z } from 'zod';

// Schema for required environment variables
const envSchema = z.object({
  // Required environment variables
  NODE_ENV: z.enum(['development', 'production', 'test']),
  RESEND_API_KEY: z.string().min(1),

  // Optional environment variables with defaults
  NEXT_PUBLIC_API_URL: z.string().optional().default('/api'),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('https://qitonglan.com'),
});

// Type for validation result
export type ValidationResult = {
  isValid: boolean;
  env: z.infer<typeof envSchema> | null;
  errors: string[];
};

// Validate environment variables
export function validateEnv(): ValidationResult {
  try {
    const env = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    });

    return { isValid: true, env, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);

      return {
        isValid: false,
        env: null,
        errors,
      };
    }

    return {
      isValid: false,
      env: null,
      errors: ['Unknown error validating environment variables'],
    };
  }
}

// Execute validation on import
const result = validateEnv();

export const env = result.env;
