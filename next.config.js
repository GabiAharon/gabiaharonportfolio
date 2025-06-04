/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'i.postimg.cc',
      'example.com',
      'via.placeholder.com',
      'picsum.photos'
    ]
  },
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  
  // הגדרות לטיפול נכון בקידוד UTF-8
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    
    // תמיכה בקבצי JSON עם קידוד UTF-8
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
      generator: {
        filename: '[name][ext]'
      }
    });
    
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
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          }
        ],
      },
      {
        source: '/data/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json; charset=utf-8',
          },
        ],
      }
    ]
  },
  
  // הגדרות נוספות לתמיכה ב-UTF-8
  env: {
    LOCALE: 'he-IL',
    CHARSET: 'utf-8'
  }
}

module.exports = nextConfig 