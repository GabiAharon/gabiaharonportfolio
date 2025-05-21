/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: { unoptimized: true },
}

// Only add these in production (for GitHub Pages)
if (process.env.NODE_ENV === 'production') {
  nextConfig.assetPrefix = '/gabiaharonportfolio'
  nextConfig.basePath = '/gabiaharonportfolio'
}

module.exports = nextConfig 