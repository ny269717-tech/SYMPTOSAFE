/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for production
  swcMinify: true,
  // Ensure proper image optimization
  images: {
    domains: [],
    formats: ['image/webp'],
  },
  // Environment variables validation
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
}

module.exports = nextConfig
