/**
 * Configuration validator utility
 * Validates the presence of required environment variables and configuration settings
 */

import { z } from 'zod';
import { logger } from './logger';

// Schema for required environment variables
const envSchema = z.object({
  // Required environment variables
  NODE_ENV: z.enum(['development', 'production', 'test']),
  RESEND_API_KEY: z.string().min(1),

  // Optional environment variables with defaults
  NEXT_PUBLIC_API_URL: z.string().optional().default('/api'),
});

// Validate environment variables
export function validateEnv(): {
  isValid: boolean;
  env: z.infer<typeof envSchema> | null;
  errors: string[];
} {
  try {
    const env = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
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

// Log validation errors in development
if (!result.isValid && process.env.NODE_ENV === 'development') {
  logger.error('Environment configuration is invalid', 'Config Validator');
  result.errors.forEach(error => logger.error(error, 'Config Validator'));
  throw new Error('Invalid environment configuration');
}

export const env = result.env;
