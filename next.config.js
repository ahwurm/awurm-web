/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds (when deploying to Amplify)
  ...(process.env.NODE_ENV === 'production' &&
  process.env.STATIC_EXPORT === 'true'
    ? {
        output: 'export',
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
}

module.exports = nextConfig
