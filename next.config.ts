import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['news.ycombinator.com'], // Allow images from HN domain
    unoptimized: true, // Since we're using static images
  },
  // Improve static optimization
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
