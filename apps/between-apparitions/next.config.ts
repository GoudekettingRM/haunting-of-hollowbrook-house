import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: [
      'images.pexels.com',
      'images.stockcake.com',
      'upload.wikimedia.org',
      'freerangestock.com',
      'cache.getarchive.net',
      'live.staticflickr.com',
    ],
  },
};

export default nextConfig;
