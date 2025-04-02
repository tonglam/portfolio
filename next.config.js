/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: "export" to enable API routes
  // output: "export",
  staticPageGenerationTimeout: 180, // Increase timeout to 3 minutes
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['pages', 'app', 'components', 'hooks', 'lib', 'data', 'types'],
  },
  images: {
    unoptimized: true,
    minimumCacheTTL: 60,
    domains: [
      'res.cloudinary.com',
      'media.licdn.com',
      'images.credly.com',
      'v0.dev',
      'bolt.new',
      'cursor.com',
      'codeium.com',
      'claudemcp.com',
    ],
    formats: ['image/webp'],
  },
  // Custom headers cannot be used with output: 'export'
  // The resume can be placed in the /public folder and accessed directly
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  // Add performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.vercel-scripts.com https://*.vercel-insights.com https://*.vercel-analytics.com https://*.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://*.vercel-scripts.com https://*.vercel-insights.com https://*.vercel-analytics.com https://*.cloudflareinsights.com;",
          },
        ],
      },
    ];
  },
  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize production builds
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
