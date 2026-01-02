/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Allow external images from Cloudinary and other CDNs
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
        pathname: "/**",
      },
      // Allow any HTTPS image for flexibility (you can restrict this if needed)
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
    // Also allow unoptimized images if needed (for external URLs that don't support optimization)
    unoptimized: false,
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  // React strict mode for better development experience
  reactStrictMode: true,
  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
