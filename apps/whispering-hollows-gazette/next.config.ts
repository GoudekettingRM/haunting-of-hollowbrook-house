import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/archives',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
