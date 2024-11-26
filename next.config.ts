import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/images',
        destination: '/images/overview',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
