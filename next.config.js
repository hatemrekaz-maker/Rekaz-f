
// @ts-check
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline'
  }
})

const config = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  images: { unoptimized: true }, // keep simple for PWA + OPFS/IndexedDB usage
}

module.exports = withPWA(config)
