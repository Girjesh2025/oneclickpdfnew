/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'pdf-lib'],
    outputFileTracingExcludes: {
      '*': [
        '**/.next/**',
        '**/node_modules/**',
        '**/.git/**',
        '**/.vercel/**',
        'frontend/**',
        'oneclickpdf-frontend/**',
        'temp-fix/**',
        'temp-fix-frontend-deploy/**',
        'output/**',
        'uploads/**',
      ],
    },
  },
}

module.exports = nextConfig