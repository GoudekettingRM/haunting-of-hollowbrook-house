import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.pexels.com',
      'images.stockcake.com',
      'upload.wikimedia.org',
      'freerangestock.com',
      'cache.getarchive.net',
    ],
  },
};

export default nextConfig;
