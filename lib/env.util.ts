import { z } from 'zod';

/**
 * Environment variable schema using Zod
 * This ensures type safety and validation for our environment variables
 */
const envSchema = z.object({
  // Cloudflare Configuration
  CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
  CLOUDFLARE_API_TOKEN: z.string().min(1),
  CLOUDFLARE_D1_API_TOKEN: z.string().min(1),
  CLOUDFLARE_D1_DATABASE_ID: z.string().min(1),

  // Email Configuration
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().email(),
  EMAIL_TO: z.string().email(),

  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

export type EnvVars = z.infer<typeof envSchema>;

export function getEnvVars(): EnvVars {
  try {
    return envSchema.parse({
      CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
      CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
      CLOUDFLARE_D1_API_TOKEN: process.env.CLOUDFLARE_D1_API_TOKEN,
      CLOUDFLARE_D1_DATABASE_ID: process.env.CLOUDFLARE_D1_DATABASE_ID,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
      EMAIL_TO: process.env.EMAIL_TO,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join('.')).join(', ');
      console.error('Environment variable validation failed:', error.errors);
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

export function getEnvVar<K extends keyof EnvVars>(key: K): EnvVars[K] {
  const vars = getEnvVars();
  return vars[key];
}

export const ENV_VARS = {
  CLOUDFLARE: {
    ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
    API_TOKEN: 'CLOUDFLARE_API_TOKEN',
    D1_API_TOKEN: 'CLOUDFLARE_D1_API_TOKEN',
    D1_DATABASE_ID: 'CLOUDFLARE_D1_DATABASE_ID',
  },
  EMAIL: {
    RESEND_API_KEY: 'RESEND_API_KEY',
    FROM: 'EMAIL_FROM',
    TO: 'EMAIL_TO',
  },
  SITE: {
    URL: 'NEXT_PUBLIC_SITE_URL',
  },
} as const;
