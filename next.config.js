/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  
  // הגדרות לטיפול נכון בקידוד UTF-8
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  
  // וידוא שהקפיות שמורות בקידוד נכון
  experimental: {
    esmExternals: false
  },
  
  // הגדרות headers לוידוא קידוד נכון
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 