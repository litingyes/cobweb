import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/emojis',
        destination: '/emojis/overview',
        permanent: true,
      },
      {
        source: '/images',
        destination: '/images/overview',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
