import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['three'],
};

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer({
      enabled: true,
    })(nextConfig)
  : nextConfig;
