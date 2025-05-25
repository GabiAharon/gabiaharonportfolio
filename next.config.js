/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  assetPrefix: '/gabiaharonportfolio/',
  basePath: '/gabiaharonportfolio'
}

module.exports = nextConfig 