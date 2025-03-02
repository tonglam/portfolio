/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: "export" to enable API routes
  // output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Custom headers cannot be used with output: 'export'
  // The resume can be placed in the /public folder and accessed directly
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
};

module.exports = nextConfig;
