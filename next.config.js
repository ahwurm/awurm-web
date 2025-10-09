/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/awurm-web' : '',
  assetPrefix: isProd ? '/awurm-web/' : '',
}

module.exports = nextConfig
